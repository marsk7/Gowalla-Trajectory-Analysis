// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { isMobile, isBrowser } from "../env-utils/globals.js";
import WorkerThread from "./worker-thread.js";
import WorkerJob from "./worker-job.js";
/**
 * Process multiple data messages with small pool of identical workers
 */
export default class WorkerPool {
    name = 'unnamed';
    source; // | Function;
    url;
    maxConcurrency = 1;
    maxMobileConcurrency = 1;
    onDebug = () => { };
    reuseWorkers = true;
    props = {};
    jobQueue = [];
    idleQueue = [];
    count = 0;
    isDestroyed = false;
    /** Checks if workers are supported on this platform */
    static isSupported() {
        return WorkerThread.isSupported();
    }
    /**
     * @param processor - worker function
     * @param maxConcurrency - max count of workers
     */
    constructor(props) {
        this.source = props.source;
        this.url = props.url;
        this.setProps(props);
    }
    /**
     * Terminates all workers in the pool
     * @note Can free up significant memory
     */
    destroy() {
        // Destroy idle workers, active Workers will be destroyed on completion
        this.idleQueue.forEach((worker) => worker.destroy());
        this.isDestroyed = true;
    }
    setProps(props) {
        this.props = { ...this.props, ...props };
        if (props.name !== undefined) {
            this.name = props.name;
        }
        if (props.maxConcurrency !== undefined) {
            this.maxConcurrency = props.maxConcurrency;
        }
        if (props.maxMobileConcurrency !== undefined) {
            this.maxMobileConcurrency = props.maxMobileConcurrency;
        }
        if (props.reuseWorkers !== undefined) {
            this.reuseWorkers = props.reuseWorkers;
        }
        if (props.onDebug !== undefined) {
            this.onDebug = props.onDebug;
        }
    }
    async startJob(name, onMessage = (job, type, data) => job.done(data), onError = (job, error) => job.error(error)) {
        // Promise resolves when thread starts working on this job
        const startPromise = new Promise((onStart) => {
            // Promise resolves when thread completes or fails working on this job
            this.jobQueue.push({ name, onMessage, onError, onStart });
            return this;
        });
        this._startQueuedJob(); // eslint-disable-line @typescript-eslint/no-floating-promises
        return await startPromise;
    }
    // PRIVATE
    /**
     * Starts first queued job if worker is available or can be created
     * Called when job is started and whenever a worker returns to the idleQueue
     */
    async _startQueuedJob() {
        if (!this.jobQueue.length) {
            return;
        }
        const workerThread = this._getAvailableWorker();
        if (!workerThread) {
            return;
        }
        // We have a worker, dequeue and start the job
        const queuedJob = this.jobQueue.shift();
        if (queuedJob) {
            // Emit a debug event
            // @ts-ignore
            this.onDebug({
                message: 'Starting job',
                name: queuedJob.name,
                workerThread,
                backlog: this.jobQueue.length
            });
            // Create a worker job to let the app access thread and manage job completion
            const job = new WorkerJob(queuedJob.name, workerThread);
            // Set the worker thread's message handlers
            workerThread.onMessage = (data) => queuedJob.onMessage(job, data.type, data.payload);
            workerThread.onError = (error) => queuedJob.onError(job, error);
            // Resolve the start promise so that the app can start sending messages to worker
            queuedJob.onStart(job);
            // Wait for the app to signal that the job is complete, then return worker to queue
            try {
                await job.result;
            }
            catch (error) {
                // eslint-disable-next-line no-console
                console.error(`Worker exception: ${error}`);
            }
            finally {
                this.returnWorkerToQueue(workerThread);
            }
        }
    }
    /**
     * Returns a worker to the idle queue
     * Destroys the worker if
     *  - pool is destroyed
     *  - if this pool doesn't reuse workers
     *  - if maxConcurrency has been lowered
     * @param worker
     */
    returnWorkerToQueue(worker) {
        const shouldDestroyWorker = 
        // Workers on Node.js prevent the process from exiting.
        // Until we figure out how to close them before exit, we always destroy them
        !isBrowser ||
            // If the pool is destroyed, there is no reason to keep the worker around
            this.isDestroyed ||
            // If the app has disabled worker reuse, any completed workers should be destroyed
            !this.reuseWorkers ||
            // If concurrency has been lowered, this worker might be surplus to requirements
            this.count > this._getMaxConcurrency();
        if (shouldDestroyWorker) {
            worker.destroy();
            this.count--;
        }
        else {
            this.idleQueue.push(worker);
        }
        if (!this.isDestroyed) {
            this._startQueuedJob(); // eslint-disable-line @typescript-eslint/no-floating-promises
        }
    }
    /**
     * Returns idle worker or creates new worker if maxConcurrency has not been reached
     */
    _getAvailableWorker() {
        // If a worker has completed and returned to the queue, it can be used
        if (this.idleQueue.length > 0) {
            return this.idleQueue.shift() || null;
        }
        // Create fresh worker if we haven't yet created the max amount of worker threads for this worker source
        if (this.count < this._getMaxConcurrency()) {
            this.count++;
            const name = `${this.name.toLowerCase()} (#${this.count} of ${this.maxConcurrency})`;
            return new WorkerThread({ name, source: this.source, url: this.url });
        }
        // No worker available, have to wait
        return null;
    }
    _getMaxConcurrency() {
        return isMobile ? this.maxMobileConcurrency : this.maxConcurrency;
    }
}
