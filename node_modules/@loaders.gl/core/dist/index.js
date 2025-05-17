// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// FILE READING AND WRITING
export { fetchFile } from "./lib/fetch/fetch-file.js";
export { FetchError } from "./lib/fetch/fetch-error.js";
export { readArrayBuffer } from "./lib/fetch/read-array-buffer.js";
// export {readFileSync} from './lib/fetch/read-file';
// export {writeFile, writeFileSync} from './lib/fetch/write-file';
// CONFIGURATION
export { setLoaderOptions, getLoaderOptions } from "./lib/api/loader-options.js";
export { registerLoaders } from "./lib/api/register-loaders.js";
export { selectLoader, selectLoaderSync } from "./lib/api/select-loader.js";
// LOADING (READING + PARSING)
export { parse } from "./lib/api/parse.js";
export { parseSync } from "./lib/api/parse-sync.js";
export { parseInBatches } from "./lib/api/parse-in-batches.js";
export { load } from "./lib/api/load.js";
export { loadInBatches } from "./lib/api/load-in-batches.js";
// ENCODING (ENCODING AND WRITING)
export { encodeTable, encodeTableAsText, encodeTableInBatches } from "./lib/api/encode-table.js";
export { encode, encodeSync, encodeInBatches, encodeURLtoURL } from "./lib/api/encode.js";
export { encodeText, encodeTextSync } from "./lib/api/encode.js";
// SERVICES AND SOURCES
export { createDataSource } from "./lib/api/create-data-source.js";
export { selectSource as _selectSource } from "./lib/api/select-source.js";
// CORE UTILS SHARED WITH LOADERS (RE-EXPORTED FROM LOADER-UTILS)
export { setPathPrefix, getPathPrefix, resolvePath } from '@loaders.gl/loader-utils';
export { RequestScheduler } from '@loaders.gl/loader-utils';
// ITERATOR UTILS
export { makeIterator } from "./iterators/make-iterator/make-iterator.js";
export { makeStream } from "./iterators/make-stream/make-stream.js";
// CORE LOADERS
export { NullWorkerLoader, NullLoader } from "./null-loader.js";
export { JSONLoader } from '@loaders.gl/loader-utils';
// EXPERIMENTAL
export { fetchProgress as _fetchProgress } from "./lib/progress/fetch-progress.js";
export { BrowserFileSystem as _BrowserFileSystem } from "./lib/filesystems/browser-filesystem.js";
// FOR TESTING
export { _unregisterLoaders } from "./lib/api/register-loaders.js";
//
// TODO - MOVE TO LOADER-UTILS AND DEPRECATE IN CORE?
//
export { isBrowser, isWorker, self, window, global, document } from '@loaders.gl/loader-utils';
export { assert } from '@loaders.gl/loader-utils';
export { forEach, concatenateArrayBuffersAsync } from '@loaders.gl/loader-utils';
export { makeTextDecoderIterator, makeTextEncoderIterator, makeLineIterator, makeNumberedLineIterator } from '@loaders.gl/loader-utils';
// "JAVASCRIPT" UTILS - move to loader-utils?
export { isPureObject, isPromise, isIterable, isAsyncIterable, isIterator, isResponse, isReadableStream, isWritableStream } from "./javascript-utils/is-type.js";
