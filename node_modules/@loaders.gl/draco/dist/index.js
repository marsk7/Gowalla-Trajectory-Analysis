import { DracoLoader as DracoWorkerLoader } from "./draco-loader.js";
import DracoParser from "./lib/draco-parser.js";
import { loadDracoDecoderModule } from "./lib/draco-module-loader.js";
import { VERSION } from "./lib/utils/version.js";
// Module constants
export { DRACO_EXTERNAL_LIBRARIES, DRACO_EXTERNAL_LIBRARY_URLS } from "./lib/draco-module-loader.js";
export { DracoWriter } from "./draco-writer.js";
/**
 * Browser worker doesn't work because of issue during "draco_encoder.js" loading.
 * Refused to execute script from 'https://raw.githubusercontent.com/google/draco/1.4.1/javascript/draco_encoder.js' because its MIME type ('') is not executable.
 */
export const DracoWriterWorker = {
    id: 'draco-writer',
    name: 'Draco compressed geometry writer',
    module: 'draco',
    version: VERSION,
    worker: true,
    options: {
        draco: {},
        source: null
    }
};
export { DracoWorkerLoader };
/**
 * Loader for Draco3D compressed geometries
 */
export const DracoLoader = {
    ...DracoWorkerLoader,
    parse
};
async function parse(arrayBuffer, options) {
    const { draco } = await loadDracoDecoderModule(options);
    const dracoParser = new DracoParser(draco);
    try {
        return dracoParser.parseSync(arrayBuffer, options?.draco);
    }
    finally {
        dracoParser.destroy();
    }
}
