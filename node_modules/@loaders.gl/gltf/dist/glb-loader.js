import { VERSION } from "./lib/utils/version.js";
import { parseGLBSync } from "./lib/parsers/parse-glb.js";
/**
 * GLB Loader -
 * GLB is the binary container format for GLTF
 */
export const GLBLoader = {
    dataType: null,
    batchType: null,
    name: 'GLB',
    id: 'glb',
    module: 'gltf',
    version: VERSION,
    extensions: ['glb'],
    mimeTypes: ['model/gltf-binary'],
    binary: true,
    parse,
    parseSync,
    options: {
        glb: {
            strict: false // Enables deprecated XVIZ support (illegal CHUNK formats)
        }
    }
};
async function parse(arrayBuffer, options) {
    return parseSync(arrayBuffer, options);
}
function parseSync(arrayBuffer, options) {
    const { byteOffset = 0 } = options || {};
    const glb = {};
    parseGLBSync(glb, arrayBuffer, byteOffset, options?.glb);
    return glb;
}
