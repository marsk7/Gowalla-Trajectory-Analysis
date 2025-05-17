import DRACOBuilder from "./lib/draco-builder.js";
import { loadDracoEncoderModule } from "./lib/draco-module-loader.js";
import { VERSION } from "./lib/utils/version.js";
const DEFAULT_DRACO_WRITER_OPTIONS = {
    pointcloud: false, // Set to true if pointcloud (mode: 0, no indices)
    attributeNameEntry: 'name'
    // Draco Compression Parameters
    // method: 'MESH_EDGEBREAKER_ENCODING', // Use draco defaults
    // speed: [5, 5], // Use draco defaults
    // quantization: { // Use draco defaults
    //   POSITION: 10
    // }
};
/**
 * Exporter for Draco3D compressed geometries
 */
export const DracoWriter = {
    name: 'DRACO',
    id: 'draco',
    module: 'draco',
    version: VERSION,
    extensions: ['drc'],
    options: {
        draco: DEFAULT_DRACO_WRITER_OPTIONS
    },
    encode
};
async function encode(data, options = {}) {
    // Dynamically load draco
    const { draco } = await loadDracoEncoderModule(options);
    const dracoBuilder = new DRACOBuilder(draco);
    try {
        return dracoBuilder.encodeSync(data, options.draco);
    }
    finally {
        dracoBuilder.destroy();
    }
}
