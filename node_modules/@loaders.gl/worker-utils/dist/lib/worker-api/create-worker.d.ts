import type { WorkerContext, Process, ProcessInBatches } from "../../types.js";
export type ProcessOnMainThread = (data: any, options?: {
    [key: string]: any;
}, context?: WorkerContext) => any;
/**
 * Set up a WebWorkerGlobalScope to talk with the main thread
 */
export declare function createWorker(process: Process, processInBatches?: ProcessInBatches): Promise<void>;
//# sourceMappingURL=create-worker.d.ts.map