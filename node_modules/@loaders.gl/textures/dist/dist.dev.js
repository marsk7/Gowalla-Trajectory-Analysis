(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
        else if (typeof exports === 'object') exports['loaders'] = factory();
  else root['loaders'] = factory();})(globalThis, function () {
"use strict";
var __exports__ = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // external-global-plugin:@loaders.gl/core
  var require_core = __commonJS({
    "external-global-plugin:@loaders.gl/core"(exports, module) {
      module.exports = globalThis.loaders;
    }
  });

  // (disabled):../worker-utils/src/lib/process-utils/child-process-proxy
  var require_child_process_proxy = __commonJS({
    "(disabled):../worker-utils/src/lib/process-utils/child-process-proxy"() {
      "use strict";
    }
  });

  // bundle.ts
  var bundle_exports = {};
  __export(bundle_exports, {
    BASIS_EXTERNAL_LIBRARIES: () => BASIS_EXTERNAL_LIBRARIES,
    BasisLoader: () => BasisLoader,
    BasisWorkerLoader: () => BasisWorkerLoader,
    CRUNCH_EXTERNAL_LIBRARIES: () => CRUNCH_EXTERNAL_LIBRARIES,
    CompressedTextureLoader: () => CompressedTextureLoader,
    CompressedTextureWorkerLoader: () => CompressedTextureWorkerLoader,
    CompressedTextureWriter: () => CompressedTextureWriter,
    CrunchLoader: () => CrunchLoader,
    CrunchWorkerLoader: () => CrunchLoader,
    GL_EXTENSIONS_CONSTANTS: () => GL_EXTENSIONS_CONSTANTS,
    KTX2BasisWriter: () => KTX2BasisWriter,
    KTX2BasisWriterWorker: () => KTX2BasisWriterWorker,
    NPYLoader: () => NPYLoader,
    NPYWorkerLoader: () => NPYWorkerLoader,
    getSupportedGPUTextureFormats: () => getSupportedGPUTextureFormats,
    loadImageTexture: () => loadImageTexture,
    loadImageTextureArray: () => loadImageTextureArray,
    loadImageTextureCube: () => loadImageTextureCube,
    selectSupportedBasisFormat: () => selectSupportedBasisFormat
  });
  __reExport(bundle_exports, __toESM(require_core(), 1));

  // src/lib/utils/version.ts
  var VERSION = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // ../loader-utils/src/lib/env-utils/assert.ts
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || "loader assertion failed.");
    }
  }

  // ../loader-utils/src/lib/env-utils/globals.ts
  var globals = {
    self: typeof self !== "undefined" && self,
    window: typeof window !== "undefined" && window,
    global: typeof global !== "undefined" && global,
    document: typeof document !== "undefined" && document
  };
  var self_ = globals.self || globals.window || globals.global || {};
  var window_ = globals.window || globals.self || globals.global || {};
  var global_ = globals.global || globals.self || globals.window || {};
  var document_ = globals.document || {};
  var isBrowser = (
    // @ts-ignore process does not exist on browser
    Boolean(typeof process !== "object" || String(process) !== "[object process]" || process.browser)
  );
  var matches = typeof process !== "undefined" && process.version && /v([0-9]*)/.exec(process.version);
  var nodeVersion = matches && parseFloat(matches[1]) || 0;

  // ../loader-utils/src/lib/module-utils/js-module-utils.ts
  function registerJSModules(modules) {
    globalThis.loaders ||= {};
    globalThis.loaders.modules ||= {};
    Object.assign(globalThis.loaders.modules, modules);
  }
  function getJSModuleOrNull(name) {
    const module = globalThis.loaders?.modules?.[name];
    return module || null;
  }

  // ../worker-utils/src/lib/env-utils/version.ts
  var NPM_TAG = "latest";
  function getVersion() {
    if (!globalThis._loadersgl_?.version) {
      globalThis._loadersgl_ = globalThis._loadersgl_ || {};
      if (typeof __VERSION__ === "undefined") {
        console.warn(
          "loaders.gl: The __VERSION__ variable is not injected using babel plugin. Latest unstable workers would be fetched from the CDN."
        );
        globalThis._loadersgl_.version = NPM_TAG;
      } else {
        globalThis._loadersgl_.version = __VERSION__;
      }
    }
    return globalThis._loadersgl_.version;
  }
  var VERSION2 = getVersion();

  // ../worker-utils/src/lib/env-utils/assert.ts
  function assert2(condition, message) {
    if (!condition) {
      throw new Error(message || "loaders.gl assertion failed.");
    }
  }

  // ../worker-utils/src/lib/env-utils/globals.ts
  var globals2 = {
    self: typeof self !== "undefined" && self,
    window: typeof window !== "undefined" && window,
    global: typeof global !== "undefined" && global,
    document: typeof document !== "undefined" && document
  };
  var self_2 = globals2.self || globals2.window || globals2.global || {};
  var window_2 = globals2.window || globals2.self || globals2.global || {};
  var global_2 = globals2.global || globals2.self || globals2.window || {};
  var document_2 = globals2.document || {};
  var isBrowser2 = (
    // @ts-ignore process.browser
    typeof process !== "object" || String(process) !== "[object process]" || process.browser
  );
  var isWorker = typeof importScripts === "function";
  var isMobile = typeof window !== "undefined" && typeof window.orientation !== "undefined";
  var matches2 = typeof process !== "undefined" && process.version && /v([0-9]*)/.exec(process.version);
  var nodeVersion2 = matches2 && parseFloat(matches2[1]) || 0;

  // ../worker-utils/src/lib/library-utils/library-utils.ts
  var loadLibraryPromises = {};
  async function loadLibrary(libraryUrl, moduleName = null, options = {}, libraryName = null) {
    if (moduleName) {
      libraryUrl = getLibraryUrl(libraryUrl, moduleName, options, libraryName);
    }
    loadLibraryPromises[libraryUrl] = // eslint-disable-next-line @typescript-eslint/no-misused-promises
    loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
    return await loadLibraryPromises[libraryUrl];
  }
  function getLibraryUrl(library, moduleName, options = {}, libraryName = null) {
    if (!options.useLocalLibraries && library.startsWith("http")) {
      return library;
    }
    libraryName = libraryName || library;
    const modules = options.modules || {};
    if (modules[libraryName]) {
      return modules[libraryName];
    }
    if (!isBrowser2) {
      return `modules/${moduleName}/dist/libs/${libraryName}`;
    }
    if (options.CDN) {
      assert2(options.CDN.startsWith("http"));
      return `${options.CDN}/${moduleName}@${VERSION2}/dist/libs/${libraryName}`;
    }
    if (isWorker) {
      return `../src/libs/${libraryName}`;
    }
    return `modules/${moduleName}/src/libs/${libraryName}`;
  }
  async function loadLibraryFromFile(libraryUrl) {
    if (libraryUrl.endsWith("wasm")) {
      return await loadAsArrayBuffer(libraryUrl);
    }
    if (!isBrowser2) {
      try {
        const { requireFromFile } = globalThis.loaders || {};
        return await requireFromFile?.(libraryUrl);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    if (isWorker) {
      return importScripts(libraryUrl);
    }
    const scriptSource = await loadAsText(libraryUrl);
    return loadLibraryFromString(scriptSource, libraryUrl);
  }
  function loadLibraryFromString(scriptSource, id) {
    if (!isBrowser2) {
      const { requireFromString } = globalThis.loaders || {};
      return requireFromString?.(scriptSource, id);
    }
    if (isWorker) {
      eval.call(globalThis, scriptSource);
      return null;
    }
    const script = document.createElement("script");
    script.id = id;
    try {
      script.appendChild(document.createTextNode(scriptSource));
    } catch (e) {
      script.text = scriptSource;
    }
    document.body.appendChild(script);
    return null;
  }
  async function loadAsArrayBuffer(url) {
    const { readFileAsArrayBuffer } = globalThis.loaders || {};
    if (isBrowser2 || !readFileAsArrayBuffer || url.startsWith("http")) {
      const response = await fetch(url);
      return await response.arrayBuffer();
    }
    return await readFileAsArrayBuffer(url);
  }
  async function loadAsText(url) {
    const { readFileAsText } = globalThis.loaders || {};
    if (isBrowser2 || !readFileAsText || url.startsWith("http")) {
      const response = await fetch(url);
      return await response.text();
    }
    return await readFileAsText(url);
  }

  // ../worker-utils/src/index.ts
  var import_child_process_proxy = __toESM(require_child_process_proxy(), 1);

  // ../loader-utils/src/lib/path-utils/file-aliases.ts
  var pathPrefix = "";
  var fileAliases = {};
  function resolvePath(filename) {
    for (const alias in fileAliases) {
      if (filename.startsWith(alias)) {
        const replacement = fileAliases[alias];
        filename = filename.replace(alias, replacement);
      }
    }
    if (!filename.startsWith("http://") && !filename.startsWith("https://")) {
      filename = `${pathPrefix}${filename}`;
    }
    return filename;
  }

  // src/lib/parsers/basis-module-loader.ts
  var BASIS_EXTERNAL_LIBRARIES = {
    /** Basis transcoder, javascript wrapper part */
    TRANSCODER: "basis_transcoder.js",
    /** Basis transcoder, compiled web assembly part */
    TRANSCODER_WASM: "basis_transcoder.wasm",
    /** Basis encoder, javascript wrapper part */
    ENCODER: "basis_encoder.js",
    /** Basis encoder, compiled web assembly part */
    ENCODER_WASM: "basis_encoder.wasm"
  };
  var loadBasisTranscoderPromise;
  async function loadBasisTranscoderModule(options) {
    registerJSModules(options.modules);
    const basis = getJSModuleOrNull("basis");
    if (basis) {
      return basis;
    }
    loadBasisTranscoderPromise ||= loadBasisTranscoder(options);
    return await loadBasisTranscoderPromise;
  }
  async function loadBasisTranscoder(options) {
    let BASIS = null;
    let wasmBinary = null;
    [BASIS, wasmBinary] = await Promise.all([
      await loadLibrary(BASIS_EXTERNAL_LIBRARIES.TRANSCODER, "textures", options),
      await loadLibrary(BASIS_EXTERNAL_LIBRARIES.TRANSCODER_WASM, "textures", options)
    ]);
    BASIS = BASIS || globalThis.BASIS;
    return await initializeBasisTranscoderModule(BASIS, wasmBinary);
  }
  function initializeBasisTranscoderModule(BasisModule, wasmBinary) {
    const options = {};
    if (wasmBinary) {
      options.wasmBinary = wasmBinary;
    }
    return new Promise((resolve) => {
      BasisModule(options).then((module) => {
        const { BasisFile, initializeBasis } = module;
        initializeBasis();
        resolve({ BasisFile });
      });
    });
  }
  var loadBasisEncoderPromise;
  async function loadBasisEncoderModule(options) {
    const modules = options.modules || {};
    if (modules.basisEncoder) {
      return modules.basisEncoder;
    }
    loadBasisEncoderPromise = loadBasisEncoderPromise || loadBasisEncoder(options);
    return await loadBasisEncoderPromise;
  }
  async function loadBasisEncoder(options) {
    let BASIS_ENCODER = null;
    let wasmBinary = null;
    [BASIS_ENCODER, wasmBinary] = await Promise.all([
      await loadLibrary(BASIS_EXTERNAL_LIBRARIES.ENCODER, "textures", options),
      await loadLibrary(BASIS_EXTERNAL_LIBRARIES.ENCODER_WASM, "textures", options)
    ]);
    BASIS_ENCODER = BASIS_ENCODER || globalThis.BASIS;
    return await initializeBasisEncoderModule(BASIS_ENCODER, wasmBinary);
  }
  function initializeBasisEncoderModule(BasisEncoderModule, wasmBinary) {
    const options = {};
    if (wasmBinary) {
      options.wasmBinary = wasmBinary;
    }
    return new Promise((resolve) => {
      BasisEncoderModule(options).then((module) => {
        const { BasisFile, KTX2File, initializeBasis, BasisEncoder } = module;
        initializeBasis();
        resolve({ BasisFile, KTX2File, BasisEncoder });
      });
    });
  }

  // src/lib/gl-extensions.ts
  var GL_EXTENSIONS_CONSTANTS = {
    // WEBGL_compressed_texture_s3tc
    COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
    COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
    COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
    COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
    // WEBGL_compressed_texture_es3
    COMPRESSED_R11_EAC: 37488,
    COMPRESSED_SIGNED_R11_EAC: 37489,
    COMPRESSED_RG11_EAC: 37490,
    COMPRESSED_SIGNED_RG11_EAC: 37491,
    COMPRESSED_RGB8_ETC2: 37492,
    COMPRESSED_RGBA8_ETC2_EAC: 37493,
    COMPRESSED_SRGB8_ETC2: 37494,
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37495,
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37496,
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37497,
    // WEBGL_compressed_texture_pvrtc
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
    // WEBGL_compressed_texture_etc1
    COMPRESSED_RGB_ETC1_WEBGL: 36196,
    // WEBGL_compressed_texture_atc
    COMPRESSED_RGB_ATC_WEBGL: 35986,
    COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL: 35987,
    COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL: 34798,
    // WEBGL_compressed_texture_astc
    COMPRESSED_RGBA_ASTC_4X4_KHR: 37808,
    COMPRESSED_RGBA_ASTC_5X4_KHR: 37809,
    COMPRESSED_RGBA_ASTC_5X5_KHR: 37810,
    COMPRESSED_RGBA_ASTC_6X5_KHR: 37811,
    COMPRESSED_RGBA_ASTC_6X6_KHR: 37812,
    COMPRESSED_RGBA_ASTC_8X5_KHR: 37813,
    COMPRESSED_RGBA_ASTC_8X6_KHR: 37814,
    COMPRESSED_RGBA_ASTC_8X8_KHR: 37815,
    COMPRESSED_RGBA_ASTC_10X5_KHR: 37816,
    COMPRESSED_RGBA_ASTC_10X6_KHR: 37817,
    COMPRESSED_RGBA_ASTC_10X8_KHR: 37818,
    COMPRESSED_RGBA_ASTC_10X10_KHR: 37819,
    COMPRESSED_RGBA_ASTC_12X10_KHR: 37820,
    COMPRESSED_RGBA_ASTC_12X12_KHR: 37821,
    COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR: 37840,
    COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR: 37841,
    COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR: 37842,
    COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR: 37843,
    COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR: 37844,
    COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR: 37845,
    COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR: 37846,
    COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR: 37847,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR: 37848,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR: 37849,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR: 37850,
    COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR: 37851,
    COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR: 37852,
    COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR: 37853,
    // EXT_texture_compression_rgtc
    COMPRESSED_RED_RGTC1_EXT: 36283,
    COMPRESSED_SIGNED_RED_RGTC1_EXT: 36284,
    COMPRESSED_RED_GREEN_RGTC2_EXT: 36285,
    COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT: 36286,
    // WEBGL_compressed_texture_s3tc_srgb
    COMPRESSED_SRGB_S3TC_DXT1_EXT: 35916,
    COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: 35917,
    COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: 35918,
    COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: 35919
  };

  // src/lib/utils/texture-formats.ts
  var BROWSER_PREFIXES = ["", "WEBKIT_", "MOZ_"];
  var WEBGL_EXTENSIONS = {
    /* eslint-disable camelcase */
    WEBGL_compressed_texture_s3tc: "dxt",
    WEBGL_compressed_texture_s3tc_srgb: "dxt-srgb",
    WEBGL_compressed_texture_etc1: "etc1",
    WEBGL_compressed_texture_etc: "etc2",
    WEBGL_compressed_texture_pvrtc: "pvrtc",
    WEBGL_compressed_texture_atc: "atc",
    WEBGL_compressed_texture_astc: "astc",
    EXT_texture_compression_rgtc: "rgtc"
    /* eslint-enable camelcase */
  };
  var formats = null;
  function getSupportedGPUTextureFormats(gl) {
    if (!formats) {
      gl = gl || getWebGLContext() || void 0;
      formats = /* @__PURE__ */ new Set();
      for (const prefix of BROWSER_PREFIXES) {
        for (const extension in WEBGL_EXTENSIONS) {
          if (gl && gl.getExtension(`${prefix}${extension}`)) {
            const gpuTextureFormat = WEBGL_EXTENSIONS[extension];
            formats.add(gpuTextureFormat);
          }
        }
      }
    }
    return formats;
  }
  function getWebGLContext() {
    try {
      const canvas = document.createElement("canvas");
      return canvas.getContext("webgl");
    } catch (error) {
      return null;
    }
  }

  // ../../node_modules/ktx-parse/dist/ktx-parse.modern.js
  var KHR_SUPERCOMPRESSION_NONE = 0;
  var KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT = 0;
  var KHR_DF_VENDORID_KHRONOS = 0;
  var KHR_DF_VERSION = 2;
  var KHR_DF_MODEL_UNSPECIFIED = 0;
  var KHR_DF_FLAG_ALPHA_STRAIGHT = 0;
  var KHR_DF_TRANSFER_SRGB = 2;
  var KHR_DF_PRIMARIES_BT709 = 1;
  var KHR_DF_SAMPLE_DATATYPE_SIGNED = 64;
  var VK_FORMAT_UNDEFINED = 0;
  var KTX2Container = class {
    constructor() {
      this.vkFormat = VK_FORMAT_UNDEFINED;
      this.typeSize = 1;
      this.pixelWidth = 0;
      this.pixelHeight = 0;
      this.pixelDepth = 0;
      this.layerCount = 0;
      this.faceCount = 1;
      this.supercompressionScheme = KHR_SUPERCOMPRESSION_NONE;
      this.levels = [];
      this.dataFormatDescriptor = [{
        vendorId: KHR_DF_VENDORID_KHRONOS,
        descriptorType: KHR_DF_KHR_DESCRIPTORTYPE_BASICFORMAT,
        descriptorBlockSize: 0,
        versionNumber: KHR_DF_VERSION,
        colorModel: KHR_DF_MODEL_UNSPECIFIED,
        colorPrimaries: KHR_DF_PRIMARIES_BT709,
        transferFunction: KHR_DF_TRANSFER_SRGB,
        flags: KHR_DF_FLAG_ALPHA_STRAIGHT,
        texelBlockDimension: [0, 0, 0, 0],
        bytesPlane: [0, 0, 0, 0, 0, 0, 0, 0],
        samples: []
      }];
      this.keyValue = {};
      this.globalData = null;
    }
  };
  var BufferReader = class {
    constructor(data, byteOffset, byteLength, littleEndian) {
      this._dataView = void 0;
      this._littleEndian = void 0;
      this._offset = void 0;
      this._dataView = new DataView(data.buffer, data.byteOffset + byteOffset, byteLength);
      this._littleEndian = littleEndian;
      this._offset = 0;
    }
    _nextUint8() {
      const value = this._dataView.getUint8(this._offset);
      this._offset += 1;
      return value;
    }
    _nextUint16() {
      const value = this._dataView.getUint16(this._offset, this._littleEndian);
      this._offset += 2;
      return value;
    }
    _nextUint32() {
      const value = this._dataView.getUint32(this._offset, this._littleEndian);
      this._offset += 4;
      return value;
    }
    _nextUint64() {
      const left = this._dataView.getUint32(this._offset, this._littleEndian);
      const right = this._dataView.getUint32(this._offset + 4, this._littleEndian);
      const value = left + 2 ** 32 * right;
      this._offset += 8;
      return value;
    }
    _nextInt32() {
      const value = this._dataView.getInt32(this._offset, this._littleEndian);
      this._offset += 4;
      return value;
    }
    _nextUint8Array(len) {
      const value = new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + this._offset, len);
      this._offset += len;
      return value;
    }
    _skip(bytes) {
      this._offset += bytes;
      return this;
    }
    _scan(maxByteLength, term = 0) {
      const byteOffset = this._offset;
      let byteLength = 0;
      while (this._dataView.getUint8(this._offset) !== term && byteLength < maxByteLength) {
        byteLength++;
        this._offset++;
      }
      if (byteLength < maxByteLength)
        this._offset++;
      return new Uint8Array(this._dataView.buffer, this._dataView.byteOffset + byteOffset, byteLength);
    }
  };
  var NUL = new Uint8Array([0]);
  var KTX2_ID = [
    // '´', 'K', 'T', 'X', '2', '0', 'ª', '\r', '\n', '\x1A', '\n'
    171,
    75,
    84,
    88,
    32,
    50,
    48,
    187,
    13,
    10,
    26,
    10
  ];
  function decodeText(buffer) {
    return new TextDecoder().decode(buffer);
  }
  function read(data) {
    const id = new Uint8Array(data.buffer, data.byteOffset, KTX2_ID.length);
    if (id[0] !== KTX2_ID[0] || // '´'
    id[1] !== KTX2_ID[1] || // 'K'
    id[2] !== KTX2_ID[2] || // 'T'
    id[3] !== KTX2_ID[3] || // 'X'
    id[4] !== KTX2_ID[4] || // ' '
    id[5] !== KTX2_ID[5] || // '2'
    id[6] !== KTX2_ID[6] || // '0'
    id[7] !== KTX2_ID[7] || // 'ª'
    id[8] !== KTX2_ID[8] || // '\r'
    id[9] !== KTX2_ID[9] || // '\n'
    id[10] !== KTX2_ID[10] || // '\x1A'
    id[11] !== KTX2_ID[11]) {
      throw new Error("Missing KTX 2.0 identifier.");
    }
    const container = new KTX2Container();
    const headerByteLength = 17 * Uint32Array.BYTES_PER_ELEMENT;
    const headerReader = new BufferReader(data, KTX2_ID.length, headerByteLength, true);
    container.vkFormat = headerReader._nextUint32();
    container.typeSize = headerReader._nextUint32();
    container.pixelWidth = headerReader._nextUint32();
    container.pixelHeight = headerReader._nextUint32();
    container.pixelDepth = headerReader._nextUint32();
    container.layerCount = headerReader._nextUint32();
    container.faceCount = headerReader._nextUint32();
    const levelCount = headerReader._nextUint32();
    container.supercompressionScheme = headerReader._nextUint32();
    const dfdByteOffset = headerReader._nextUint32();
    const dfdByteLength = headerReader._nextUint32();
    const kvdByteOffset = headerReader._nextUint32();
    const kvdByteLength = headerReader._nextUint32();
    const sgdByteOffset = headerReader._nextUint64();
    const sgdByteLength = headerReader._nextUint64();
    const levelByteLength = levelCount * 3 * 8;
    const levelReader = new BufferReader(data, KTX2_ID.length + headerByteLength, levelByteLength, true);
    for (let i = 0; i < levelCount; i++) {
      container.levels.push({
        levelData: new Uint8Array(data.buffer, data.byteOffset + levelReader._nextUint64(), levelReader._nextUint64()),
        uncompressedByteLength: levelReader._nextUint64()
      });
    }
    const dfdReader = new BufferReader(data, dfdByteOffset, dfdByteLength, true);
    const dfd = {
      vendorId: dfdReader._skip(
        4
        /* totalSize */
      )._nextUint16(),
      descriptorType: dfdReader._nextUint16(),
      versionNumber: dfdReader._nextUint16(),
      descriptorBlockSize: dfdReader._nextUint16(),
      colorModel: dfdReader._nextUint8(),
      colorPrimaries: dfdReader._nextUint8(),
      transferFunction: dfdReader._nextUint8(),
      flags: dfdReader._nextUint8(),
      texelBlockDimension: [dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8()],
      bytesPlane: [dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8()],
      samples: []
    };
    const sampleStart = 6;
    const sampleWords = 4;
    const numSamples = (dfd.descriptorBlockSize / 4 - sampleStart) / sampleWords;
    for (let i = 0; i < numSamples; i++) {
      const sample = {
        bitOffset: dfdReader._nextUint16(),
        bitLength: dfdReader._nextUint8(),
        channelType: dfdReader._nextUint8(),
        samplePosition: [dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8(), dfdReader._nextUint8()],
        sampleLower: -Infinity,
        sampleUpper: Infinity
      };
      if (sample.channelType & KHR_DF_SAMPLE_DATATYPE_SIGNED) {
        sample.sampleLower = dfdReader._nextInt32();
        sample.sampleUpper = dfdReader._nextInt32();
      } else {
        sample.sampleLower = dfdReader._nextUint32();
        sample.sampleUpper = dfdReader._nextUint32();
      }
      dfd.samples[i] = sample;
    }
    container.dataFormatDescriptor.length = 0;
    container.dataFormatDescriptor.push(dfd);
    const kvdReader = new BufferReader(data, kvdByteOffset, kvdByteLength, true);
    while (kvdReader._offset < kvdByteLength) {
      const keyValueByteLength = kvdReader._nextUint32();
      const keyData = kvdReader._scan(keyValueByteLength);
      const key = decodeText(keyData);
      container.keyValue[key] = kvdReader._nextUint8Array(keyValueByteLength - keyData.byteLength - 1);
      if (key.match(/^ktx/i)) {
        const text = decodeText(container.keyValue[key]);
        container.keyValue[key] = text.substring(0, text.lastIndexOf("\0"));
      }
      const kvPadding = keyValueByteLength % 4 ? 4 - keyValueByteLength % 4 : 0;
      kvdReader._skip(kvPadding);
    }
    if (sgdByteLength <= 0)
      return container;
    const sgdReader = new BufferReader(data, sgdByteOffset, sgdByteLength, true);
    const endpointCount = sgdReader._nextUint16();
    const selectorCount = sgdReader._nextUint16();
    const endpointsByteLength = sgdReader._nextUint32();
    const selectorsByteLength = sgdReader._nextUint32();
    const tablesByteLength = sgdReader._nextUint32();
    const extendedByteLength = sgdReader._nextUint32();
    const imageDescs = [];
    for (let i = 0; i < levelCount; i++) {
      imageDescs.push({
        imageFlags: sgdReader._nextUint32(),
        rgbSliceByteOffset: sgdReader._nextUint32(),
        rgbSliceByteLength: sgdReader._nextUint32(),
        alphaSliceByteOffset: sgdReader._nextUint32(),
        alphaSliceByteLength: sgdReader._nextUint32()
      });
    }
    const endpointsByteOffset = sgdByteOffset + sgdReader._offset;
    const selectorsByteOffset = endpointsByteOffset + endpointsByteLength;
    const tablesByteOffset = selectorsByteOffset + selectorsByteLength;
    const extendedByteOffset = tablesByteOffset + tablesByteLength;
    const endpointsData = new Uint8Array(data.buffer, data.byteOffset + endpointsByteOffset, endpointsByteLength);
    const selectorsData = new Uint8Array(data.buffer, data.byteOffset + selectorsByteOffset, selectorsByteLength);
    const tablesData = new Uint8Array(data.buffer, data.byteOffset + tablesByteOffset, tablesByteLength);
    const extendedData = new Uint8Array(data.buffer, data.byteOffset + extendedByteOffset, extendedByteLength);
    container.globalData = {
      endpointCount,
      selectorCount,
      imageDescs,
      endpointsData,
      selectorsData,
      tablesData,
      extendedData
    };
    return container;
  }

  // src/lib/utils/extract-mipmap-images.ts
  function extractMipmapImages(data, options) {
    const images = new Array(options.mipMapLevels);
    let levelWidth = options.width;
    let levelHeight = options.height;
    let offset = 0;
    for (let i = 0; i < options.mipMapLevels; ++i) {
      const levelSize = getLevelSize(options, levelWidth, levelHeight, data, i);
      const levelData = getLevelData(data, i, offset, levelSize);
      images[i] = {
        compressed: true,
        format: options.internalFormat,
        data: levelData,
        width: levelWidth,
        height: levelHeight,
        levelSize
      };
      levelWidth = Math.max(1, levelWidth >> 1);
      levelHeight = Math.max(1, levelHeight >> 1);
      offset += levelSize;
    }
    return images;
  }
  function getLevelData(data, index, offset, levelSize) {
    if (!Array.isArray(data)) {
      return new Uint8Array(data.buffer, data.byteOffset + offset, levelSize);
    }
    return data[index].levelData;
  }
  function getLevelSize(options, levelWidth, levelHeight, data, index) {
    if (!Array.isArray(data)) {
      return options.sizeFunction(levelWidth, levelHeight);
    }
    return options.sizeFunction(data[index]);
  }

  // src/lib/utils/ktx-format-helper.ts
  var VULKAN_TO_WEBGL_FORMAT_MAP = {
    131: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_S3TC_DXT1_EXT,
    132: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB_S3TC_DXT1_EXT,
    133: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT1_EXT,
    134: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
    135: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    136: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
    137: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
    138: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT,
    139: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RED_RGTC1_EXT,
    140: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SIGNED_RED_RGTC1_EXT,
    141: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RED_GREEN_RGTC2_EXT,
    142: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT,
    147: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB8_ETC2,
    148: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ETC2,
    149: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2,
    150: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2,
    151: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA8_ETC2_EAC,
    152: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC,
    153: GL_EXTENSIONS_CONSTANTS.COMPRESSED_R11_EAC,
    154: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SIGNED_R11_EAC,
    155: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RG11_EAC,
    156: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SIGNED_RG11_EAC,
    // @ts-ignore
    157: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_4x4_KHR,
    // @ts-ignore
    158: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR,
    // @ts-ignore
    159: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_5x4_KHR,
    // @ts-ignore
    160: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR,
    // @ts-ignore
    161: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_5x5_KHR,
    // @ts-ignore
    162: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR,
    // @ts-ignore
    163: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_6x5_KHR,
    // @ts-ignore
    164: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR,
    // @ts-ignore
    165: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_6x6_KHR,
    // @ts-ignore
    166: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR,
    // @ts-ignore
    167: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8x5_KHR,
    // @ts-ignore
    168: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR,
    // @ts-ignore
    169: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8x6_KHR,
    // @ts-ignore
    170: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR,
    // @ts-ignore
    171: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8x8_KHR,
    // @ts-ignore
    172: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR,
    // @ts-ignore
    173: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x5_KHR,
    // @ts-ignore
    174: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR,
    // @ts-ignore
    175: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x6_KHR,
    // @ts-ignore
    176: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR,
    // @ts-ignore
    177: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x8_KHR,
    // @ts-ignore
    178: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR,
    // @ts-ignore
    179: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x10_KHR,
    // @ts-ignore
    180: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR,
    // @ts-ignore
    181: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_12x10_KHR,
    // @ts-ignore
    182: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR,
    // @ts-ignore
    183: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_12x12_KHR,
    // @ts-ignore
    184: GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR,
    1000054e3: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG,
    1000054001: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG,
    // @ts-ignore
    1000066e3: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_4x4_KHR,
    // @ts-ignore
    1000066001: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_5x4_KHR,
    // @ts-ignore
    1000066002: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_5x5_KHR,
    // @ts-ignore
    1000066003: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_6x5_KHR,
    // @ts-ignore
    1000066004: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_6x6_KHR,
    // @ts-ignore
    1000066005: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8x5_KHR,
    // @ts-ignore
    1000066006: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8x6_KHR,
    // @ts-ignore
    1000066007: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8x8_KHR,
    // @ts-ignore
    1000066008: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x5_KHR,
    // @ts-ignore
    1000066009: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x6_KHR,
    // @ts-ignore
    1000066010: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x8_KHR,
    // @ts-ignore
    1000066011: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10x10_KHR,
    // @ts-ignore
    1000066012: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_12x10_KHR,
    // @ts-ignore
    1000066013: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_12x12_KHR
  };
  function mapVkFormatToWebGL(vkFormat) {
    return VULKAN_TO_WEBGL_FORMAT_MAP[vkFormat];
  }

  // src/lib/parsers/parse-ktx.ts
  var KTX2_ID2 = [
    // '´', 'K', 'T', 'X', '2', '0', 'ª', '\r', '\n', '\x1A', '\n'
    171,
    75,
    84,
    88,
    32,
    50,
    48,
    187,
    13,
    10,
    26,
    10
  ];
  function isKTX(data) {
    const id = new Uint8Array(data);
    const notKTX = id.byteLength < KTX2_ID2.length || id[0] !== KTX2_ID2[0] || // '´'
    id[1] !== KTX2_ID2[1] || // 'K'
    id[2] !== KTX2_ID2[2] || // 'T'
    id[3] !== KTX2_ID2[3] || // 'X'
    id[4] !== KTX2_ID2[4] || // ' '
    id[5] !== KTX2_ID2[5] || // '2'
    id[6] !== KTX2_ID2[6] || // '0'
    id[7] !== KTX2_ID2[7] || // 'ª'
    id[8] !== KTX2_ID2[8] || // '\r'
    id[9] !== KTX2_ID2[9] || // '\n'
    id[10] !== KTX2_ID2[10] || // '\x1A'
    id[11] !== KTX2_ID2[11];
    return !notKTX;
  }
  function parseKTX(arrayBuffer) {
    const uint8Array = new Uint8Array(arrayBuffer);
    const ktx = read(uint8Array);
    const mipMapLevels = Math.max(1, ktx.levels.length);
    const width = ktx.pixelWidth;
    const height = ktx.pixelHeight;
    const internalFormat = mapVkFormatToWebGL(ktx.vkFormat);
    return extractMipmapImages(ktx.levels, {
      mipMapLevels,
      width,
      height,
      sizeFunction: (level) => level.uncompressedByteLength,
      internalFormat
    });
  }

  // src/lib/parsers/parse-basis.ts
  var OutputFormat = {
    etc1: {
      basisFormat: 0,
      compressed: true,
      format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_ETC1_WEBGL
    },
    etc2: { basisFormat: 1, compressed: true },
    bc1: {
      basisFormat: 2,
      compressed: true,
      format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_S3TC_DXT1_EXT
    },
    bc3: {
      basisFormat: 3,
      compressed: true,
      format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT5_EXT
    },
    bc4: { basisFormat: 4, compressed: true },
    bc5: { basisFormat: 5, compressed: true },
    "bc7-m6-opaque-only": { basisFormat: 6, compressed: true },
    "bc7-m5": { basisFormat: 7, compressed: true },
    "pvrtc1-4-rgb": {
      basisFormat: 8,
      compressed: true,
      format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
    },
    "pvrtc1-4-rgba": {
      basisFormat: 9,
      compressed: true,
      format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
    },
    "astc-4x4": {
      basisFormat: 10,
      compressed: true,
      format: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_4X4_KHR
    },
    "atc-rgb": { basisFormat: 11, compressed: true },
    "atc-rgba-interpolated-alpha": { basisFormat: 12, compressed: true },
    rgba32: { basisFormat: 13, compressed: false },
    rgb565: { basisFormat: 14, compressed: false },
    bgr565: { basisFormat: 15, compressed: false },
    rgba4444: { basisFormat: 16, compressed: false }
  };
  async function parseBasis(data, options) {
    if (options.basis.containerFormat === "auto") {
      if (isKTX(data)) {
        const fileConstructors = await loadBasisEncoderModule(options);
        return parseKTX2File(fileConstructors.KTX2File, data, options);
      }
      const { BasisFile } = await loadBasisTranscoderModule(options);
      return parseBasisFile(BasisFile, data, options);
    }
    switch (options.basis.module) {
      case "encoder":
        const fileConstructors = await loadBasisEncoderModule(options);
        switch (options.basis.containerFormat) {
          case "ktx2":
            return parseKTX2File(fileConstructors.KTX2File, data, options);
          case "basis":
          default:
            return parseBasisFile(fileConstructors.BasisFile, data, options);
        }
      case "transcoder":
      default:
        const { BasisFile } = await loadBasisTranscoderModule(options);
        return parseBasisFile(BasisFile, data, options);
    }
  }
  function parseBasisFile(BasisFile, data, options) {
    const basisFile = new BasisFile(new Uint8Array(data));
    try {
      if (!basisFile.startTranscoding()) {
        throw new Error("Failed to start basis transcoding");
      }
      const imageCount = basisFile.getNumImages();
      const images = [];
      for (let imageIndex = 0; imageIndex < imageCount; imageIndex++) {
        const levelsCount = basisFile.getNumLevels(imageIndex);
        const levels = [];
        for (let levelIndex = 0; levelIndex < levelsCount; levelIndex++) {
          levels.push(transcodeImage(basisFile, imageIndex, levelIndex, options));
        }
        images.push(levels);
      }
      return images;
    } finally {
      basisFile.close();
      basisFile.delete();
    }
  }
  function transcodeImage(basisFile, imageIndex, levelIndex, options) {
    const width = basisFile.getImageWidth(imageIndex, levelIndex);
    const height = basisFile.getImageHeight(imageIndex, levelIndex);
    const hasAlpha = basisFile.getHasAlpha(
      /* imageIndex, levelIndex */
    );
    const { compressed, format, basisFormat } = getBasisOptions(options, hasAlpha);
    const decodedSize = basisFile.getImageTranscodedSizeInBytes(imageIndex, levelIndex, basisFormat);
    const decodedData = new Uint8Array(decodedSize);
    if (!basisFile.transcodeImage(decodedData, imageIndex, levelIndex, basisFormat, 0, 0)) {
      throw new Error("failed to start Basis transcoding");
    }
    return {
      // standard loaders.gl image category payload
      width,
      height,
      data: decodedData,
      compressed,
      format,
      // Additional fields
      // Add levelSize field.
      hasAlpha
    };
  }
  function parseKTX2File(KTX2File, data, options) {
    const ktx2File = new KTX2File(new Uint8Array(data));
    try {
      if (!ktx2File.startTranscoding()) {
        throw new Error("failed to start KTX2 transcoding");
      }
      const levelsCount = ktx2File.getLevels();
      const levels = [];
      for (let levelIndex = 0; levelIndex < levelsCount; levelIndex++) {
        levels.push(transcodeKTX2Image(ktx2File, levelIndex, options));
      }
      return [levels];
    } finally {
      ktx2File.close();
      ktx2File.delete();
    }
  }
  function transcodeKTX2Image(ktx2File, levelIndex, options) {
    const { alphaFlag, height, width } = ktx2File.getImageLevelInfo(levelIndex, 0, 0);
    const { compressed, format, basisFormat } = getBasisOptions(options, alphaFlag);
    const decodedSize = ktx2File.getImageTranscodedSizeInBytes(
      levelIndex,
      0,
      0,
      basisFormat
    );
    const decodedData = new Uint8Array(decodedSize);
    if (!ktx2File.transcodeImage(
      decodedData,
      levelIndex,
      0,
      0,
      basisFormat,
      0,
      -1,
      -1
      /* channel1 */
    )) {
      throw new Error("Failed to transcode KTX2 image");
    }
    return {
      // standard loaders.gl image category payload
      width,
      height,
      data: decodedData,
      compressed,
      // Additional fields
      levelSize: decodedSize,
      hasAlpha: alphaFlag,
      format
    };
  }
  function getBasisOptions(options, hasAlpha) {
    let format = options && options.basis && options.basis.format;
    if (format === "auto") {
      format = selectSupportedBasisFormat();
    }
    if (typeof format === "object") {
      format = hasAlpha ? format.alpha : format.noAlpha;
    }
    format = format.toLowerCase();
    return OutputFormat[format];
  }
  function selectSupportedBasisFormat() {
    const supportedFormats = getSupportedGPUTextureFormats();
    if (supportedFormats.has("astc")) {
      return "astc-4x4";
    } else if (supportedFormats.has("dxt")) {
      return {
        alpha: "bc3",
        noAlpha: "bc1"
      };
    } else if (supportedFormats.has("pvrtc")) {
      return {
        alpha: "pvrtc1-4-rgba",
        noAlpha: "pvrtc1-4-rgb"
      };
    } else if (supportedFormats.has("etc1")) {
      return "etc1";
    } else if (supportedFormats.has("etc2")) {
      return "etc2";
    }
    return "rgb565";
  }

  // src/basis-loader.ts
  var BasisWorkerLoader = {
    dataType: null,
    batchType: null,
    name: "Basis",
    id: "basis",
    module: "textures",
    version: VERSION,
    worker: true,
    extensions: ["basis", "ktx2"],
    mimeTypes: ["application/octet-stream", "image/ktx2"],
    tests: ["sB"],
    binary: true,
    options: {
      basis: {
        format: "auto",
        libraryPath: "libs/",
        containerFormat: "auto",
        module: "transcoder"
      }
    }
  };
  var BasisLoader = {
    ...BasisWorkerLoader,
    parse: parseBasis
  };

  // src/lib/parsers/parse-dds.ts
  var DDS_CONSTANTS = {
    MAGIC_NUMBER: 542327876,
    HEADER_LENGTH: 31,
    MAGIC_NUMBER_INDEX: 0,
    HEADER_SIZE_INDEX: 1,
    HEADER_FLAGS_INDEX: 2,
    HEADER_HEIGHT_INDEX: 3,
    HEADER_WIDTH_INDEX: 4,
    MIPMAPCOUNT_INDEX: 7,
    HEADER_PF_FLAGS_INDEX: 20,
    HEADER_PF_FOURCC_INDEX: 21,
    DDSD_MIPMAPCOUNT: 131072,
    DDPF_FOURCC: 4
  };
  var DDS_PIXEL_FORMATS = {
    DXT1: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_S3TC_DXT1_EXT,
    DXT3: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    DXT5: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT5_EXT,
    "ATC ": GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_ATC_WEBGL,
    ATCA: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL,
    ATCI: GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL
  };
  var getATCLevelSize = getDxt1LevelSize;
  var getATCALevelSize = getDxtXLevelSize;
  var getATCILevelSize = getDxtXLevelSize;
  var DDS_SIZE_FUNCTIONS = {
    DXT1: getDxt1LevelSize,
    DXT3: getDxtXLevelSize,
    DXT5: getDxtXLevelSize,
    "ATC ": getATCLevelSize,
    ATCA: getATCALevelSize,
    ATCI: getATCILevelSize
  };
  function isDDS(data) {
    const header = new Uint32Array(data, 0, DDS_CONSTANTS.HEADER_LENGTH);
    const magic = header[DDS_CONSTANTS.MAGIC_NUMBER_INDEX];
    return magic === DDS_CONSTANTS.MAGIC_NUMBER;
  }
  function parseDDS(data) {
    const header = new Int32Array(data, 0, DDS_CONSTANTS.HEADER_LENGTH);
    const pixelFormatNumber = header[DDS_CONSTANTS.HEADER_PF_FOURCC_INDEX];
    assert(
      Boolean(header[DDS_CONSTANTS.HEADER_PF_FLAGS_INDEX] & DDS_CONSTANTS.DDPF_FOURCC),
      "DDS: Unsupported format, must contain a FourCC code"
    );
    const fourCC = int32ToFourCC(pixelFormatNumber);
    const internalFormat = DDS_PIXEL_FORMATS[fourCC];
    const sizeFunction = DDS_SIZE_FUNCTIONS[fourCC];
    assert(internalFormat && sizeFunction, `DDS: Unknown pixel format ${pixelFormatNumber}`);
    let mipMapLevels = 1;
    if (header[DDS_CONSTANTS.HEADER_FLAGS_INDEX] & DDS_CONSTANTS.DDSD_MIPMAPCOUNT) {
      mipMapLevels = Math.max(1, header[DDS_CONSTANTS.MIPMAPCOUNT_INDEX]);
    }
    const width = header[DDS_CONSTANTS.HEADER_WIDTH_INDEX];
    const height = header[DDS_CONSTANTS.HEADER_HEIGHT_INDEX];
    const dataOffset = header[DDS_CONSTANTS.HEADER_SIZE_INDEX] + 4;
    const image = new Uint8Array(data, dataOffset);
    return extractMipmapImages(image, {
      mipMapLevels,
      width,
      height,
      sizeFunction,
      internalFormat
    });
  }
  function getDxt1LevelSize(width, height) {
    return (width + 3 >> 2) * (height + 3 >> 2) * 8;
  }
  function getDxtXLevelSize(width, height) {
    return (width + 3 >> 2) * (height + 3 >> 2) * 16;
  }
  function int32ToFourCC(value) {
    return String.fromCharCode(
      value & 255,
      value >> 8 & 255,
      value >> 16 & 255,
      value >> 24 & 255
    );
  }

  // src/lib/parsers/parse-pvr.ts
  var PVR_CONSTANTS = {
    MAGIC_NUMBER: 55727696,
    MAGIC_NUMBER_EXTRA: 1347834371,
    HEADER_LENGTH: 13,
    HEADER_SIZE: 52,
    MAGIC_NUMBER_INDEX: 0,
    PIXEL_FORMAT_INDEX: 2,
    COLOUR_SPACE_INDEX: 4,
    HEIGHT_INDEX: 6,
    WIDTH_INDEX: 7,
    MIPMAPCOUNT_INDEX: 11,
    METADATA_SIZE_INDEX: 12
  };
  var PVR_PIXEL_FORMATS = {
    0: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_PVRTC_2BPPV1_IMG],
    1: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG],
    2: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_PVRTC_4BPPV1_IMG],
    3: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG],
    6: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_ETC1_WEBGL],
    7: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB_S3TC_DXT1_EXT],
    9: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT3_EXT],
    11: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_S3TC_DXT5_EXT],
    22: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB8_ETC2],
    23: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA8_ETC2_EAC],
    24: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2],
    25: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_R11_EAC],
    26: [GL_EXTENSIONS_CONSTANTS.COMPRESSED_RG11_EAC],
    27: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_4X4_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_4X4_KHR
    ],
    28: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_5X4_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_5X4_KHR
    ],
    29: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_5X5_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_5X5_KHR
    ],
    30: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_6X5_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_6X5_KHR
    ],
    31: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_6X6_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_6X6_KHR
    ],
    32: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8X5_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8X5_KHR
    ],
    33: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8X6_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8X6_KHR
    ],
    34: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_8X8_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8X8_KHR
    ],
    35: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10X5_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10X5_KHR
    ],
    36: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10X6_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10X6_KHR
    ],
    37: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10X8_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10X8_KHR
    ],
    38: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_10X10_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10X10_KHR
    ],
    39: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_12X10_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_12X10_KHR
    ],
    40: [
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_RGBA_ASTC_12X12_KHR,
      GL_EXTENSIONS_CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_12X12_KHR
    ]
  };
  var PVR_SIZE_FUNCTIONS = {
    0: pvrtc2bppSize,
    1: pvrtc2bppSize,
    2: pvrtc4bppSize,
    3: pvrtc4bppSize,
    6: dxtEtcSmallSize,
    7: dxtEtcSmallSize,
    9: dxtEtcAstcBigSize,
    11: dxtEtcAstcBigSize,
    22: dxtEtcSmallSize,
    23: dxtEtcAstcBigSize,
    24: dxtEtcSmallSize,
    25: dxtEtcSmallSize,
    26: dxtEtcAstcBigSize,
    27: dxtEtcAstcBigSize,
    28: atc5x4Size,
    29: atc5x5Size,
    30: atc6x5Size,
    31: atc6x6Size,
    32: atc8x5Size,
    33: atc8x6Size,
    34: atc8x8Size,
    35: atc10x5Size,
    36: atc10x6Size,
    37: atc10x8Size,
    38: atc10x10Size,
    39: atc12x10Size,
    40: atc12x12Size
  };
  function isPVR(data) {
    const header = new Uint32Array(data, 0, PVR_CONSTANTS.HEADER_LENGTH);
    const version = header[PVR_CONSTANTS.MAGIC_NUMBER_INDEX];
    return version === PVR_CONSTANTS.MAGIC_NUMBER || version === PVR_CONSTANTS.MAGIC_NUMBER_EXTRA;
  }
  function parsePVR(data) {
    const header = new Uint32Array(data, 0, PVR_CONSTANTS.HEADER_LENGTH);
    const pvrFormat = header[PVR_CONSTANTS.PIXEL_FORMAT_INDEX];
    const colourSpace = header[PVR_CONSTANTS.COLOUR_SPACE_INDEX];
    const pixelFormats = PVR_PIXEL_FORMATS[pvrFormat] || [];
    const internalFormat = pixelFormats.length > 1 && colourSpace ? pixelFormats[1] : pixelFormats[0];
    const sizeFunction = PVR_SIZE_FUNCTIONS[pvrFormat];
    const mipMapLevels = header[PVR_CONSTANTS.MIPMAPCOUNT_INDEX];
    const width = header[PVR_CONSTANTS.WIDTH_INDEX];
    const height = header[PVR_CONSTANTS.HEIGHT_INDEX];
    const dataOffset = PVR_CONSTANTS.HEADER_SIZE + header[PVR_CONSTANTS.METADATA_SIZE_INDEX];
    const image = new Uint8Array(data, dataOffset);
    return extractMipmapImages(image, {
      mipMapLevels,
      width,
      height,
      sizeFunction,
      internalFormat
    });
  }
  function pvrtc2bppSize(width, height) {
    width = Math.max(width, 16);
    height = Math.max(height, 8);
    return width * height / 4;
  }
  function pvrtc4bppSize(width, height) {
    width = Math.max(width, 8);
    height = Math.max(height, 8);
    return width * height / 2;
  }
  function dxtEtcSmallSize(width, height) {
    return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 8;
  }
  function dxtEtcAstcBigSize(width, height) {
    return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
  }
  function atc5x4Size(width, height) {
    return Math.floor((width + 4) / 5) * Math.floor((height + 3) / 4) * 16;
  }
  function atc5x5Size(width, height) {
    return Math.floor((width + 4) / 5) * Math.floor((height + 4) / 5) * 16;
  }
  function atc6x5Size(width, height) {
    return Math.floor((width + 5) / 6) * Math.floor((height + 4) / 5) * 16;
  }
  function atc6x6Size(width, height) {
    return Math.floor((width + 5) / 6) * Math.floor((height + 5) / 6) * 16;
  }
  function atc8x5Size(width, height) {
    return Math.floor((width + 7) / 8) * Math.floor((height + 4) / 5) * 16;
  }
  function atc8x6Size(width, height) {
    return Math.floor((width + 7) / 8) * Math.floor((height + 5) / 6) * 16;
  }
  function atc8x8Size(width, height) {
    return Math.floor((width + 7) / 8) * Math.floor((height + 7) / 8) * 16;
  }
  function atc10x5Size(width, height) {
    return Math.floor((width + 9) / 10) * Math.floor((height + 4) / 5) * 16;
  }
  function atc10x6Size(width, height) {
    return Math.floor((width + 9) / 10) * Math.floor((height + 5) / 6) * 16;
  }
  function atc10x8Size(width, height) {
    return Math.floor((width + 9) / 10) * Math.floor((height + 7) / 8) * 16;
  }
  function atc10x10Size(width, height) {
    return Math.floor((width + 9) / 10) * Math.floor((height + 9) / 10) * 16;
  }
  function atc12x10Size(width, height) {
    return Math.floor((width + 11) / 12) * Math.floor((height + 9) / 10) * 16;
  }
  function atc12x12Size(width, height) {
    return Math.floor((width + 11) / 12) * Math.floor((height + 11) / 12) * 16;
  }

  // src/lib/parsers/parse-compressed-texture.ts
  function parseCompressedTexture(data) {
    if (isKTX(data)) {
      return parseKTX(data);
    }
    if (isDDS(data)) {
      return parseDDS(data);
    }
    if (isPVR(data)) {
      return parsePVR(data);
    }
    throw new Error("Texture container format not recognized");
  }

  // src/compressed-texture-loader.ts
  var CompressedTextureWorkerLoader = {
    dataType: null,
    batchType: null,
    name: "Texture Containers",
    id: "compressed-texture",
    module: "textures",
    version: VERSION,
    worker: true,
    extensions: [
      "ktx",
      "ktx2",
      "dds",
      // WEBGL_compressed_texture_s3tc, WEBGL_compressed_texture_atc
      "pvr"
      // WEBGL_compressed_texture_pvrtc
    ],
    mimeTypes: [
      "image/ktx2",
      "image/ktx",
      "image/vnd-ms.dds",
      "image/x-dds",
      "application/octet-stream"
    ],
    binary: true,
    options: {
      "compressed-texture": {
        libraryPath: "libs/",
        useBasis: false
      }
    }
  };
  var CompressedTextureLoader = {
    ...CompressedTextureWorkerLoader,
    parse: async (arrayBuffer, options) => {
      if (options?.["compressed-texture"]?.useBasis) {
        options.basis = {
          format: {
            alpha: "BC3",
            noAlpha: "BC1"
          },
          // @ts-expect-error TODO not allowed to modify inputs
          ...options.basis,
          containerFormat: "ktx2",
          module: "encoder"
        };
        const result = await parseBasis(arrayBuffer, options);
        return result[0];
      }
      return parseCompressedTexture(arrayBuffer);
    }
  };

  // src/crunch-loader.ts
  var CrunchLoader = {
    dataType: null,
    batchType: null,
    id: "crunch",
    name: "Crunch",
    module: "textures",
    version: VERSION,
    worker: true,
    extensions: ["crn"],
    mimeTypes: ["image/crn", "image/x-crn", "application/octet-stream"],
    binary: true,
    options: {
      crunch: {
        libraryPath: "libs/"
      }
    }
  };

  // src/lib/parsers/parse-npy.ts
  var a = new Uint32Array([305419896]);
  var b = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  var isLittleEndian = !(b[0] === 18);
  var LITTLE_ENDIAN_OS = isLittleEndian;
  var DTYPES = {
    u1: Uint8Array,
    i1: Int8Array,
    u2: Uint16Array,
    i2: Int16Array,
    u4: Uint32Array,
    i4: Int32Array,
    f4: Float32Array,
    f8: Float64Array
  };
  function parseNPY(arrayBuffer, options) {
    const view = new DataView(arrayBuffer);
    const { header, headerEndOffset } = parseHeader(view);
    const numpyType = header.descr;
    const ArrayType = DTYPES[numpyType.slice(1, 3)];
    if (!ArrayType) {
      throw new Error(`Unimplemented type ${numpyType}`);
    }
    const nArrayElements = header.shape?.reduce((a2, b2) => a2 * b2);
    const arrayByteLength = nArrayElements * ArrayType.BYTES_PER_ELEMENT;
    if (arrayBuffer.byteLength < headerEndOffset + arrayByteLength) {
      throw new Error("Buffer overflow");
    }
    const data = new ArrayType(arrayBuffer.slice(headerEndOffset, headerEndOffset + arrayByteLength));
    if (numpyType[0] === ">" && LITTLE_ENDIAN_OS || numpyType[0] === "<" && !LITTLE_ENDIAN_OS) {
      throw new Error("Incorrect endianness");
    }
    return {
      data,
      header
    };
  }
  function parseHeader(view) {
    const majorVersion = view.getUint8(6);
    let offset = 8;
    let headerLength;
    if (majorVersion >= 2) {
      headerLength = view.getUint32(offset, true);
      offset += 4;
    } else {
      headerLength = view.getUint16(offset, true);
      offset += 2;
    }
    const encoding = majorVersion <= 2 ? "latin1" : "utf-8";
    const decoder = new TextDecoder(encoding);
    const headerArray = new Uint8Array(view.buffer, offset, headerLength);
    const headerText = decoder.decode(headerArray);
    offset += headerLength;
    const header = JSON.parse(
      headerText.replace(/'/g, '"').replace("False", "false").replace("(", "[").replace(/,*\),*/g, "]")
    );
    return { header, headerEndOffset: offset };
  }

  // src/npy-loader.ts
  var NPY_MAGIC_NUMBER = new Uint8Array([147, 78, 85, 77, 80, 89]);
  var NPYWorkerLoader = {
    dataType: null,
    batchType: null,
    name: "NPY",
    id: "npy",
    module: "textures",
    version: VERSION,
    worker: true,
    extensions: ["npy"],
    mimeTypes: [],
    tests: [NPY_MAGIC_NUMBER.buffer],
    options: {
      npy: {}
    }
  };
  var NPYLoader = {
    ...NPYWorkerLoader,
    parseSync: parseNPY,
    parse: async (arrayBuffer, options) => parseNPY(arrayBuffer, options)
  };

  // src/lib/parsers/crunch-module-loader.ts
  var CRUNCH_EXTERNAL_LIBRARIES = {
    /** Crunch decoder library. It is used as dynamically imported script */
    DECODER: "crunch.js"
  };

  // src/lib/encoders/encode-texture.ts
  async function encodeImageURLToCompressedTextureURL(inputUrl, outputUrl, options) {
    const args = [
      // Note: our actual executable is `npx`, so `texture-compressor` is an argument
      "texture-compressor",
      "--type",
      "s3tc",
      "--compression",
      "DXT1",
      "--quality",
      "normal",
      "--input",
      inputUrl,
      "--output",
      outputUrl
    ];
    const childProcess = new import_child_process_proxy.default();
    await childProcess.start({
      command: "npx",
      arguments: args,
      spawn: options
    });
    return outputUrl;
  }

  // src/compressed-texture-writer.ts
  var CompressedTextureWriter = {
    name: "DDS Texture Container",
    id: "dds",
    module: "textures",
    version: VERSION,
    extensions: ["dds"],
    options: {
      texture: {
        format: "auto",
        compression: "auto",
        quality: "auto",
        mipmap: false,
        flipY: false,
        toolFlags: ""
      }
    },
    encodeURLtoURL: encodeImageURLToCompressedTextureURL,
    encode() {
      throw new Error("Not implemented");
    }
  };

  // src/lib/encoders/encode-ktx2-basis-texture.ts
  async function encodeKTX2BasisTexture(image, options = {}) {
    const {
      useSRGB = false,
      qualityLevel = 10,
      encodeUASTC = false,
      mipmaps = false
    } = options?.["ktx2-basis-writer"] || {};
    const { BasisEncoder } = await loadBasisEncoderModule(options);
    const basisEncoder = new BasisEncoder();
    try {
      const basisFileData = new Uint8Array(image.width * image.height * 4);
      basisEncoder.setCreateKTX2File(true);
      basisEncoder.setKTX2UASTCSupercompression(true);
      basisEncoder.setKTX2SRGBTransferFunc(true);
      basisEncoder.setSliceSourceImage(0, image.data, image.width, image.height, false);
      basisEncoder.setPerceptual(useSRGB);
      basisEncoder.setMipSRGB(useSRGB);
      basisEncoder.setQualityLevel(qualityLevel);
      basisEncoder.setUASTC(encodeUASTC);
      basisEncoder.setMipGen(mipmaps);
      const numOutputBytes = basisEncoder.encode(basisFileData);
      const actualKTX2FileData = basisFileData.subarray(0, numOutputBytes).buffer;
      return actualKTX2FileData;
    } catch (error) {
      console.error("Basis Universal Supercompressed GPU Texture encoder Error: ", error);
      throw error;
    } finally {
      basisEncoder.delete();
    }
  }

  // src/ktx2-basis-writer.ts
  var KTX2BasisWriter = {
    name: "Basis Universal Supercompressed GPU Texture",
    id: "ktx2-basis-writer",
    module: "textures",
    version: VERSION,
    extensions: ["ktx2"],
    options: {
      ["ktx2-basis-writer"]: {
        useSRGB: false,
        qualityLevel: 10,
        encodeUASTC: false,
        mipmaps: false
      }
    },
    encode: encodeKTX2BasisTexture
  };

  // ../images/src/lib/utils/version.ts
  var VERSION3 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // ../images/src/lib/category-api/image-type.ts
  var parseImageNode = globalThis.loaders?.parseImageNode;
  var IMAGE_SUPPORTED = typeof Image !== "undefined";
  var IMAGE_BITMAP_SUPPORTED = typeof ImageBitmap !== "undefined";
  var NODE_IMAGE_SUPPORTED = Boolean(parseImageNode);
  var DATA_SUPPORTED = isBrowser ? true : NODE_IMAGE_SUPPORTED;
  function isImageTypeSupported(type) {
    switch (type) {
      case "auto":
        return IMAGE_BITMAP_SUPPORTED || IMAGE_SUPPORTED || DATA_SUPPORTED;
      case "imagebitmap":
        return IMAGE_BITMAP_SUPPORTED;
      case "image":
        return IMAGE_SUPPORTED;
      case "data":
        return DATA_SUPPORTED;
      default:
        throw new Error(`@loaders.gl/images: image ${type} not supported in this environment`);
    }
  }
  function getDefaultImageType() {
    if (IMAGE_BITMAP_SUPPORTED) {
      return "imagebitmap";
    }
    if (IMAGE_SUPPORTED) {
      return "image";
    }
    if (DATA_SUPPORTED) {
      return "data";
    }
    throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
  }

  // ../images/src/lib/category-api/parsed-image-api.ts
  function getImageType(image) {
    const format = getImageTypeOrNull(image);
    if (!format) {
      throw new Error("Not an image");
    }
    return format;
  }
  function getImageSize(image) {
    return getImageData(image);
  }
  function getImageData(image) {
    switch (getImageType(image)) {
      case "data":
        return image;
      case "image":
      case "imagebitmap":
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("getImageData");
        }
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
      default:
        throw new Error("getImageData");
    }
  }
  function getImageTypeOrNull(image) {
    if (typeof ImageBitmap !== "undefined" && image instanceof ImageBitmap) {
      return "imagebitmap";
    }
    if (typeof Image !== "undefined" && image instanceof Image) {
      return "image";
    }
    if (image && typeof image === "object" && image.data && image.width && image.height) {
      return "data";
    }
    return null;
  }

  // ../images/src/lib/parsers/svg-utils.ts
  var SVG_DATA_URL_PATTERN = /^data:image\/svg\+xml/;
  var SVG_URL_PATTERN = /\.svg((\?|#).*)?$/;
  function isSVG(url) {
    return url && (SVG_DATA_URL_PATTERN.test(url) || SVG_URL_PATTERN.test(url));
  }
  function getBlobOrSVGDataUrl(arrayBuffer, url) {
    if (isSVG(url)) {
      const textDecoder = new TextDecoder();
      let xmlText = textDecoder.decode(arrayBuffer);
      try {
        if (typeof unescape === "function" && typeof encodeURIComponent === "function") {
          xmlText = unescape(encodeURIComponent(xmlText));
        }
      } catch (error) {
        throw new Error(error.message);
      }
      const src = `data:image/svg+xml;base64,${btoa(xmlText)}`;
      return src;
    }
    return getBlob(arrayBuffer, url);
  }
  function getBlob(arrayBuffer, url) {
    if (isSVG(url)) {
      throw new Error("SVG cannot be parsed directly to imagebitmap");
    }
    return new Blob([new Uint8Array(arrayBuffer)]);
  }

  // ../images/src/lib/parsers/parse-to-image.ts
  async function parseToImage(arrayBuffer, options, url) {
    const blobOrDataUrl = getBlobOrSVGDataUrl(arrayBuffer, url);
    const URL = self.URL || self.webkitURL;
    const objectUrl = typeof blobOrDataUrl !== "string" && URL.createObjectURL(blobOrDataUrl);
    try {
      return await loadToImage(objectUrl || blobOrDataUrl, options);
    } finally {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    }
  }
  async function loadToImage(url, options) {
    const image = new Image();
    image.src = url;
    if (options.image && options.image.decode && image.decode) {
      await image.decode();
      return image;
    }
    return await new Promise((resolve, reject) => {
      try {
        image.onload = () => resolve(image);
        image.onerror = (error) => {
          const message = error instanceof Error ? error.message : "error";
          reject(new Error(message));
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  // ../images/src/lib/parsers/parse-to-image-bitmap.ts
  var EMPTY_OBJECT = {};
  var imagebitmapOptionsSupported = true;
  async function parseToImageBitmap(arrayBuffer, options, url) {
    let blob;
    if (isSVG(url)) {
      const image = await parseToImage(arrayBuffer, options, url);
      blob = image;
    } else {
      blob = getBlob(arrayBuffer, url);
    }
    const imagebitmapOptions = options && options.imagebitmap;
    return await safeCreateImageBitmap(blob, imagebitmapOptions);
  }
  async function safeCreateImageBitmap(blob, imagebitmapOptions = null) {
    if (isEmptyObject(imagebitmapOptions) || !imagebitmapOptionsSupported) {
      imagebitmapOptions = null;
    }
    if (imagebitmapOptions) {
      try {
        return await createImageBitmap(blob, imagebitmapOptions);
      } catch (error) {
        console.warn(error);
        imagebitmapOptionsSupported = false;
      }
    }
    return await createImageBitmap(blob);
  }
  function isEmptyObject(object) {
    for (const key in object || EMPTY_OBJECT) {
      return false;
    }
    return true;
  }

  // ../images/src/lib/category-api/parse-isobmff-binary.ts
  function getISOBMFFMediaType(buffer) {
    if (!checkString(buffer, "ftyp", 4)) {
      return null;
    }
    if ((buffer[8] & 96) === 0) {
      return null;
    }
    return decodeMajorBrand(buffer);
  }
  function decodeMajorBrand(buffer) {
    const brandMajor = getUTF8String(buffer, 8, 12).replace("\0", " ").trim();
    switch (brandMajor) {
      case "avif":
      case "avis":
        return { extension: "avif", mimeType: "image/avif" };
      default:
        return null;
    }
  }
  function getUTF8String(array, start, end) {
    return String.fromCharCode(...array.slice(start, end));
  }
  function stringToBytes(string) {
    return [...string].map((character) => character.charCodeAt(0));
  }
  function checkString(buffer, header, offset = 0) {
    const headerBytes = stringToBytes(header);
    for (let i = 0; i < headerBytes.length; ++i) {
      if (headerBytes[i] !== buffer[i + offset]) {
        return false;
      }
    }
    return true;
  }

  // ../images/src/lib/category-api/binary-image-api.ts
  var BIG_ENDIAN = false;
  var LITTLE_ENDIAN = true;
  function getBinaryImageMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    return getPngMetadata(dataView) || getJpegMetadata(dataView) || getGifMetadata(dataView) || getBmpMetadata(dataView) || getISOBMFFMetadata(dataView);
  }
  function getISOBMFFMetadata(binaryData) {
    const buffer = new Uint8Array(binaryData instanceof DataView ? binaryData.buffer : binaryData);
    const mediaType = getISOBMFFMediaType(buffer);
    if (!mediaType) {
      return null;
    }
    return {
      mimeType: mediaType.mimeType,
      // TODO - decode width and height
      width: 0,
      height: 0
    };
  }
  function getPngMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isPng = dataView.byteLength >= 24 && dataView.getUint32(0, BIG_ENDIAN) === 2303741511;
    if (!isPng) {
      return null;
    }
    return {
      mimeType: "image/png",
      width: dataView.getUint32(16, BIG_ENDIAN),
      height: dataView.getUint32(20, BIG_ENDIAN)
    };
  }
  function getGifMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isGif = dataView.byteLength >= 10 && dataView.getUint32(0, BIG_ENDIAN) === 1195984440;
    if (!isGif) {
      return null;
    }
    return {
      mimeType: "image/gif",
      width: dataView.getUint16(6, LITTLE_ENDIAN),
      height: dataView.getUint16(8, LITTLE_ENDIAN)
    };
  }
  function getBmpMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isBmp = dataView.byteLength >= 14 && dataView.getUint16(0, BIG_ENDIAN) === 16973 && dataView.getUint32(2, LITTLE_ENDIAN) === dataView.byteLength;
    if (!isBmp) {
      return null;
    }
    return {
      mimeType: "image/bmp",
      width: dataView.getUint32(18, LITTLE_ENDIAN),
      height: dataView.getUint32(22, LITTLE_ENDIAN)
    };
  }
  function getJpegMetadata(binaryData) {
    const dataView = toDataView(binaryData);
    const isJpeg = dataView.byteLength >= 3 && dataView.getUint16(0, BIG_ENDIAN) === 65496 && dataView.getUint8(2) === 255;
    if (!isJpeg) {
      return null;
    }
    const { tableMarkers, sofMarkers } = getJpegMarkers();
    let i = 2;
    while (i + 9 < dataView.byteLength) {
      const marker = dataView.getUint16(i, BIG_ENDIAN);
      if (sofMarkers.has(marker)) {
        return {
          mimeType: "image/jpeg",
          height: dataView.getUint16(i + 5, BIG_ENDIAN),
          // Number of lines
          width: dataView.getUint16(i + 7, BIG_ENDIAN)
          // Number of pixels per line
        };
      }
      if (!tableMarkers.has(marker)) {
        return null;
      }
      i += 2;
      i += dataView.getUint16(i, BIG_ENDIAN);
    }
    return null;
  }
  function getJpegMarkers() {
    const tableMarkers = /* @__PURE__ */ new Set([65499, 65476, 65484, 65501, 65534]);
    for (let i = 65504; i < 65520; ++i) {
      tableMarkers.add(i);
    }
    const sofMarkers = /* @__PURE__ */ new Set([
      65472,
      65473,
      65474,
      65475,
      65477,
      65478,
      65479,
      65481,
      65482,
      65483,
      65485,
      65486,
      65487,
      65502
    ]);
    return { tableMarkers, sofMarkers };
  }
  function toDataView(data) {
    if (data instanceof DataView) {
      return data;
    }
    if (ArrayBuffer.isView(data)) {
      return new DataView(data.buffer);
    }
    if (data instanceof ArrayBuffer) {
      return new DataView(data);
    }
    throw new Error("toDataView");
  }

  // ../images/src/lib/parsers/parse-to-node-image.ts
  async function parseToNodeImage(arrayBuffer, options) {
    const { mimeType } = getBinaryImageMetadata(arrayBuffer) || {};
    const parseImageNode2 = globalThis.loaders?.parseImageNode;
    assert(parseImageNode2);
    return await parseImageNode2(arrayBuffer, mimeType);
  }

  // ../images/src/lib/parsers/parse-image.ts
  async function parseImage(arrayBuffer, options, context) {
    options = options || {};
    const imageOptions = options.image || {};
    const imageType = imageOptions.type || "auto";
    const { url } = context || {};
    const loadType = getLoadableImageType(imageType);
    let image;
    switch (loadType) {
      case "imagebitmap":
        image = await parseToImageBitmap(arrayBuffer, options, url);
        break;
      case "image":
        image = await parseToImage(arrayBuffer, options, url);
        break;
      case "data":
        image = await parseToNodeImage(arrayBuffer, options);
        break;
      default:
        assert(false);
    }
    if (imageType === "data") {
      image = getImageData(image);
    }
    return image;
  }
  function getLoadableImageType(type) {
    switch (type) {
      case "auto":
      case "data":
        return getDefaultImageType();
      default:
        isImageTypeSupported(type);
        return type;
    }
  }

  // ../images/src/image-loader.ts
  var EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "bmp", "ico", "svg", "avif"];
  var MIME_TYPES = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/avif",
    "image/bmp",
    "image/vnd.microsoft.icon",
    "image/svg+xml"
  ];
  var DEFAULT_IMAGE_LOADER_OPTIONS = {
    image: {
      type: "auto",
      decode: true
      // if format is HTML
    }
    // imagebitmap: {} - passes (platform dependent) parameters to ImageBitmap constructor
  };
  var ImageLoader = {
    dataType: null,
    batchType: null,
    id: "image",
    module: "images",
    name: "Images",
    version: VERSION3,
    mimeTypes: MIME_TYPES,
    extensions: EXTENSIONS,
    parse: parseImage,
    // TODO: byteOffset, byteLength;
    tests: [(arrayBuffer) => Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)))],
    options: DEFAULT_IMAGE_LOADER_OPTIONS
  };

  // src/lib/texture-api/generate-url.ts
  function generateUrl(getUrl, options, urlOptions) {
    let url = typeof getUrl === "function" ? getUrl({ ...options, ...urlOptions }) : getUrl;
    const baseUrl = options.baseUrl;
    if (baseUrl) {
      url = baseUrl[baseUrl.length - 1] === "/" ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    }
    return resolvePath(url);
  }

  // src/lib/texture-api/async-deep-map.ts
  var isObject = (value) => value && typeof value === "object";
  async function asyncDeepMap(tree, func, options = {}) {
    return await mapSubtree(tree, func, options);
  }
  async function mapSubtree(object, func, options) {
    if (Array.isArray(object)) {
      return await mapArray(object, func, options);
    }
    if (isObject(object)) {
      return await mapObject(object, func, options);
    }
    const url = object;
    return await func(url, options);
  }
  async function mapObject(object, func, options) {
    const promises = [];
    const values = {};
    for (const key in object) {
      const url = object[key];
      const promise = mapSubtree(url, func, options).then((value) => {
        values[key] = value;
      });
      promises.push(promise);
    }
    await Promise.all(promises);
    return values;
  }
  async function mapArray(urlArray, func, options = {}) {
    const promises = urlArray.map((url) => mapSubtree(url, func, options));
    return await Promise.all(promises);
  }

  // src/lib/texture-api/deep-load.ts
  async function deepLoad(urlTree, load, options) {
    return await asyncDeepMap(urlTree, (url) => shallowLoad(url, load, options));
  }
  async function shallowLoad(url, load, options) {
    const response = await fetch(url, options.fetch);
    const arrayBuffer = await response.arrayBuffer();
    return await load(arrayBuffer, options);
  }

  // src/lib/texture-api/load-image.ts
  async function loadImageTexture(getUrl, options = {}) {
    const imageUrls = await getImageUrls(getUrl, options);
    return await deepLoad(imageUrls, ImageLoader.parse, options);
  }
  async function getImageUrls(getUrl, options, urlOptions = {}) {
    const mipLevels = options && options.image && options.image.mipLevels || 0;
    return mipLevels !== 0 ? await getMipmappedImageUrls(getUrl, mipLevels, options, urlOptions) : generateUrl(getUrl, options, urlOptions);
  }
  async function getMipmappedImageUrls(getUrl, mipLevels, options, urlOptions) {
    const urls = [];
    if (mipLevels === "auto") {
      const url = generateUrl(getUrl, options, { ...urlOptions, lod: 0 });
      const image = await shallowLoad(url, ImageLoader.parse, options);
      const { width, height } = getImageSize(image);
      mipLevels = getMipLevels({ width, height });
      urls.push(url);
    }
    assert(mipLevels > 0);
    for (let mipLevel = urls.length; mipLevel < mipLevels; ++mipLevel) {
      const url = generateUrl(getUrl, options, { ...urlOptions, lod: mipLevel });
      urls.push(url);
    }
    return urls;
  }
  function getMipLevels(size) {
    return 1 + Math.floor(Math.log2(Math.max(size.width, size.height)));
  }

  // src/lib/texture-api/load-image-array.ts
  async function loadImageTextureArray(count, getUrl, options = {}) {
    const imageUrls = await getImageArrayUrls(count, getUrl, options);
    return await deepLoad(imageUrls, ImageLoader.parse, options);
  }
  async function getImageArrayUrls(count, getUrl, options = {}) {
    const promises = [];
    for (let index = 0; index < count; index++) {
      const promise = getImageUrls(getUrl, options, { index });
      promises.push(promise);
    }
    return await Promise.all(promises);
  }

  // src/lib/texture-api/load-image-cube.ts
  var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
  var GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
  var GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
  var GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
  var GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
  var GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
  var CUBE_FACES = [
    { face: GL_TEXTURE_CUBE_MAP_POSITIVE_X, direction: "right", axis: "x", sign: "positive" },
    { face: GL_TEXTURE_CUBE_MAP_NEGATIVE_X, direction: "left", axis: "x", sign: "negative" },
    { face: GL_TEXTURE_CUBE_MAP_POSITIVE_Y, direction: "top", axis: "y", sign: "positive" },
    { face: GL_TEXTURE_CUBE_MAP_NEGATIVE_Y, direction: "bottom", axis: "y", sign: "negative" },
    { face: GL_TEXTURE_CUBE_MAP_POSITIVE_Z, direction: "front", axis: "z", sign: "positive" },
    { face: GL_TEXTURE_CUBE_MAP_NEGATIVE_Z, direction: "back", axis: "z", sign: "negative" }
  ];
  async function getImageCubeUrls(getUrl, options) {
    const urls = {};
    const promises = [];
    let index = 0;
    for (let i = 0; i < CUBE_FACES.length; ++i) {
      const face = CUBE_FACES[index];
      const promise = getImageUrls(getUrl, options, { ...face, index: index++ }).then((url) => {
        urls[face.face] = url;
      });
      promises.push(promise);
    }
    await Promise.all(promises);
    return urls;
  }
  async function loadImageTextureCube(getUrl, options = {}) {
    const urls = await getImageCubeUrls(getUrl, options);
    return await deepLoad(urls, ImageLoader.parse, options);
  }

  // src/index.ts
  var KTX2BasisWriterWorker = {
    name: "Basis Universal Supercompressed GPU Texture",
    id: "ktx2-basis-writer",
    module: "textures",
    version: VERSION,
    extensions: ["ktx2"],
    worker: true,
    options: {
      useSRGB: false,
      qualityLevel: 10,
      encodeUASTC: false,
      mipmaps: false
    }
  };
  return __toCommonJS(bundle_exports);
})();
      return __exports__;
      });
