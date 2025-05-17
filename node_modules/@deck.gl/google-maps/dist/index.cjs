"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  GoogleMapsOverlay: () => GoogleMapsOverlay
});
module.exports = __toCommonJS(dist_exports);

// dist/google-maps-overlay.js
var import_constants = require("@luma.gl/constants");
var import_webgl = require("@luma.gl/webgl");

// dist/utils.js
var import_core = require("@deck.gl/core");
var import_core2 = require("@math.gl/core");
var MAX_LATITUDE = 85.05113;
function createDeckInstance(map, overlay, deck, props) {
  if (deck) {
    if (deck.userData._googleMap === map) {
      return deck;
    }
    destroyDeckInstance(deck);
  }
  const eventListeners = {
    click: null,
    rightclick: null,
    dblclick: null,
    mousemove: null,
    mouseout: null
  };
  const newDeck = new import_core.Deck({
    ...props,
    useDevicePixels: props.interleaved ? true : props.useDevicePixels,
    style: props.interleaved ? null : { pointerEvents: "none" },
    parent: getContainer(overlay, props.style),
    views: new import_core.MapView({ repeat: true }),
    initialViewState: {
      longitude: 0,
      latitude: 0,
      zoom: 1
    },
    controller: false
  });
  for (const eventType in eventListeners) {
    eventListeners[eventType] = map.addListener(eventType, (evt) => handleMouseEvent(newDeck, eventType, evt));
  }
  newDeck.userData._googleMap = map;
  newDeck.userData._eventListeners = eventListeners;
  return newDeck;
}
function getContainer(overlay, style) {
  var _a, _b;
  const container = document.createElement("div");
  container.style.position = "absolute";
  Object.assign(container.style, style);
  if ("getPanes" in overlay) {
    (_a = overlay.getPanes()) == null ? void 0 : _a.overlayLayer.appendChild(container);
  } else {
    (_b = overlay.getMap()) == null ? void 0 : _b.getDiv().appendChild(container);
  }
  return container;
}
function destroyDeckInstance(deck) {
  const { _eventListeners: eventListeners } = deck.userData;
  for (const eventType in eventListeners) {
    if (eventListeners[eventType]) {
      eventListeners[eventType].remove();
    }
  }
  deck.finalize();
}
function getViewPropsFromOverlay(map, overlay) {
  const { width, height } = getMapSize(map);
  const projection = overlay.getProjection();
  const bounds = map.getBounds();
  if (!bounds) {
    return { width, height, left: 0, top: 0 };
  }
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  const topRight = projection.fromLatLngToDivPixel(ne);
  const bottomLeft = projection.fromLatLngToDivPixel(sw);
  const centerLngLat = pixelToLngLat(projection, width / 2, height / 2);
  const centerH = new google.maps.LatLng(0, centerLngLat[0]);
  const centerContainerPx = projection.fromLatLngToContainerPixel(centerH);
  const centerDivPx = projection.fromLatLngToDivPixel(centerH);
  if (!topRight || !bottomLeft || !centerDivPx || !centerContainerPx) {
    return { width, height, left: 0, top: 0 };
  }
  const leftOffset = Math.round(centerDivPx.x - centerContainerPx.x);
  let topOffset = centerDivPx.y - centerContainerPx.y;
  const topLngLat = pixelToLngLat(projection, width / 2, 0);
  const bottomLngLat = pixelToLngLat(projection, width / 2, height);
  let latitude = centerLngLat[1];
  const longitude = centerLngLat[0];
  if (Math.abs(latitude) > MAX_LATITUDE) {
    latitude = latitude > 0 ? MAX_LATITUDE : -MAX_LATITUDE;
    const center = new google.maps.LatLng(latitude, longitude);
    const centerPx = projection.fromLatLngToContainerPixel(center);
    topOffset += centerPx.y - height / 2;
  }
  topOffset = Math.round(topOffset);
  const delta = new import_core2.Vector2(topLngLat).sub(bottomLngLat);
  let bearing = 180 * delta.verticalAngle() / Math.PI;
  if (bearing < 0)
    bearing += 360;
  const heading = map.getHeading() || 0;
  let zoom = map.getZoom() - 1;
  let scale;
  if (bearing === 0) {
    scale = height ? (bottomLeft.y - topRight.y) / height : 1;
  } else if (bearing === heading) {
    const viewDiagonal = new import_core2.Vector2([topRight.x, topRight.y]).sub([bottomLeft.x, bottomLeft.y]).len();
    const mapDiagonal = new import_core2.Vector2([width, -height]).len();
    scale = mapDiagonal ? viewDiagonal / mapDiagonal : 1;
  }
  zoom += Math.log2(scale || 1);
  return {
    width,
    height,
    left: leftOffset,
    top: topOffset,
    zoom,
    bearing,
    pitch: map.getTilt(),
    latitude,
    longitude
  };
}
function getViewPropsFromCoordinateTransformer(map, transformer) {
  const { width, height } = getMapSize(map);
  const { center, heading: bearing, tilt: pitch, zoom } = transformer.getCameraParams();
  const fovy = 25;
  const aspect = height ? width / height : 1;
  const near = 0.75;
  const far = 3e14;
  const projectionMatrix = new import_core2.Matrix4().perspective({
    fovy: fovy * Math.PI / 180,
    aspect,
    near,
    far
  });
  const focalDistance = 0.5 * projectionMatrix[5];
  return {
    width,
    height,
    viewState: {
      altitude: focalDistance,
      bearing,
      latitude: center.lat(),
      longitude: center.lng(),
      pitch,
      projectionMatrix,
      repeat: true,
      zoom: zoom - 1
    }
  };
}
function getMapSize(map) {
  const container = map.getDiv().firstChild;
  return {
    // @ts-ignore (TS2531) Object is possibly 'null'
    width: container.offsetWidth,
    // @ts-ignore (TS2531) Object is possibly 'null'
    height: container.offsetHeight
  };
}
function pixelToLngLat(projection, x, y) {
  const point = new google.maps.Point(x, y);
  const latLng = projection.fromContainerPixelToLatLng(point);
  return [latLng.lng(), latLng.lat()];
}
function getEventPixel(event, deck) {
  if (event.pixel) {
    return event.pixel;
  }
  const point = deck.getViewports()[0].project([event.latLng.lng(), event.latLng.lat()]);
  return {
    x: point[0],
    y: point[1]
  };
}
function handleMouseEvent(deck, type, event) {
  if (!deck.isInitialized) {
    return;
  }
  const mockEvent = {
    type,
    offsetCenter: getEventPixel(event, deck),
    srcEvent: event
  };
  switch (type) {
    case "click":
    case "rightclick":
      mockEvent.type = "click";
      mockEvent.tapCount = 1;
      deck._onPointerDown(mockEvent);
      deck._onEvent(mockEvent);
      break;
    case "dblclick":
      mockEvent.type = "click";
      mockEvent.tapCount = 2;
      deck._onEvent(mockEvent);
      break;
    case "mousemove":
      mockEvent.type = "pointermove";
      deck._onPointerMove(mockEvent);
      break;
    case "mouseout":
      mockEvent.type = "pointerleave";
      deck._onPointerMove(mockEvent);
      break;
    default:
      return;
  }
}

// dist/google-maps-overlay.js
var HIDE_ALL_LAYERS = () => false;
var GL_STATE = {
  depthMask: true,
  depthTest: true,
  blend: true,
  blendFunc: [770, 771, 1, 771],
  blendEquation: 32774
};
function noop() {
}
var defaultProps = {
  interleaved: true
};
var GoogleMapsOverlay = class {
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
    var _a;
    if (map === this._map) {
      return;
    }
    const { VECTOR, UNINITIALIZED } = google.maps.RenderingType;
    if (this._map) {
      if (!map && this._map.getRenderingType() === VECTOR && this.props.interleaved) {
        this._overlay.requestRedraw();
      }
      (_a = this._overlay) == null ? void 0 : _a.setMap(null);
      this._map = null;
    }
    if (map) {
      this._map = map;
      const renderingType = map.getRenderingType();
      if (renderingType !== UNINITIALIZED) {
        this._createOverlay(map);
      } else {
        map.addListener("renderingtype_changed", () => {
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
      if (props.style && (canvas == null ? void 0 : canvas.parentElement)) {
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
      } else {
        overlay.onAdd = this._onAdd.bind(this);
        overlay.onContextRestored = noop;
        overlay.onDraw = this._onDrawVectorOverlay.bind(this);
      }
      overlay.onContextLost = this._onContextLost.bind(this);
    } else {
      overlay.onAdd = this._onAdd.bind(this);
      overlay.draw = this._onDrawRaster.bind(this);
    }
    overlay.onRemove = this._onRemove.bind(this);
    this._overlay = overlay;
    this._overlay.setMap(map);
  }
  _onAdd() {
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
    const animationLoop = deck.animationLoop;
    animationLoop._renderFrame = () => {
      const ab = gl.getParameter(34964);
      const device = deck.device;
      device.withParametersWebGL({}, () => {
        animationLoop.props.onRender(animationLoop.animationProps);
      });
      gl.bindBuffer(34962, ab);
    };
  }
  _onContextLost() {
    if (this._deck) {
      destroyDeckInstance(this._deck);
      this._deck = null;
    }
  }
  _onRemove() {
    var _a;
    (_a = this._deck) == null ? void 0 : _a.setProps({ layerFilter: HIDE_ALL_LAYERS });
  }
  _onDrawRaster() {
    if (!this._deck || !this._map) {
      return;
    }
    const deck = this._deck;
    const { width, height, left, top, ...rest } = getViewPropsFromOverlay(this._map, this._overlay);
    const canvas = deck.getCanvas();
    const parent = (canvas == null ? void 0 : canvas.parentElement) || deck.props.parent;
    if (parent) {
      const parentStyle = parent.style;
      parentStyle.left = `${left}px`;
      parentStyle.top = `${top}px`;
    }
    const altitude = 1e4;
    deck.setProps({
      width,
      height,
      // @ts-expect-error altitude is accepted by WebMercatorViewport but not exposed by type
      viewState: { altitude, ...rest }
    });
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
      const device = deck.device;
      if (device instanceof import_webgl.WebGLDevice) {
        const _framebuffer = device.getParametersWebGL(36006);
        deck.setProps({ _framebuffer });
      }
      device.getDefaultCanvasContext().resize();
      deck.needsRedraw({ clearRedrawFlags: true });
      if (device instanceof import_webgl.WebGLDevice) {
        device.setParametersWebGL({
          viewport: [0, 0, gl.canvas.width, gl.canvas.height],
          scissor: [0, 0, gl.canvas.width, gl.canvas.height],
          stencilFunc: [519, 0, 255, 519, 0, 255]
        });
        device.withParametersWebGL(GL_STATE, () => {
          deck._drawLayers("google-vector", {
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
};
//# sourceMappingURL=index.cjs.map
