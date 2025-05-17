import { VERSION } from "./lib/utils/version.js";
import { parseGLTF } from "./lib/parsers/parse-gltf.js";
/**
 * GLTF loader
 */
export const GLTFLoader = {
    dataType: null,
    batchType: null,
    name: 'glTF',
    id: 'gltf',
    module: 'gltf',
    version: VERSION,
    extensions: ['gltf', 'glb'],
    mimeTypes: ['model/gltf+json', 'model/gltf-binary'],
    text: true,
    binary: true,
    tests: ['glTF'],
    parse,
    options: {
        gltf: {
            normalize: true, // Normalize glTF v1 to glTF v2 format (not yet stable)
            loadBuffers: true, // Fetch any linked .BIN buffers, decode base64
            loadImages: true, // Create image objects
            decompressMeshes: true // Decompress Draco encoded meshes
        },
        // common?
        log: console // eslint-disable-line
    }
};
export async function parse(arrayBuffer, options = {}, context) {
    // Apps can call the parse method directly, we so apply default options here
    options = { ...GLTFLoader.options, ...options };
    // @ts-ignore
    options.gltf = { ...GLTFLoader.options.gltf, ...options.gltf };
    const { byteOffset = 0 } = options;
    const gltf = {};
    return await parseGLTF(gltf, arrayBuffer, byteOffset, options, context);
}
