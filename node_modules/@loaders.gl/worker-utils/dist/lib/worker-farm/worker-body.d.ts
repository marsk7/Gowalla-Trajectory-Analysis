import type { WorkerMessageType, WorkerMessagePayload } from "../../types.js";
/**
 * Type safe wrapper for worker code
 */
export default class WorkerBody {
    /** Check that we are actually in a worker thread */
    static inWorkerThread(): Promise<boolean>;
    static set onmessage(onMessage: (type: WorkerMessageType, payload: WorkerMessagePayload) => any);
    static addEventListener(onMessage: (type: WorkerMessageType, payload: WorkerMessagePayload) => any): Promise<void>;
    static removeEventListener(onMessage: (type: WorkerMessageType, payload: WorkerMessagePayload) => any): Promise<void>;
    /**
     * Send a message from a worker to creating thread (main thread)
     * @param type
     * @param payload
     */
    static postMessage(type: WorkerMessageType, payload: WorkerMessagePayload): Promise<void>;
}
//# sourceMappingURL=worker-body.d.ts.map