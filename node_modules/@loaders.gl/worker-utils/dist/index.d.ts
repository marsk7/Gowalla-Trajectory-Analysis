import type { WorkerObject } from "./types.js";
export type { WorkerObject, WorkerOptions, WorkerMessage, WorkerMessageType, WorkerMessageData, WorkerMessagePayload } from "./types.js";
export { assert } from "./lib/env-utils/assert.js";
export { isBrowser, isWorker } from "./lib/env-utils/globals.js";
export { default as WorkerJob } from "./lib/worker-farm/worker-job.js";
export { default as WorkerThread } from "./lib/worker-farm/worker-thread.js";
export { default as WorkerFarm } from "./lib/worker-farm/worker-farm.js";
export { default as WorkerPool } from "./lib/worker-farm/worker-pool.js";
export { default as WorkerBody } from "./lib/worker-farm/worker-body.js";
export type { ProcessOnWorkerOptions } from "./lib/worker-api/process-on-worker.js";
export { processOnWorker, canProcessOnWorker } from "./lib/worker-api/process-on-worker.js";
export { createWorker } from "./lib/worker-api/create-worker.js";
export { getWorkerURL } from "./lib/worker-api/get-worker-url.js";
export { validateWorkerVersion } from "./lib/worker-api/validate-worker-version.js";
export { getTransferList, getTransferListForWriter } from "./lib/worker-utils/get-transfer-list.js";
export { getLibraryUrl, loadLibrary } from "./lib/library-utils/library-utils.js";
export { default as AsyncQueue } from "./lib/async-queue/async-queue.js";
export { default as ChildProcessProxy } from "./lib/process-utils/child-process-proxy.js";
/** A null worker to test that worker processing is functional */
export declare const NullWorker: WorkerObject;
//# sourceMappingURL=index.d.ts.map