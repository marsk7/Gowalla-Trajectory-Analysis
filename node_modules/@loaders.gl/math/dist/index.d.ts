export type TypedArrayConstructor = Int8ArrayConstructor | Uint8ArrayConstructor | Int16ArrayConstructor | Uint16ArrayConstructor | Int32ArrayConstructor | Uint32ArrayConstructor | Float32ArrayConstructor | Float64ArrayConstructor;
export { GL } from "./geometry/constants.js";
export { GL_TYPE } from "./geometry/constants.js";
export { default as GLType } from "./geometry/gl/gl-type.js";
export { default as isGeometry } from "./geometry/is-geometry.js";
export { makeAttributeIterator } from "./geometry/iterators/attribute-iterator.js";
export { makePrimitiveIterator } from "./geometry/iterators/primitive-iterator.js";
export { computeVertexNormals } from "./geometry/attributes/compute-vertex-normals.js";
export { encodeRGB565, decodeRGB565 } from "./geometry/colors/rgb565.js";
export { concatTypedArrays } from "./geometry/typed-arrays/typed-array-utils.js";
export { octEncodeInRange, octEncode, octEncodeToVector4, octDecodeInRange, octDecode, octDecodeFromVector4, octPackFloat, octEncodeFloat, octDecodeFloat, octPack, octUnpack, compressTextureCoordinates, decompressTextureCoordinates, zigZagDeltaDecode } from "./geometry/compression/attribute-compression.js";
export { emod } from "./geometry/utils/coordinates.js";
//# sourceMappingURL=index.d.ts.map