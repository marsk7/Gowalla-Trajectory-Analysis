import { VERSION } from "./lib/utils/version.js";
import { encodeGLTFSync } from "./lib/encoders/encode-gltf.js";
import { encodeExtensions } from "./lib/api/gltf-extensions.js";
/**
 * GLTF exporter
 */
export const GLTFWriter = {
    dataType: null,
    batchType: null,
    name: 'glTF',
    id: 'gltf',
    module: 'gltf',
    version: VERSION,
    extensions: ['glb'], // We only support encoding to binary GLB, not to JSON GLTF
    mimeTypes: ['model/gltf-binary'], // 'model/gltf+json',
    binary: true,
    options: {
        gltf: {}
    },
    encode: async (gltf, options = {}) => encodeSync(gltf, options),
    encodeSync
};
function encodeSync(gltf, options = {}) {
    const { byteOffset = 0 } = options;
    const gltfToEncode = encodeExtensions(gltf);
    // Calculate length, then create arraybuffer and encode
    const byteLength = encodeGLTFSync(gltfToEncode, null, byteOffset, options);
    const arrayBuffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(arrayBuffer);
    encodeGLTFSync(gltfToEncode, dataView, byteOffset, options);
    return arrayBuffer;
}
