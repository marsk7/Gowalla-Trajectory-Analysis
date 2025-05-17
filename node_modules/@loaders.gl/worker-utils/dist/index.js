// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { VERSION } from "./lib/env-utils/version.js";
// GENERAL UTILS
export { assert } from "./lib/env-utils/assert.js";
export { isBrowser, isWorker } from "./lib/env-utils/globals.js";
// WORKER UTILS - TYPES
export { default as WorkerJob } from "./lib/worker-farm/worker-job.js";
export { default as WorkerThread } from "./lib/worker-farm/worker-thread.js";
// WORKER FARMS
export { default as WorkerFarm } from "./lib/worker-farm/worker-farm.js";
export { default as WorkerPool } from "./lib/worker-farm/worker-pool.js";
export { default as WorkerBody } from "./lib/worker-farm/worker-body.js";
export { processOnWorker, canProcessOnWorker } from "./lib/worker-api/process-on-worker.js";
export { createWorker } from "./lib/worker-api/create-worker.js";
// WORKER UTILS - EXPORTS
export { getWorkerURL } from "./lib/worker-api/get-worker-url.js";
export { validateWorkerVersion } from "./lib/worker-api/validate-worker-version.js";
export { getTransferList, getTransferListForWriter } from "./lib/worker-utils/get-transfer-list.js";
// LIBRARY UTILS
export { getLibraryUrl, loadLibrary } from "./lib/library-utils/library-utils.js";
// PARSER UTILS
export { default as AsyncQueue } from "./lib/async-queue/async-queue.js";
// PROCESS UTILS
export { default as ChildProcessProxy } from "./lib/process-utils/child-process-proxy.js";
// WORKER OBJECTS
/** A null worker to test that worker processing is functional */
export const NullWorker = {
    id: 'null',
    name: 'null',
    module: 'worker-utils',
    version: VERSION,
    options: {
        null: {}
    }
};
