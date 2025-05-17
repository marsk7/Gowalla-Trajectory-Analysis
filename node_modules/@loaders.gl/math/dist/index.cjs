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
  GL: () => GL,
  GLType: () => GLType,
  GL_TYPE: () => GL_TYPE,
  compressTextureCoordinates: () => compressTextureCoordinates,
  computeVertexNormals: () => computeVertexNormals,
  concatTypedArrays: () => concatTypedArrays,
  decodeRGB565: () => decodeRGB565,
  decompressTextureCoordinates: () => decompressTextureCoordinates,
  emod: () => emod,
  encodeRGB565: () => encodeRGB565,
  isGeometry: () => isGeometry,
  makeAttributeIterator: () => makeAttributeIterator,
  makePrimitiveIterator: () => makePrimitiveIterator,
  octDecode: () => octDecode,
  octDecodeFloat: () => octDecodeFloat,
  octDecodeFromVector4: () => octDecodeFromVector4,
  octDecodeInRange: () => octDecodeInRange,
  octEncode: () => octEncode,
  octEncodeFloat: () => octEncodeFloat,
  octEncodeInRange: () => octEncodeInRange,
  octEncodeToVector4: () => octEncodeToVector4,
  octPack: () => octPack,
  octPackFloat: () => octPackFloat,
  octUnpack: () => octUnpack,
  zigZagDeltaDecode: () => zigZagDeltaDecode
});
module.exports = __toCommonJS(dist_exports);

// dist/geometry/constants.js
var GL_PRIMITIVE_MODE = {
  POINTS: 0,
  // Points. single points.
  LINES: 1,
  // Lines. Each vertex connects to the one after it.
  LINE_LOOP: 2,
  // Lines. Each set of two vertices is treated as a separate line segment.
  LINE_STRIP: 3,
  // Lines/ a connected group of line segments from the first vertex to the last
  TRIANGLES: 4,
  // Triangles. Each set of three vertices creates a separate triangle.
  TRIANGLE_STRIP: 5,
  // Triangles. A connected group of triangles.
  TRIANGLE_FAN: 6
  // Triangles. A connected group of triangles.
  // Each vertex connects to the previous and the first vertex in the fan.
};
var GL_TYPE = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  INT: 5124,
  UNSIGNED_INT: 5125,
  FLOAT: 5126,
  DOUBLE: 5130
};
var GL = {
  ...GL_PRIMITIVE_MODE,
  ...GL_TYPE
};

// dist/geometry/gl/gl-type.js
var GL_TYPE_TO_ARRAY_TYPE = {
  [GL_TYPE.DOUBLE]: Float64Array,
  [GL_TYPE.FLOAT]: Float32Array,
  [GL_TYPE.UNSIGNED_SHORT]: Uint16Array,
  [GL_TYPE.UNSIGNED_INT]: Uint32Array,
  [GL_TYPE.UNSIGNED_BYTE]: Uint8Array,
  [GL_TYPE.BYTE]: Int8Array,
  [GL_TYPE.SHORT]: Int16Array,
  [GL_TYPE.INT]: Int32Array
};
var NAME_TO_GL_TYPE = {
  DOUBLE: GL_TYPE.DOUBLE,
  FLOAT: GL_TYPE.FLOAT,
  UNSIGNED_SHORT: GL_TYPE.UNSIGNED_SHORT,
  UNSIGNED_INT: GL_TYPE.UNSIGNED_INT,
  UNSIGNED_BYTE: GL_TYPE.UNSIGNED_BYTE,
  BYTE: GL_TYPE.BYTE,
  SHORT: GL_TYPE.SHORT,
  INT: GL_TYPE.INT
};
var ERR_TYPE_CONVERSION = "Failed to convert GL type";
var GLType = class {
  // Signature: fromTypedArray(new Uint8Array())
  // Signature: fromTypedArray(Uint8Array)
  /**
   * Returns the size, in bytes, of the corresponding datatype
   * @param arrayOrType
   * @returns glType a a string
   */
  static fromTypedArray(arrayOrType) {
    arrayOrType = ArrayBuffer.isView(arrayOrType) ? arrayOrType.constructor : arrayOrType;
    for (const glType in GL_TYPE_TO_ARRAY_TYPE) {
      const ArrayType = GL_TYPE_TO_ARRAY_TYPE[glType];
      if (ArrayType === arrayOrType) {
        return glType;
      }
    }
    throw new Error(ERR_TYPE_CONVERSION);
  }
  /**
   * Extracts name for glType from array NAME_TO_GL_TYPE
   * @param name
   * @returns glType as a number
   */
  static fromName(name) {
    const glType = NAME_TO_GL_TYPE[name];
    if (!glType) {
      throw new Error(ERR_TYPE_CONVERSION);
    }
    return glType;
  }
  // Converts GL constant to corresponding typed array type
  // eslint-disable-next-line complexity
  static getArrayType(glType) {
    switch (glType) {
      case GL_TYPE.UNSIGNED_SHORT_5_6_5:
      case GL_TYPE.UNSIGNED_SHORT_4_4_4_4:
      case GL_TYPE.UNSIGNED_SHORT_5_5_5_1:
        return Uint16Array;
      default:
        const ArrayType = GL_TYPE_TO_ARRAY_TYPE[glType];
        if (!ArrayType) {
          throw new Error(ERR_TYPE_CONVERSION);
        }
        return ArrayType;
    }
  }
  /**
   * Returns the size in bytes of one element of the provided WebGL type
   * @param glType
   * @returns size of glType
   */
  static getByteSize(glType) {
    const ArrayType = GLType.getArrayType(glType);
    return ArrayType.BYTES_PER_ELEMENT;
  }
  /**
   * Returns `true` if `glType` is a valid WebGL data type.
   * @param glType
   * @returns boolean
   */
  static validate(glType) {
    return Boolean(GLType.getArrayType(glType));
  }
  /**
   * Creates a typed view of an array of bytes
   * @param glType The type of typed array (ArrayBuffer view) to create
   * @param buffer The buffer storage to use for the view.
   * @param byteOffset The offset, in bytes, to the first element in the view
   * @param length The number of elements in the view. Defaults to buffer length
   * @returns A typed array view of the buffer
   */
  static createTypedArray(glType, buffer, byteOffset = 0, length) {
    if (length === void 0) {
      length = (buffer.byteLength - byteOffset) / GLType.getByteSize(glType);
    }
    const ArrayType = GLType.getArrayType(glType);
    return new ArrayType(buffer, byteOffset, length);
  }
};

// dist/geometry/is-geometry.js
function isGeometry(geometry) {
  return geometry && typeof geometry === "object" && geometry.mode && geometry.attributes && typeof geometry.attributes === "object";
}

// dist/geometry/iterators/attribute-iterator.js
function* makeAttributeIterator(values, size) {
  const ArrayType = values.constructor;
  const element = new ArrayType(size);
  for (let i = 0; i < values.length; i += size) {
    for (let j = 0; j < size; j++) {
      element[j] = element[i + j];
    }
    yield element;
  }
}

// dist/geometry/primitives/modes.js
function getPrimitiveModeType(mode) {
  switch (mode) {
    case GL.POINTS:
      return GL.POINTS;
    case GL.LINES:
    case GL.LINE_STRIP:
    case GL.LINE_LOOP:
      return GL.LINES;
    case GL.TRIANGLES:
    case GL.TRIANGLE_STRIP:
    case GL.TRIANGLE_FAN:
      return GL.TRIANGLES;
    default:
      throw new Error("Unknown primitive mode");
  }
}

// dist/geometry/iterators/primitive-iterator.js
var import_loader_utils = require("@loaders.gl/loader-utils");
function* makePrimitiveIterator(indices, attributes = {}, mode, start = 0, end) {
  if (indices) {
    indices = indices.values || indices.value || indices;
  }
  if (end === void 0) {
    end = indices ? indices.length : start;
  }
  const info = {
    attributes,
    type: getPrimitiveModeType(mode),
    i1: 0,
    i2: 0,
    i3: 0
  };
  let i = start;
  while (i < end) {
    switch (mode) {
      case GL.POINTS:
        info.i1 = i;
        i += 1;
        break;
      case GL.LINES:
        info.i1 = i;
        info.i2 = i + 1;
        i += 2;
        break;
      case GL.LINE_STRIP:
        info.i1 = i;
        info.i2 = i + 1;
        i += 1;
        break;
      case GL.LINE_LOOP:
        info.i1 = i;
        info.i2 = i + 1;
        i += 1;
        break;
      case GL.TRIANGLES:
        info.i1 = i;
        info.i2 = i + 1;
        info.i3 = i + 2;
        i += 3;
        break;
      case GL.TRIANGLE_STRIP:
        info.i1 = i;
        info.i2 = i + 1;
        i += 1;
        break;
      case GL.TRIANGLE_FAN:
        info.i1 = 1;
        info.i2 = i;
        info.i3 = i + 1;
        i += 1;
        break;
      default:
        (0, import_loader_utils.assert)(false);
    }
    if (indices) {
      if ("i1" in info) {
        info.i1 = indices[info.i1];
        info.i2 = indices[info.i2];
        info.i3 = indices[info.i3];
      }
    }
    yield info;
  }
}

// dist/geometry/attributes/compute-vertex-normals.js
var import_core = require("@math.gl/core");

// dist/geometry/utils/assert.js
function assert2(condition, message) {
  if (!condition) {
    throw new Error(`math.gl assertion failed. ${message}`);
  }
}

// dist/geometry/attributes/get-attribute-from-geometry.js
function getPositions(geometry) {
  if (isGeometry(geometry)) {
    const { attributes } = geometry;
    const position = attributes.POSITION || attributes.positions;
    assert2(position);
    return position;
  }
  if (ArrayBuffer.isView(geometry)) {
    return { values: geometry, size: 3 };
  }
  if (geometry) {
    assert2(geometry.values);
    return geometry;
  }
  return assert2(false);
}

// dist/geometry/attributes/compute-vertex-normals.js
function computeVertexNormals(geometry) {
  assert2(getPrimitiveModeType(geometry.mode) === GL.TRIANGLES, "TRIANGLES required");
  const { values: positions } = getPositions(geometry);
  const normals = new Float32Array(positions.length);
  const vectorA = new import_core.Vector3();
  const vectorB = new import_core.Vector3();
  const vectorC = new import_core.Vector3();
  const vectorCB = new import_core.Vector3();
  const vectorAB = new import_core.Vector3();
  for (const primitive of makePrimitiveIterator(geometry)) {
    vectorA.fromArray(positions, primitive.i1 * 3);
    vectorB.fromArray(positions, primitive.i2 * 3 + 3);
    vectorC.fromArray(positions, primitive.i3 * 3 + 6);
    vectorCB.subVectors(vectorC, vectorB);
    vectorAB.subVectors(vectorA, vectorB);
    const normal = vectorCB.cross(vectorAB);
    normal.normalize();
    const { primitiveIndex } = primitive;
    normals[primitiveIndex * 9 + 0] = normal.x;
    normals[primitiveIndex * 9 + 1] = normal.y;
    normals[primitiveIndex * 9 + 2] = normal.z;
    normals[primitiveIndex * 9 + 3] = normal.x;
    normals[primitiveIndex * 9 + 4] = normal.y;
    normals[primitiveIndex * 9 + 5] = normal.z;
    normals[primitiveIndex * 9 + 6] = normal.x;
    normals[primitiveIndex * 9 + 7] = normal.y;
    normals[primitiveIndex * 9 + 8] = normal.z;
  }
  return normals;
}

// dist/geometry/colors/rgb565.js
function decodeRGB565(rgb565, target = [0, 0, 0]) {
  const r5 = rgb565 >> 11 & 31;
  const g6 = rgb565 >> 5 & 63;
  const b5 = rgb565 & 31;
  target[0] = r5 << 3;
  target[1] = g6 << 2;
  target[2] = b5 << 3;
  return target;
}
function encodeRGB565(rgb) {
  const r5 = Math.floor(rgb[0] / 8) + 4;
  const g6 = Math.floor(rgb[1] / 4) + 2;
  const b5 = Math.floor(rgb[2] / 8) + 4;
  return r5 + (g6 << 5) + (b5 << 11);
}

// dist/geometry/typed-arrays/typed-array-utils.js
function concatTypedArrays(arrays = []) {
  let byteLength = 0;
  for (let i = 0; i < arrays.length; ++i) {
    byteLength += arrays[i].byteLength;
  }
  const buffer = new Uint8Array(byteLength);
  let byteOffset = 0;
  for (let i = 0; i < arrays.length; ++i) {
    const data = new Uint8Array(arrays[i].buffer);
    byteLength = data.length;
    for (let j = 0; j < byteLength; ++j) {
      buffer[byteOffset++] = data[j];
    }
  }
  return buffer;
}

// dist/geometry/compression/attribute-compression.js
var import_core2 = require("@math.gl/core");
var RIGHT_SHIFT = 1 / 256;
var LEFT_SHIFT = 256;
var scratchVector2 = new import_core2.Vector2();
var scratchVector3 = new import_core2.Vector3();
var scratchEncodeVector2 = new import_core2.Vector2();
var octEncodeScratch = new import_core2.Vector2();
var uint8ForceArray = new Uint8Array(1);
function forceUint8(value) {
  uint8ForceArray[0] = value;
  return uint8ForceArray[0];
}
function fromSNorm(value, rangeMaximum = 255) {
  return (0, import_core2.clamp)(value, 0, rangeMaximum) / rangeMaximum * 2 - 1;
}
function toSNorm(value, rangeMaximum = 255) {
  return Math.round(((0, import_core2.clamp)(value, -1, 1) * 0.5 + 0.5) * rangeMaximum);
}
function signNotZero(value) {
  return value < 0 ? -1 : 1;
}
function octEncodeInRange(vector, rangeMax, result) {
  assert2(vector);
  assert2(result);
  const vector3 = scratchVector3.from(vector);
  assert2(Math.abs(vector3.magnitudeSquared() - 1) <= import_core2._MathUtils.EPSILON6);
  result.x = vector.x / (Math.abs(vector.x) + Math.abs(vector.y) + Math.abs(vector.z));
  result.y = vector.y / (Math.abs(vector.x) + Math.abs(vector.y) + Math.abs(vector.z));
  if (vector.z < 0) {
    const x = result.x;
    const y = result.y;
    result.x = (1 - Math.abs(y)) * signNotZero(x);
    result.y = (1 - Math.abs(x)) * signNotZero(y);
  }
  result.x = toSNorm(result.x, rangeMax);
  result.y = toSNorm(result.y, rangeMax);
  return result;
}
function octEncode(vector, result) {
  return octEncodeInRange(vector, 255, result);
}
function octEncodeToVector4(vector, result) {
  octEncodeInRange(vector, 65535, octEncodeScratch);
  result.x = forceUint8(octEncodeScratch.x * RIGHT_SHIFT);
  result.y = forceUint8(octEncodeScratch.x);
  result.z = forceUint8(octEncodeScratch.y * RIGHT_SHIFT);
  result.w = forceUint8(octEncodeScratch.y);
  return result;
}
function octDecodeInRange(x, y, rangeMax, result) {
  assert2(result);
  if (x < 0 || x > rangeMax || y < 0 || y > rangeMax) {
    throw new Error(`x and y must be unsigned normalized integers between 0 and ${rangeMax}`);
  }
  result.x = fromSNorm(x, rangeMax);
  result.y = fromSNorm(y, rangeMax);
  result.z = 1 - (Math.abs(result.x) + Math.abs(result.y));
  if (result.z < 0) {
    const oldVX = result.x;
    result.x = (1 - Math.abs(result.y)) * signNotZero(oldVX);
    result.y = (1 - Math.abs(oldVX)) * signNotZero(result.y);
  }
  return result.normalize();
}
function octDecode(x, y, result) {
  return octDecodeInRange(x, y, 255, result);
}
function octDecodeFromVector4(encoded, result) {
  assert2(encoded);
  assert2(result);
  const x = encoded.x;
  const y = encoded.y;
  const z = encoded.z;
  const w = encoded.w;
  if (x < 0 || x > 255 || y < 0 || y > 255 || z < 0 || z > 255 || w < 0 || w > 255) {
    throw new Error("x, y, z, and w must be unsigned normalized integers between 0 and 255");
  }
  const xOct16 = x * LEFT_SHIFT + y;
  const yOct16 = z * LEFT_SHIFT + w;
  return octDecodeInRange(xOct16, yOct16, 65535, result);
}
function octPackFloat(encoded) {
  const vector2 = scratchVector2.from(encoded);
  return 256 * vector2.x + vector2.y;
}
function octEncodeFloat(vector) {
  octEncode(vector, scratchEncodeVector2);
  return octPackFloat(scratchEncodeVector2);
}
function octDecodeFloat(value, result) {
  assert2(Number.isFinite(value));
  const temp = value / 256;
  const x = Math.floor(temp);
  const y = (temp - x) * 256;
  return octDecode(x, y, result);
}
function octPack(v1, v2, v3, result) {
  assert2(v1);
  assert2(v2);
  assert2(v3);
  assert2(result);
  const encoded1 = octEncodeFloat(v1);
  const encoded2 = octEncodeFloat(v2);
  const encoded3 = octEncode(v3, scratchEncodeVector2);
  result.x = 65536 * encoded3.x + encoded1;
  result.y = 65536 * encoded3.y + encoded2;
  return result;
}
function octUnpack(packed, v1, v2, v3) {
  let temp = packed.x / 65536;
  const x = Math.floor(temp);
  const encodedFloat1 = (temp - x) * 65536;
  temp = packed.y / 65536;
  const y = Math.floor(temp);
  const encodedFloat2 = (temp - y) * 65536;
  octDecodeFloat(encodedFloat1, v1);
  octDecodeFloat(encodedFloat2, v2);
  octDecode(x, y, v3);
}
function compressTextureCoordinates(textureCoordinates) {
  const x = textureCoordinates.x * 4095 | 0;
  const y = textureCoordinates.y * 4095 | 0;
  return 4096 * x + y;
}
function decompressTextureCoordinates(compressed, result) {
  const temp = compressed / 4096;
  const xZeroTo4095 = Math.floor(temp);
  result.x = xZeroTo4095 / 4095;
  result.y = (compressed - xZeroTo4095 * 4096) / 4095;
  return result;
}
function zigZagDeltaDecode(uBuffer, vBuffer, heightBuffer) {
  assert2(uBuffer);
  assert2(vBuffer);
  assert2(uBuffer.length === vBuffer.length);
  if (heightBuffer) {
    assert2(uBuffer.length === heightBuffer.length);
  }
  function zigZagDecode(value) {
    return value >> 1 ^ -(value & 1);
  }
  let u = 0;
  let v = 0;
  let height = 0;
  for (let i = 0; i < uBuffer.length; ++i) {
    u += zigZagDecode(uBuffer[i]);
    v += zigZagDecode(vBuffer[i]);
    uBuffer[i] = u;
    vBuffer[i] = v;
    if (heightBuffer) {
      height += zigZagDecode(heightBuffer[i]);
      heightBuffer[i] = height;
    }
  }
}

// dist/geometry/utils/coordinates.js
function emod(n) {
  return (n % 1 + 1) % 1;
}
//# sourceMappingURL=index.cjs.map
