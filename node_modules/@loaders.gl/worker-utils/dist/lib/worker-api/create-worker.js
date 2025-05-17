// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import AsyncQueue from "../async-queue/async-queue.js";
import WorkerBody from "../worker-farm/worker-body.js";
// import {validateWorkerVersion} from './validate-worker-version';
/** Counter for jobs */
let requestId = 0;
let inputBatches;
let options;
/**
 * Set up a WebWorkerGlobalScope to talk with the main thread
 */
export async function createWorker(process, processInBatches) {
    if (!(await WorkerBody.inWorkerThread())) {
        return;
    }
    const context = {
        process: processOnMainThread
    };
    // eslint-disable-next-line complexity
    WorkerBody.onmessage = async (type, payload) => {
        try {
            switch (type) {
                case 'process':
                    if (!process) {
                        throw new Error('Worker does not support atomic processing');
                    }
                    const result = await process(payload.input, payload.options || {}, context);
                    WorkerBody.postMessage('done', { result });
                    break;
                case 'process-in-batches':
                    if (!processInBatches) {
                        throw new Error('Worker does not support batched processing');
                    }
                    inputBatches = new AsyncQueue();
                    options = payload.options || {};
                    const resultIterator = processInBatches(inputBatches, options, context);
                    for await (const batch of resultIterator) {
                        WorkerBody.postMessage('output-batch', { result: batch });
                    }
                    WorkerBody.postMessage('done', {});
                    break;
                case 'input-batch':
                    inputBatches.push(payload.input);
                    break;
                case 'input-done':
                    inputBatches.close();
                    break;
                default:
            }
        }
        catch (error) {
            const message = error instanceof Error ? error.message : '';
            WorkerBody.postMessage('error', { error: message });
        }
    };
}
function processOnMainThread(arrayBuffer, options = {}) {
    return new Promise((resolve, reject) => {
        const id = requestId++;
        /**
         */
        const onMessage = (type, payload) => {
            if (payload.id !== id) {
                // not ours
                return;
            }
            switch (type) {
                case 'done':
                    WorkerBody.removeEventListener(onMessage);
                    resolve(payload.result);
                    break;
                case 'error':
                    WorkerBody.removeEventListener(onMessage);
                    reject(payload.error);
                    break;
                default:
                // ignore
            }
        };
        WorkerBody.addEventListener(onMessage);
        // Ask the main thread to decode data
        const payload = { id, input: arrayBuffer, options };
        WorkerBody.postMessage('process', payload);
    });
}
