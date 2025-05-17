"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/lib/async-queue/async-queue.ts
var AsyncQueue = class {
  _values;
  _settlers;
  _closed;
  constructor() {
    this._values = [];
    this._settlers = [];
    this._closed = false;
  }
  /** Return an async iterator for this queue */
  [Symbol.asyncIterator]() {
    return this;
  }
  /** Push a new value - the async iterator will yield a promise resolved to this value */
  push(value) {
    return this.enqueue(value);
  }
  /**
   * Push a new value - the async iterator will yield a promise resolved to this value
   * Add an error - the async iterator will yield a promise rejected with this value
   */
  enqueue(value) {
    if (this._closed) {
      throw new Error("Closed");
    }
    if (this._settlers.length > 0) {
      if (this._values.length > 0) {
        throw new Error("Illegal internal state");
      }
      const settler = this._settlers.shift();
      if (value instanceof Error) {
        settler.reject(value);
      } else {
        settler.resolve({ value });
      }
    } else {
      this._values.push(value);
    }
  }
  /** Indicate that we not waiting for more values - The async iterator will be done */
  close() {
    while (this._settlers.length > 0) {
      const settler = this._settlers.shift();
      settler.resolve({ done: true });
    }
    this._closed = true;
  }
  // ITERATOR IMPLEMENTATION
  /** @returns a Promise for an IteratorResult */
  next() {
    if (this._values.length > 0) {
      const value = this._values.shift();
      if (value instanceof Error) {
        return Promise.reject(value);
      }
      return Promise.resolve({ done: false, value });
    }
    if (this._closed) {
      if (this._settlers.length > 0) {
        throw new Error("Illegal internal state");
      }
      return Promise.resolve({ done: true, value: void 0 });
    }
    return new Promise((resolve, reject) => {
      this._settlers.push({ resolve, reject });
    });
  }
};

// src/lib/worker-utils/get-transfer-list.ts
function getTransferList(object, recursive = true, transfers) {
  const transfersSet = transfers || /* @__PURE__ */ new Set();
  if (!object) {
  } else if (isTransferable(object)) {
    transfersSet.add(object);
  } else if (isTransferable(object.buffer)) {
    transfersSet.add(object.buffer);
  } else if (ArrayBuffer.isView(object)) {
  } else if (recursive && typeof object === "object") {
    for (const key in object) {
      getTransferList(object[key], recursive, transfersSet);
    }
  }
  return transfers === void 0 ? Array.from(transfersSet) : [];
}
function isTransferable(object) {
  if (!object) {
    return false;
  }
  if (object instanceof ArrayBuffer) {
    return true;
  }
  if (typeof MessagePort !== "undefined" && object instanceof MessagePort) {
    return true;
  }
  if (typeof ImageBitmap !== "undefined" && object instanceof ImageBitmap) {
    return true;
  }
  if (typeof OffscreenCanvas !== "undefined" && object instanceof OffscreenCanvas) {
    return true;
  }
  return false;
}

// src/lib/node/worker_threads.ts
var worker_threads_exports = {};
__export(worker_threads_exports, {
  NodeWorker: () => NodeWorker,
  parentPort: () => parentPort
});
var WorkerThreads = __toESM(require("worker_threads"), 1);
__reExport(worker_threads_exports, require("worker_threads"));
var parentPort = WorkerThreads == null ? void 0 : WorkerThreads.parentPort;
var NodeWorker = WorkerThreads.Worker;

// src/lib/worker-farm/worker-body.ts
async function getParentPort() {
  return parentPort;
}
var onMessageWrapperMap = /* @__PURE__ */ new Map();
var WorkerBody = class {
  /** Check that we are actually in a worker thread */
  static async inWorkerThread() {
    return typeof self !== "undefined" || Boolean(await getParentPort());
  }
  /*
   * (type: WorkerMessageType, payload: WorkerMessagePayload) => any
   */
  static set onmessage(onMessage) {
    async function handleMessage(message) {
      const parentPort2 = await getParentPort();
      const { type, payload } = parentPort2 ? message : message.data;
      onMessage(type, payload);
    }
    getParentPort().then((parentPort2) => {
      if (parentPort2) {
        parentPort2.on("message", (message) => {
          handleMessage(message);
        });
        parentPort2.on("exit", () => console.debug("Node worker closing"));
      } else {
        globalThis.onmessage = handleMessage;
      }
    });
  }
  static async addEventListener(onMessage) {
    let onMessageWrapper = onMessageWrapperMap.get(onMessage);
    if (!onMessageWrapper) {
      onMessageWrapper = async (message) => {
        if (!isKnownMessage(message)) {
          return;
        }
        const parentPort3 = await getParentPort();
        const { type, payload } = parentPort3 ? message : message.data;
        onMessage(type, payload);
      };
    }
    const parentPort2 = await getParentPort();
    if (parentPort2) {
      console.error("not implemented");
    } else {
      globalThis.addEventListener("message", onMessageWrapper);
    }
  }
  static async removeEventListener(onMessage) {
    const onMessageWrapper = onMessageWrapperMap.get(onMessage);
    onMessageWrapperMap.delete(onMessage);
    const parentPort2 = await getParentPort();
    if (parentPort2) {
      console.error("not implemented");
    } else {
      globalThis.removeEventListener("message", onMessageWrapper);
    }
  }
  /**
   * Send a message from a worker to creating thread (main thread)
   * @param type
   * @param payload
   */
  static async postMessage(type, payload) {
    const data = { source: "loaders.gl", type, payload };
    const transferList = getTransferList(payload);
    const parentPort2 = await getParentPort();
    if (parentPort2) {
      parentPort2.postMessage(data, transferList);
    } else {
      globalThis.postMessage(data, transferList);
    }
  }
};
function isKnownMessage(message) {
  const { type, data } = message;
  return type === "message" && data && typeof data.source === "string" && data.source.startsWith("loaders.gl");
}

// src/lib/worker-api/create-worker.ts
var requestId = 0;
var inputBatches;
var options;
async function createWorker(process, processInBatches) {
  if (!await WorkerBody.inWorkerThread()) {
    return;
  }
  const context = {
    process: processOnMainThread
  };
  WorkerBody.onmessage = async (type, payload) => {
    try {
      switch (type) {
        case "process":
          if (!process) {
            throw new Error("Worker does not support atomic processing");
          }
          const result = await process(payload.input, payload.options || {}, context);
          WorkerBody.postMessage("done", { result });
          break;
        case "process-in-batches":
          if (!processInBatches) {
            throw new Error("Worker does not support batched processing");
          }
          inputBatches = new AsyncQueue();
          options = payload.options || {};
          const resultIterator = processInBatches(inputBatches, options, context);
          for await (const batch of resultIterator) {
            WorkerBody.postMessage("output-batch", { result: batch });
          }
          WorkerBody.postMessage("done", {});
          break;
        case "input-batch":
          inputBatches.push(payload.input);
          break;
        case "input-done":
          inputBatches.close();
          break;
        default:
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      WorkerBody.postMessage("error", { error: message });
    }
  };
}
function processOnMainThread(arrayBuffer, options2 = {}) {
  return new Promise((resolve, reject) => {
    const id = requestId++;
    const onMessage = (type, payload2) => {
      if (payload2.id !== id) {
        return;
      }
      switch (type) {
        case "done":
          WorkerBody.removeEventListener(onMessage);
          resolve(payload2.result);
          break;
        case "error":
          WorkerBody.removeEventListener(onMessage);
          reject(payload2.error);
          break;
        default:
      }
    };
    WorkerBody.addEventListener(onMessage);
    const payload = { id, input: arrayBuffer, options: options2 };
    WorkerBody.postMessage("process", payload);
  });
}

// src/workers/null-worker.ts
createWorker(async (data) => {
  return data;
});
//# sourceMappingURL=null-worker-node.js.map
