// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export { Compression } from "./lib/compression.js";
export { NoCompression } from "./lib/no-compression.js";
export { DeflateCompression } from "./lib/deflate-compression.js";
export { GZipCompression } from "./lib/gzip-compression.js";
export { BrotliCompression } from "./lib/brotli-compression.js";
export { SnappyCompression } from "./lib/snappy-compression.js";
export { LZ4Compression } from "./lib/lz4-compression.js";
export { ZstdCompression } from "./lib/zstd-compression.js";
export { LZOCompression } from "./lib/lzo-compression.js";
export { CompressionWorker, compressOnWorker } from "./compress-on-worker.js";
