"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  DeckLayer: () => DeckLayer,
  DeckRenderer: () => DeckRenderer,
  loadArcGISModules: () => loadArcGISModules
});
module.exports = __toCommonJS(dist_exports);

// dist/deck-props.js
var properties = {
  layers: {},
  layerFilter: {},
  parameters: {},
  effects: {},
  pickingRadius: {},
  onBeforeRender: {},
  onAfterRender: {},
  onClick: {},
  onHover: {},
  onDragStart: {},
  onDrag: {},
  onDragEnd: {},
  onError: {},
  debug: {},
  drawPickingColors: {},
  getCursor: {},
  getTooltip: {}
};
function createDeckProps(Accessor2) {
  const DeckProps2 = Accessor2.createSubclass({
    properties,
    constructor() {
      this._callbacks = {};
      this.watch(Object.keys(properties), (newValue, oldValue, propName) => {
        this.emit("change", { [propName]: newValue });
      });
    },
    on(eventName, cb) {
      this._callbacks[eventName] = this._callbacks[eventName] || [];
      this._callbacks[eventName].push(cb);
    },
    emit(eventName, details) {
      const callbacks = this._callbacks[eventName];
      if (callbacks) {
        for (const cb of callbacks) {
          cb(details);
        }
      }
    },
    toJSON() {
      const result = {};
      for (const key of this.keys()) {
        if (this[key] !== void 0) {
          result[key] = this[key];
        }
      }
      return result;
    }
  });
  return DeckProps2;
}

// dist/deck-layer.js
function createDeckLayer(DeckProps2, Layer2, DeckLayerView2D2) {
  return Layer2.createSubclass({
    properties: {
      deck: {},
      blendMode: {},
      effect: {}
    },
    constructor() {
      this.deck = new DeckProps2();
    },
    // Called by the MapView whenever a layer view
    // needs to be created for a given layer.
    createLayerView(view) {
      if (view.type === "2d") {
        return new DeckLayerView2D2({
          view,
          layer: this
        });
      }
      console.error("DeckLayer does not support SceneView at the moment. Use DeckRenderer instead.");
      return null;
    }
  });
}

// dist/commons.js
var import_constants = require("@luma.gl/constants");
var import_core = require("@deck.gl/core");
var import_engine = require("@luma.gl/engine");
var import_webgl = require("@luma.gl/webgl");
async function createDeckInstance(gl) {
  return new Promise((resolve) => {
    const deckInstance = new import_core.Deck({
      // Input is handled by the ArcGIS API for JavaScript.
      controller: false,
      // We use the same WebGL context as the ArcGIS API for JavaScript.
      gl,
      // We need depth testing in general; we don't know what layers might be added to the deck.
      parameters: {
        depthCompare: "less-equal"
      },
      // To disable canvas resizing, since the FBO is owned by the ArcGIS API for JavaScript.
      width: null,
      height: null,
      onDeviceInitialized: (device) => {
        resolve({ deckInstance, device });
      }
    });
  });
}
async function initializeResources(gl) {
  const { deckInstance, device } = await createDeckInstance(gl);
  const texture = device.createTexture({
    format: "rgba8unorm",
    width: 1,
    height: 1,
    sampler: {
      minFilter: "linear",
      magFilter: "linear",
      addressModeU: "clamp-to-edge",
      addressModeV: "clamp-to-edge"
    }
  });
  const model = new import_engine.Model(device, {
    vs: `#version 300 es
in vec2 pos;
out vec2 v_texcoord;
void main(void) {
    gl_Position = vec4(pos, 0.0, 1.0);
    v_texcoord = (pos + 1.0) / 2.0;
}
    `,
    fs: `#version 300 es
precision mediump float;
uniform sampler2D deckglTexture;
in vec2 v_texcoord;
out vec4 fragColor;

void main(void) {
    vec4 imageColor = texture(deckglTexture, v_texcoord);
    imageColor.rgb *= imageColor.a;
    fragColor = imageColor;
}
    `,
    bindings: {
      deckglTexture: texture
    },
    parameters: {
      depthWriteEnabled: true,
      depthCompare: "less-equal",
      blendColorSrcFactor: "one",
      blendColorDstFactor: "one-minus-src-alpha",
      blendAlphaSrcFactor: "one",
      blendAlphaDstFactor: "one-minus-src-alpha",
      blendColorOperation: "add",
      blendAlphaOperation: "add"
    },
    geometry: new import_engine.Geometry({
      topology: "triangle-strip",
      attributes: {
        pos: { size: 2, value: new Int8Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, 1, 1, -1]) }
      }
    }),
    vertexCount: 6,
    disableWarnings: true
  });
  const fbo = device.createFramebuffer({
    id: "deckfbo",
    width: 1,
    height: 1,
    colorAttachments: [texture],
    depthStencilAttachment: "depth16unorm"
  });
  deckInstance.setProps({
    // This deck renders into an auxiliary framebuffer.
    _framebuffer: fbo,
    _customRender: (redrawReason) => {
      if (redrawReason === "arcgis") {
        deckInstance._drawLayers(redrawReason);
      } else {
        this.redraw();
      }
    }
  });
  return { deck: deckInstance, texture, fbo, model };
}
function render(resources, viewport) {
  const { model, deck, fbo } = resources;
  const device = model.device;
  if (device instanceof import_webgl.WebGLDevice) {
    const screenFbo = device.getParametersWebGL(36006);
    const { width, height, ...viewState } = viewport;
    const dpr = window.devicePixelRatio;
    const pixelWidth = Math.round(width * dpr);
    const pixelHeight = Math.round(height * dpr);
    fbo.resize({ width: pixelWidth, height: pixelHeight });
    deck.setProps({ viewState });
    deck.redraw("arcgis");
    const textureToScreenPass = device.beginRenderPass({
      framebuffer: screenFbo,
      parameters: { viewport: [0, 0, pixelWidth, pixelHeight] },
      clearColor: false,
      clearDepth: false
    });
    try {
      model.draw(textureToScreenPass);
    } finally {
      textureToScreenPass.end();
    }
  }
}
function finalizeResources(resources) {
  resources.deck.finalize();
  resources.model.destroy();
  resources.fbo.destroy();
  resources.texture.destroy();
}

// dist/deck-layer-view-2d.js
function createDeckLayerView2D(BaseLayerViewGL2D2) {
  return BaseLayerViewGL2D2.createSubclass({
    properties: {
      cancelInitialization: null,
      resources: null
    },
    // Attach is called as soon as the layer view is ready to start rendering.
    async attach() {
      const gl = this.context;
      let cancelled = false;
      this.cancelInitialization = () => cancelled = true;
      const resources = await initializeResources.call(this, gl);
      if (cancelled) {
        finalizeResources(resources);
        return;
      }
      this.resources = resources;
      this.layer.deck.on("change", (props) => resources.deck.setProps(props));
      resources.deck.setProps(this.layer.deck.toJSON());
    },
    redraw() {
      this.requestRender();
    },
    // Called when the layer must be destroyed.
    detach() {
      var _a;
      (_a = this.cancelInitialization) == null ? void 0 : _a.call(this);
      if (this.resources) {
        finalizeResources(this.resources);
        this.resources = null;
      }
    },
    // Called every time that the layer view must be rendered.
    render(renderParameters) {
      if (!this.resources) {
        return;
      }
      const [width, height] = this.view.state.size;
      const state = renderParameters.state;
      render(this.resources, {
        width,
        height,
        latitude: this.view.center.latitude,
        longitude: this.view.center.longitude,
        zoom: this.view.featuresTilingScheme.scaleToLevel(state.scale),
        bearing: -state.rotation,
        pitch: 0
      });
    }
  });
}

// dist/deck-renderer.js
function arcgisFOVToDeckAltitude(fov, aspectRatio) {
  const D = Math.sqrt(1 + aspectRatio ** 2);
  const halfFOV = fov / 2 / 180 * Math.PI;
  return D / 2 / Math.tan(halfFOV);
}
function createDeckRenderer(DeckProps2, externalRenderers2) {
  class DeckRenderer2 {
    constructor(view, props) {
      this.resources = null;
      this.cancelInitialization = null;
      this.view = view;
      this.deck = new DeckProps2(props);
    }
    async setup(context) {
      const gl = context.gl;
      let cancelled = false;
      this.cancelInitialization = () => cancelled = true;
      const resources = await initializeResources.call(this, gl);
      if (cancelled) {
        finalizeResources(resources);
        return;
      }
      this.deck.on("change", (props) => resources.deck.setProps(props));
      resources.deck.setProps(this.deck.toJSON());
      this.resources = resources;
    }
    dispose() {
      var _a;
      (_a = this.cancelInitialization) == null ? void 0 : _a.call(this);
      if (this.resources) {
        finalizeResources(this.resources);
      }
    }
    redraw() {
      externalRenderers2.requestRender(this.view);
    }
    render() {
      const [width, height] = this.view.size;
      render(this.resources, {
        width,
        height,
        latitude: this.view.center.latitude,
        longitude: this.view.center.longitude,
        altitude: arcgisFOVToDeckAltitude(this.view.camera.fov, width / height),
        zoom: this.view.zoom,
        bearing: this.view.camera.heading,
        pitch: this.view.camera.tilt
      });
    }
  }
  return DeckRenderer2;
}

// dist/index.js
var import_Accessor = __toESM(require("@arcgis/core/core/Accessor"), 1);
var import_Layer = __toESM(require("@arcgis/core/layers/Layer"), 1);
var import_BaseLayerViewGL2D = __toESM(require("@arcgis/core/views/2d/layers/BaseLayerViewGL2D"), 1);
var externalRenderers = __toESM(require("@arcgis/core/views/3d/externalRenderers"), 1);

// dist/load-modules.js
var import_esri_loader = require("esri-loader");
var arcGIS;
async function loadArcGISModules(modules, loadScriptOptions) {
  const namespace = Array.isArray(modules) ? null : modules;
  await loadArcGISModule(namespace, loadScriptOptions);
  if (Array.isArray(modules)) {
    return (0, import_esri_loader.loadModules)(modules, loadScriptOptions).then((array) => {
      return { ...arcGIS, modules: array };
    });
  }
  return arcGIS;
}
async function loadArcGISModule(esri, loadScriptOptions) {
  if (arcGIS) {
    return arcGIS;
  }
  if (esri) {
    const Layer3 = esri.layers.Layer;
    const Accessor3 = esri.core.Accessor;
    const BaseLayerViewGL2D3 = esri.views["2d"].layers.BaseLayerViewGL2D;
    const externalRenderers3 = esri.views["3d"].externalRenderers;
    return initialize(Layer3, Accessor3, BaseLayerViewGL2D3, externalRenderers3);
  }
  const [Layer2, Accessor2, BaseLayerViewGL2D2, externalRenderers2] = await (0, import_esri_loader.loadModules)([
    "esri/layers/Layer",
    "esri/core/Accessor",
    "esri/views/2d/layers/BaseLayerViewGL2D",
    "esri/views/3d/externalRenderers"
  ], loadScriptOptions);
  return initialize(Layer2, Accessor2, BaseLayerViewGL2D2, externalRenderers2);
}
function initialize(Layer2, Accessor2, BaseLayerViewGL2D2, externalRenderers2) {
  const DeckProps2 = createDeckProps(Accessor2);
  const DeckLayerView2D2 = createDeckLayerView2D(BaseLayerViewGL2D2);
  const DeckLayer2 = createDeckLayer(DeckProps2, Layer2, DeckLayerView2D2);
  const DeckRenderer2 = createDeckRenderer(DeckProps2, externalRenderers2);
  arcGIS = { DeckLayer: DeckLayer2, DeckRenderer: DeckRenderer2 };
  return arcGIS;
}

// dist/index.js
var DeckProps = createDeckProps(import_Accessor.default);
var DeckLayerView2D = createDeckLayerView2D(import_BaseLayerViewGL2D.default);
var DeckLayer = createDeckLayer(DeckProps, import_Layer.default, DeckLayerView2D);
var DeckRenderer = createDeckRenderer(DeckProps, externalRenderers);
//# sourceMappingURL=index.cjs.map
