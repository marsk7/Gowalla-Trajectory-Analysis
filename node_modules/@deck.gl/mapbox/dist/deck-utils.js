// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { Deck, MapView, _GlobeView as GlobeView, _flatten as flatten } from '@deck.gl/core';
import { lngLatToWorld, unitsPerMeter } from '@math.gl/web-mercator';
// Mercator constants
const TILE_SIZE = 512;
const DEGREES_TO_RADIANS = Math.PI / 180;
// Create an interleaved deck instance.
export function getDeckInstance({ map, gl, deck }) {
    // Only create one deck instance per context
    if (map.__deck) {
        return map.__deck;
    }
    // Only initialize certain props once per context
    const customRender = deck?.props._customRender;
    const onLoad = deck?.props.onLoad;
    const deckProps = {
        ...deck?.props,
        _customRender: () => {
            map.triggerRepaint();
            // customRender may be subscribed by DeckGL React component to update child props
            // make sure it is still called
            // Hack - do not pass a redraw reason here to prevent the React component from clearing the context
            // Rerender will be triggered by MapboxLayer's render()
            customRender?.('');
        }
    };
    deckProps.parameters = { ...getDefaultParameters(map, true), ...deckProps.parameters };
    deckProps.views || (deckProps.views = getDefaultView(map));
    let deckInstance;
    if (!deck || deck.props.gl === gl) {
        // If deck isn't defined (Internal MapboxLayer use case),
        // or if deck is defined and is using the WebGLContext created by mapbox (MapboxOverlay and External MapboxLayer use case),
        // block deck from setting the canvas size, and use the map's viewState to drive deck.
        // Otherwise, we use deck's viewState to drive the map.
        Object.assign(deckProps, {
            gl,
            width: null,
            height: null,
            touchAction: 'unset',
            viewState: getViewState(map)
        });
        if (deck?.isInitialized) {
            watchMapMove(deck, map);
        }
        else {
            deckProps.onLoad = () => {
                onLoad?.();
                watchMapMove(deckInstance, map);
            };
        }
    }
    if (deck) {
        deckInstance = deck;
        deck.setProps(deckProps);
        deck.userData.isExternal = true;
    }
    else {
        deckInstance = new Deck(deckProps);
        map.on('remove', () => {
            removeDeckInstance(map);
        });
    }
    deckInstance.userData.mapboxLayers = new Set();
    // (deckInstance.userData as UserData).mapboxVersion = getMapboxVersion(map);
    map.__deck = deckInstance;
    map.on('render', () => {
        if (deckInstance.isInitialized)
            afterRender(deckInstance, map);
    });
    return deckInstance;
}
function watchMapMove(deck, map) {
    const _handleMapMove = () => {
        if (deck.isInitialized) {
            // call view state methods
            onMapMove(deck, map);
        }
        else {
            // deregister itself when deck is finalized
            map.off('move', _handleMapMove);
        }
    };
    map.on('move', _handleMapMove);
}
export function removeDeckInstance(map) {
    map.__deck?.finalize();
    map.__deck = null;
}
export function getDefaultParameters(map, interleaved) {
    const result = interleaved
        ? {
            depthWriteEnabled: true,
            depthCompare: 'less-equal',
            depthBias: 0,
            blend: true,
            blendColorSrcFactor: 'src-alpha',
            blendColorDstFactor: 'one-minus-src-alpha',
            blendAlphaSrcFactor: 'one',
            blendAlphaDstFactor: 'one-minus-src-alpha',
            blendColorOperation: 'add',
            blendAlphaOperation: 'add'
        }
        : {};
    if (getProjection(map) === 'globe') {
        result.cullMode = 'back';
    }
    return result;
}
export function addLayer(deck, layer) {
    deck.userData.mapboxLayers.add(layer);
    updateLayers(deck);
}
export function removeLayer(deck, layer) {
    deck.userData.mapboxLayers.delete(layer);
    updateLayers(deck);
}
export function updateLayer(deck, layer) {
    updateLayers(deck);
}
export function drawLayer(deck, map, layer, renderParameters) {
    let { currentViewport } = deck.userData;
    let clearStack = false;
    if (!currentViewport) {
        // This is the first layer drawn in this render cycle.
        // Generate viewport from the current map state.
        currentViewport = getViewport(deck, map, renderParameters);
        deck.userData.currentViewport = currentViewport;
        clearStack = true;
    }
    if (!deck.isInitialized) {
        return;
    }
    deck._drawLayers('mapbox-repaint', {
        viewports: [currentViewport],
        layerFilter: ({ layer: deckLayer }) => layer.id === deckLayer.id || deckLayer.props.operation.includes('terrain'),
        clearStack,
        clearCanvas: false
    });
}
function getProjection(map) {
    const projection = map.getProjection?.();
    const type = 
    // maplibre projection spec
    projection?.type ||
        // mapbox projection spec
        projection?.name;
    if (type === 'globe') {
        return 'globe';
    }
    if (type && type !== 'mercator') {
        throw new Error('Unsupported projection');
    }
    return 'mercator';
}
export function getDefaultView(map) {
    if (getProjection(map) === 'globe') {
        return new GlobeView({ id: 'mapbox' });
    }
    return new MapView({ id: 'mapbox' });
}
export function getViewState(map) {
    const { lng, lat } = map.getCenter();
    const viewState = {
        // Longitude returned by getCenter can be outside of [-180, 180] when zooming near the anti meridian
        // https://github.com/visgl/deck.gl/issues/6894
        longitude: ((lng + 540) % 360) - 180,
        latitude: lat,
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch(),
        padding: map.getPadding(),
        repeat: map.getRenderWorldCopies()
    };
    if (map.getTerrain?.()) {
        // When the base map has terrain, we need to target the camera at the terrain surface
        centerCameraOnTerrain(map, viewState);
    }
    return viewState;
}
function centerCameraOnTerrain(map, viewState) {
    if (map.getFreeCameraOptions) {
        // mapbox-gl v2
        const { position } = map.getFreeCameraOptions();
        if (!position || position.z === undefined) {
            return;
        }
        // @ts-ignore transform is not typed
        const height = map.transform.height;
        const { longitude, latitude, pitch } = viewState;
        // Convert mapbox mercator coordinate to deck common space
        const cameraX = position.x * TILE_SIZE;
        const cameraY = (1 - position.y) * TILE_SIZE;
        const cameraZ = position.z * TILE_SIZE;
        // Mapbox manipulates zoom in terrain mode, see discussion here: https://github.com/mapbox/mapbox-gl-js/issues/12040
        const center = lngLatToWorld([longitude, latitude]);
        const dx = cameraX - center[0];
        const dy = cameraY - center[1];
        const cameraToCenterDistanceGround = Math.sqrt(dx * dx + dy * dy);
        const pitchRadians = pitch * DEGREES_TO_RADIANS;
        const altitudePixels = 1.5 * height;
        const scale = pitchRadians < 0.001
            ? // Pitch angle too small to deduce the look at point, assume elevation is 0
                (altitudePixels * Math.cos(pitchRadians)) / cameraZ
            : (altitudePixels * Math.sin(pitchRadians)) / cameraToCenterDistanceGround;
        viewState.zoom = Math.log2(scale);
        const cameraZFromSurface = (altitudePixels * Math.cos(pitchRadians)) / scale;
        const surfaceElevation = cameraZ - cameraZFromSurface;
        viewState.position = [0, 0, surfaceElevation / unitsPerMeter(latitude)];
    }
    // @ts-ignore transform is not typed
    else if (typeof map.transform.elevation === 'number') {
        // maplibre-gl
        // @ts-ignore transform is not typed
        viewState.position = [0, 0, map.transform.elevation];
    }
}
function getViewport(deck, map, renderParameters) {
    const viewState = getViewState(map);
    const view = getDefaultView(map);
    if (renderParameters) {
        // Called from MapboxLayer.render
        // Magic number, matches mapbox-gl@>=1.3.0's projection matrix
        view.props.nearZMultiplier = 0.2;
    }
    // Get the base map near/far plane
    // renderParameters is maplibre API but not mapbox
    // Transform is not an official API, properties could be undefined for older versions
    const nearZ = renderParameters?.nearZ ?? map.transform._nearZ;
    const farZ = renderParameters?.farZ ?? map.transform._farZ;
    if (Number.isFinite(nearZ)) {
        viewState.nearZ = nearZ / map.transform.height;
        viewState.farZ = farZ / map.transform.height;
    }
    // Otherwise fallback to default calculation using nearZMultiplier/farZMultiplier
    return view.makeViewport({
        width: deck.width,
        height: deck.height,
        viewState
    });
}
function afterRender(deck, map) {
    const { mapboxLayers, isExternal } = deck.userData;
    if (isExternal) {
        // Draw non-Mapbox layers
        const mapboxLayerIds = Array.from(mapboxLayers, layer => layer.id);
        const deckLayers = flatten(deck.props.layers, Boolean);
        const hasNonMapboxLayers = deckLayers.some(layer => layer && !mapboxLayerIds.includes(layer.id));
        let viewports = deck.getViewports();
        const mapboxViewportIdx = viewports.findIndex(vp => vp.id === 'mapbox');
        const hasNonMapboxViews = viewports.length > 1 || mapboxViewportIdx < 0;
        if (hasNonMapboxLayers || hasNonMapboxViews) {
            if (mapboxViewportIdx >= 0) {
                viewports = viewports.slice();
                viewports[mapboxViewportIdx] = getViewport(deck, map);
            }
            deck._drawLayers('mapbox-repaint', {
                viewports,
                layerFilter: params => (!deck.props.layerFilter || deck.props.layerFilter(params)) &&
                    (params.viewport.id !== 'mapbox' || !mapboxLayerIds.includes(params.layer.id)),
                clearCanvas: false
            });
        }
    }
    // End of render cycle, clear generated viewport
    deck.userData.currentViewport = null;
}
function onMapMove(deck, map) {
    deck.setProps({
        viewState: getViewState(map)
    });
    // Camera changed, will trigger a map repaint right after this
    // Clear any change flag triggered by setting viewState so that deck does not request
    // a second repaint
    deck.needsRedraw({ clearRedrawFlags: true });
}
function updateLayers(deck) {
    if (deck.userData.isExternal) {
        return;
    }
    const layers = [];
    deck.userData.mapboxLayers.forEach(deckLayer => {
        const LayerType = deckLayer.props.type;
        const layer = new LayerType(deckLayer.props);
        layers.push(layer);
    });
    deck.setProps({ layers });
}
//# sourceMappingURL=deck-utils.js.map