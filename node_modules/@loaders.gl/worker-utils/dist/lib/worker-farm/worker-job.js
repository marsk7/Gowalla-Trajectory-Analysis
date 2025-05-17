// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { assert } from "../env-utils/assert.js";
/**
 * Represents one Job handled by a WorkerPool or WorkerFarm
 */
export default class WorkerJob {
    name;
    workerThread;
    isRunning = true;
    /** Promise that resolves when Job is done */
    result;
    _resolve = () => { };
    _reject = () => { };
    constructor(jobName, workerThread) {
        this.name = jobName;
        this.workerThread = workerThread;
        this.result = new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
    /**
     * Send a message to the job's worker thread
     * @param data any data structure, ideally consisting mostly of transferrable objects
     */
    postMessage(type, payload) {
        this.workerThread.postMessage({
            source: 'loaders.gl', // Lets worker ignore unrelated messages
            type,
            payload
        });
    }
    /**
     * Call to resolve the `result` Promise with the supplied value
     */
    done(value) {
        assert(this.isRunning);
        this.isRunning = false;
        this._resolve(value);
    }
    /**
     * Call to reject the `result` Promise with the supplied error
     */
    error(error) {
        assert(this.isRunning);
        this.isRunning = false;
        this._reject(error);
    }
}
