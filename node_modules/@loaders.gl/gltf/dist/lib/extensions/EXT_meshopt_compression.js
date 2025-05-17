import { GLTFScenegraph } from "../api/gltf-scenegraph.js";
import { meshoptDecodeGltfBuffer } from "../../meshopt/meshopt-decoder.js";
// @ts-ignore
// eslint-disable-next-line
const DEFAULT_MESHOPT_OPTIONS = {
    byteOffset: 0,
    filter: 'NONE'
};
/** Extension name */
const EXT_MESHOPT_COMPRESSION = 'EXT_meshopt_compression';
export const name = EXT_MESHOPT_COMPRESSION;
export async function decode(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    if (!options?.gltf?.decompressMeshes || !options.gltf?.loadBuffers) {
        return;
    }
    const promises = [];
    for (const bufferViewIndex of gltfData.json.bufferViews || []) {
        promises.push(decodeMeshoptBufferView(scenegraph, bufferViewIndex));
    }
    // Decompress meshes in parallel
    await Promise.all(promises);
    // We have now decompressed all primitives, so remove the top-level extension
    scenegraph.removeExtension(EXT_MESHOPT_COMPRESSION);
}
/** Decode one meshopt buffer view */
async function decodeMeshoptBufferView(scenegraph, bufferView) {
    const meshoptExtension = scenegraph.getObjectExtension(bufferView, EXT_MESHOPT_COMPRESSION);
    if (meshoptExtension) {
        const { byteOffset = 0, byteLength = 0, byteStride, count, mode, filter = 'NONE', buffer: bufferIndex } = meshoptExtension;
        const buffer = scenegraph.gltf.buffers[bufferIndex];
        const source = new Uint8Array(buffer.arrayBuffer, buffer.byteOffset + byteOffset, byteLength);
        const result = new Uint8Array(scenegraph.gltf.buffers[bufferView.buffer].arrayBuffer, bufferView.byteOffset, bufferView.byteLength);
        await meshoptDecodeGltfBuffer(result, count, byteStride, source, mode, filter);
        scenegraph.removeObjectExtension(bufferView, EXT_MESHOPT_COMPRESSION);
    }
}
