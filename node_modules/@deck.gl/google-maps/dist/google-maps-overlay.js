// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/* global google */
import { GL } from '@luma.gl/constants';
import { WebGLDevice } from '@luma.gl/webgl';
import { createDeckInstance, destroyDeckInstance, getViewPropsFromOverlay, getViewPropsFromCoordinateTransformer } from "./utils.js";
const HIDE_ALL_LAYERS = () => false;
const GL_STATE = {
    depthMask: true,
    depthTest: true,
    blend: true,
    blendFunc: [770, 771, 1, 771],
    blendEquation: 32774
};
// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }
const defaultProps = {
    interleaved: true
};
export default class GoogleMapsOverlay {
    constructor(props) {
        this.props = {};
        this._map = null;
        this._deck = null;
        this._overlay = null;
        this.setProps({ ...defaultProps, ...props });
    }
    /* Public API */
    /** Add/remove the overlay from a map. */
    setMap(map) {
        if (map === this._map) {
            return;
        }
        const { VECTOR, UNINITIALIZED } = google.maps.RenderingType;
        if (this._map) {
            if (!map && this._map.getRenderingType() === VECTOR && this.props.interleaved) {
                this._overlay.requestRedraw();
            }
            this._overlay?.setMap(null);
            this._map = null;
        }
        if (map) {
            this._map = map;
            const renderingType = map.getRenderingType();
            if (renderingType !== UNINITIALIZED) {
                this._createOverlay(map);
            }
            else {
                map.addListener('renderingtype_changed', () => {
                    this._createOverlay(map);
                });
            }
        }
    }
    /**
     * Update (partial) props.
     */
    setProps(props) {
        Object.assign(this.props, props);
        if (this._deck) {
            const canvas = this._deck.getCanvas();
            if (props.style && canvas?.parentElement) {
                const parentStyle = canvas.parentElement.style;
                Object.assign(parentStyle, props.style);
                props.style = null;
            }
            this._deck.setProps(props);
        }
    }
    /** Equivalent of `deck.pickObject`. */
    pickObject(params) {
        return this._deck && this._deck.pickObject(params);
    }
    /** Equivalent of `deck.pickObjects`.  */
    pickMultipleObjects(params) {
        return this._deck && this._deck.pickMultipleObjects(params);
    }
    /** Equivalent of `deck.pickMultipleObjects`. */
    pickObjects(params) {
        return this._deck && this._deck.pickObjects(params);
    }
    /** Remove the overlay and release all underlying resources. */
    finalize() {
        this.setMap(null);
        if (this._deck) {
            destroyDeckInstance(this._deck);
            this._deck = null;
        }
    }
    /* Private API */
    _createOverlay(map) {
        const { interleaved } = this.props;
        const { VECTOR, UNINITIALIZED } = google.maps.RenderingType;
        const renderingType = map.getRenderingType();
        if (renderingType === UNINITIALIZED) {
            return;
        }
        const isVectorMap = renderingType === VECTOR && google.maps.WebGLOverlayView;
        const OverlayView = isVectorMap ? google.maps.WebGLOverlayView : google.maps.OverlayView;
        const overlay = new OverlayView();
        if (overlay instanceof google.maps.WebGLOverlayView) {
            if (interleaved) {
                overlay.onAdd = noop;
                overlay.onContextRestored = this._onContextRestored.bind(this);
                overlay.onDraw = this._onDrawVectorInterleaved.bind(this);
            }
            else {
                overlay.onAdd = this._onAdd.bind(this);
                overlay.onContextRestored = noop;
                overlay.onDraw = this._onDrawVectorOverlay.bind(this);
            }
            overlay.onContextLost = this._onContextLost.bind(this);
        }
        else {
            overlay.onAdd = this._onAdd.bind(this);
            overlay.draw = this._onDrawRaster.bind(this);
        }
        overlay.onRemove = this._onRemove.bind(this);
        this._overlay = overlay;
        this._overlay.setMap(map);
    }
    _onAdd() {
        // @ts-ignore (TS2345) map is defined at this stage
        this._deck = createDeckInstance(this._map, this._overlay, this._deck, this.props);
    }
    _onContextRestored({ gl }) {
        if (!this._map || !this._overlay) {
            return;
        }
        const _customRender = () => {
            if (this._overlay) {
                this._overlay.requestRedraw();
            }
        };
        const deck = createDeckInstance(this._map, this._overlay, this._deck, {
            gl,
            _customRender,
            ...this.props
        });
        this._deck = deck;
        // By default, animationLoop._renderFrame invokes
        // animationLoop.onRender. We override this to wrap
        // in withParameters so we don't modify the GL state
        // @ts-ignore accessing protected member
        const animationLoop = deck.animationLoop;
        animationLoop._renderFrame = () => {
            const ab = gl.getParameter(34964);
            // @ts-expect-error accessing protected member
            const device = deck.device;
            device.withParametersWebGL({}, () => {
                animationLoop.props.onRender(animationLoop.animationProps);
            });
            gl.bindBuffer(34962, ab);
        };
    }
    _onContextLost() {
        // TODO this isn't working
        if (this._deck) {
            destroyDeckInstance(this._deck);
            this._deck = null;
        }
    }
    _onRemove() {
        this._deck?.setProps({ layerFilter: HIDE_ALL_LAYERS });
    }
    _onDrawRaster() {
        if (!this._deck || !this._map) {
            return;
        }
        const deck = this._deck;
        const { width, height, left, top, ...rest } = getViewPropsFromOverlay(this._map, this._overlay);
        const canvas = deck.getCanvas();
        const parent = canvas?.parentElement || deck.props.parent;
        if (parent) {
            const parentStyle = parent.style;
            parentStyle.left = `${left}px`;
            parentStyle.top = `${top}px`;
        }
        const altitude = 10000;
        deck.setProps({
            width,
            height,
            // @ts-expect-error altitude is accepted by WebMercatorViewport but not exposed by type
            viewState: { altitude, ...rest }
        });
        // Deck is initialized
        deck.redraw();
    }
    // Vector code path
    _onDrawVectorInterleaved({ gl, transformer }) {
        if (!this._deck || !this._map) {
            return;
        }
        const deck = this._deck;
        deck.setProps({
            ...getViewPropsFromCoordinateTransformer(this._map, transformer),
            // Using external gl context - do not set css size
            width: null,
            height: null
        });
        if (deck.isInitialized) {
            // @ts-expect-error
            const device = deck.device;
            // As an optimization, some renders are to an separate framebuffer
            // which we need to pass onto deck
            if (device instanceof WebGLDevice) {
                const _framebuffer = device.getParametersWebGL(36006);
                deck.setProps({ _framebuffer });
            }
            // With external gl context, animation loop doesn't resize webgl-canvas and thus fails to
            // calculate corrext pixel ratio. Force this manually.
            device.getDefaultCanvasContext().resize();
            // Camera changed, will trigger a map repaint right after this
            // Clear any change flag triggered by setting viewState so that deck does not request
            // a second repaint
            deck.needsRedraw({ clearRedrawFlags: true });
            // Workaround for bug in Google maps where viewport state is wrong
            // TODO remove once fixed
            if (device instanceof WebGLDevice) {
                device.setParametersWebGL({
                    viewport: [0, 0, gl.canvas.width, gl.canvas.height],
                    scissor: [0, 0, gl.canvas.width, gl.canvas.height],
                    stencilFunc: [519, 0, 255, 519, 0, 255]
                });
                device.withParametersWebGL(GL_STATE, () => {
                    deck._drawLayers('google-vector', {
                        clearCanvas: false
                    });
                });
            }
        }
    }
    _onDrawVectorOverlay({ transformer }) {
        if (!this._deck || !this._map) {
            return;
        }
        const deck = this._deck;
        deck.setProps({
            ...getViewPropsFromCoordinateTransformer(this._map, transformer)
        });
        deck.redraw();
    }
}
//# sourceMappingURL=google-maps-overlay.js.map