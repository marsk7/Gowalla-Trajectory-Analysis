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
  ScenegraphLayer: () => scenegraph_layer_default,
  SimpleMeshLayer: () => simple_mesh_layer_default
});
module.exports = __toCommonJS(dist_exports);

// dist/simple-mesh-layer/simple-mesh-layer.js
var import_core2 = require("@deck.gl/core");
var import_core3 = require("@luma.gl/core");
var import_engine = require("@luma.gl/engine");
var import_shadertools = require("@luma.gl/shadertools");

// dist/utils/matrix.js
var import_core = require("@deck.gl/core");
var RADIAN_PER_DEGREE = Math.PI / 180;
var modelMatrix = new Float32Array(16);
var valueArray = new Float32Array(12);
function calculateTransformMatrix(targetMatrix, orientation, scale) {
  const pitch = orientation[0] * RADIAN_PER_DEGREE;
  const yaw = orientation[1] * RADIAN_PER_DEGREE;
  const roll = orientation[2] * RADIAN_PER_DEGREE;
  const sr = Math.sin(roll);
  const sp = Math.sin(pitch);
  const sw = Math.sin(yaw);
  const cr = Math.cos(roll);
  const cp = Math.cos(pitch);
  const cw = Math.cos(yaw);
  const scx = scale[0];
  const scy = scale[1];
  const scz = scale[2];
  targetMatrix[0] = scx * cw * cp;
  targetMatrix[1] = scx * sw * cp;
  targetMatrix[2] = scx * -sp;
  targetMatrix[3] = scy * (-sw * cr + cw * sp * sr);
  targetMatrix[4] = scy * (cw * cr + sw * sp * sr);
  targetMatrix[5] = scy * cp * sr;
  targetMatrix[6] = scz * (sw * sr + cw * sp * cr);
  targetMatrix[7] = scz * (-cw * sr + sw * sp * cr);
  targetMatrix[8] = scz * cp * cr;
}
function getExtendedMat3FromMat4(mat4) {
  mat4[0] = mat4[0];
  mat4[1] = mat4[1];
  mat4[2] = mat4[2];
  mat4[3] = mat4[4];
  mat4[4] = mat4[5];
  mat4[5] = mat4[6];
  mat4[6] = mat4[8];
  mat4[7] = mat4[9];
  mat4[8] = mat4[10];
  mat4[9] = mat4[12];
  mat4[10] = mat4[13];
  mat4[11] = mat4[14];
  return mat4.subarray(0, 12);
}
var MATRIX_ATTRIBUTES = {
  size: 12,
  accessor: ["getOrientation", "getScale", "getTranslation", "getTransformMatrix"],
  shaderAttributes: {
    instanceModelMatrixCol0: {
      size: 3,
      elementOffset: 0
    },
    instanceModelMatrixCol1: {
      size: 3,
      elementOffset: 3
    },
    instanceModelMatrixCol2: {
      size: 3,
      elementOffset: 6
    },
    instanceTranslation: {
      size: 3,
      elementOffset: 9
    }
  },
  update(attribute, { startRow, endRow }) {
    const { data, getOrientation, getScale, getTranslation, getTransformMatrix } = this.props;
    const arrayMatrix = Array.isArray(getTransformMatrix);
    const constantMatrix = arrayMatrix && getTransformMatrix.length === 16;
    const constantScale = Array.isArray(getScale);
    const constantOrientation = Array.isArray(getOrientation);
    const constantTranslation = Array.isArray(getTranslation);
    const hasMatrix = constantMatrix || !arrayMatrix && Boolean(getTransformMatrix(data[0]));
    if (hasMatrix) {
      attribute.constant = constantMatrix;
    } else {
      attribute.constant = constantOrientation && constantScale && constantTranslation;
    }
    const instanceModelMatrixData = attribute.value;
    if (attribute.constant) {
      let matrix;
      if (hasMatrix) {
        modelMatrix.set(getTransformMatrix);
        matrix = getExtendedMat3FromMat4(modelMatrix);
      } else {
        matrix = valueArray;
        const orientation = getOrientation;
        const scale = getScale;
        calculateTransformMatrix(matrix, orientation, scale);
        matrix.set(getTranslation, 9);
      }
      attribute.value = new Float32Array(matrix);
    } else {
      let i = startRow * attribute.size;
      const { iterable, objectInfo } = (0, import_core.createIterable)(data, startRow, endRow);
      for (const object of iterable) {
        objectInfo.index++;
        let matrix;
        if (hasMatrix) {
          modelMatrix.set(constantMatrix ? getTransformMatrix : getTransformMatrix(object, objectInfo));
          matrix = getExtendedMat3FromMat4(modelMatrix);
        } else {
          matrix = valueArray;
          const orientation = constantOrientation ? getOrientation : getOrientation(object, objectInfo);
          const scale = constantScale ? getScale : getScale(object, objectInfo);
          calculateTransformMatrix(matrix, orientation, scale);
          matrix.set(constantTranslation ? getTranslation : getTranslation(object, objectInfo), 9);
        }
        instanceModelMatrixData[i++] = matrix[0];
        instanceModelMatrixData[i++] = matrix[1];
        instanceModelMatrixData[i++] = matrix[2];
        instanceModelMatrixData[i++] = matrix[3];
        instanceModelMatrixData[i++] = matrix[4];
        instanceModelMatrixData[i++] = matrix[5];
        instanceModelMatrixData[i++] = matrix[6];
        instanceModelMatrixData[i++] = matrix[7];
        instanceModelMatrixData[i++] = matrix[8];
        instanceModelMatrixData[i++] = matrix[9];
        instanceModelMatrixData[i++] = matrix[10];
        instanceModelMatrixData[i++] = matrix[11];
      }
    }
  }
};
function shouldComposeModelMatrix(viewport, coordinateSystem) {
  return coordinateSystem === import_core.COORDINATE_SYSTEM.CARTESIAN || coordinateSystem === import_core.COORDINATE_SYSTEM.METER_OFFSETS || coordinateSystem === import_core.COORDINATE_SYSTEM.DEFAULT && !viewport.isGeospatial;
}

// dist/simple-mesh-layer/simple-mesh-layer-uniforms.js
var uniformBlock = `uniform simpleMeshUniforms {
  float sizeScale;
  bool composeModelMatrix;
  bool hasTexture;
  bool flatShading;
} simpleMesh;
`;
var simpleMeshUniforms = {
  name: "simpleMesh",
  vs: uniformBlock,
  fs: uniformBlock,
  uniformTypes: {
    sizeScale: "f32",
    composeModelMatrix: "f32",
    hasTexture: "f32",
    flatShading: "f32"
  }
};

// dist/simple-mesh-layer/simple-mesh-layer-vertex.glsl.js
var simple_mesh_layer_vertex_glsl_default = `#version 300 es
#define SHADER_NAME simple-mesh-layer-vs
in vec3 positions;
in vec3 normals;
in vec3 colors;
in vec2 texCoords;
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceColors;
in vec3 instancePickingColors;
in vec3 instanceModelMatrixCol0;
in vec3 instanceModelMatrixCol1;
in vec3 instanceModelMatrixCol2;
in vec3 instanceTranslation;
out vec2 vTexCoord;
out vec3 cameraPosition;
out vec3 normals_commonspace;
out vec4 position_commonspace;
out vec4 vColor;
void main(void) {
geometry.worldPosition = instancePositions;
geometry.uv = texCoords;
geometry.pickingColor = instancePickingColors;
vTexCoord = texCoords;
cameraPosition = project.cameraPosition;
vColor = vec4(colors * instanceColors.rgb, instanceColors.a);
mat3 instanceModelMatrix = mat3(instanceModelMatrixCol0, instanceModelMatrixCol1, instanceModelMatrixCol2);
vec3 pos = (instanceModelMatrix * positions) * simpleMesh.sizeScale + instanceTranslation;
if (simpleMesh.composeModelMatrix) {
DECKGL_FILTER_SIZE(pos, geometry);
normals_commonspace = project_normal(instanceModelMatrix * normals);
geometry.worldPosition += pos;
gl_Position = project_position_to_clipspace(pos + instancePositions, instancePositions64Low, vec3(0.0), position_commonspace);
geometry.position = position_commonspace;
}
else {
pos = project_size(pos);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, pos, position_commonspace);
geometry.position = position_commonspace;
normals_commonspace = project_normal(instanceModelMatrix * normals);
}
geometry.normal = normals_commonspace;
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;

// dist/simple-mesh-layer/simple-mesh-layer-fragment.glsl.js
var simple_mesh_layer_fragment_glsl_default = `#version 300 es
#define SHADER_NAME simple-mesh-layer-fs
precision highp float;
uniform sampler2D sampler;
in vec2 vTexCoord;
in vec3 cameraPosition;
in vec3 normals_commonspace;
in vec4 position_commonspace;
in vec4 vColor;
out vec4 fragColor;
void main(void) {
geometry.uv = vTexCoord;
vec3 normal;
if (simpleMesh.flatShading) {
normal = normalize(cross(dFdx(position_commonspace.xyz), dFdy(position_commonspace.xyz)));
} else {
normal = normals_commonspace;
}
vec4 color = simpleMesh.hasTexture ? texture(sampler, vTexCoord) : vColor;
DECKGL_FILTER_COLOR(color, geometry);
vec3 lightColor = lighting_getLightColor(color.rgb, cameraPosition, position_commonspace.xyz, normal);
fragColor = vec4(lightColor, color.a * layer.opacity);
}
`;

// dist/simple-mesh-layer/simple-mesh-layer.js
var import_schema = require("@loaders.gl/schema");
function normalizeGeometryAttributes(attributes) {
  const positionAttribute = attributes.positions || attributes.POSITION;
  import_core2.log.assert(positionAttribute, 'no "postions" or "POSITION" attribute in mesh');
  const vertexCount = positionAttribute.value.length / positionAttribute.size;
  let colorAttribute = attributes.COLOR_0 || attributes.colors;
  if (!colorAttribute) {
    colorAttribute = { size: 3, value: new Float32Array(vertexCount * 3).fill(1) };
  }
  let normalAttribute = attributes.NORMAL || attributes.normals;
  if (!normalAttribute) {
    normalAttribute = { size: 3, value: new Float32Array(vertexCount * 3).fill(0) };
  }
  let texCoordAttribute = attributes.TEXCOORD_0 || attributes.texCoords;
  if (!texCoordAttribute) {
    texCoordAttribute = { size: 2, value: new Float32Array(vertexCount * 2).fill(0) };
  }
  return {
    positions: positionAttribute,
    colors: colorAttribute,
    normals: normalAttribute,
    texCoords: texCoordAttribute
  };
}
function getGeometry(data) {
  if (data instanceof import_engine.Geometry) {
    data.attributes = normalizeGeometryAttributes(data.attributes);
    return data;
  } else if (data.attributes) {
    return new import_engine.Geometry({
      ...data,
      topology: "triangle-list",
      attributes: normalizeGeometryAttributes(data.attributes)
    });
  } else {
    return new import_engine.Geometry({
      topology: "triangle-list",
      attributes: normalizeGeometryAttributes(data)
    });
  }
}
var DEFAULT_COLOR = [0, 0, 0, 255];
var defaultProps = {
  mesh: { type: "object", value: null, async: true },
  texture: { type: "image", value: null, async: true },
  sizeScale: { type: "number", value: 1, min: 0 },
  // _instanced is a hack to use world position instead of meter offsets in mesh
  // TODO - formalize API
  _instanced: true,
  // NOTE(Tarek): Quick and dirty wireframe. Just draws
  // the same mesh with LINE_STRIPS. Won't follow edges
  // of the original mesh.
  wireframe: false,
  // Optional material for 'lighting' shader module
  material: true,
  getPosition: { type: "accessor", value: (x) => x.position },
  getColor: { type: "accessor", value: DEFAULT_COLOR },
  // yaw, pitch and roll are in degrees
  // https://en.wikipedia.org/wiki/Euler_angles
  // [pitch, yaw, roll]
  getOrientation: { type: "accessor", value: [0, 0, 0] },
  getScale: { type: "accessor", value: [1, 1, 1] },
  getTranslation: { type: "accessor", value: [0, 0, 0] },
  // 4x4 matrix
  getTransformMatrix: { type: "accessor", value: [] },
  textureParameters: { type: "object", ignore: true, value: null }
};
var SimpleMeshLayer = class extends import_core2.Layer {
  getShaders() {
    return super.getShaders({
      vs: simple_mesh_layer_vertex_glsl_default,
      fs: simple_mesh_layer_fragment_glsl_default,
      modules: [import_core2.project32, import_shadertools.phongMaterial, import_core2.picking, simpleMeshUniforms]
    });
  }
  getBounds() {
    var _a;
    if (this.props._instanced) {
      return super.getBounds();
    }
    let result = this.state.positionBounds;
    if (result) {
      return result;
    }
    const { mesh } = this.props;
    if (!mesh) {
      return null;
    }
    result = (_a = mesh.header) == null ? void 0 : _a.boundingBox;
    if (!result) {
      const { attributes } = getGeometry(mesh);
      attributes.POSITION = attributes.POSITION || attributes.positions;
      result = (0, import_schema.getMeshBoundingBox)(attributes);
    }
    this.state.positionBounds = result;
    return result;
  }
  initializeState() {
    const attributeManager = this.getAttributeManager();
    attributeManager.addInstanced({
      instancePositions: {
        transition: true,
        type: "float64",
        fp64: this.use64bitPositions(),
        size: 3,
        accessor: "getPosition"
      },
      instanceColors: {
        type: "unorm8",
        transition: true,
        size: this.props.colorFormat.length,
        accessor: "getColor",
        defaultValue: [0, 0, 0, 255]
      },
      instanceModelMatrix: MATRIX_ATTRIBUTES
    });
    this.setState({
      // Avoid luma.gl's missing uniform warning
      // TODO - add feature to luma.gl to specify ignored uniforms?
      emptyTexture: this.context.device.createTexture({
        data: new Uint8Array(4),
        width: 1,
        height: 1
      })
    });
  }
  updateState(params) {
    var _a;
    super.updateState(params);
    const { props, oldProps, changeFlags } = params;
    if (props.mesh !== oldProps.mesh || changeFlags.extensionsChanged) {
      this.state.positionBounds = null;
      (_a = this.state.model) == null ? void 0 : _a.destroy();
      if (props.mesh) {
        this.state.model = this.getModel(props.mesh);
        const attributes = props.mesh.attributes || props.mesh;
        this.setState({
          hasNormals: Boolean(attributes.NORMAL || attributes.normals)
        });
      }
      this.getAttributeManager().invalidateAll();
    }
    if (props.texture !== oldProps.texture && props.texture instanceof import_core3.Texture) {
      this.setTexture(props.texture);
    }
    if (this.state.model) {
      this.state.model.setTopology(this.props.wireframe ? "line-strip" : "triangle-list");
    }
  }
  finalizeState(context) {
    super.finalizeState(context);
    this.state.emptyTexture.delete();
  }
  draw({ uniforms }) {
    const { model } = this.state;
    if (!model) {
      return;
    }
    const { viewport, renderPass } = this.context;
    const { sizeScale, coordinateSystem, _instanced } = this.props;
    const simpleMeshProps = {
      sizeScale,
      composeModelMatrix: !_instanced || shouldComposeModelMatrix(viewport, coordinateSystem),
      flatShading: !this.state.hasNormals
    };
    model.shaderInputs.setProps({ simpleMesh: simpleMeshProps });
    model.draw(renderPass);
  }
  get isLoaded() {
    var _a;
    return Boolean(((_a = this.state) == null ? void 0 : _a.model) && super.isLoaded);
  }
  getModel(mesh) {
    const model = new import_engine.Model(this.context.device, {
      ...this.getShaders(),
      id: this.props.id,
      bufferLayout: this.getAttributeManager().getBufferLayouts(),
      geometry: getGeometry(mesh),
      isInstanced: true
    });
    const { texture } = this.props;
    const { emptyTexture } = this.state;
    const simpleMeshProps = {
      sampler: texture || emptyTexture,
      hasTexture: Boolean(texture)
    };
    model.shaderInputs.setProps({ simpleMesh: simpleMeshProps });
    return model;
  }
  setTexture(texture) {
    const { emptyTexture, model } = this.state;
    if (model) {
      const simpleMeshProps = {
        sampler: texture || emptyTexture,
        hasTexture: Boolean(texture)
      };
      model.shaderInputs.setProps({ simpleMesh: simpleMeshProps });
    }
  }
};
SimpleMeshLayer.defaultProps = defaultProps;
SimpleMeshLayer.layerName = "SimpleMeshLayer";
var simple_mesh_layer_default = SimpleMeshLayer;

// dist/scenegraph-layer/scenegraph-layer.js
var import_core4 = require("@deck.gl/core");
var import_shadertools2 = require("@luma.gl/shadertools");
var import_engine2 = require("@luma.gl/engine");
var import_gltf = require("@luma.gl/gltf");
var import_gltf2 = require("@loaders.gl/gltf");

// dist/scenegraph-layer/gltf-utils.js
async function waitForGLTFAssets(gltfObjects) {
  const remaining = [];
  gltfObjects.scenes.forEach((scene) => {
    scene.traverse((modelNode) => {
      Object.values(modelNode.model.uniforms).forEach((uniform) => {
        if (uniform.loaded === false) {
          remaining.push(uniform);
        }
      });
    });
  });
  return await waitWhileCondition(() => remaining.some((uniform) => !uniform.loaded));
}
async function waitWhileCondition(condition) {
  while (condition()) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
}

// dist/scenegraph-layer/scenegraph-layer-uniforms.js
var uniformBlock2 = `uniform scenegraphUniforms {
  float sizeScale;
  float sizeMinPixels;
  float sizeMaxPixels;
  mat4 sceneModelMatrix;
  bool composeModelMatrix;
} scenegraph;
`;
var scenegraphUniforms = {
  name: "scenegraph",
  vs: uniformBlock2,
  fs: uniformBlock2,
  uniformTypes: {
    sizeScale: "f32",
    sizeMinPixels: "f32",
    sizeMaxPixels: "f32",
    sceneModelMatrix: "mat4x4<f32>",
    composeModelMatrix: "f32"
  }
};

// dist/scenegraph-layer/scenegraph-layer-vertex.glsl.js
var scenegraph_layer_vertex_glsl_default = `#version 300 es
#define SHADER_NAME scenegraph-layer-vertex-shader
in vec3 instancePositions;
in vec3 instancePositions64Low;
in vec4 instanceColors;
in vec3 instancePickingColors;
in vec3 instanceModelMatrixCol0;
in vec3 instanceModelMatrixCol1;
in vec3 instanceModelMatrixCol2;
in vec3 instanceTranslation;
in vec3 positions;
#ifdef HAS_UV
in vec2 texCoords;
#endif
#ifdef LIGHTING_PBR
#ifdef HAS_NORMALS
in vec3 normals;
#endif
#endif
out vec4 vColor;
#ifndef LIGHTING_PBR
#ifdef HAS_UV
out vec2 vTEXCOORD_0;
#endif
#endif
void main(void) {
#if defined(HAS_UV) && !defined(LIGHTING_PBR)
vTEXCOORD_0 = texCoords;
geometry.uv = texCoords;
#endif
geometry.worldPosition = instancePositions;
geometry.pickingColor = instancePickingColors;
mat3 instanceModelMatrix = mat3(instanceModelMatrixCol0, instanceModelMatrixCol1, instanceModelMatrixCol2);
vec3 normal = vec3(0.0, 0.0, 1.0);
#ifdef LIGHTING_PBR
#ifdef HAS_NORMALS
normal = instanceModelMatrix * (scenegraph.sceneModelMatrix * vec4(normals, 0.0)).xyz;
#endif
#endif
float originalSize = project_size_to_pixel(scenegraph.sizeScale);
float clampedSize = clamp(originalSize, scenegraph.sizeMinPixels, scenegraph.sizeMaxPixels);
vec3 pos = (instanceModelMatrix * (scenegraph.sceneModelMatrix * vec4(positions, 1.0)).xyz) * scenegraph.sizeScale * (clampedSize / originalSize) + instanceTranslation;
if(scenegraph.composeModelMatrix) {
DECKGL_FILTER_SIZE(pos, geometry);
geometry.normal = project_normal(normal);
geometry.worldPosition += pos;
gl_Position = project_position_to_clipspace(pos + instancePositions, instancePositions64Low, vec3(0.0), geometry.position);
}
else {
pos = project_size(pos);
DECKGL_FILTER_SIZE(pos, geometry);
gl_Position = project_position_to_clipspace(instancePositions, instancePositions64Low, pos, geometry.position);
geometry.normal = project_normal(normal);
}
DECKGL_FILTER_GL_POSITION(gl_Position, geometry);
#ifdef LIGHTING_PBR
pbr_vPosition = geometry.position.xyz;
#ifdef HAS_NORMALS
pbr_vNormal = geometry.normal;
#endif
#ifdef HAS_UV
pbr_vUV = texCoords;
#else
pbr_vUV = vec2(0., 0.);
#endif
geometry.uv = pbr_vUV;
#endif
vColor = instanceColors;
DECKGL_FILTER_COLOR(vColor, geometry);
}
`;

// dist/scenegraph-layer/scenegraph-layer-fragment.glsl.js
var scenegraph_layer_fragment_glsl_default = `#version 300 es
#define SHADER_NAME scenegraph-layer-fragment-shader
in vec4 vColor;
out vec4 fragColor;
#ifndef LIGHTING_PBR
#if defined(HAS_UV) && defined(HAS_BASECOLORMAP)
in vec2 vTEXCOORD_0;
uniform sampler2D pbr_baseColorSampler;
#endif
#endif
void main(void) {
#ifdef LIGHTING_PBR
fragColor = vColor * pbr_filterColor(vec4(0));
geometry.uv = pbr_vUV;
#else
#if defined(HAS_UV) && defined(HAS_BASECOLORMAP)
fragColor = vColor * texture(pbr_baseColorSampler, vTEXCOORD_0);
geometry.uv = vTEXCOORD_0;
#else
fragColor = vColor;
#endif
#endif
fragColor.a *= layer.opacity;
DECKGL_FILTER_COLOR(fragColor, geometry);
}
`;

// dist/scenegraph-layer/scenegraph-layer.js
var DEFAULT_COLOR2 = [255, 255, 255, 255];
var defaultProps2 = {
  scenegraph: { type: "object", value: null, async: true },
  getScene: (gltf) => {
    if (gltf && gltf.scenes) {
      return typeof gltf.scene === "object" ? gltf.scene : gltf.scenes[gltf.scene || 0];
    }
    return gltf;
  },
  getAnimator: (scenegraph) => scenegraph && scenegraph.animator,
  _animations: null,
  sizeScale: { type: "number", value: 1, min: 0 },
  sizeMinPixels: { type: "number", min: 0, value: 0 },
  sizeMaxPixels: { type: "number", min: 0, value: Number.MAX_SAFE_INTEGER },
  getPosition: { type: "accessor", value: (x) => x.position },
  getColor: { type: "accessor", value: DEFAULT_COLOR2 },
  // flat or pbr
  _lighting: "flat",
  // _lighting must be pbr for this to work
  _imageBasedLightingEnvironment: void 0,
  // yaw, pitch and roll are in degrees
  // https://en.wikipedia.org/wiki/Euler_angles
  // [pitch, yaw, roll]
  getOrientation: { type: "accessor", value: [0, 0, 0] },
  getScale: { type: "accessor", value: [1, 1, 1] },
  getTranslation: { type: "accessor", value: [0, 0, 0] },
  // 4x4 matrix
  getTransformMatrix: { type: "accessor", value: [] },
  loaders: [import_gltf2.GLTFLoader]
};
var ScenegraphLayer = class extends import_core4.Layer {
  getShaders() {
    const defines = {};
    let pbr;
    if (this.props._lighting === "pbr") {
      pbr = import_shadertools2.pbrMaterial;
      defines.LIGHTING_PBR = 1;
    } else {
      pbr = { name: "pbrMaterial" };
    }
    const modules = [import_core4.project32, import_core4.picking, scenegraphUniforms, pbr];
    return super.getShaders({ defines, vs: scenegraph_layer_vertex_glsl_default, fs: scenegraph_layer_fragment_glsl_default, modules });
  }
  initializeState() {
    const attributeManager = this.getAttributeManager();
    attributeManager.addInstanced({
      instancePositions: {
        size: 3,
        type: "float64",
        fp64: this.use64bitPositions(),
        accessor: "getPosition",
        transition: true
      },
      instanceColors: {
        type: "unorm8",
        size: this.props.colorFormat.length,
        accessor: "getColor",
        defaultValue: DEFAULT_COLOR2,
        transition: true
      },
      instanceModelMatrix: MATRIX_ATTRIBUTES
    });
  }
  updateState(params) {
    super.updateState(params);
    const { props, oldProps } = params;
    if (props.scenegraph !== oldProps.scenegraph) {
      this._updateScenegraph();
    } else if (props._animations !== oldProps._animations) {
      this._applyAnimationsProp(this.state.animator, props._animations);
    }
  }
  finalizeState(context) {
    var _a;
    super.finalizeState(context);
    (_a = this.state.scenegraph) == null ? void 0 : _a.destroy();
  }
  get isLoaded() {
    var _a;
    return Boolean(((_a = this.state) == null ? void 0 : _a.scenegraph) && super.isLoaded);
  }
  _updateScenegraph() {
    var _a;
    const props = this.props;
    const { device } = this.context;
    let scenegraphData = null;
    if (props.scenegraph instanceof import_engine2.ScenegraphNode) {
      scenegraphData = { scenes: [props.scenegraph] };
    } else if (props.scenegraph && typeof props.scenegraph === "object") {
      const gltf = props.scenegraph;
      const processedGLTF = gltf.json ? (0, import_gltf2.postProcessGLTF)(gltf) : gltf;
      const gltfObjects = (0, import_gltf.createScenegraphsFromGLTF)(device, processedGLTF, this._getModelOptions());
      scenegraphData = { gltf: processedGLTF, ...gltfObjects };
      waitForGLTFAssets(gltfObjects).then(() => {
        this.setNeedsRedraw();
      }).catch((ex) => {
        this.raiseError(ex, "loading glTF");
      });
    }
    const options = { layer: this, device: this.context.device };
    const scenegraph = props.getScene(scenegraphData, options);
    const animator = props.getAnimator(scenegraphData, options);
    if (scenegraph instanceof import_engine2.GroupNode) {
      (_a = this.state.scenegraph) == null ? void 0 : _a.destroy();
      this._applyAnimationsProp(animator, props._animations);
      const models = [];
      scenegraph.traverse((node) => {
        if (node instanceof import_engine2.ModelNode) {
          models.push(node.model);
        }
      });
      this.setState({ scenegraph, animator, models });
      this.getAttributeManager().invalidateAll();
    } else if (scenegraph !== null) {
      import_core4.log.warn("invalid scenegraph:", scenegraph)();
    }
  }
  _applyAnimationsProp(animator, animationsProp) {
    if (!animator || !animationsProp) {
      return;
    }
    const animations = animator.getAnimations();
    Object.keys(animationsProp).sort().forEach((key) => {
      const value = animationsProp[key];
      if (key === "*") {
        animations.forEach((animation) => {
          Object.assign(animation, value);
        });
      } else if (Number.isFinite(Number(key))) {
        const number = Number(key);
        if (number >= 0 && number < animations.length) {
          Object.assign(animations[number], value);
        } else {
          import_core4.log.warn(`animation ${key} not found`)();
        }
      } else {
        const findResult = animations.find(({ name }) => name === key);
        if (findResult) {
          Object.assign(findResult, value);
        } else {
          import_core4.log.warn(`animation ${key} not found`)();
        }
      }
    });
  }
  _getModelOptions() {
    const { _imageBasedLightingEnvironment } = this.props;
    let env;
    if (_imageBasedLightingEnvironment) {
      if (typeof _imageBasedLightingEnvironment === "function") {
        env = _imageBasedLightingEnvironment({ gl: this.context.gl, layer: this });
      } else {
        env = _imageBasedLightingEnvironment;
      }
    }
    return {
      imageBasedLightingEnvironment: env,
      modelOptions: {
        id: this.props.id,
        isInstanced: true,
        bufferLayout: this.getAttributeManager().getBufferLayouts(),
        ...this.getShaders()
      },
      // tangents are not supported
      useTangents: false
    };
  }
  draw({ context }) {
    if (!this.state.scenegraph)
      return;
    if (this.props._animations && this.state.animator) {
      this.state.animator.animate(context.timeline.getTime());
      this.setNeedsRedraw();
    }
    const { viewport, renderPass } = this.context;
    const { sizeScale, sizeMinPixels, sizeMaxPixels, coordinateSystem } = this.props;
    const numInstances = this.getNumInstances();
    this.state.scenegraph.traverse((node, { worldMatrix }) => {
      if (node instanceof import_engine2.ModelNode) {
        const { model } = node;
        model.setInstanceCount(numInstances);
        const pbrProjectionProps = {
          // Needed for PBR (TODO: find better way to get it)
          camera: model.uniforms.cameraPosition
        };
        const scenegraphProps = {
          sizeScale,
          sizeMinPixels,
          sizeMaxPixels,
          composeModelMatrix: shouldComposeModelMatrix(viewport, coordinateSystem),
          sceneModelMatrix: worldMatrix
        };
        model.shaderInputs.setProps({
          pbrProjection: pbrProjectionProps,
          scenegraph: scenegraphProps
        });
        model.draw(renderPass);
      }
    });
  }
};
ScenegraphLayer.defaultProps = defaultProps2;
ScenegraphLayer.layerName = "ScenegraphLayer";
var scenegraph_layer_default = ScenegraphLayer;
//# sourceMappingURL=index.cjs.map
