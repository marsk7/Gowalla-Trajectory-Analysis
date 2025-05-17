import { WorkerFarm } from '@loaders.gl/worker-utils';
import { isBrowser } from "../env-utils/globals.js";
/**
 * Determines if a loader can parse with worker
 * @param loader
 * @param options
 */
export function canEncodeWithWorker(writer, options) {
    if (!WorkerFarm.isSupported()) {
        return false;
    }
    // Node workers are still experimental
    if (!isBrowser && !options?._nodeWorkers) {
        return false;
    }
    return writer.worker && options?.worker;
}
