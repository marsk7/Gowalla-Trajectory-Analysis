// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export { parseFromContext, parseSyncFromContext, parseInBatchesFromContext } from "./loader-types.js";
// GENERAL UTILS
export { assert } from "./lib/env-utils/assert.js";
export { isBrowser, isWorker, nodeVersion, self, window, global, document } from "./lib/env-utils/globals.js";
export { log } from "./lib/log-utils/log.js";
// Options and modules
export { mergeLoaderOptions } from "./lib/option-utils/merge-loader-options.js";
export { registerJSModules } from "./lib/module-utils/js-module-utils.js";
export { checkJSModule, getJSModule, getJSModuleOrNull } from "./lib/module-utils/js-module-utils.js";
// LOADERS.GL-SPECIFIC WORKER UTILS
export { createLoaderWorker } from "./lib/worker-loader-utils/create-loader-worker.js";
export { parseWithWorker, canParseWithWorker } from "./lib/worker-loader-utils/parse-with-worker.js";
export { canEncodeWithWorker } from "./lib/worker-loader-utils/encode-with-worker.js";
// PARSER UTILS
export { parseJSON } from "./lib/parser-utils/parse-json.js";
// MEMORY COPY UTILS
export { sliceArrayBuffer, concatenateArrayBuffers, concatenateArrayBuffersFromArray, concatenateTypedArrays, compareArrayBuffers } from "./lib/binary-utils/array-buffer-utils.js";
export { padToNBytes, copyToArray, copyArrayBuffer } from "./lib/binary-utils/memory-copy-utils.js";
export { padStringToByteAlignment, copyStringToDataView, copyBinaryToDataView, copyPaddedArrayBufferToDataView, copyPaddedStringToDataView } from "./lib/binary-utils/dataview-copy-utils.js";
export { getFirstCharacters, getMagicString } from "./lib/binary-utils/get-first-characters.js";
// ITERATOR UTILS
export { makeTextEncoderIterator, makeTextDecoderIterator, makeLineIterator, makeNumberedLineIterator } from "./lib/iterators/text-iterators.js";
export { forEach, concatenateArrayBuffersAsync } from "./lib/iterators/async-iteration.js";
// REQUEST UTILS
export { default as RequestScheduler } from "./lib/request-utils/request-scheduler.js";
// PATH HELPERS
export { setPathPrefix, getPathPrefix, resolvePath } from "./lib/path-utils/file-aliases.js";
export { addAliases as _addAliases } from "./lib/path-utils/file-aliases.js";
// MICRO LOADERS
export { JSONLoader } from "./json-loader.js";
// NODE support
// Node.js emulation (can be used in browser)
// Avoid direct use of `Buffer` which pulls in 50KB polyfill
export { isBuffer, toBuffer, toArrayBuffer } from "./lib/binary-utils/memory-conversion-utils.js";
// Note.js wrappers (can be safely imported, but not used in browser)
// Use instead of importing 'util' to avoid node dependencies
export { promisify1, promisify2 } from "./lib/node/promisify.js";
// `path` replacement (avoids bundling big path polyfill)
import * as path from "./lib/path-utils/path.js";
export { path };
// Use instead of importing 'stream' to avoid node dependencies`
import * as stream from "./lib/node/stream.js";
export { stream };
export { BlobFile } from "./lib/files/blob-file.js";
export { HttpFile } from "./lib/files/http-file.js";
export { NodeFileFacade as NodeFile } from "./lib/files/node-file-facade.js";
export { NodeFileSystemFacade as NodeFilesystem } from "./lib/filesystems/node-filesystem-facade.js";
export { isFileProvider } from "./lib/file-provider/file-provider-interface.js";
export { FileProvider } from "./lib/file-provider/file-provider.js";
export { FileHandleFile } from "./lib/file-provider/file-handle-file.js";
export { DataViewFile } from "./lib/file-provider/data-view-file.js";
export { DataSource } from "./lib/sources/data-source.js";
export { ImageSource } from "./lib/sources/image-source.js";
export { VectorSource } from "./lib/sources/vector-source.js";
