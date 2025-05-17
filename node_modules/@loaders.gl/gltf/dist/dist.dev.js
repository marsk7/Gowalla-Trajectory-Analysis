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
    for (var name12 in all)
      __defProp(target, name12, { get: all[name12], enumerable: true });
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

  // bundle.ts
  var bundle_exports = {};
  __export(bundle_exports, {
    EXT_FEATURE_METADATA: () => name3,
    EXT_MESH_FEATURES: () => name,
    EXT_STRUCTURAL_METADATA: () => name2,
    GLBLoader: () => GLBLoader,
    GLBWriter: () => GLBWriter,
    GLTFLoader: () => GLTFLoader,
    GLTFScenegraph: () => GLTFScenegraph,
    GLTFWriter: () => GLTFWriter,
    _getMemoryUsageGLTF: () => getMemoryUsageGLTF,
    createExtMeshFeatures: () => createExtMeshFeatures,
    createExtStructuralMetadata: () => createExtStructuralMetadata,
    postProcessGLTF: () => postProcessGLTF
  });
  __reExport(bundle_exports, __toESM(require_core(), 1));

  // src/lib/extensions/EXT_mesh_features.ts
  var EXT_mesh_features_exports = {};
  __export(EXT_mesh_features_exports, {
    createExtMeshFeatures: () => createExtMeshFeatures,
    decode: () => decode,
    encode: () => encode,
    name: () => name
  });

  // ../images/src/lib/utils/version.ts
  var VERSION = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // ../loader-utils/src/loader-types.ts
  async function parseFromContext(data, loaders, options, context) {
    return context._parse(data, loaders, options, context);
  }

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
  function getJSModuleOrNull(name12) {
    const module = globalThis.loaders?.modules?.[name12];
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

  // ../loader-utils/src/lib/binary-utils/get-first-characters.ts
  function getFirstCharacters(data, length = 5) {
    if (typeof data === "string") {
      return data.slice(0, length);
    } else if (ArrayBuffer.isView(data)) {
      return getMagicString(data.buffer, data.byteOffset, length);
    } else if (data instanceof ArrayBuffer) {
      const byteOffset = 0;
      return getMagicString(data, byteOffset, length);
    }
    return "";
  }
  function getMagicString(arrayBuffer, byteOffset, length) {
    if (arrayBuffer.byteLength <= byteOffset + length) {
      return "";
    }
    const dataView = new DataView(arrayBuffer);
    let magic = "";
    for (let i = 0; i < length; i++) {
      magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
    }
    return magic;
  }

  // ../loader-utils/src/lib/parser-utils/parse-json.ts
  function parseJSON(string) {
    try {
      return JSON.parse(string);
    } catch (_) {
      throw new Error(`Failed to parse JSON from data starting with "${getFirstCharacters(string)}"`);
    }
  }

  // ../loader-utils/src/lib/binary-utils/array-buffer-utils.ts
  function sliceArrayBuffer(arrayBuffer, byteOffset, byteLength) {
    const subArray = byteLength !== void 0 ? new Uint8Array(arrayBuffer).subarray(byteOffset, byteOffset + byteLength) : new Uint8Array(arrayBuffer).subarray(byteOffset);
    const arrayCopy = new Uint8Array(subArray);
    return arrayCopy.buffer;
  }

  // ../loader-utils/src/lib/binary-utils/memory-copy-utils.ts
  function padToNBytes(byteLength, padding) {
    assert(byteLength >= 0);
    assert(padding > 0);
    return byteLength + (padding - 1) & ~(padding - 1);
  }
  function copyToArray(source, target, targetOffset) {
    let sourceArray;
    if (source instanceof ArrayBuffer) {
      sourceArray = new Uint8Array(source);
    } else {
      const srcByteOffset = source.byteOffset;
      const srcByteLength = source.byteLength;
      sourceArray = new Uint8Array(source.buffer || source.arrayBuffer, srcByteOffset, srcByteLength);
    }
    target.set(sourceArray, targetOffset);
    return targetOffset + padToNBytes(sourceArray.byteLength, 4);
  }

  // ../loader-utils/src/lib/binary-utils/dataview-copy-utils.ts
  function copyPaddedArrayBufferToDataView(dataView, byteOffset, sourceBuffer, padding) {
    const paddedLength = padToNBytes(sourceBuffer.byteLength, padding);
    const padLength = paddedLength - sourceBuffer.byteLength;
    if (dataView) {
      const targetArray = new Uint8Array(
        dataView.buffer,
        dataView.byteOffset + byteOffset,
        sourceBuffer.byteLength
      );
      const sourceArray = new Uint8Array(sourceBuffer);
      targetArray.set(sourceArray);
      for (let i = 0; i < padLength; ++i) {
        dataView.setUint8(byteOffset + sourceBuffer.byteLength + i, 32);
      }
    }
    byteOffset += paddedLength;
    return byteOffset;
  }
  function copyPaddedStringToDataView(dataView, byteOffset, string, padding) {
    const textEncoder = new TextEncoder();
    const stringBuffer = textEncoder.encode(string);
    byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, stringBuffer, padding);
    return byteOffset;
  }

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
    version: VERSION,
    mimeTypes: MIME_TYPES,
    extensions: EXTENSIONS,
    parse: parseImage,
    // TODO: byteOffset, byteLength;
    tests: [(arrayBuffer) => Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)))],
    options: DEFAULT_IMAGE_LOADER_OPTIONS
  };

  // ../images/src/lib/category-api/image-format.ts
  var mimeTypeSupportedSync = {};
  function isImageFormatSupported(mimeType) {
    if (mimeTypeSupportedSync[mimeType] === void 0) {
      const supported = isBrowser ? checkBrowserImageFormatSupport(mimeType) : checkNodeImageFormatSupport(mimeType);
      mimeTypeSupportedSync[mimeType] = supported;
    }
    return mimeTypeSupportedSync[mimeType];
  }
  function checkNodeImageFormatSupport(mimeType) {
    const NODE_FORMAT_SUPPORT = ["image/png", "image/jpeg", "image/gif"];
    const imageFormatsNode = globalThis.loaders?.imageFormatsNode || NODE_FORMAT_SUPPORT;
    const parseImageNode2 = globalThis.loaders?.parseImageNode;
    return Boolean(parseImageNode2) && imageFormatsNode.includes(mimeType);
  }
  function checkBrowserImageFormatSupport(mimeType) {
    switch (mimeType) {
      case "image/avif":
      case "image/webp":
        return testBrowserImageFormatSupport(mimeType);
      default:
        return true;
    }
  }
  function testBrowserImageFormatSupport(mimeType) {
    try {
      const element = document.createElement("canvas");
      const dataURL = element.toDataURL(mimeType);
      return dataURL.indexOf(`data:${mimeType}`) === 0;
    } catch {
      return false;
    }
  }

  // src/lib/utils/assert.ts
  function assert3(condition, message) {
    if (!condition) {
      throw new Error(message || "assert failed: gltf");
    }
  }

  // src/lib/gltf-utils/gltf-constants.ts
  var COMPONENTS = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  };
  var BYTES = {
    5120: 1,
    // BYTE
    5121: 1,
    // UNSIGNED_BYTE
    5122: 2,
    // SHORT
    5123: 2,
    // UNSIGNED_SHORT
    5125: 4,
    // UNSIGNED_INT
    5126: 4
    // FLOAT
  };

  // src/lib/gltf-utils/gltf-utils.ts
  var MIPMAP_FACTOR = 1.33;
  var TYPES = ["SCALAR", "VEC2", "VEC3", "VEC4"];
  var ARRAY_CONSTRUCTOR_TO_WEBGL_CONSTANT = [
    [Int8Array, 5120],
    [Uint8Array, 5121],
    [Int16Array, 5122],
    [Uint16Array, 5123],
    [Uint32Array, 5125],
    [Float32Array, 5126],
    [Float64Array, 5130]
  ];
  var ARRAY_TO_COMPONENT_TYPE = new Map(
    ARRAY_CONSTRUCTOR_TO_WEBGL_CONSTANT
  );
  var ATTRIBUTE_TYPE_TO_COMPONENTS = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  };
  var ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE = {
    5120: 1,
    5121: 1,
    5122: 2,
    5123: 2,
    5125: 4,
    5126: 4
  };
  var ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
    5120: Int8Array,
    5121: Uint8Array,
    5122: Int16Array,
    5123: Uint16Array,
    5125: Uint32Array,
    5126: Float32Array
  };
  function getAccessorTypeFromSize(size) {
    const type = TYPES[size - 1];
    return type || TYPES[0];
  }
  function getComponentTypeFromArray(typedArray) {
    const componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);
    if (!componentType) {
      throw new Error("Illegal typed array");
    }
    return componentType;
  }
  function getAccessorArrayTypeAndLength(accessor, bufferView) {
    const ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
    const components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
    const bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[accessor.componentType];
    const length = accessor.count * components;
    const byteLength = accessor.count * components * bytesPerComponent;
    assert3(byteLength >= 0 && byteLength <= bufferView.byteLength);
    const componentByteSize = BYTES[accessor.componentType];
    const numberOfComponentsInElement = COMPONENTS[accessor.type];
    return { ArrayType, length, byteLength, componentByteSize, numberOfComponentsInElement };
  }
  function getMemoryUsageGLTF(gltf) {
    let { images, bufferViews } = gltf;
    images = images || [];
    bufferViews = bufferViews || [];
    const imageBufferViews = images.map((i) => i.bufferView);
    bufferViews = bufferViews.filter((view) => !imageBufferViews.includes(view));
    const bufferMemory = bufferViews.reduce((acc, view) => acc + view.byteLength, 0);
    const pixelCount = images.reduce((acc, image) => {
      const { width, height } = image.image;
      return acc + width * height;
    }, 0);
    return bufferMemory + Math.ceil(4 * pixelCount * MIPMAP_FACTOR);
  }

  // src/lib/gltf-utils/get-typed-array.ts
  function getTypedArrayForBufferView(json, buffers, bufferViewIndex) {
    const bufferView = json.bufferViews[bufferViewIndex];
    assert3(bufferView);
    const bufferIndex = bufferView.buffer;
    const binChunk = buffers[bufferIndex];
    assert3(binChunk);
    const byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
    return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
  }
  function getTypedArrayForAccessor(json, buffers, accessor) {
    const gltfAccessor = typeof accessor === "number" ? json.accessors?.[accessor] : accessor;
    if (!gltfAccessor) {
      throw new Error(`No gltf accessor ${JSON.stringify(accessor)}`);
    }
    const bufferView = json.bufferViews?.[gltfAccessor.bufferView || 0];
    if (!bufferView) {
      throw new Error(`No gltf buffer view for accessor ${bufferView}`);
    }
    const { arrayBuffer, byteOffset: bufferByteOffset } = buffers[bufferView.buffer];
    const byteOffset = (bufferByteOffset || 0) + (gltfAccessor.byteOffset || 0) + (bufferView.byteOffset || 0);
    const { ArrayType, length, componentByteSize, numberOfComponentsInElement } = getAccessorArrayTypeAndLength(gltfAccessor, bufferView);
    const elementByteSize = componentByteSize * numberOfComponentsInElement;
    const elementAddressScale = bufferView.byteStride || elementByteSize;
    if (typeof bufferView.byteStride === "undefined" || bufferView.byteStride === elementByteSize) {
      const result2 = new ArrayType(arrayBuffer, byteOffset, length);
      return result2;
    }
    const result = new ArrayType(length);
    for (let i = 0; i < gltfAccessor.count; i++) {
      const values = new ArrayType(
        arrayBuffer,
        byteOffset + i * elementAddressScale,
        numberOfComponentsInElement
      );
      result.set(values, i * numberOfComponentsInElement);
    }
    return result;
  }

  // src/lib/api/gltf-scenegraph.ts
  function makeDefaultGLTFJson() {
    return {
      asset: {
        version: "2.0",
        generator: "loaders.gl"
      },
      buffers: [],
      extensions: {},
      extensionsRequired: [],
      extensionsUsed: []
    };
  }
  var GLTFScenegraph = class {
    // internal
    gltf;
    sourceBuffers;
    byteLength;
    // TODO - why is this not GLTFWithBuffers - what happens to images?
    constructor(gltf) {
      this.gltf = {
        json: gltf?.json || makeDefaultGLTFJson(),
        buffers: gltf?.buffers || [],
        images: gltf?.images || []
      };
      this.sourceBuffers = [];
      this.byteLength = 0;
      if (this.gltf.buffers && this.gltf.buffers[0]) {
        this.byteLength = this.gltf.buffers[0].byteLength;
        this.sourceBuffers = [this.gltf.buffers[0]];
      }
    }
    // Accessors
    get json() {
      return this.gltf.json;
    }
    getApplicationData(key) {
      const data = this.json[key];
      return data;
    }
    getExtraData(key) {
      const extras = this.json.extras || {};
      return extras[key];
    }
    hasExtension(extensionName) {
      const isUsedExtension = this.getUsedExtensions().find((name12) => name12 === extensionName);
      const isRequiredExtension = this.getRequiredExtensions().find((name12) => name12 === extensionName);
      return typeof isUsedExtension === "string" || typeof isRequiredExtension === "string";
    }
    getExtension(extensionName) {
      const isExtension = this.getUsedExtensions().find((name12) => name12 === extensionName);
      const extensions = this.json.extensions || {};
      return isExtension ? extensions[extensionName] : null;
    }
    getRequiredExtension(extensionName) {
      const isRequired = this.getRequiredExtensions().find((name12) => name12 === extensionName);
      return isRequired ? this.getExtension(extensionName) : null;
    }
    getRequiredExtensions() {
      return this.json.extensionsRequired || [];
    }
    getUsedExtensions() {
      return this.json.extensionsUsed || [];
    }
    getRemovedExtensions() {
      return this.json.extensionsRemoved || [];
    }
    getObjectExtension(object, extensionName) {
      const extensions = object.extensions || {};
      return extensions[extensionName];
    }
    getScene(index) {
      return this.getObject("scenes", index);
    }
    getNode(index) {
      return this.getObject("nodes", index);
    }
    getSkin(index) {
      return this.getObject("skins", index);
    }
    getMesh(index) {
      return this.getObject("meshes", index);
    }
    getMaterial(index) {
      return this.getObject("materials", index);
    }
    getAccessor(index) {
      return this.getObject("accessors", index);
    }
    // getCamera(index: number): object | null {
    //   return null; // TODO: fix thi: object  as null;
    // }
    getTexture(index) {
      return this.getObject("textures", index);
    }
    getSampler(index) {
      return this.getObject("samplers", index);
    }
    getImage(index) {
      return this.getObject("images", index);
    }
    getBufferView(index) {
      return this.getObject("bufferViews", index);
    }
    getBuffer(index) {
      return this.getObject("buffers", index);
    }
    getObject(array, index) {
      if (typeof index === "object") {
        return index;
      }
      const object = this.json[array] && this.json[array][index];
      if (!object) {
        throw new Error(`glTF file error: Could not find ${array}[${index}]`);
      }
      return object;
    }
    /**
     * Accepts buffer view index or buffer view object
     * @returns a `Uint8Array`
     */
    getTypedArrayForBufferView(bufferView) {
      bufferView = this.getBufferView(bufferView);
      const bufferIndex = bufferView.buffer;
      const binChunk = this.gltf.buffers[bufferIndex];
      assert3(binChunk);
      const byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
      return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
    }
    /** Accepts accessor index or accessor object
     * @returns a typed array with type that matches the types
     */
    getTypedArrayForAccessor(accessor) {
      const gltfAccessor = this.getAccessor(accessor);
      return getTypedArrayForAccessor(this.gltf.json, this.gltf.buffers, gltfAccessor);
    }
    /** accepts accessor index or accessor object
     * returns a `Uint8Array`
     */
    getTypedArrayForImageData(image) {
      image = this.getAccessor(image);
      const bufferView = this.getBufferView(image.bufferView);
      const buffer = this.getBuffer(bufferView.buffer);
      const arrayBuffer = buffer.data;
      const byteOffset = bufferView.byteOffset || 0;
      return new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
    }
    // MODIFERS
    /**
     * Add an extra application-defined key to the top-level data structure
     */
    addApplicationData(key, data) {
      this.json[key] = data;
      return this;
    }
    /**
     * `extras` - Standard GLTF field for storing application specific data
     */
    addExtraData(key, data) {
      this.json.extras = this.json.extras || {};
      this.json.extras[key] = data;
      return this;
    }
    addObjectExtension(object, extensionName, data) {
      object.extensions = object.extensions || {};
      object.extensions[extensionName] = data;
      this.registerUsedExtension(extensionName);
      return this;
    }
    setObjectExtension(object, extensionName, data) {
      const extensions = object.extensions || {};
      extensions[extensionName] = data;
    }
    removeObjectExtension(object, extensionName) {
      const extensions = object?.extensions || {};
      if (extensions[extensionName]) {
        this.json.extensionsRemoved = this.json.extensionsRemoved || [];
        const extensionsRemoved = this.json.extensionsRemoved;
        if (!extensionsRemoved.includes(extensionName)) {
          extensionsRemoved.push(extensionName);
        }
      }
      delete extensions[extensionName];
    }
    /**
     * Add to standard GLTF top level extension object, mark as used
     */
    addExtension(extensionName, extensionData = {}) {
      assert3(extensionData);
      this.json.extensions = this.json.extensions || {};
      this.json.extensions[extensionName] = extensionData;
      this.registerUsedExtension(extensionName);
      return extensionData;
    }
    /**
     * Standard GLTF top level extension object, mark as used and required
     */
    addRequiredExtension(extensionName, extensionData = {}) {
      assert3(extensionData);
      this.addExtension(extensionName, extensionData);
      this.registerRequiredExtension(extensionName);
      return extensionData;
    }
    /**
     * Add extensionName to list of used extensions
     */
    registerUsedExtension(extensionName) {
      this.json.extensionsUsed = this.json.extensionsUsed || [];
      if (!this.json.extensionsUsed.find((ext) => ext === extensionName)) {
        this.json.extensionsUsed.push(extensionName);
      }
    }
    /**
     * Add extensionName to list of required extensions
     */
    registerRequiredExtension(extensionName) {
      this.registerUsedExtension(extensionName);
      this.json.extensionsRequired = this.json.extensionsRequired || [];
      if (!this.json.extensionsRequired.find((ext) => ext === extensionName)) {
        this.json.extensionsRequired.push(extensionName);
      }
    }
    /**
     * Removes an extension from the top-level list
     */
    removeExtension(extensionName) {
      if (this.json.extensions?.[extensionName]) {
        this.json.extensionsRemoved = this.json.extensionsRemoved || [];
        const extensionsRemoved = this.json.extensionsRemoved;
        if (!extensionsRemoved.includes(extensionName)) {
          extensionsRemoved.push(extensionName);
        }
      }
      if (this.json.extensions) {
        delete this.json.extensions[extensionName];
      }
      if (this.json.extensionsRequired) {
        this._removeStringFromArray(this.json.extensionsRequired, extensionName);
      }
      if (this.json.extensionsUsed) {
        this._removeStringFromArray(this.json.extensionsUsed, extensionName);
      }
    }
    /**
     *  Set default scene which is to be displayed at load time
     */
    setDefaultScene(sceneIndex) {
      this.json.scene = sceneIndex;
    }
    /**
     * @todo: add more properties for scene initialization:
     *   name`, `extensions`, `extras`
     *   https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-scene
     */
    addScene(scene) {
      const { nodeIndices } = scene;
      this.json.scenes = this.json.scenes || [];
      this.json.scenes.push({ nodes: nodeIndices });
      return this.json.scenes.length - 1;
    }
    /**
     * @todo: add more properties for node initialization:
     *   `name`, `extensions`, `extras`, `camera`, `children`, `skin`, `rotation`, `scale`, `translation`, `weights`
     *   https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#node
     */
    addNode(node) {
      const { meshIndex, matrix } = node;
      this.json.nodes = this.json.nodes || [];
      const nodeData = { mesh: meshIndex };
      if (matrix) {
        nodeData.matrix = matrix;
      }
      this.json.nodes.push(nodeData);
      return this.json.nodes.length - 1;
    }
    /** Adds a mesh to the json part */
    addMesh(mesh) {
      const { attributes, indices, material, mode = 4 } = mesh;
      const accessors = this._addAttributes(attributes);
      const glTFMesh = {
        primitives: [
          {
            attributes: accessors,
            mode
          }
        ]
      };
      if (indices) {
        const indicesAccessor = this._addIndices(indices);
        glTFMesh.primitives[0].indices = indicesAccessor;
      }
      if (Number.isFinite(material)) {
        glTFMesh.primitives[0].material = material;
      }
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
    addPointCloud(attributes) {
      const accessorIndices = this._addAttributes(attributes);
      const glTFMesh = {
        primitives: [
          {
            attributes: accessorIndices,
            mode: 0
            // GL.POINTS
          }
        ]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
    /**
     * Adds a binary image. Builds glTF "JSON metadata" and saves buffer reference
     * Buffer will be copied into BIN chunk during "pack"
     * Currently encodes as glTF image
     * @param imageData
     * @param mimeType
     */
    addImage(imageData, mimeTypeOpt) {
      const metadata = getBinaryImageMetadata(imageData);
      const mimeType = mimeTypeOpt || metadata?.mimeType;
      const bufferViewIndex = this.addBufferView(imageData);
      const glTFImage = {
        bufferView: bufferViewIndex,
        mimeType
      };
      this.json.images = this.json.images || [];
      this.json.images.push(glTFImage);
      return this.json.images.length - 1;
    }
    /**
     * Add one untyped source buffer, create a matching glTF `bufferView`, and return its index
     * @param buffer
     */
    addBufferView(buffer, bufferIndex = 0, byteOffset = this.byteLength) {
      const byteLength = buffer.byteLength;
      assert3(Number.isFinite(byteLength));
      this.sourceBuffers = this.sourceBuffers || [];
      this.sourceBuffers.push(buffer);
      const glTFBufferView = {
        buffer: bufferIndex,
        // Write offset from the start of the binary body
        byteOffset,
        byteLength
      };
      this.byteLength += padToNBytes(byteLength, 4);
      this.json.bufferViews = this.json.bufferViews || [];
      this.json.bufferViews.push(glTFBufferView);
      return this.json.bufferViews.length - 1;
    }
    /**
     * Adds an accessor to a bufferView
     * @param bufferViewIndex
     * @param accessor
     */
    addAccessor(bufferViewIndex, accessor) {
      const glTFAccessor = {
        bufferView: bufferViewIndex,
        // @ts-ignore
        type: getAccessorTypeFromSize(accessor.size),
        // @ts-ignore
        componentType: accessor.componentType,
        // @ts-ignore
        count: accessor.count,
        // @ts-ignore
        max: accessor.max,
        // @ts-ignore
        min: accessor.min
      };
      this.json.accessors = this.json.accessors || [];
      this.json.accessors.push(glTFAccessor);
      return this.json.accessors.length - 1;
    }
    /**
     * Add a binary buffer. Builds glTF "JSON metadata" and saves buffer reference
     * Buffer will be copied into BIN chunk during "pack"
     * Currently encodes buffers as glTF accessors, but this could be optimized
     * @param sourceBuffer
     * @param accessor
     */
    addBinaryBuffer(sourceBuffer, accessor = { size: 3 }) {
      const bufferViewIndex = this.addBufferView(sourceBuffer);
      let minMax = { min: accessor.min, max: accessor.max };
      if (!minMax.min || !minMax.max) {
        minMax = this._getAccessorMinMax(sourceBuffer, accessor.size);
      }
      const accessorDefaults = {
        // @ts-ignore
        size: accessor.size,
        componentType: getComponentTypeFromArray(sourceBuffer),
        // @ts-ignore
        count: Math.round(sourceBuffer.length / accessor.size),
        min: minMax.min,
        max: minMax.max
      };
      return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
    }
    /**
     * Adds a texture to the json part
     * @todo: add more properties for texture initialization
     * `sampler`, `name`, `extensions`, `extras`
     * https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#texture
     */
    addTexture(texture) {
      const { imageIndex } = texture;
      const glTFTexture = {
        source: imageIndex
      };
      this.json.textures = this.json.textures || [];
      this.json.textures.push(glTFTexture);
      return this.json.textures.length - 1;
    }
    /** Adds a material to the json part */
    addMaterial(pbrMaterialInfo) {
      this.json.materials = this.json.materials || [];
      this.json.materials.push(pbrMaterialInfo);
      return this.json.materials.length - 1;
    }
    /** Pack the binary chunk */
    createBinaryChunk() {
      const totalByteLength = this.byteLength;
      const arrayBuffer = new ArrayBuffer(totalByteLength);
      const targetArray = new Uint8Array(arrayBuffer);
      let dstByteOffset = 0;
      for (const sourceBuffer of this.sourceBuffers || []) {
        dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
      }
      if (this.json?.buffers?.[0]) {
        this.json.buffers[0].byteLength = totalByteLength;
      } else {
        this.json.buffers = [{ byteLength: totalByteLength }];
      }
      this.gltf.binary = arrayBuffer;
      this.sourceBuffers = [arrayBuffer];
      this.gltf.buffers = [{ arrayBuffer, byteOffset: 0, byteLength: arrayBuffer.byteLength }];
    }
    // PRIVATE
    _removeStringFromArray(array, string) {
      let found = true;
      while (found) {
        const index = array.indexOf(string);
        if (index > -1) {
          array.splice(index, 1);
        } else {
          found = false;
        }
      }
    }
    /**
     * Add attributes to buffers and create `attributes` object which is part of `mesh`
     */
    _addAttributes(attributes = {}) {
      const result = {};
      for (const attributeKey in attributes) {
        const attributeData = attributes[attributeKey];
        const attrName = this._getGltfAttributeName(attributeKey);
        const accessor = this.addBinaryBuffer(attributeData.value, attributeData);
        result[attrName] = accessor;
      }
      return result;
    }
    /**
     * Add indices to buffers
     */
    _addIndices(indices) {
      return this.addBinaryBuffer(indices, { size: 1 });
    }
    /**
     * Deduce gltf specific attribue name from input attribute name
     */
    _getGltfAttributeName(attributeName) {
      switch (attributeName.toLowerCase()) {
        case "position":
        case "positions":
        case "vertices":
          return "POSITION";
        case "normal":
        case "normals":
          return "NORMAL";
        case "color":
        case "colors":
          return "COLOR_0";
        case "texcoord":
        case "texcoords":
          return "TEXCOORD_0";
        default:
          return attributeName;
      }
    }
    /**
     * Calculate `min` and `max` arrays of accessor according to spec:
     * https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-accessor
     */
    _getAccessorMinMax(buffer, size) {
      const result = { min: null, max: null };
      if (buffer.length < size) {
        return result;
      }
      result.min = [];
      result.max = [];
      const initValues = buffer.subarray(0, size);
      for (const value of initValues) {
        result.min.push(value);
        result.max.push(value);
      }
      for (let index = size; index < buffer.length; index += size) {
        for (let componentIndex = 0; componentIndex < size; componentIndex++) {
          result.min[0 + componentIndex] = Math.min(
            // @ts-ignore
            result.min[0 + componentIndex],
            buffer[index + componentIndex]
          );
          result.max[0 + componentIndex] = Math.max(
            // @ts-ignore
            result.max[0 + componentIndex],
            buffer[index + componentIndex]
          );
        }
      }
      return result;
    }
  };

  // src/lib/extensions/utils/3d-tiles-utils.ts
  function emod(n) {
    return (n % 1 + 1) % 1;
  }
  var ATTRIBUTE_TYPE_TO_COMPONENTS2 = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,
    BOOLEAN: 1,
    STRING: 1,
    ENUM: 1
  };
  var ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY2 = {
    INT8: Int8Array,
    UINT8: Uint8Array,
    INT16: Int16Array,
    UINT16: Uint16Array,
    INT32: Int32Array,
    UINT32: Uint32Array,
    INT64: BigInt64Array,
    UINT64: BigUint64Array,
    FLOAT32: Float32Array,
    FLOAT64: Float64Array
  };
  var ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE2 = {
    INT8: 1,
    UINT8: 1,
    INT16: 2,
    UINT16: 2,
    INT32: 4,
    UINT32: 4,
    INT64: 8,
    UINT64: 8,
    FLOAT32: 4,
    FLOAT64: 8
  };
  function getArrayElementByteSize(attributeType, componentType) {
    return ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE2[componentType] * ATTRIBUTE_TYPE_TO_COMPONENTS2[attributeType];
  }
  function getOffsetsForProperty(scenegraph, bufferViewIndex, offsetType, numberOfElements) {
    if (offsetType !== "UINT8" && offsetType !== "UINT16" && offsetType !== "UINT32" && offsetType !== "UINT64") {
      return null;
    }
    const arrayOffsetsBytes = scenegraph.getTypedArrayForBufferView(bufferViewIndex);
    const arrayOffsets = convertRawBufferToMetadataArray(
      arrayOffsetsBytes,
      "SCALAR",
      // offsets consist of ONE component
      offsetType,
      numberOfElements + 1
      // The number of offsets is equal to the property table `count` plus one.
    );
    if (arrayOffsets instanceof BigInt64Array || arrayOffsets instanceof BigUint64Array) {
      return null;
    }
    return arrayOffsets;
  }
  function convertRawBufferToMetadataArray(data, attributeType, componentType, elementCount = 1) {
    const numberOfComponents = ATTRIBUTE_TYPE_TO_COMPONENTS2[attributeType];
    const ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY2[componentType];
    const size = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE2[componentType];
    const length = elementCount * numberOfComponents;
    const byteLength = length * size;
    let buffer = data.buffer;
    let offset = data.byteOffset;
    if (offset % size !== 0) {
      const bufferArray = new Uint8Array(buffer);
      buffer = bufferArray.slice(offset, offset + byteLength).buffer;
      offset = 0;
    }
    return new ArrayType(buffer, offset, length);
  }
  function getPrimitiveTextureData(scenegraph, textureInfo, primitive) {
    const texCoordAccessorKey = `TEXCOORD_${textureInfo.texCoord || 0}`;
    const texCoordAccessorIndex = primitive.attributes[texCoordAccessorKey];
    const textureCoordinates = scenegraph.getTypedArrayForAccessor(texCoordAccessorIndex);
    const json = scenegraph.gltf.json;
    const textureIndex = textureInfo.index;
    const imageIndex = json.textures?.[textureIndex]?.source;
    if (typeof imageIndex !== "undefined") {
      const mimeType = json.images?.[imageIndex]?.mimeType;
      const parsedImage = scenegraph.gltf.images?.[imageIndex];
      if (parsedImage && typeof parsedImage.width !== "undefined") {
        const textureData = [];
        for (let index = 0; index < textureCoordinates.length; index += 2) {
          const value = getImageValueByCoordinates(
            parsedImage,
            mimeType,
            textureCoordinates,
            index,
            textureInfo.channels
          );
          textureData.push(value);
        }
        return textureData;
      }
    }
    return [];
  }
  function primitivePropertyDataToAttributes(scenegraph, attributeName, propertyData, featureTable, primitive) {
    if (!propertyData?.length) {
      return;
    }
    const featureIndices = [];
    for (const texelData of propertyData) {
      let index = featureTable.findIndex((item) => item === texelData);
      if (index === -1) {
        index = featureTable.push(texelData) - 1;
      }
      featureIndices.push(index);
    }
    const typedArray = new Uint32Array(featureIndices);
    const bufferIndex = scenegraph.gltf.buffers.push({
      arrayBuffer: typedArray.buffer,
      byteOffset: typedArray.byteOffset,
      byteLength: typedArray.byteLength
    }) - 1;
    const bufferViewIndex = scenegraph.addBufferView(typedArray, bufferIndex, 0);
    const accessorIndex = scenegraph.addAccessor(bufferViewIndex, {
      size: 1,
      componentType: getComponentTypeFromArray(typedArray),
      count: typedArray.length
    });
    primitive.attributes[attributeName] = accessorIndex;
  }
  function getImageValueByCoordinates(parsedImage, mimeType, textureCoordinates, index, channels = [0]) {
    const CHANNELS_MAP = {
      r: { offset: 0, shift: 0 },
      g: { offset: 1, shift: 8 },
      b: { offset: 2, shift: 16 },
      a: { offset: 3, shift: 24 }
    };
    const u = textureCoordinates[index];
    const v = textureCoordinates[index + 1];
    let components = 1;
    if (mimeType && (mimeType.indexOf("image/jpeg") !== -1 || mimeType.indexOf("image/png") !== -1))
      components = 4;
    const offset = coordinatesToOffset(u, v, parsedImage, components);
    let value = 0;
    for (const c of channels) {
      const map = typeof c === "number" ? Object.values(CHANNELS_MAP)[c] : CHANNELS_MAP[c];
      const imageOffset = offset + map.offset;
      const imageData = getImageData(parsedImage);
      if (imageData.data.length <= imageOffset) {
        throw new Error(`${imageData.data.length} <= ${imageOffset}`);
      }
      const imageValue = imageData.data[imageOffset];
      value |= imageValue << map.shift;
    }
    return value;
  }
  function coordinatesToOffset(u, v, parsedImage, componentsCount = 1) {
    const w = parsedImage.width;
    const iX = emod(u) * (w - 1);
    const indX = Math.round(iX);
    const h = parsedImage.height;
    const iY = emod(v) * (h - 1);
    const indY = Math.round(iY);
    const components = parsedImage.components ? parsedImage.components : componentsCount;
    const offset = (indY * w + indX) * components;
    return offset;
  }
  function parseVariableLengthArrayNumeric(valuesData, numberOfElements, arrayOffsets, valuesDataBytesLength, valueSize) {
    const attributeValueArray = [];
    for (let index = 0; index < numberOfElements; index++) {
      const arrayOffset = arrayOffsets[index];
      const arrayByteSize = arrayOffsets[index + 1] - arrayOffsets[index];
      if (arrayByteSize + arrayOffset > valuesDataBytesLength) {
        break;
      }
      const typedArrayOffset = arrayOffset / valueSize;
      const elementCount = arrayByteSize / valueSize;
      attributeValueArray.push(valuesData.slice(typedArrayOffset, typedArrayOffset + elementCount));
    }
    return attributeValueArray;
  }
  function parseFixedLengthArrayNumeric(valuesData, numberOfElements, arrayCount) {
    const attributeValueArray = [];
    for (let index = 0; index < numberOfElements; index++) {
      const elementOffset = index * arrayCount;
      attributeValueArray.push(valuesData.slice(elementOffset, elementOffset + arrayCount));
    }
    return attributeValueArray;
  }
  function getPropertyDataString(numberOfElements, valuesDataBytes, arrayOffsets, stringOffsets) {
    if (arrayOffsets) {
      throw new Error("Not implemented - arrayOffsets for strings is specified");
    }
    if (stringOffsets) {
      const stringsArray = [];
      const textDecoder = new TextDecoder("utf8");
      let stringOffset = 0;
      for (let index = 0; index < numberOfElements; index++) {
        const stringByteSize = stringOffsets[index + 1] - stringOffsets[index];
        if (stringByteSize + stringOffset <= valuesDataBytes.length) {
          const stringData = valuesDataBytes.subarray(stringOffset, stringByteSize + stringOffset);
          const stringAttribute = textDecoder.decode(stringData);
          stringsArray.push(stringAttribute);
          stringOffset += stringByteSize;
        }
      }
      return stringsArray;
    }
    return [];
  }

  // src/lib/extensions/EXT_mesh_features.ts
  var EXT_MESH_FEATURES_NAME = "EXT_mesh_features";
  var name = EXT_MESH_FEATURES_NAME;
  async function decode(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    decodeExtMeshFeatures(scenegraph, options);
  }
  function encode(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    encodeExtMeshFeatures(scenegraph, options);
    scenegraph.createBinaryChunk();
    return scenegraph.gltf;
  }
  function decodeExtMeshFeatures(scenegraph, options) {
    const json = scenegraph.gltf.json;
    if (!json.meshes) {
      return;
    }
    for (const mesh of json.meshes) {
      for (const primitive of mesh.primitives) {
        processMeshPrimitiveFeatures(scenegraph, primitive, options);
      }
    }
  }
  function processMeshPrimitiveFeatures(scenegraph, primitive, options) {
    if (!options?.gltf?.loadBuffers) {
      return;
    }
    const extension = primitive.extensions?.[EXT_MESH_FEATURES_NAME];
    const featureIds = extension?.featureIds;
    if (!featureIds) {
      return;
    }
    for (const featureId of featureIds) {
      let featureIdData;
      if (typeof featureId.attribute !== "undefined") {
        const accessorKey = `_FEATURE_ID_${featureId.attribute}`;
        const accessorIndex = primitive.attributes[accessorKey];
        featureIdData = scenegraph.getTypedArrayForAccessor(accessorIndex);
      } else if (typeof featureId.texture !== "undefined" && options?.gltf?.loadImages) {
        featureIdData = getPrimitiveTextureData(scenegraph, featureId.texture, primitive);
      } else {
        featureIdData = [];
      }
      featureId.data = featureIdData;
    }
  }
  function encodeExtMeshFeatures(scenegraph, options) {
    const meshes = scenegraph.gltf.json.meshes;
    if (!meshes) {
      return;
    }
    for (const mesh of meshes) {
      for (const primitive of mesh.primitives) {
        encodeExtMeshFeaturesForPrimitive(scenegraph, primitive);
      }
    }
  }
  function createExtMeshFeatures(scenegraph, primitive, featureIdArray, propertyTableIndex) {
    if (!primitive.extensions) {
      primitive.extensions = {};
    }
    let extension = primitive.extensions[EXT_MESH_FEATURES_NAME];
    if (!extension) {
      extension = { featureIds: [] };
      primitive.extensions[EXT_MESH_FEATURES_NAME] = extension;
    }
    const { featureIds } = extension;
    const featureId = {
      featureCount: featureIdArray.length,
      propertyTable: propertyTableIndex,
      data: featureIdArray
    };
    featureIds.push(featureId);
    scenegraph.addObjectExtension(primitive, EXT_MESH_FEATURES_NAME, extension);
  }
  function encodeExtMeshFeaturesForPrimitive(scenegraph, primitive) {
    const extension = primitive.extensions?.[EXT_MESH_FEATURES_NAME];
    if (!extension) {
      return;
    }
    const featureIds = extension.featureIds;
    featureIds.forEach((featureId, elementIndex) => {
      if (featureId.data) {
        const { accessorKey, index } = createAccessorKey(primitive.attributes);
        const typedArray = new Uint32Array(featureId.data);
        featureIds[elementIndex] = {
          featureCount: typedArray.length,
          propertyTable: featureId.propertyTable,
          attribute: index
        };
        scenegraph.gltf.buffers.push({
          arrayBuffer: typedArray.buffer,
          byteOffset: typedArray.byteOffset,
          byteLength: typedArray.byteLength
        });
        const bufferViewIndex = scenegraph.addBufferView(typedArray);
        const accessorIndex = scenegraph.addAccessor(bufferViewIndex, {
          size: 1,
          componentType: getComponentTypeFromArray(typedArray),
          count: typedArray.length
        });
        primitive.attributes[accessorKey] = accessorIndex;
      }
    });
  }
  function createAccessorKey(attributes) {
    const prefix = "_FEATURE_ID_";
    const attrs = Object.keys(attributes).filter((item) => item.indexOf(prefix) === 0);
    let max = -1;
    for (const a of attrs) {
      const n = Number(a.substring(prefix.length));
      if (n > max) {
        max = n;
      }
    }
    max++;
    const accessorKey = `${prefix}${max}`;
    return { accessorKey, index: max };
  }

  // src/lib/extensions/EXT_structural_metadata.ts
  var EXT_structural_metadata_exports = {};
  __export(EXT_structural_metadata_exports, {
    createExtStructuralMetadata: () => createExtStructuralMetadata,
    decode: () => decode2,
    encode: () => encode2,
    name: () => name2
  });
  var EXT_STRUCTURAL_METADATA_NAME = "EXT_structural_metadata";
  var name2 = EXT_STRUCTURAL_METADATA_NAME;
  async function decode2(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    decodeExtStructuralMetadata(scenegraph, options);
  }
  function encode2(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    encodeExtStructuralMetadata(scenegraph, options);
    scenegraph.createBinaryChunk();
    return scenegraph.gltf;
  }
  function decodeExtStructuralMetadata(scenegraph, options) {
    if (!options.gltf?.loadBuffers) {
      return;
    }
    const extension = scenegraph.getExtension(
      EXT_STRUCTURAL_METADATA_NAME
    );
    if (!extension) {
      return;
    }
    if (options.gltf?.loadImages) {
      decodePropertyTextures(scenegraph, extension);
    }
    decodePropertyTables(scenegraph, extension);
  }
  function decodePropertyTextures(scenegraph, extension) {
    const propertyTextures = extension.propertyTextures;
    const json = scenegraph.gltf.json;
    if (propertyTextures && json.meshes) {
      for (const mesh of json.meshes) {
        for (const primitive of mesh.primitives) {
          processPrimitivePropertyTextures(scenegraph, propertyTextures, primitive, extension);
        }
      }
    }
  }
  function decodePropertyTables(scenegraph, extension) {
    const schema = extension.schema;
    if (!schema) {
      return;
    }
    const schemaClasses = schema.classes;
    const propertyTables = extension.propertyTables;
    if (schemaClasses && propertyTables) {
      for (const schemaName in schemaClasses) {
        const propertyTable = findPropertyTableByClass(propertyTables, schemaName);
        if (propertyTable) {
          processPropertyTable(scenegraph, schema, propertyTable);
        }
      }
    }
  }
  function findPropertyTableByClass(propertyTables, schemaClassName) {
    for (const propertyTable of propertyTables) {
      if (propertyTable.class === schemaClassName) {
        return propertyTable;
      }
    }
    return null;
  }
  function processPrimitivePropertyTextures(scenegraph, propertyTextures, primitive, extension) {
    if (!propertyTextures) {
      return;
    }
    const primitiveExtension = primitive.extensions?.[EXT_STRUCTURAL_METADATA_NAME];
    const primitivePropertyTextureIndices = primitiveExtension?.propertyTextures;
    if (!primitivePropertyTextureIndices) {
      return;
    }
    for (const primitivePropertyTextureIndex of primitivePropertyTextureIndices) {
      const propertyTexture = propertyTextures[primitivePropertyTextureIndex];
      processPrimitivePropertyTexture(scenegraph, propertyTexture, primitive, extension);
    }
  }
  function processPrimitivePropertyTexture(scenegraph, propertyTexture, primitive, extension) {
    if (!propertyTexture.properties) {
      return;
    }
    if (!extension.dataAttributeNames) {
      extension.dataAttributeNames = [];
    }
    const className = propertyTexture.class;
    for (const propertyName in propertyTexture.properties) {
      const attributeName = `${className}_${propertyName}`;
      const textureInfoTopLevel = propertyTexture.properties?.[propertyName];
      if (!textureInfoTopLevel) {
        continue;
      }
      if (!textureInfoTopLevel.data) {
        textureInfoTopLevel.data = [];
      }
      const featureTextureTable = textureInfoTopLevel.data;
      const propertyData = getPrimitiveTextureData(
        scenegraph,
        textureInfoTopLevel,
        primitive
      );
      if (propertyData === null) {
        continue;
      }
      primitivePropertyDataToAttributes(
        scenegraph,
        attributeName,
        propertyData,
        featureTextureTable,
        primitive
      );
      textureInfoTopLevel.data = featureTextureTable;
      extension.dataAttributeNames.push(attributeName);
    }
  }
  function processPropertyTable(scenegraph, schema, propertyTable) {
    const schemaClass = schema.classes?.[propertyTable.class];
    if (!schemaClass) {
      throw new Error(
        `Incorrect data in the EXT_structural_metadata extension: no schema class with name ${propertyTable.class}`
      );
    }
    const numberOfElements = propertyTable.count;
    for (const propertyName in schemaClass.properties) {
      const classProperty = schemaClass.properties[propertyName];
      const propertyTableProperty = propertyTable.properties?.[propertyName];
      if (propertyTableProperty) {
        const data = getPropertyDataFromBinarySource(
          scenegraph,
          schema,
          classProperty,
          numberOfElements,
          propertyTableProperty
        );
        propertyTableProperty.data = data;
      }
    }
  }
  function getPropertyDataFromBinarySource(scenegraph, schema, classProperty, numberOfElements, propertyTableProperty) {
    let data = [];
    const valuesBufferView = propertyTableProperty.values;
    const valuesDataBytes = scenegraph.getTypedArrayForBufferView(valuesBufferView);
    const arrayOffsets = getArrayOffsetsForProperty(
      scenegraph,
      classProperty,
      propertyTableProperty,
      numberOfElements
    );
    const stringOffsets = getStringOffsetsForProperty(
      scenegraph,
      propertyTableProperty,
      numberOfElements
    );
    switch (classProperty.type) {
      case "SCALAR":
      case "VEC2":
      case "VEC3":
      case "VEC4":
      case "MAT2":
      case "MAT3":
      case "MAT4": {
        data = getPropertyDataNumeric(classProperty, numberOfElements, valuesDataBytes, arrayOffsets);
        break;
      }
      case "BOOLEAN": {
        throw new Error(`Not implemented - classProperty.type=${classProperty.type}`);
      }
      case "STRING": {
        data = getPropertyDataString(numberOfElements, valuesDataBytes, arrayOffsets, stringOffsets);
        break;
      }
      case "ENUM": {
        data = getPropertyDataENUM(
          schema,
          classProperty,
          numberOfElements,
          valuesDataBytes,
          arrayOffsets
        );
        break;
      }
      default:
        throw new Error(`Unknown classProperty type ${classProperty.type}`);
    }
    return data;
  }
  function getArrayOffsetsForProperty(scenegraph, classProperty, propertyTableProperty, numberOfElements) {
    if (classProperty.array && // `count` is a number of array elements. May only be defined when `array` is true.
    // If `count` is NOT defined, it's a VARIABLE-length array
    typeof classProperty.count === "undefined" && // `arrayOffsets` is an index of the buffer view containing offsets for variable-length arrays.
    typeof propertyTableProperty.arrayOffsets !== "undefined") {
      return getOffsetsForProperty(
        scenegraph,
        propertyTableProperty.arrayOffsets,
        propertyTableProperty.arrayOffsetType || "UINT32",
        numberOfElements
      );
    }
    return null;
  }
  function getStringOffsetsForProperty(scenegraph, propertyTableProperty, numberOfElements) {
    if (typeof propertyTableProperty.stringOffsets !== "undefined") {
      return getOffsetsForProperty(
        scenegraph,
        propertyTableProperty.stringOffsets,
        propertyTableProperty.stringOffsetType || "UINT32",
        numberOfElements
      );
    }
    return null;
  }
  function getPropertyDataNumeric(classProperty, numberOfElements, valuesDataBytes, arrayOffsets) {
    const isArray2 = classProperty.array;
    const arrayCount = classProperty.count;
    const elementSize = getArrayElementByteSize(classProperty.type, classProperty.componentType);
    const elementCount = valuesDataBytes.byteLength / elementSize;
    let valuesData;
    if (classProperty.componentType) {
      valuesData = convertRawBufferToMetadataArray(
        valuesDataBytes,
        classProperty.type,
        // The datatype of the element's components. Only applicable to `SCALAR`, `VECN`, and `MATN` types.
        classProperty.componentType,
        elementCount
      );
    } else {
      valuesData = valuesDataBytes;
    }
    if (isArray2) {
      if (arrayOffsets) {
        return parseVariableLengthArrayNumeric(
          valuesData,
          numberOfElements,
          arrayOffsets,
          valuesDataBytes.length,
          elementSize
        );
      }
      if (arrayCount) {
        return parseFixedLengthArrayNumeric(valuesData, numberOfElements, arrayCount);
      }
      return [];
    }
    return valuesData;
  }
  function getPropertyDataENUM(schema, classProperty, numberOfElements, valuesDataBytes, arrayOffsets) {
    const enumType = classProperty.enumType;
    if (!enumType) {
      throw new Error(
        "Incorrect data in the EXT_structural_metadata extension: classProperty.enumType is not set for type ENUM"
      );
    }
    const enumEntry = schema.enums?.[enumType];
    if (!enumEntry) {
      throw new Error(
        `Incorrect data in the EXT_structural_metadata extension: schema.enums does't contain ${enumType}`
      );
    }
    const enumValueType = enumEntry.valueType || "UINT16";
    const elementSize = getArrayElementByteSize(classProperty.type, enumValueType);
    const elementCount = valuesDataBytes.byteLength / elementSize;
    let valuesData = convertRawBufferToMetadataArray(
      valuesDataBytes,
      classProperty.type,
      enumValueType,
      elementCount
    );
    if (!valuesData) {
      valuesData = valuesDataBytes;
    }
    if (classProperty.array) {
      if (arrayOffsets) {
        return parseVariableLengthArrayENUM({
          valuesData,
          numberOfElements,
          arrayOffsets,
          valuesDataBytesLength: valuesDataBytes.length,
          elementSize,
          enumEntry
        });
      }
      const arrayCount = classProperty.count;
      if (arrayCount) {
        return parseFixedLengthArrayENUM(valuesData, numberOfElements, arrayCount, enumEntry);
      }
      return [];
    }
    return getEnumsArray(valuesData, 0, numberOfElements, enumEntry);
  }
  function parseVariableLengthArrayENUM(params) {
    const {
      valuesData,
      numberOfElements,
      arrayOffsets,
      valuesDataBytesLength,
      elementSize,
      enumEntry
    } = params;
    const attributeValueArray = [];
    for (let index = 0; index < numberOfElements; index++) {
      const arrayOffset = arrayOffsets[index];
      const arrayByteSize = arrayOffsets[index + 1] - arrayOffsets[index];
      if (arrayByteSize + arrayOffset > valuesDataBytesLength) {
        break;
      }
      const typedArrayOffset = arrayOffset / elementSize;
      const elementCount = arrayByteSize / elementSize;
      const array = getEnumsArray(valuesData, typedArrayOffset, elementCount, enumEntry);
      attributeValueArray.push(array);
    }
    return attributeValueArray;
  }
  function parseFixedLengthArrayENUM(valuesData, numberOfElements, arrayCount, enumEntry) {
    const attributeValueArray = [];
    for (let index = 0; index < numberOfElements; index++) {
      const elementOffset = arrayCount * index;
      const array = getEnumsArray(valuesData, elementOffset, arrayCount, enumEntry);
      attributeValueArray.push(array);
    }
    return attributeValueArray;
  }
  function getEnumsArray(valuesData, offset, count, enumEntry) {
    const array = [];
    for (let i = 0; i < count; i++) {
      if (valuesData instanceof BigInt64Array || valuesData instanceof BigUint64Array) {
        array.push("");
      } else {
        const value = valuesData[offset + i];
        const enumObject = getEnumByValue(enumEntry, value);
        if (enumObject) {
          array.push(enumObject.name);
        } else {
          array.push("");
        }
      }
    }
    return array;
  }
  function getEnumByValue(enumEntry, value) {
    for (const enumValue of enumEntry.values) {
      if (enumValue.value === value) {
        return enumValue;
      }
    }
    return null;
  }
  var SCHEMA_CLASS_ID_DEFAULT = "schemaClassId";
  function encodeExtStructuralMetadata(scenegraph, options) {
    const extension = scenegraph.getExtension(
      EXT_STRUCTURAL_METADATA_NAME
    );
    if (!extension) {
      return;
    }
    if (extension.propertyTables) {
      for (const table of extension.propertyTables) {
        const classId = table.class;
        const schemaClass = extension.schema?.classes?.[classId];
        if (table.properties && schemaClass) {
          encodeProperties(table, schemaClass, scenegraph);
        }
      }
    }
  }
  function encodeProperties(table, schemaClass, scenegraph) {
    for (const propertyName in table.properties) {
      const data = table.properties[propertyName].data;
      if (data) {
        const classProperty = schemaClass.properties[propertyName];
        if (classProperty) {
          const tableProperty = createPropertyTableProperty(
            data,
            classProperty,
            scenegraph
          );
          table.properties[propertyName] = tableProperty;
        }
      }
    }
  }
  function createExtStructuralMetadata(scenegraph, propertyAttributes, classId = SCHEMA_CLASS_ID_DEFAULT) {
    let extension = scenegraph.getExtension(
      EXT_STRUCTURAL_METADATA_NAME
    );
    if (!extension) {
      extension = scenegraph.addExtension(EXT_STRUCTURAL_METADATA_NAME);
    }
    extension.schema = createSchema(propertyAttributes, classId, extension.schema);
    const table = createPropertyTable(propertyAttributes, classId, extension.schema);
    if (!extension.propertyTables) {
      extension.propertyTables = [];
    }
    return extension.propertyTables.push(table) - 1;
  }
  function createSchema(propertyAttributes, classId, schemaToUpdate) {
    const schema = schemaToUpdate ?? {
      id: "schema_id"
    };
    const schemaClass = {
      properties: {}
    };
    for (const attribute of propertyAttributes) {
      const classProperty = {
        type: attribute.elementType,
        componentType: attribute.componentType
      };
      schemaClass.properties[attribute.name] = classProperty;
    }
    schema.classes = {};
    schema.classes[classId] = schemaClass;
    return schema;
  }
  function createPropertyTable(propertyAttributes, classId, schema) {
    const table = {
      class: classId,
      count: 0
    };
    let count = 0;
    const schemaClass = schema.classes?.[classId];
    for (const attribute of propertyAttributes) {
      if (count === 0) {
        count = attribute.values.length;
      }
      if (count !== attribute.values.length && attribute.values.length) {
        throw new Error("Illegal values in attributes");
      }
      const classProperty = schemaClass?.properties[attribute.name];
      if (classProperty) {
        if (!table.properties) {
          table.properties = {};
        }
        table.properties[attribute.name] = { values: 0, data: attribute.values };
      }
    }
    table.count = count;
    return table;
  }
  function createPropertyTableProperty(values, classProperty, scenegraph) {
    const prop = { values: 0 };
    if (classProperty.type === "STRING") {
      const { stringData, stringOffsets } = createPropertyDataString(values);
      prop.stringOffsets = createBufferView(stringOffsets, scenegraph);
      prop.values = createBufferView(stringData, scenegraph);
    } else if (classProperty.type === "SCALAR" && classProperty.componentType) {
      const data = createPropertyDataScalar(values, classProperty.componentType);
      prop.values = createBufferView(data, scenegraph);
    }
    return prop;
  }
  var COMPONENT_TYPE_TO_ARRAY_CONSTRUCTOR = {
    INT8: Int8Array,
    UINT8: Uint8Array,
    INT16: Int16Array,
    UINT16: Uint16Array,
    INT32: Int32Array,
    UINT32: Uint32Array,
    INT64: Int32Array,
    UINT64: Uint32Array,
    FLOAT32: Float32Array,
    FLOAT64: Float64Array
  };
  function createPropertyDataScalar(array, componentType) {
    const numberArray = [];
    for (const value of array) {
      numberArray.push(Number(value));
    }
    const Construct = COMPONENT_TYPE_TO_ARRAY_CONSTRUCTOR[componentType];
    if (!Construct) {
      throw new Error("Illegal component type");
    }
    return new Construct(numberArray);
  }
  function createPropertyDataString(strings) {
    const utf8Encode = new TextEncoder();
    const arr = [];
    let len = 0;
    for (const str of strings) {
      const uint8Array = utf8Encode.encode(str);
      len += uint8Array.length;
      arr.push(uint8Array);
    }
    const strArray = new Uint8Array(len);
    const strOffsets = [];
    let offset = 0;
    for (const str of arr) {
      strArray.set(str, offset);
      strOffsets.push(offset);
      offset += str.length;
    }
    strOffsets.push(offset);
    const stringOffsetsTypedArray = new Uint32Array(strOffsets);
    return { stringData: strArray, stringOffsets: stringOffsetsTypedArray };
  }
  function createBufferView(typedArray, scenegraph) {
    scenegraph.gltf.buffers.push({
      arrayBuffer: typedArray.buffer,
      byteOffset: typedArray.byteOffset,
      byteLength: typedArray.byteLength
    });
    return scenegraph.addBufferView(typedArray);
  }

  // src/lib/extensions/deprecated/EXT_feature_metadata.ts
  var EXT_feature_metadata_exports = {};
  __export(EXT_feature_metadata_exports, {
    decode: () => decode3,
    name: () => name3
  });
  var EXT_FEATURE_METADATA_NAME = "EXT_feature_metadata";
  var name3 = EXT_FEATURE_METADATA_NAME;
  async function decode3(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    decodeExtFeatureMetadata(scenegraph, options);
  }
  function decodeExtFeatureMetadata(scenegraph, options) {
    if (!options.gltf?.loadBuffers) {
      return;
    }
    const extension = scenegraph.getExtension(EXT_FEATURE_METADATA_NAME);
    if (!extension) {
      return;
    }
    if (options.gltf?.loadImages) {
      decodePropertyTextures2(scenegraph, extension);
    }
    decodePropertyTables2(scenegraph, extension);
  }
  function decodePropertyTextures2(scenegraph, extension) {
    const schema = extension.schema;
    if (!schema) {
      return;
    }
    const schemaClasses = schema.classes;
    const { featureTextures } = extension;
    if (schemaClasses && featureTextures) {
      for (const schemaName in schemaClasses) {
        const schemaClass = schemaClasses[schemaName];
        const featureTexture = findFeatureTextureByClass(featureTextures, schemaName);
        if (featureTexture) {
          handleFeatureTextureProperties(scenegraph, featureTexture, schemaClass);
        }
      }
    }
  }
  function decodePropertyTables2(scenegraph, extension) {
    const schema = extension.schema;
    if (!schema) {
      return;
    }
    const schemaClasses = schema.classes;
    const propertyTables = extension.featureTables;
    if (schemaClasses && propertyTables) {
      for (const schemaName in schemaClasses) {
        const propertyTable = findPropertyTableByClass2(propertyTables, schemaName);
        if (propertyTable) {
          processPropertyTable2(scenegraph, schema, propertyTable);
        }
      }
    }
  }
  function findPropertyTableByClass2(propertyTables, schemaClassName) {
    for (const propertyTableName in propertyTables) {
      const propertyTable = propertyTables[propertyTableName];
      if (propertyTable.class === schemaClassName) {
        return propertyTable;
      }
    }
    return null;
  }
  function findFeatureTextureByClass(featureTextures, schemaClassName) {
    for (const featureTexturesName in featureTextures) {
      const featureTable = featureTextures[featureTexturesName];
      if (featureTable.class === schemaClassName) {
        return featureTable;
      }
    }
    return null;
  }
  function processPropertyTable2(scenegraph, schema, propertyTable) {
    if (!propertyTable.class) {
      return;
    }
    const schemaClass = schema.classes?.[propertyTable.class];
    if (!schemaClass) {
      throw new Error(
        `Incorrect data in the EXT_structural_metadata extension: no schema class with name ${propertyTable.class}`
      );
    }
    const numberOfElements = propertyTable.count;
    for (const propertyName in schemaClass.properties) {
      const classProperty = schemaClass.properties[propertyName];
      const propertyTableProperty = propertyTable.properties?.[propertyName];
      if (propertyTableProperty) {
        const data = getPropertyDataFromBinarySource2(
          scenegraph,
          schema,
          classProperty,
          numberOfElements,
          propertyTableProperty
        );
        propertyTableProperty.data = data;
      }
    }
  }
  function handleFeatureTextureProperties(scenegraph, featureTexture, schemaClass) {
    const attributeName = featureTexture.class;
    for (const propertyName in schemaClass.properties) {
      const featureTextureProperty = featureTexture?.properties?.[propertyName];
      if (featureTextureProperty) {
        const data = getPropertyDataFromTexture(scenegraph, featureTextureProperty, attributeName);
        featureTextureProperty.data = data;
      }
    }
  }
  function getPropertyDataFromBinarySource2(scenegraph, schema, classProperty, numberOfFeatures, featureTableProperty) {
    let data = [];
    const bufferView = featureTableProperty.bufferView;
    const dataArray = scenegraph.getTypedArrayForBufferView(bufferView);
    const arrayOffsets = getArrayOffsetsForProperty2(
      scenegraph,
      classProperty,
      featureTableProperty,
      numberOfFeatures
    );
    const stringOffsets = getStringOffsetsForProperty2(
      scenegraph,
      classProperty,
      featureTableProperty,
      numberOfFeatures
    );
    if (classProperty.type === "STRING" || classProperty.componentType === "STRING") {
      data = getPropertyDataString(numberOfFeatures, dataArray, arrayOffsets, stringOffsets);
    } else if (isNumericProperty(classProperty)) {
      data = getPropertyDataNumeric2(classProperty, numberOfFeatures, dataArray, arrayOffsets);
    }
    return data;
  }
  function getArrayOffsetsForProperty2(scenegraph, classProperty, propertyTableProperty, numberOfElements) {
    if (classProperty.type === "ARRAY" && // `componentCount` is a number of fixed-length array elements.
    // If `componentCount` is NOT defined, it's a VARIABLE-length array
    typeof classProperty.componentCount === "undefined" && // `arrayOffsetBufferView` is an index of the buffer view containing offsets for variable-length arrays.
    typeof propertyTableProperty.arrayOffsetBufferView !== "undefined") {
      return getOffsetsForProperty(
        scenegraph,
        propertyTableProperty.arrayOffsetBufferView,
        propertyTableProperty.offsetType || "UINT32",
        // offsetType is used both for stringOffsetBufferView and arrayOffsetBufferView
        numberOfElements
      );
    }
    return null;
  }
  function getStringOffsetsForProperty2(scenegraph, classProperty, propertyTableProperty, numberOfElements) {
    if (typeof propertyTableProperty.stringOffsetBufferView !== "undefined") {
      return getOffsetsForProperty(
        scenegraph,
        propertyTableProperty.stringOffsetBufferView,
        propertyTableProperty.offsetType || "UINT32",
        // offsetType is used both for stringOffsetBufferView and arrayOffsetBufferView
        numberOfElements
      );
    }
    return null;
  }
  function isNumericProperty(schemaProperty) {
    const types = [
      "UINT8",
      "INT16",
      "UINT16",
      "INT32",
      "UINT32",
      "INT64",
      "UINT64",
      "FLOAT32",
      "FLOAT64"
    ];
    return types.includes(schemaProperty.type) || typeof schemaProperty.componentType !== "undefined" && types.includes(schemaProperty.componentType);
  }
  function getPropertyDataNumeric2(classProperty, numberOfElements, valuesDataBytes, arrayOffsets) {
    const isArray2 = classProperty.type === "ARRAY";
    const arrayCount = classProperty.componentCount;
    const attributeType = "SCALAR";
    const componentType = classProperty.componentType || classProperty.type;
    const elementSize = getArrayElementByteSize(attributeType, componentType);
    const elementCount = valuesDataBytes.byteLength / elementSize;
    const valuesData = convertRawBufferToMetadataArray(
      valuesDataBytes,
      attributeType,
      componentType,
      elementCount
    );
    if (isArray2) {
      if (arrayOffsets) {
        return parseVariableLengthArrayNumeric(
          valuesData,
          numberOfElements,
          arrayOffsets,
          valuesDataBytes.length,
          elementSize
        );
      }
      if (arrayCount) {
        return parseFixedLengthArrayNumeric(valuesData, numberOfElements, arrayCount);
      }
      return [];
    }
    return valuesData;
  }
  function getPropertyDataFromTexture(scenegraph, featureTextureProperty, attributeName) {
    const json = scenegraph.gltf.json;
    if (!json.meshes) {
      return [];
    }
    const featureTextureTable = [];
    for (const mesh of json.meshes) {
      for (const primitive of mesh.primitives) {
        processPrimitiveTextures(
          scenegraph,
          attributeName,
          featureTextureProperty,
          featureTextureTable,
          primitive
        );
      }
    }
    return featureTextureTable;
  }
  function processPrimitiveTextures(scenegraph, attributeName, featureTextureProperty, featureTextureTable, primitive) {
    const textureInfoTopLevel = {
      channels: featureTextureProperty.channels,
      ...featureTextureProperty.texture
    };
    const propertyData = getPrimitiveTextureData(
      scenegraph,
      textureInfoTopLevel,
      primitive
    );
    if (!propertyData) {
      return;
    }
    primitivePropertyDataToAttributes(
      scenegraph,
      attributeName,
      propertyData,
      featureTextureTable,
      primitive
    );
  }

  // src/lib/utils/version.ts
  var VERSION3 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // ../textures/src/lib/utils/version.ts
  var VERSION4 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // ../textures/src/lib/parsers/basis-module-loader.ts
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

  // ../textures/src/lib/gl-extensions.ts
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

  // ../textures/src/lib/utils/texture-formats.ts
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

  // ../textures/src/lib/parsers/parse-ktx.ts
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
  function isKTX(data) {
    const id = new Uint8Array(data);
    const notKTX = id.byteLength < KTX2_ID.length || id[0] !== KTX2_ID[0] || // '´'
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
    id[11] !== KTX2_ID[11];
    return !notKTX;
  }

  // ../textures/src/lib/parsers/parse-basis.ts
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

  // ../textures/src/basis-loader.ts
  var BasisWorkerLoader = {
    dataType: null,
    batchType: null,
    name: "Basis",
    id: "basis",
    module: "textures",
    version: VERSION4,
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

  // src/lib/parsers/parse-glb.ts
  var LITTLE_ENDIAN2 = true;
  var MAGIC_glTF = 1735152710;
  var GLB_FILE_HEADER_SIZE = 12;
  var GLB_CHUNK_HEADER_SIZE = 8;
  var GLB_CHUNK_TYPE_JSON = 1313821514;
  var GLB_CHUNK_TYPE_BIN = 5130562;
  var GLB_V1_CONTENT_FORMAT_JSON = 0;
  var GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED = 0;
  var GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED = 1;
  function getMagicString2(dataView, byteOffset = 0) {
    return `${String.fromCharCode(dataView.getUint8(byteOffset + 0))}${String.fromCharCode(dataView.getUint8(byteOffset + 1))}${String.fromCharCode(dataView.getUint8(byteOffset + 2))}${String.fromCharCode(dataView.getUint8(byteOffset + 3))}`;
  }
  function isGLB(arrayBuffer, byteOffset = 0, options = {}) {
    const dataView = new DataView(arrayBuffer);
    const { magic = MAGIC_glTF } = options;
    const magic1 = dataView.getUint32(byteOffset, false);
    return magic1 === magic || magic1 === MAGIC_glTF;
  }
  function parseGLBSync(glb, arrayBuffer, byteOffset = 0, options = {}) {
    const dataView = new DataView(arrayBuffer);
    const type = getMagicString2(dataView, byteOffset + 0);
    const version = dataView.getUint32(byteOffset + 4, LITTLE_ENDIAN2);
    const byteLength = dataView.getUint32(byteOffset + 8, LITTLE_ENDIAN2);
    Object.assign(glb, {
      // Put less important stuff in a header, to avoid clutter
      header: {
        byteOffset,
        // Byte offset into the initial arrayBuffer
        byteLength,
        hasBinChunk: false
      },
      type,
      version,
      json: {},
      binChunks: []
    });
    byteOffset += GLB_FILE_HEADER_SIZE;
    switch (glb.version) {
      case 1:
        return parseGLBV1(glb, dataView, byteOffset);
      case 2:
        return parseGLBV2(glb, dataView, byteOffset, options = {});
      default:
        throw new Error(`Invalid GLB version ${glb.version}. Only supports version 1 and 2.`);
    }
  }
  function parseGLBV1(glb, dataView, byteOffset) {
    assert(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
    const contentLength = dataView.getUint32(byteOffset + 0, LITTLE_ENDIAN2);
    const contentFormat = dataView.getUint32(byteOffset + 4, LITTLE_ENDIAN2);
    byteOffset += GLB_CHUNK_HEADER_SIZE;
    assert(contentFormat === GLB_V1_CONTENT_FORMAT_JSON);
    parseJSONChunk(glb, dataView, byteOffset, contentLength);
    byteOffset += contentLength;
    byteOffset += parseBINChunk(glb, dataView, byteOffset, glb.header.byteLength);
    return byteOffset;
  }
  function parseGLBV2(glb, dataView, byteOffset, options) {
    assert(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
    parseGLBChunksSync(glb, dataView, byteOffset, options);
    return byteOffset + glb.header.byteLength;
  }
  function parseGLBChunksSync(glb, dataView, byteOffset, options) {
    while (byteOffset + 8 <= glb.header.byteLength) {
      const chunkLength = dataView.getUint32(byteOffset + 0, LITTLE_ENDIAN2);
      const chunkFormat = dataView.getUint32(byteOffset + 4, LITTLE_ENDIAN2);
      byteOffset += GLB_CHUNK_HEADER_SIZE;
      switch (chunkFormat) {
        case GLB_CHUNK_TYPE_JSON:
          parseJSONChunk(glb, dataView, byteOffset, chunkLength);
          break;
        case GLB_CHUNK_TYPE_BIN:
          parseBINChunk(glb, dataView, byteOffset, chunkLength);
          break;
        case GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED:
          if (!options.strict) {
            parseJSONChunk(glb, dataView, byteOffset, chunkLength);
          }
          break;
        case GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED:
          if (!options.strict) {
            parseBINChunk(glb, dataView, byteOffset, chunkLength);
          }
          break;
        default:
          break;
      }
      byteOffset += padToNBytes(chunkLength, 4);
    }
    return byteOffset;
  }
  function parseJSONChunk(glb, dataView, byteOffset, chunkLength) {
    const jsonChunk = new Uint8Array(dataView.buffer, byteOffset, chunkLength);
    const textDecoder = new TextDecoder("utf8");
    const jsonText = textDecoder.decode(jsonChunk);
    glb.json = JSON.parse(jsonText);
    return padToNBytes(chunkLength, 4);
  }
  function parseBINChunk(glb, dataView, byteOffset, chunkLength) {
    glb.header.hasBinChunk = true;
    glb.binChunks.push({
      byteOffset,
      byteLength: chunkLength,
      arrayBuffer: dataView.buffer
      // TODO - copy, or create typed array view?
    });
    return padToNBytes(chunkLength, 4);
  }

  // src/lib/gltf-utils/resolve-url.ts
  function resolveUrl(url, options) {
    const absolute = url.startsWith("data:") || url.startsWith("http:") || url.startsWith("https:");
    if (absolute) {
      return url;
    }
    const baseUrl = options.baseUri || options.uri;
    if (!baseUrl) {
      throw new Error(`'baseUri' must be provided to resolve relative url ${url}`);
    }
    return baseUrl.substr(0, baseUrl.lastIndexOf("/") + 1) + url;
  }

  // src/lib/extensions/EXT_meshopt_compression.ts
  var EXT_meshopt_compression_exports = {};
  __export(EXT_meshopt_compression_exports, {
    decode: () => decode5,
    name: () => name4
  });

  // src/meshopt/meshopt-decoder.ts
  var wasm_base = "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";
  var wasm_simd = "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";
  var detector = new Uint8Array([
    0,
    97,
    115,
    109,
    1,
    0,
    0,
    0,
    1,
    4,
    1,
    96,
    0,
    0,
    3,
    3,
    2,
    0,
    0,
    5,
    3,
    1,
    0,
    1,
    12,
    1,
    0,
    10,
    22,
    2,
    12,
    0,
    65,
    0,
    65,
    0,
    65,
    0,
    252,
    10,
    0,
    0,
    11,
    7,
    0,
    65,
    0,
    253,
    15,
    26,
    11
  ]);
  var wasmpack = new Uint8Array([
    32,
    0,
    65,
    253,
    3,
    1,
    2,
    34,
    4,
    106,
    6,
    5,
    11,
    8,
    7,
    20,
    13,
    33,
    12,
    16,
    128,
    9,
    116,
    64,
    19,
    113,
    127,
    15,
    10,
    21,
    22,
    14,
    255,
    66,
    24,
    54,
    136,
    107,
    18,
    23,
    192,
    26,
    114,
    118,
    132,
    17,
    77,
    101,
    130,
    144,
    27,
    87,
    131,
    44,
    45,
    74,
    156,
    154,
    70,
    167
  ]);
  var FILTERS = {
    // legacy index-based enums for glTF
    0: "",
    1: "meshopt_decodeFilterOct",
    2: "meshopt_decodeFilterQuat",
    3: "meshopt_decodeFilterExp",
    // string-based enums for glTF
    NONE: "",
    OCTAHEDRAL: "meshopt_decodeFilterOct",
    QUATERNION: "meshopt_decodeFilterQuat",
    EXPONENTIAL: "meshopt_decodeFilterExp"
  };
  var DECODERS = {
    // legacy index-based enums for glTF
    0: "meshopt_decodeVertexBuffer",
    1: "meshopt_decodeIndexBuffer",
    2: "meshopt_decodeIndexSequence",
    // string-based enums for glTF
    ATTRIBUTES: "meshopt_decodeVertexBuffer",
    TRIANGLES: "meshopt_decodeIndexBuffer",
    INDICES: "meshopt_decodeIndexSequence"
  };
  async function meshoptDecodeGltfBuffer(target, count, size, source, mode, filter = "NONE") {
    const instance = await loadWasmInstance();
    decode4(
      instance,
      instance.exports[DECODERS[mode]],
      target,
      count,
      size,
      source,
      instance.exports[FILTERS[filter || "NONE"]]
    );
  }
  var wasmPromise;
  async function loadWasmInstance() {
    if (!wasmPromise) {
      wasmPromise = loadWasmModule();
    }
    return wasmPromise;
  }
  async function loadWasmModule() {
    let wasm = wasm_base;
    if (WebAssembly.validate(detector)) {
      wasm = wasm_simd;
      console.log("Warning: meshopt_decoder is using experimental SIMD support");
    }
    const result = await WebAssembly.instantiate(unpack(wasm), {});
    await result.instance.exports.__wasm_call_ctors();
    return result.instance;
  }
  function unpack(data) {
    const result = new Uint8Array(data.length);
    for (let i = 0; i < data.length; ++i) {
      const ch = data.charCodeAt(i);
      result[i] = ch > 96 ? ch - 71 : ch > 64 ? ch - 65 : ch > 47 ? ch + 4 : ch > 46 ? 63 : 62;
    }
    let write = 0;
    for (let i = 0; i < data.length; ++i) {
      result[write++] = result[i] < 60 ? wasmpack[result[i]] : (result[i] - 60) * 64 + result[++i];
    }
    return result.buffer.slice(0, write);
  }
  function decode4(instance, fun, target, count, size, source, filter) {
    const sbrk = instance.exports.sbrk;
    const count4 = count + 3 & ~3;
    const tp = sbrk(count4 * size);
    const sp = sbrk(source.length);
    const heap = new Uint8Array(instance.exports.memory.buffer);
    heap.set(source, sp);
    const res = fun(tp, count, size, sp, source.length);
    if (res === 0 && filter) {
      filter(tp, count4, size);
    }
    target.set(heap.subarray(tp, tp + count * size));
    sbrk(tp - sbrk(0));
    if (res !== 0) {
      throw new Error(`Malformed buffer data: ${res}`);
    }
  }

  // src/lib/extensions/EXT_meshopt_compression.ts
  var EXT_MESHOPT_COMPRESSION = "EXT_meshopt_compression";
  var name4 = EXT_MESHOPT_COMPRESSION;
  async function decode5(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    if (!options?.gltf?.decompressMeshes || !options.gltf?.loadBuffers) {
      return;
    }
    const promises = [];
    for (const bufferViewIndex of gltfData.json.bufferViews || []) {
      promises.push(decodeMeshoptBufferView(scenegraph, bufferViewIndex));
    }
    await Promise.all(promises);
    scenegraph.removeExtension(EXT_MESHOPT_COMPRESSION);
  }
  async function decodeMeshoptBufferView(scenegraph, bufferView) {
    const meshoptExtension = scenegraph.getObjectExtension(
      bufferView,
      EXT_MESHOPT_COMPRESSION
    );
    if (meshoptExtension) {
      const {
        byteOffset = 0,
        byteLength = 0,
        byteStride,
        count,
        mode,
        filter = "NONE",
        buffer: bufferIndex
      } = meshoptExtension;
      const buffer = scenegraph.gltf.buffers[bufferIndex];
      const source = new Uint8Array(buffer.arrayBuffer, buffer.byteOffset + byteOffset, byteLength);
      const result = new Uint8Array(
        scenegraph.gltf.buffers[bufferView.buffer].arrayBuffer,
        bufferView.byteOffset,
        bufferView.byteLength
      );
      await meshoptDecodeGltfBuffer(result, count, byteStride, source, mode, filter);
      scenegraph.removeObjectExtension(bufferView, EXT_MESHOPT_COMPRESSION);
    }
  }

  // src/lib/extensions/EXT_texture_webp.ts
  var EXT_texture_webp_exports = {};
  __export(EXT_texture_webp_exports, {
    name: () => name5,
    preprocess: () => preprocess
  });
  var EXT_TEXTURE_WEBP = "EXT_texture_webp";
  var name5 = EXT_TEXTURE_WEBP;
  function preprocess(gltfData, options) {
    const scenegraph = new GLTFScenegraph(gltfData);
    if (!isImageFormatSupported("image/webp")) {
      if (scenegraph.getRequiredExtensions().includes(EXT_TEXTURE_WEBP)) {
        throw new Error(`gltf: Required extension ${EXT_TEXTURE_WEBP} not supported by browser`);
      }
      return;
    }
    const { json } = scenegraph;
    for (const texture of json.textures || []) {
      const extension = scenegraph.getObjectExtension(
        texture,
        EXT_TEXTURE_WEBP
      );
      if (extension) {
        texture.source = extension.source;
      }
      scenegraph.removeObjectExtension(texture, EXT_TEXTURE_WEBP);
    }
    scenegraph.removeExtension(EXT_TEXTURE_WEBP);
  }

  // src/lib/extensions/KHR_texture_basisu.ts
  var KHR_texture_basisu_exports = {};
  __export(KHR_texture_basisu_exports, {
    name: () => name6,
    preprocess: () => preprocess2
  });
  var KHR_TEXTURE_BASISU = "KHR_texture_basisu";
  var name6 = KHR_TEXTURE_BASISU;
  function preprocess2(gltfData, options) {
    const scene = new GLTFScenegraph(gltfData);
    const { json } = scene;
    for (const texture of json.textures || []) {
      const extension = scene.getObjectExtension(
        texture,
        KHR_TEXTURE_BASISU
      );
      if (extension) {
        texture.source = extension.source;
        scene.removeObjectExtension(texture, KHR_TEXTURE_BASISU);
      }
    }
    scene.removeExtension(KHR_TEXTURE_BASISU);
  }

  // src/lib/extensions/KHR_draco_mesh_compression.ts
  var KHR_draco_mesh_compression_exports = {};
  __export(KHR_draco_mesh_compression_exports, {
    decode: () => decode6,
    encode: () => encode3,
    name: () => name7,
    preprocess: () => preprocess3
  });

  // ../draco/src/lib/utils/version.ts
  var VERSION5 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // ../draco/src/draco-loader.ts
  var DracoLoader = {
    dataType: null,
    batchType: null,
    name: "Draco",
    id: "draco",
    module: "draco",
    // shapes: ['mesh'],
    version: VERSION5,
    worker: true,
    extensions: ["drc"],
    mimeTypes: ["application/octet-stream"],
    binary: true,
    tests: ["DRACO"],
    options: {
      draco: {
        decoderType: typeof WebAssembly === "object" ? "wasm" : "js",
        // 'js' for IE11
        libraryPath: "libs/",
        extraAttributes: {},
        attributeNameEntry: void 0
      }
    }
  };

  // ../schema/src/lib/table/simple-table/data-type.ts
  function getDataTypeFromTypedArray(array) {
    switch (array.constructor) {
      case Int8Array:
        return "int8";
      case Uint8Array:
      case Uint8ClampedArray:
        return "uint8";
      case Int16Array:
        return "int16";
      case Uint16Array:
        return "uint16";
      case Int32Array:
        return "int32";
      case Uint32Array:
        return "uint32";
      case Float32Array:
        return "float32";
      case Float64Array:
        return "float64";
      default:
        return "null";
    }
  }

  // ../schema/src/lib/mesh/mesh-utils.ts
  function getMeshBoundingBox(attributes) {
    let minX = Infinity;
    let minY = Infinity;
    let minZ = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    let maxZ = -Infinity;
    const positions = attributes.POSITION ? attributes.POSITION.value : [];
    const len = positions && positions.length;
    for (let i = 0; i < len; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      minX = x < minX ? x : minX;
      minY = y < minY ? y : minY;
      minZ = z < minZ ? z : minZ;
      maxX = x > maxX ? x : maxX;
      maxY = y > maxY ? y : maxY;
      maxZ = z > maxZ ? z : maxZ;
    }
    return [
      [minX, minY, minZ],
      [maxX, maxY, maxZ]
    ];
  }

  // ../schema/src/lib/mesh/deduce-mesh-schema.ts
  function deduceMeshField(name12, attribute, optionalMetadata) {
    const type = getDataTypeFromTypedArray(attribute.value);
    const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
    return {
      name: name12,
      type: { type: "fixed-size-list", listSize: attribute.size, children: [{ name: "value", type }] },
      nullable: false,
      metadata
    };
  }
  function makeMeshAttributeMetadata(attribute) {
    const result = {};
    if ("byteOffset" in attribute) {
      result.byteOffset = attribute.byteOffset.toString(10);
    }
    if ("byteStride" in attribute) {
      result.byteStride = attribute.byteStride.toString(10);
    }
    if ("normalized" in attribute) {
      result.normalized = attribute.normalized.toString();
    }
    return result;
  }

  // ../draco/src/lib/utils/get-draco-schema.ts
  function getDracoSchema(attributes, loaderData, indices) {
    const metadata = makeMetadata(loaderData.metadata);
    const fields = [];
    const namedLoaderDataAttributes = transformAttributesLoaderData(loaderData.attributes);
    for (const attributeName in attributes) {
      const attribute = attributes[attributeName];
      const field = getArrowFieldFromAttribute(
        attributeName,
        attribute,
        namedLoaderDataAttributes[attributeName]
      );
      fields.push(field);
    }
    if (indices) {
      const indicesField = getArrowFieldFromAttribute("indices", indices);
      fields.push(indicesField);
    }
    return { fields, metadata };
  }
  function transformAttributesLoaderData(loaderData) {
    const result = {};
    for (const key in loaderData) {
      const dracoAttribute = loaderData[key];
      result[dracoAttribute.name || "undefined"] = dracoAttribute;
    }
    return result;
  }
  function getArrowFieldFromAttribute(attributeName, attribute, loaderData) {
    const metadataMap = loaderData ? makeMetadata(loaderData.metadata) : void 0;
    const field = deduceMeshField(attributeName, attribute, metadataMap);
    return field;
  }
  function makeMetadata(metadata) {
    Object.entries(metadata);
    const serializedMetadata = {};
    for (const key in metadata) {
      serializedMetadata[`${key}.string`] = JSON.stringify(metadata[key]);
    }
    return serializedMetadata;
  }

  // ../draco/src/lib/draco-parser.ts
  var DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP = {
    POSITION: "POSITION",
    NORMAL: "NORMAL",
    COLOR: "COLOR_0",
    TEX_COORD: "TEXCOORD_0"
  };
  var DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP = {
    1: Int8Array,
    2: Uint8Array,
    3: Int16Array,
    4: Uint16Array,
    5: Int32Array,
    6: Uint32Array,
    // 7: BigInt64Array,
    // 8: BigUint64Array,
    9: Float32Array
    // 10: Float64Array
    // 11: BOOL - What array type do we use for this?
  };
  var INDEX_ITEM_SIZE = 4;
  var DracoParser = class {
    draco;
    decoder;
    metadataQuerier;
    // draco - the draco decoder, either import `draco3d` or load dynamically
    constructor(draco) {
      this.draco = draco;
      this.decoder = new this.draco.Decoder();
      this.metadataQuerier = new this.draco.MetadataQuerier();
    }
    /**
     * Destroy draco resources
     */
    destroy() {
      this.draco.destroy(this.decoder);
      this.draco.destroy(this.metadataQuerier);
    }
    /**
     * NOTE: caller must call `destroyGeometry` on the return value after using it
     * @param arrayBuffer
     * @param options
     */
    parseSync(arrayBuffer, options = {}) {
      const buffer = new this.draco.DecoderBuffer();
      buffer.Init(new Int8Array(arrayBuffer), arrayBuffer.byteLength);
      this._disableAttributeTransforms(options);
      const geometry_type = this.decoder.GetEncodedGeometryType(buffer);
      const dracoGeometry = geometry_type === this.draco.TRIANGULAR_MESH ? new this.draco.Mesh() : new this.draco.PointCloud();
      try {
        let dracoStatus;
        switch (geometry_type) {
          case this.draco.TRIANGULAR_MESH:
            dracoStatus = this.decoder.DecodeBufferToMesh(buffer, dracoGeometry);
            break;
          case this.draco.POINT_CLOUD:
            dracoStatus = this.decoder.DecodeBufferToPointCloud(buffer, dracoGeometry);
            break;
          default:
            throw new Error("DRACO: Unknown geometry type.");
        }
        if (!dracoStatus.ok() || !dracoGeometry.ptr) {
          const message = `DRACO decompression failed: ${dracoStatus.error_msg()}`;
          throw new Error(message);
        }
        const loaderData = this._getDracoLoaderData(dracoGeometry, geometry_type, options);
        const geometry = this._getMeshData(dracoGeometry, loaderData, options);
        const boundingBox = getMeshBoundingBox(geometry.attributes);
        const schema = getDracoSchema(geometry.attributes, loaderData, geometry.indices);
        const data = {
          loader: "draco",
          loaderData,
          header: {
            vertexCount: dracoGeometry.num_points(),
            boundingBox
          },
          ...geometry,
          schema
        };
        return data;
      } finally {
        this.draco.destroy(buffer);
        if (dracoGeometry) {
          this.draco.destroy(dracoGeometry);
        }
      }
    }
    // Draco specific "loader data"
    /**
     * Extract
     * @param dracoGeometry
     * @param geometry_type
     * @param options
     * @returns
     */
    _getDracoLoaderData(dracoGeometry, geometry_type, options) {
      const metadata = this._getTopLevelMetadata(dracoGeometry);
      const attributes = this._getDracoAttributes(dracoGeometry, options);
      return {
        geometry_type,
        num_attributes: dracoGeometry.num_attributes(),
        num_points: dracoGeometry.num_points(),
        num_faces: dracoGeometry instanceof this.draco.Mesh ? dracoGeometry.num_faces() : 0,
        metadata,
        attributes
      };
    }
    /**
     * Extract all draco provided information and metadata for each attribute
     * @param dracoGeometry
     * @param options
     * @returns
     */
    _getDracoAttributes(dracoGeometry, options) {
      const dracoAttributes = {};
      for (let attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
        const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attributeId);
        const metadata = this._getAttributeMetadata(dracoGeometry, attributeId);
        dracoAttributes[dracoAttribute.unique_id()] = {
          unique_id: dracoAttribute.unique_id(),
          attribute_type: dracoAttribute.attribute_type(),
          data_type: dracoAttribute.data_type(),
          num_components: dracoAttribute.num_components(),
          byte_offset: dracoAttribute.byte_offset(),
          byte_stride: dracoAttribute.byte_stride(),
          normalized: dracoAttribute.normalized(),
          attribute_index: attributeId,
          metadata
        };
        const quantization = this._getQuantizationTransform(dracoAttribute, options);
        if (quantization) {
          dracoAttributes[dracoAttribute.unique_id()].quantization_transform = quantization;
        }
        const octahedron = this._getOctahedronTransform(dracoAttribute, options);
        if (octahedron) {
          dracoAttributes[dracoAttribute.unique_id()].octahedron_transform = octahedron;
        }
      }
      return dracoAttributes;
    }
    /**
     * Get standard loaders.gl mesh category data
     * Extracts the geometry from draco
     * @param dracoGeometry
     * @param options
     */
    _getMeshData(dracoGeometry, loaderData, options) {
      const attributes = this._getMeshAttributes(loaderData, dracoGeometry, options);
      const positionAttribute = attributes.POSITION;
      if (!positionAttribute) {
        throw new Error("DRACO: No position attribute found.");
      }
      if (dracoGeometry instanceof this.draco.Mesh) {
        switch (options.topology) {
          case "triangle-strip":
            return {
              topology: "triangle-strip",
              mode: 4,
              // GL.TRIANGLES
              attributes,
              indices: {
                value: this._getTriangleStripIndices(dracoGeometry),
                size: 1
              }
            };
          case "triangle-list":
          default:
            return {
              topology: "triangle-list",
              mode: 5,
              // GL.TRIANGLE_STRIP
              attributes,
              indices: {
                value: this._getTriangleListIndices(dracoGeometry),
                size: 1
              }
            };
        }
      }
      return {
        topology: "point-list",
        mode: 0,
        // GL.POINTS
        attributes
      };
    }
    _getMeshAttributes(loaderData, dracoGeometry, options) {
      const attributes = {};
      for (const loaderAttribute of Object.values(loaderData.attributes)) {
        const attributeName = this._deduceAttributeName(loaderAttribute, options);
        loaderAttribute.name = attributeName;
        const values = this._getAttributeValues(dracoGeometry, loaderAttribute);
        if (values) {
          const { value, size } = values;
          attributes[attributeName] = {
            value,
            size,
            byteOffset: loaderAttribute.byte_offset,
            byteStride: loaderAttribute.byte_stride,
            normalized: loaderAttribute.normalized
          };
        }
      }
      return attributes;
    }
    // MESH INDICES EXTRACTION
    /**
     * For meshes, we need indices to define the faces.
     * @param dracoGeometry
     */
    _getTriangleListIndices(dracoGeometry) {
      const numFaces = dracoGeometry.num_faces();
      const numIndices = numFaces * 3;
      const byteLength = numIndices * INDEX_ITEM_SIZE;
      const ptr = this.draco._malloc(byteLength);
      try {
        this.decoder.GetTrianglesUInt32Array(dracoGeometry, byteLength, ptr);
        return new Uint32Array(this.draco.HEAPF32.buffer, ptr, numIndices).slice();
      } finally {
        this.draco._free(ptr);
      }
    }
    /**
     * For meshes, we need indices to define the faces.
     * @param dracoGeometry
     */
    _getTriangleStripIndices(dracoGeometry) {
      const dracoArray = new this.draco.DracoInt32Array();
      try {
        this.decoder.GetTriangleStripsFromMesh(dracoGeometry, dracoArray);
        return getUint32Array(dracoArray);
      } finally {
        this.draco.destroy(dracoArray);
      }
    }
    /**
     *
     * @param dracoGeometry
     * @param dracoAttribute
     * @param attributeName
     */
    _getAttributeValues(dracoGeometry, attribute) {
      const TypedArrayCtor = DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[attribute.data_type];
      if (!TypedArrayCtor) {
        console.warn(`DRACO: Unsupported attribute type ${attribute.data_type}`);
        return null;
      }
      const numComponents = attribute.num_components;
      const numPoints = dracoGeometry.num_points();
      const numValues = numPoints * numComponents;
      const byteLength = numValues * TypedArrayCtor.BYTES_PER_ELEMENT;
      const dataType = getDracoDataType(this.draco, TypedArrayCtor);
      let value;
      const ptr = this.draco._malloc(byteLength);
      try {
        const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attribute.attribute_index);
        this.decoder.GetAttributeDataArrayForAllPoints(
          dracoGeometry,
          dracoAttribute,
          dataType,
          byteLength,
          ptr
        );
        value = new TypedArrayCtor(this.draco.HEAPF32.buffer, ptr, numValues).slice();
      } finally {
        this.draco._free(ptr);
      }
      return { value, size: numComponents };
    }
    // Attribute names
    /** 
     * DRACO does not store attribute names - We need to deduce an attribute name
     * for each attribute
    _getAttributeNames(
      dracoGeometry: Mesh | PointCloud,
      options: DracoParseOptions
    ): {[unique_id: number]: string} {
      const attributeNames: {[unique_id: number]: string} = {};
      for (let attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
        const dracoAttribute = this.decoder.GetAttribute(dracoGeometry, attributeId);
        const attributeName = this._deduceAttributeName(dracoAttribute, options);
        attributeNames[attributeName] = attributeName;
      }
      return attributeNames;
    }
     */
    /**
     * Deduce an attribute name.
     * @note DRACO does not save attribute names, just general type (POSITION, COLOR)
     * to help optimize compression. We generate GLTF compatible names for the Draco-recognized
     * types
     * @param attributeData
     */
    _deduceAttributeName(attribute, options) {
      const uniqueId = attribute.unique_id;
      for (const [attributeName, attributeUniqueId] of Object.entries(
        options.extraAttributes || {}
      )) {
        if (attributeUniqueId === uniqueId) {
          return attributeName;
        }
      }
      const thisAttributeType = attribute.attribute_type;
      for (const dracoAttributeConstant in DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP) {
        const attributeType = this.draco[dracoAttributeConstant];
        if (attributeType === thisAttributeType) {
          return DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP[dracoAttributeConstant];
        }
      }
      const entryName = options.attributeNameEntry || "name";
      if (attribute.metadata[entryName]) {
        return attribute.metadata[entryName].string;
      }
      return `CUSTOM_ATTRIBUTE_${uniqueId}`;
    }
    // METADATA EXTRACTION
    /** Get top level metadata */
    _getTopLevelMetadata(dracoGeometry) {
      const dracoMetadata = this.decoder.GetMetadata(dracoGeometry);
      return this._getDracoMetadata(dracoMetadata);
    }
    /** Get per attribute metadata */
    _getAttributeMetadata(dracoGeometry, attributeId) {
      const dracoMetadata = this.decoder.GetAttributeMetadata(dracoGeometry, attributeId);
      return this._getDracoMetadata(dracoMetadata);
    }
    /**
     * Extract metadata field values
     * @param dracoMetadata
     * @returns
     */
    _getDracoMetadata(dracoMetadata) {
      if (!dracoMetadata || !dracoMetadata.ptr) {
        return {};
      }
      const result = {};
      const numEntries = this.metadataQuerier.NumEntries(dracoMetadata);
      for (let entryIndex = 0; entryIndex < numEntries; entryIndex++) {
        const entryName = this.metadataQuerier.GetEntryName(dracoMetadata, entryIndex);
        result[entryName] = this._getDracoMetadataField(dracoMetadata, entryName);
      }
      return result;
    }
    /**
     * Extracts possible values for one metadata entry by name
     * @param dracoMetadata
     * @param entryName
     */
    _getDracoMetadataField(dracoMetadata, entryName) {
      const dracoArray = new this.draco.DracoInt32Array();
      try {
        this.metadataQuerier.GetIntEntryArray(dracoMetadata, entryName, dracoArray);
        const intArray = getInt32Array(dracoArray);
        return {
          int: this.metadataQuerier.GetIntEntry(dracoMetadata, entryName),
          string: this.metadataQuerier.GetStringEntry(dracoMetadata, entryName),
          double: this.metadataQuerier.GetDoubleEntry(dracoMetadata, entryName),
          intArray
        };
      } finally {
        this.draco.destroy(dracoArray);
      }
    }
    // QUANTIZED ATTRIBUTE SUPPORT (NO DECOMPRESSION)
    /** Skip transforms for specific attribute types */
    _disableAttributeTransforms(options) {
      const { quantizedAttributes = [], octahedronAttributes = [] } = options;
      const skipAttributes = [...quantizedAttributes, ...octahedronAttributes];
      for (const dracoAttributeName of skipAttributes) {
        this.decoder.SkipAttributeTransform(this.draco[dracoAttributeName]);
      }
    }
    /**
     * Extract (and apply?) Position Transform
     * @todo not used
     */
    _getQuantizationTransform(dracoAttribute, options) {
      const { quantizedAttributes = [] } = options;
      const attribute_type = dracoAttribute.attribute_type();
      const skip = quantizedAttributes.map((type) => this.decoder[type]).includes(attribute_type);
      if (skip) {
        const transform = new this.draco.AttributeQuantizationTransform();
        try {
          if (transform.InitFromAttribute(dracoAttribute)) {
            return {
              quantization_bits: transform.quantization_bits(),
              range: transform.range(),
              min_values: new Float32Array([1, 2, 3]).map((i) => transform.min_value(i))
            };
          }
        } finally {
          this.draco.destroy(transform);
        }
      }
      return null;
    }
    _getOctahedronTransform(dracoAttribute, options) {
      const { octahedronAttributes = [] } = options;
      const attribute_type = dracoAttribute.attribute_type();
      const octahedron = octahedronAttributes.map((type) => this.decoder[type]).includes(attribute_type);
      if (octahedron) {
        const transform = new this.draco.AttributeQuantizationTransform();
        try {
          if (transform.InitFromAttribute(dracoAttribute)) {
            return {
              quantization_bits: transform.quantization_bits()
            };
          }
        } finally {
          this.draco.destroy(transform);
        }
      }
      return null;
    }
    // HELPERS
  };
  function getDracoDataType(draco, attributeType) {
    switch (attributeType) {
      case Float32Array:
        return draco.DT_FLOAT32;
      case Int8Array:
        return draco.DT_INT8;
      case Int16Array:
        return draco.DT_INT16;
      case Int32Array:
        return draco.DT_INT32;
      case Uint8Array:
        return draco.DT_UINT8;
      case Uint16Array:
        return draco.DT_UINT16;
      case Uint32Array:
        return draco.DT_UINT32;
      default:
        return draco.DT_INVALID;
    }
  }
  function getInt32Array(dracoArray) {
    const numValues = dracoArray.size();
    const intArray = new Int32Array(numValues);
    for (let i = 0; i < numValues; i++) {
      intArray[i] = dracoArray.GetValue(i);
    }
    return intArray;
  }
  function getUint32Array(dracoArray) {
    const numValues = dracoArray.size();
    const intArray = new Int32Array(numValues);
    for (let i = 0; i < numValues; i++) {
      intArray[i] = dracoArray.GetValue(i);
    }
    return intArray;
  }

  // ../draco/src/lib/draco-module-loader.ts
  var DRACO_DECODER_VERSION = "1.5.6";
  var DRACO_ENCODER_VERSION = "1.4.1";
  var STATIC_DECODER_URL = `https://www.gstatic.com/draco/versioned/decoders/${DRACO_DECODER_VERSION}`;
  var DRACO_EXTERNAL_LIBRARIES = {
    /** The primary Draco3D encoder, javascript wrapper part */
    DECODER: "draco_wasm_wrapper.js",
    /** The primary draco decoder, compiled web assembly part */
    DECODER_WASM: "draco_decoder.wasm",
    /** Fallback decoder for non-webassebly environments. Very big bundle, lower performance */
    FALLBACK_DECODER: "draco_decoder.js",
    /** Draco encoder */
    ENCODER: "draco_encoder.js"
  };
  var DRACO_EXTERNAL_LIBRARY_URLS = {
    [DRACO_EXTERNAL_LIBRARIES.DECODER]: `${STATIC_DECODER_URL}/${DRACO_EXTERNAL_LIBRARIES.DECODER}`,
    [DRACO_EXTERNAL_LIBRARIES.DECODER_WASM]: `${STATIC_DECODER_URL}/${DRACO_EXTERNAL_LIBRARIES.DECODER_WASM}`,
    [DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER]: `${STATIC_DECODER_URL}/${DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER}`,
    [DRACO_EXTERNAL_LIBRARIES.ENCODER]: `https://raw.githubusercontent.com/google/draco/${DRACO_ENCODER_VERSION}/javascript/${DRACO_EXTERNAL_LIBRARIES.ENCODER}`
  };
  var loadDecoderPromise;
  async function loadDracoDecoderModule(options) {
    const modules = options.modules || {};
    if (modules.draco3d) {
      loadDecoderPromise ||= modules.draco3d.createDecoderModule({}).then((draco) => {
        return { draco };
      });
    } else {
      loadDecoderPromise ||= loadDracoDecoder(options);
    }
    return await loadDecoderPromise;
  }
  async function loadDracoDecoder(options) {
    let DracoDecoderModule;
    let wasmBinary;
    switch (options.draco && options.draco.decoderType) {
      case "js":
        DracoDecoderModule = await loadLibrary(
          DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER],
          "draco",
          options,
          DRACO_EXTERNAL_LIBRARIES.FALLBACK_DECODER
        );
        break;
      case "wasm":
      default:
        [DracoDecoderModule, wasmBinary] = await Promise.all([
          await loadLibrary(
            DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.DECODER],
            "draco",
            options,
            DRACO_EXTERNAL_LIBRARIES.DECODER
          ),
          await loadLibrary(
            DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.DECODER_WASM],
            "draco",
            options,
            DRACO_EXTERNAL_LIBRARIES.DECODER_WASM
          )
        ]);
    }
    DracoDecoderModule = DracoDecoderModule || globalThis.DracoDecoderModule;
    return await initializeDracoDecoder(DracoDecoderModule, wasmBinary);
  }
  function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
    const options = {};
    if (wasmBinary) {
      options.wasmBinary = wasmBinary;
    }
    return new Promise((resolve) => {
      DracoDecoderModule({
        ...options,
        onModuleLoaded: (draco) => resolve({ draco })
        // Module is Promise-like. Wrap in object to avoid loop.
      });
    });
  }

  // ../draco/src/index.ts
  var DracoLoader2 = {
    ...DracoLoader,
    parse
  };
  async function parse(arrayBuffer, options) {
    const { draco } = await loadDracoDecoderModule(options);
    const dracoParser = new DracoParser(draco);
    try {
      return dracoParser.parseSync(arrayBuffer, options?.draco);
    } finally {
      dracoParser.destroy();
    }
  }

  // src/lib/gltf-utils/gltf-attribute-utils.ts
  function getGLTFAccessors(attributes) {
    const accessors = {};
    for (const name12 in attributes) {
      const attribute = attributes[name12];
      if (name12 !== "indices") {
        const glTFAccessor = getGLTFAccessor(attribute);
        accessors[name12] = glTFAccessor;
      }
    }
    return accessors;
  }
  function getGLTFAccessor(attribute) {
    const { buffer, size, count } = getAccessorData(attribute);
    const glTFAccessor = {
      // glTF Accessor values
      // TODO: Instead of a bufferView index we could have an actual buffer (typed array)
      // bufferView: null,
      // TODO: Deprecate `value` in favor of bufferView?
      // @ts-ignore
      value: buffer,
      size,
      // Decoded `type` (e.g. SCALAR)
      byteOffset: 0,
      count,
      type: getAccessorTypeFromSize(size),
      componentType: getComponentTypeFromArray(buffer)
    };
    return glTFAccessor;
  }
  function getAccessorData(attribute) {
    let buffer = attribute;
    let size = 1;
    let count = 0;
    if (attribute && attribute.value) {
      buffer = attribute.value;
      size = attribute.size || 1;
    }
    if (buffer) {
      if (!ArrayBuffer.isView(buffer)) {
        buffer = toTypedArray(buffer, Float32Array);
      }
      count = buffer.length / size;
    }
    return { buffer, size, count };
  }
  function toTypedArray(array, ArrayType, convertTypedArrays = false) {
    if (!array) {
      return null;
    }
    if (Array.isArray(array)) {
      return new ArrayType(array);
    }
    if (convertTypedArrays && !(array instanceof ArrayType)) {
      return new ArrayType(array);
    }
    return array;
  }

  // src/lib/extensions/KHR_draco_mesh_compression.ts
  var KHR_DRACO_MESH_COMPRESSION = "KHR_draco_mesh_compression";
  var name7 = KHR_DRACO_MESH_COMPRESSION;
  function preprocess3(gltfData, options, context) {
    const scenegraph = new GLTFScenegraph(gltfData);
    for (const primitive of makeMeshPrimitiveIterator(scenegraph)) {
      if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
      }
    }
  }
  async function decode6(gltfData, options, context) {
    if (!options?.gltf?.decompressMeshes) {
      return;
    }
    const scenegraph = new GLTFScenegraph(gltfData);
    const promises = [];
    for (const primitive of makeMeshPrimitiveIterator(scenegraph)) {
      if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
        promises.push(decompressPrimitive(scenegraph, primitive, options, context));
      }
    }
    await Promise.all(promises);
    scenegraph.removeExtension(KHR_DRACO_MESH_COMPRESSION);
  }
  function encode3(gltfData, options = {}) {
    const scenegraph = new GLTFScenegraph(gltfData);
    for (const mesh of scenegraph.json.meshes || []) {
      compressMesh(mesh, options);
      scenegraph.addRequiredExtension(KHR_DRACO_MESH_COMPRESSION);
    }
  }
  async function decompressPrimitive(scenegraph, primitive, options, context) {
    const dracoExtension = scenegraph.getObjectExtension(
      primitive,
      KHR_DRACO_MESH_COMPRESSION
    );
    if (!dracoExtension) {
      return;
    }
    const buffer = scenegraph.getTypedArrayForBufferView(dracoExtension.bufferView);
    const bufferCopy = sliceArrayBuffer(buffer.buffer, buffer.byteOffset);
    const dracoOptions = { ...options };
    delete dracoOptions["3d-tiles"];
    const decodedData = await parseFromContext(bufferCopy, DracoLoader2, dracoOptions, context);
    const decodedAttributes = getGLTFAccessors(decodedData.attributes);
    for (const [attributeName, decodedAttribute] of Object.entries(decodedAttributes)) {
      if (attributeName in primitive.attributes) {
        const accessorIndex = primitive.attributes[attributeName];
        const accessor = scenegraph.getAccessor(accessorIndex);
        if (accessor?.min && accessor?.max) {
          decodedAttribute.min = accessor.min;
          decodedAttribute.max = accessor.max;
        }
      }
    }
    primitive.attributes = decodedAttributes;
    if (decodedData.indices) {
      primitive.indices = getGLTFAccessor(decodedData.indices);
    }
    scenegraph.removeObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION);
    checkPrimitive(primitive);
  }
  function compressMesh(attributes, indices, mode = 4, options, context) {
    if (!options.DracoWriter) {
      throw new Error("options.gltf.DracoWriter not provided");
    }
    const compressedData = options.DracoWriter.encodeSync({ attributes });
    const decodedData = context?.parseSync?.({ attributes });
    const fauxAccessors = options._addFauxAttributes(decodedData.attributes);
    const bufferViewIndex = options.addBufferView(compressedData);
    const glTFMesh = {
      primitives: [
        {
          attributes: fauxAccessors,
          // TODO - verify with spec
          mode,
          // GL.POINTS
          extensions: {
            [KHR_DRACO_MESH_COMPRESSION]: {
              bufferView: bufferViewIndex,
              attributes: fauxAccessors
              // TODO - verify with spec
            }
          }
        }
      ]
    };
    return glTFMesh;
  }
  function checkPrimitive(primitive) {
    if (!primitive.attributes && Object.keys(primitive.attributes).length > 0) {
      throw new Error("glTF: Empty primitive detected: Draco decompression failure?");
    }
  }
  function* makeMeshPrimitiveIterator(scenegraph) {
    for (const mesh of scenegraph.json.meshes || []) {
      for (const primitive of mesh.primitives) {
        yield primitive;
      }
    }
  }

  // src/lib/extensions/KHR_texture_transform.ts
  var KHR_texture_transform_exports = {};
  __export(KHR_texture_transform_exports, {
    decode: () => decode7,
    name: () => name8
  });

  // ../../node_modules/@math.gl/core/dist/lib/common.js
  var RADIANS_TO_DEGREES = 1 / Math.PI * 180;
  var DEGREES_TO_RADIANS = 1 / 180 * Math.PI;
  var DEFAULT_CONFIG = {
    EPSILON: 1e-12,
    debug: false,
    precision: 4,
    printTypes: false,
    printDegrees: false,
    printRowMajor: true,
    _cartographicRadians: false
  };
  globalThis.mathgl = globalThis.mathgl || { config: { ...DEFAULT_CONFIG } };
  var config = globalThis.mathgl.config;
  function formatValue(value, { precision = config.precision } = {}) {
    value = round(value);
    return `${parseFloat(value.toPrecision(precision))}`;
  }
  function isArray(value) {
    return Array.isArray(value) || ArrayBuffer.isView(value) && !(value instanceof DataView);
  }
  function equals(a, b, epsilon) {
    const oldEpsilon = config.EPSILON;
    if (epsilon) {
      config.EPSILON = epsilon;
    }
    try {
      if (a === b) {
        return true;
      }
      if (isArray(a) && isArray(b)) {
        if (a.length !== b.length) {
          return false;
        }
        for (let i = 0; i < a.length; ++i) {
          if (!equals(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }
      if (a && a.equals) {
        return a.equals(b);
      }
      if (b && b.equals) {
        return b.equals(a);
      }
      if (typeof a === "number" && typeof b === "number") {
        return Math.abs(a - b) <= config.EPSILON * Math.max(1, Math.abs(a), Math.abs(b));
      }
      return false;
    } finally {
      config.EPSILON = oldEpsilon;
    }
  }
  function round(value) {
    return Math.round(value / config.EPSILON) * config.EPSILON;
  }

  // ../../node_modules/@math.gl/core/dist/classes/base/math-array.js
  var MathArray = class extends Array {
    // Common methods
    /**
     * Clone the current object
     * @returns a new copy of this object
     */
    clone() {
      return new this.constructor().copy(this);
    }
    fromArray(array, offset = 0) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = array[i + offset];
      }
      return this.check();
    }
    toArray(targetArray = [], offset = 0) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        targetArray[offset + i] = this[i];
      }
      return targetArray;
    }
    toObject(targetObject) {
      return targetObject;
    }
    from(arrayOrObject) {
      return Array.isArray(arrayOrObject) ? this.copy(arrayOrObject) : (
        // @ts-ignore
        this.fromObject(arrayOrObject)
      );
    }
    to(arrayOrObject) {
      if (arrayOrObject === this) {
        return this;
      }
      return isArray(arrayOrObject) ? this.toArray(arrayOrObject) : this.toObject(arrayOrObject);
    }
    toTarget(target) {
      return target ? this.to(target) : this;
    }
    /** @deprecated */
    toFloat32Array() {
      return new Float32Array(this);
    }
    toString() {
      return this.formatString(config);
    }
    /** Formats string according to options */
    formatString(opts) {
      let string = "";
      for (let i = 0; i < this.ELEMENTS; ++i) {
        string += (i > 0 ? ", " : "") + formatValue(this[i], opts);
      }
      return `${opts.printTypes ? this.constructor.name : ""}[${string}]`;
    }
    equals(array) {
      if (!array || this.length !== array.length) {
        return false;
      }
      for (let i = 0; i < this.ELEMENTS; ++i) {
        if (!equals(this[i], array[i])) {
          return false;
        }
      }
      return true;
    }
    exactEquals(array) {
      if (!array || this.length !== array.length) {
        return false;
      }
      for (let i = 0; i < this.ELEMENTS; ++i) {
        if (this[i] !== array[i]) {
          return false;
        }
      }
      return true;
    }
    // Modifiers
    /** Negates all values in this object */
    negate() {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = -this[i];
      }
      return this.check();
    }
    lerp(a, b, t) {
      if (t === void 0) {
        return this.lerp(this, a, b);
      }
      for (let i = 0; i < this.ELEMENTS; ++i) {
        const ai = a[i];
        const endValue = typeof b === "number" ? b : b[i];
        this[i] = ai + t * (endValue - ai);
      }
      return this.check();
    }
    /** Minimal */
    min(vector) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = Math.min(vector[i], this[i]);
      }
      return this.check();
    }
    /** Maximal */
    max(vector) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = Math.max(vector[i], this[i]);
      }
      return this.check();
    }
    clamp(minVector, maxVector) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = Math.min(Math.max(this[i], minVector[i]), maxVector[i]);
      }
      return this.check();
    }
    add(...vectors) {
      for (const vector of vectors) {
        for (let i = 0; i < this.ELEMENTS; ++i) {
          this[i] += vector[i];
        }
      }
      return this.check();
    }
    subtract(...vectors) {
      for (const vector of vectors) {
        for (let i = 0; i < this.ELEMENTS; ++i) {
          this[i] -= vector[i];
        }
      }
      return this.check();
    }
    scale(scale2) {
      if (typeof scale2 === "number") {
        for (let i = 0; i < this.ELEMENTS; ++i) {
          this[i] *= scale2;
        }
      } else {
        for (let i = 0; i < this.ELEMENTS && i < scale2.length; ++i) {
          this[i] *= scale2[i];
        }
      }
      return this.check();
    }
    /**
     * Multiplies all elements by `scale`
     * Note: `Matrix4.multiplyByScalar` only scales its 3x3 "minor"
     */
    multiplyByScalar(scalar) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= scalar;
      }
      return this.check();
    }
    // Debug checks
    /** Throws an error if array length is incorrect or contains illegal values */
    check() {
      if (config.debug && !this.validate()) {
        throw new Error(`math.gl: ${this.constructor.name} some fields set to invalid numbers'`);
      }
      return this;
    }
    /** Returns false if the array length is incorrect or contains illegal values */
    validate() {
      let valid = this.length === this.ELEMENTS;
      for (let i = 0; i < this.ELEMENTS; ++i) {
        valid = valid && Number.isFinite(this[i]);
      }
      return valid;
    }
    // three.js compatibility
    /** @deprecated */
    sub(a) {
      return this.subtract(a);
    }
    /** @deprecated */
    setScalar(a) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = a;
      }
      return this.check();
    }
    /** @deprecated */
    addScalar(a) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] += a;
      }
      return this.check();
    }
    /** @deprecated */
    subScalar(a) {
      return this.addScalar(-a);
    }
    /** @deprecated */
    multiplyScalar(scalar) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] *= scalar;
      }
      return this.check();
    }
    /** @deprecated */
    divideScalar(a) {
      return this.multiplyByScalar(1 / a);
    }
    /** @deprecated */
    clampScalar(min, max) {
      for (let i = 0; i < this.ELEMENTS; ++i) {
        this[i] = Math.min(Math.max(this[i], min), max);
      }
      return this.check();
    }
    /** @deprecated */
    get elements() {
      return this;
    }
  };

  // ../../node_modules/@math.gl/core/dist/lib/validators.js
  function validateVector(v, length) {
    if (v.length !== length) {
      return false;
    }
    for (let i = 0; i < v.length; ++i) {
      if (!Number.isFinite(v[i])) {
        return false;
      }
    }
    return true;
  }
  function checkNumber(value) {
    if (!Number.isFinite(value)) {
      throw new Error(`Invalid number ${JSON.stringify(value)}`);
    }
    return value;
  }
  function checkVector(v, length, callerName = "") {
    if (config.debug && !validateVector(v, length)) {
      throw new Error(`math.gl: ${callerName} some fields set to invalid numbers'`);
    }
    return v;
  }

  // ../../node_modules/@math.gl/core/dist/lib/assert.js
  function assert4(condition, message) {
    if (!condition) {
      throw new Error(`math.gl assertion ${message}`);
    }
  }

  // ../../node_modules/@math.gl/core/dist/classes/base/vector.js
  var Vector = class extends MathArray {
    // ACCESSORS
    get x() {
      return this[0];
    }
    set x(value) {
      this[0] = checkNumber(value);
    }
    get y() {
      return this[1];
    }
    set y(value) {
      this[1] = checkNumber(value);
    }
    /**
     * Returns the length of the vector from the origin to the point described by this vector
     *
     * @note `length` is a reserved word for Arrays, so `v.length()` will return number of elements
     * Instead we provide `len` and `magnitude`
     */
    len() {
      return Math.sqrt(this.lengthSquared());
    }
    /**
     * Returns the length of the vector from the origin to the point described by this vector
     */
    magnitude() {
      return this.len();
    }
    /**
     * Returns the squared length of the vector from the origin to the point described by this vector
     */
    lengthSquared() {
      let length = 0;
      for (let i = 0; i < this.ELEMENTS; ++i) {
        length += this[i] * this[i];
      }
      return length;
    }
    /**
     * Returns the squared length of the vector from the origin to the point described by this vector
     */
    magnitudeSquared() {
      return this.lengthSquared();
    }
    distance(mathArray) {
      return Math.sqrt(this.distanceSquared(mathArray));
    }
    distanceSquared(mathArray) {
      let length = 0;
      for (let i = 0; i < this.ELEMENTS; ++i) {
        const dist = this[i] - mathArray[i];
        length += dist * dist;
      }
      return checkNumber(length);
    }
    dot(mathArray) {
      let product = 0;
      for (let i = 0; i < this.ELEMENTS; ++i) {
        product += this[i] * mathArray[i];
      }
      return checkNumber(product);
    }
    // MODIFIERS
    normalize() {
      const length = this.magnitude();
      if (length !== 0) {
        for (let i = 0; i < this.ELEMENTS; ++i) {
          this[i] /= length;
        }
      }
      return this.check();
    }
    multiply(...vectors) {
      for (const vector of vectors) {
        for (let i = 0; i < this.ELEMENTS; ++i) {
          this[i] *= vector[i];
        }
      }
      return this.check();
    }
    divide(...vectors) {
      for (const vector of vectors) {
        for (let i = 0; i < this.ELEMENTS; ++i) {
          this[i] /= vector[i];
        }
      }
      return this.check();
    }
    // THREE.js compatibility
    lengthSq() {
      return this.lengthSquared();
    }
    distanceTo(vector) {
      return this.distance(vector);
    }
    distanceToSquared(vector) {
      return this.distanceSquared(vector);
    }
    getComponent(i) {
      assert4(i >= 0 && i < this.ELEMENTS, "index is out of range");
      return checkNumber(this[i]);
    }
    setComponent(i, value) {
      assert4(i >= 0 && i < this.ELEMENTS, "index is out of range");
      this[i] = value;
      return this.check();
    }
    addVectors(a, b) {
      return this.copy(a).add(b);
    }
    subVectors(a, b) {
      return this.copy(a).subtract(b);
    }
    multiplyVectors(a, b) {
      return this.copy(a).multiply(b);
    }
    addScaledVector(a, b) {
      return this.add(new this.constructor(a).multiplyScalar(b));
    }
  };

  // ../../node_modules/@math.gl/core/dist/gl-matrix/common.js
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var degree = Math.PI / 180;

  // ../../node_modules/@math.gl/core/dist/gl-matrix/vec2.js
  function create() {
    const out = new ARRAY_TYPE(2);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }
    return out;
  }
  function transformMat3(out, a, m) {
    const x = a[0];
    const y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }
  var forEach = function() {
    const vec = create();
    return function(a, stride, offset, count, fn, arg) {
      let i;
      let l;
      if (!stride) {
        stride = 2;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }
      return a;
    };
  }();

  // ../../node_modules/@math.gl/core/dist/lib/gl-matrix-extras.js
  function vec3_transformMat4AsVector(out, a, m) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    const w = m[3] * x + m[7] * y + m[11] * z || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
    return out;
  }
  function vec3_transformMat2(out, a, m) {
    const x = a[0];
    const y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    out[2] = a[2];
    return out;
  }
  function vec4_transformMat3(out, a, m) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    out[0] = m[0] * x + m[3] * y + m[6] * z;
    out[1] = m[1] * x + m[4] * y + m[7] * z;
    out[2] = m[2] * x + m[5] * y + m[8] * z;
    out[3] = a[3];
    return out;
  }

  // ../../node_modules/@math.gl/core/dist/gl-matrix/vec3.js
  function create2() {
    const out = new ARRAY_TYPE(3);
    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }
    return out;
  }
  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  function cross(out, a, b) {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  function transformMat4(out, a, m) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  function transformMat32(out, a, m) {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  function transformQuat(out, a, q) {
    const qx = q[0];
    const qy = q[1];
    const qz = q[2];
    const qw = q[3];
    const x = a[0];
    const y = a[1];
    const z = a[2];
    let uvx = qy * z - qz * y;
    let uvy = qz * x - qx * z;
    let uvz = qx * y - qy * x;
    let uuvx = qy * uvz - qz * uvy;
    let uuvy = qz * uvx - qx * uvz;
    let uuvz = qx * uvy - qy * uvx;
    const w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;
    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;
    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  function rotateX(out, a, b, rad) {
    const p = [];
    const r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateY(out, a, b, rad) {
    const p = [];
    const r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad);
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function rotateZ(out, a, b, rad) {
    const p = [];
    const r = [];
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];
    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2];
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  function angle(a, b) {
    const ax = a[0];
    const ay = a[1];
    const az = a[2];
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    const mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz));
    const cosine = mag && dot(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  var forEach2 = function() {
    const vec = create2();
    return function(a, stride, offset, count, fn, arg) {
      let i;
      let l;
      if (!stride) {
        stride = 3;
      }
      if (!offset) {
        offset = 0;
      }
      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }
      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }
      return a;
    };
  }();

  // ../../node_modules/@math.gl/core/dist/classes/vector3.js
  var ORIGIN = [0, 0, 0];
  var ZERO;
  var Vector3 = class extends Vector {
    static get ZERO() {
      if (!ZERO) {
        ZERO = new Vector3(0, 0, 0);
        Object.freeze(ZERO);
      }
      return ZERO;
    }
    /**
     * @class
     * @param x
     * @param y
     * @param z
     */
    constructor(x = 0, y = 0, z = 0) {
      super(-0, -0, -0);
      if (arguments.length === 1 && isArray(x)) {
        this.copy(x);
      } else {
        if (config.debug) {
          checkNumber(x);
          checkNumber(y);
          checkNumber(z);
        }
        this[0] = x;
        this[1] = y;
        this[2] = z;
      }
    }
    set(x, y, z) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
      return this.check();
    }
    copy(array) {
      this[0] = array[0];
      this[1] = array[1];
      this[2] = array[2];
      return this.check();
    }
    fromObject(object) {
      if (config.debug) {
        checkNumber(object.x);
        checkNumber(object.y);
        checkNumber(object.z);
      }
      this[0] = object.x;
      this[1] = object.y;
      this[2] = object.z;
      return this.check();
    }
    toObject(object) {
      object.x = this[0];
      object.y = this[1];
      object.z = this[2];
      return object;
    }
    // Getters/setters
    get ELEMENTS() {
      return 3;
    }
    get z() {
      return this[2];
    }
    set z(value) {
      this[2] = checkNumber(value);
    }
    // ACCESSORS
    angle(vector) {
      return angle(this, vector);
    }
    // MODIFIERS
    cross(vector) {
      cross(this, this, vector);
      return this.check();
    }
    rotateX({ radians, origin = ORIGIN }) {
      rotateX(this, this, origin, radians);
      return this.check();
    }
    rotateY({ radians, origin = ORIGIN }) {
      rotateY(this, this, origin, radians);
      return this.check();
    }
    rotateZ({ radians, origin = ORIGIN }) {
      rotateZ(this, this, origin, radians);
      return this.check();
    }
    // Transforms
    // transforms as point (4th component is implicitly 1)
    transform(matrix4) {
      return this.transformAsPoint(matrix4);
    }
    // transforms as point (4th component is implicitly 1)
    transformAsPoint(matrix4) {
      transformMat4(this, this, matrix4);
      return this.check();
    }
    // transforms as vector  (4th component is implicitly 0, ignores translation. slightly faster)
    transformAsVector(matrix4) {
      vec3_transformMat4AsVector(this, this, matrix4);
      return this.check();
    }
    transformByMatrix3(matrix3) {
      transformMat32(this, this, matrix3);
      return this.check();
    }
    transformByMatrix2(matrix2) {
      vec3_transformMat2(this, this, matrix2);
      return this.check();
    }
    transformByQuaternion(quaternion) {
      transformQuat(this, this, quaternion);
      return this.check();
    }
  };

  // ../../node_modules/@math.gl/core/dist/classes/base/matrix.js
  var Matrix = class extends MathArray {
    // fromObject(object) {
    //   const array = object.elements;
    //   return this.fromRowMajor(array);
    // }
    // toObject(object) {
    //   const array = object.elements;
    //   this.toRowMajor(array);
    //   return object;
    // }
    // TODO better override formatString?
    toString() {
      let string = "[";
      if (config.printRowMajor) {
        string += "row-major:";
        for (let row = 0; row < this.RANK; ++row) {
          for (let col = 0; col < this.RANK; ++col) {
            string += ` ${this[col * this.RANK + row]}`;
          }
        }
      } else {
        string += "column-major:";
        for (let i = 0; i < this.ELEMENTS; ++i) {
          string += ` ${this[i]}`;
        }
      }
      string += "]";
      return string;
    }
    getElementIndex(row, col) {
      return col * this.RANK + row;
    }
    // By default assumes row major indices
    getElement(row, col) {
      return this[col * this.RANK + row];
    }
    // By default assumes row major indices
    setElement(row, col, value) {
      this[col * this.RANK + row] = checkNumber(value);
      return this;
    }
    getColumn(columnIndex, result = new Array(this.RANK).fill(-0)) {
      const firstIndex = columnIndex * this.RANK;
      for (let i = 0; i < this.RANK; ++i) {
        result[i] = this[firstIndex + i];
      }
      return result;
    }
    setColumn(columnIndex, columnVector) {
      const firstIndex = columnIndex * this.RANK;
      for (let i = 0; i < this.RANK; ++i) {
        this[firstIndex + i] = columnVector[i];
      }
      return this;
    }
  };

  // ../../node_modules/@math.gl/core/dist/gl-matrix/mat3.js
  function transpose(out, a) {
    if (out === a) {
      const a01 = a[1];
      const a02 = a[2];
      const a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }
    return out;
  }
  function invert(out, a) {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const b01 = a22 * a11 - a12 * a21;
    const b11 = -a22 * a10 + a12 * a20;
    const b21 = a21 * a10 - a11 * a20;
    let det = a00 * b01 + a01 * b11 + a02 * b21;
    if (!det) {
      return null;
    }
    det = 1 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  function determinant(a) {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  function multiply(out, a, b) {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b10 = b[3];
    const b11 = b[4];
    const b12 = b[5];
    const b20 = b[6];
    const b21 = b[7];
    const b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  function translate(out, a, v) {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const x = v[0];
    const y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  function rotate(out, a, rad) {
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a10 = a[3];
    const a11 = a[4];
    const a12 = a[5];
    const a20 = a[6];
    const a21 = a[7];
    const a22 = a[8];
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  function scale(out, a, v) {
    const x = v[0];
    const y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  function fromQuat(out, q) {
    const x = q[0];
    const y = q[1];
    const z = q[2];
    const w = q[3];
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const yx = y * x2;
    const yy = y * y2;
    const zx = z * x2;
    const zy = z * y2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }

  // ../../node_modules/@math.gl/core/dist/classes/matrix3.js
  var INDICES;
  (function(INDICES2) {
    INDICES2[INDICES2["COL0ROW0"] = 0] = "COL0ROW0";
    INDICES2[INDICES2["COL0ROW1"] = 1] = "COL0ROW1";
    INDICES2[INDICES2["COL0ROW2"] = 2] = "COL0ROW2";
    INDICES2[INDICES2["COL1ROW0"] = 3] = "COL1ROW0";
    INDICES2[INDICES2["COL1ROW1"] = 4] = "COL1ROW1";
    INDICES2[INDICES2["COL1ROW2"] = 5] = "COL1ROW2";
    INDICES2[INDICES2["COL2ROW0"] = 6] = "COL2ROW0";
    INDICES2[INDICES2["COL2ROW1"] = 7] = "COL2ROW1";
    INDICES2[INDICES2["COL2ROW2"] = 8] = "COL2ROW2";
  })(INDICES || (INDICES = {}));
  var IDENTITY_MATRIX = Object.freeze([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  var Matrix3 = class extends Matrix {
    static get IDENTITY() {
      return getIdentityMatrix();
    }
    static get ZERO() {
      return getZeroMatrix();
    }
    get ELEMENTS() {
      return 9;
    }
    get RANK() {
      return 3;
    }
    get INDICES() {
      return INDICES;
    }
    constructor(array, ...args) {
      super(-0, -0, -0, -0, -0, -0, -0, -0, -0);
      if (arguments.length === 1 && Array.isArray(array)) {
        this.copy(array);
      } else if (args.length > 0) {
        this.copy([array, ...args]);
      } else {
        this.identity();
      }
    }
    copy(array) {
      this[0] = array[0];
      this[1] = array[1];
      this[2] = array[2];
      this[3] = array[3];
      this[4] = array[4];
      this[5] = array[5];
      this[6] = array[6];
      this[7] = array[7];
      this[8] = array[8];
      return this.check();
    }
    // Constructors
    identity() {
      return this.copy(IDENTITY_MATRIX);
    }
    /**
     *
     * @param object
     * @returns self
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fromObject(object) {
      return this.check();
    }
    /** Calculates a 3x3 matrix from the given quaternion
     * q quat  Quaternion to create matrix from
     */
    fromQuaternion(q) {
      fromQuat(this, q);
      return this.check();
    }
    /**
     * accepts column major order, stores in column major order
     */
    // eslint-disable-next-line max-params
    set(m00, m10, m20, m01, m11, m21, m02, m12, m22) {
      this[0] = m00;
      this[1] = m10;
      this[2] = m20;
      this[3] = m01;
      this[4] = m11;
      this[5] = m21;
      this[6] = m02;
      this[7] = m12;
      this[8] = m22;
      return this.check();
    }
    /**
     * accepts row major order, stores as column major
     */
    // eslint-disable-next-line max-params
    setRowMajor(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
      this[0] = m00;
      this[1] = m10;
      this[2] = m20;
      this[3] = m01;
      this[4] = m11;
      this[5] = m21;
      this[6] = m02;
      this[7] = m12;
      this[8] = m22;
      return this.check();
    }
    // Accessors
    determinant() {
      return determinant(this);
    }
    // Modifiers
    transpose() {
      transpose(this, this);
      return this.check();
    }
    /** Invert a matrix. Note that this can fail if the matrix is not invertible */
    invert() {
      invert(this, this);
      return this.check();
    }
    // Operations
    multiplyLeft(a) {
      multiply(this, a, this);
      return this.check();
    }
    multiplyRight(a) {
      multiply(this, this, a);
      return this.check();
    }
    rotate(radians) {
      rotate(this, this, radians);
      return this.check();
    }
    scale(factor) {
      if (Array.isArray(factor)) {
        scale(this, this, factor);
      } else {
        scale(this, this, [factor, factor]);
      }
      return this.check();
    }
    translate(vec) {
      translate(this, this, vec);
      return this.check();
    }
    // Transforms
    transform(vector, result) {
      let out;
      switch (vector.length) {
        case 2:
          out = transformMat3(result || [-0, -0], vector, this);
          break;
        case 3:
          out = transformMat32(result || [-0, -0, -0], vector, this);
          break;
        case 4:
          out = vec4_transformMat3(result || [-0, -0, -0, -0], vector, this);
          break;
        default:
          throw new Error("Illegal vector");
      }
      checkVector(out, vector.length);
      return out;
    }
    /** @deprecated */
    transformVector(vector, result) {
      return this.transform(vector, result);
    }
    /** @deprecated */
    transformVector2(vector, result) {
      return this.transform(vector, result);
    }
    /** @deprecated */
    transformVector3(vector, result) {
      return this.transform(vector, result);
    }
  };
  var ZERO_MATRIX3;
  var IDENTITY_MATRIX3 = null;
  function getZeroMatrix() {
    if (!ZERO_MATRIX3) {
      ZERO_MATRIX3 = new Matrix3([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      Object.freeze(ZERO_MATRIX3);
    }
    return ZERO_MATRIX3;
  }
  function getIdentityMatrix() {
    if (!IDENTITY_MATRIX3) {
      IDENTITY_MATRIX3 = new Matrix3();
      Object.freeze(IDENTITY_MATRIX3);
    }
    return IDENTITY_MATRIX3;
  }

  // src/lib/extensions/KHR_texture_transform.ts
  var KHR_TEXTURE_TRANSFORM = "KHR_texture_transform";
  var name8 = KHR_TEXTURE_TRANSFORM;
  var scratchVector = new Vector3();
  var scratchRotationMatrix = new Matrix3();
  var scratchScaleMatrix = new Matrix3();
  async function decode7(gltfData, options) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const hasExtension = gltfScenegraph.hasExtension(KHR_TEXTURE_TRANSFORM);
    if (!hasExtension || !options.gltf?.loadBuffers) {
      return;
    }
    const materials = gltfData.json.materials || [];
    for (let i = 0; i < materials.length; i++) {
      transformTexCoords(i, gltfData);
    }
  }
  function transformTexCoords(materialIndex, gltfData) {
    const material = gltfData.json.materials?.[materialIndex];
    const materialTextures = [
      material?.pbrMetallicRoughness?.baseColorTexture,
      material?.emissiveTexture,
      material?.normalTexture,
      material?.occlusionTexture,
      material?.pbrMetallicRoughness?.metallicRoughnessTexture
    ];
    const processedTexCoords = [];
    for (const textureInfo of materialTextures) {
      if (textureInfo && textureInfo?.extensions?.[KHR_TEXTURE_TRANSFORM]) {
        transformPrimitives(gltfData, materialIndex, textureInfo, processedTexCoords);
      }
    }
  }
  function transformPrimitives(gltfData, materialIndex, texture, processedTexCoords) {
    const transformParameters = getTransformParameters(texture, processedTexCoords);
    if (!transformParameters) {
      return;
    }
    const meshes = gltfData.json.meshes || [];
    for (const mesh of meshes) {
      for (const primitive of mesh.primitives) {
        const material = primitive.material;
        if (Number.isFinite(material) && materialIndex === material) {
          transformPrimitive(gltfData, primitive, transformParameters);
        }
      }
    }
  }
  function getTransformParameters(texture, processedTexCoords) {
    const textureInfo = texture.extensions?.[KHR_TEXTURE_TRANSFORM];
    const { texCoord: originalTexCoord = 0 } = texture;
    const { texCoord = originalTexCoord } = textureInfo;
    const isProcessed = processedTexCoords.findIndex(
      ([original, newTexCoord]) => original === originalTexCoord && newTexCoord === texCoord
    ) !== -1;
    if (!isProcessed) {
      const matrix = makeTransformationMatrix(textureInfo);
      if (originalTexCoord !== texCoord) {
        texture.texCoord = texCoord;
      }
      processedTexCoords.push([originalTexCoord, texCoord]);
      return { originalTexCoord, texCoord, matrix };
    }
    return null;
  }
  function transformPrimitive(gltfData, primitive, transformParameters) {
    const { originalTexCoord, texCoord, matrix } = transformParameters;
    const texCoordAccessor = primitive.attributes[`TEXCOORD_${originalTexCoord}`];
    if (Number.isFinite(texCoordAccessor)) {
      const accessor = gltfData.json.accessors?.[texCoordAccessor];
      if (accessor && accessor.bufferView) {
        const bufferView = gltfData.json.bufferViews?.[accessor.bufferView];
        if (bufferView) {
          const { arrayBuffer, byteOffset: bufferByteOffset } = gltfData.buffers[bufferView.buffer];
          const byteOffset = (bufferByteOffset || 0) + (accessor.byteOffset || 0) + (bufferView.byteOffset || 0);
          const { ArrayType, length } = getAccessorArrayTypeAndLength(accessor, bufferView);
          const bytes = BYTES[accessor.componentType];
          const components = COMPONENTS[accessor.type];
          const elementAddressScale = bufferView.byteStride || bytes * components;
          const result = new Float32Array(length);
          for (let i = 0; i < accessor.count; i++) {
            const uv = new ArrayType(arrayBuffer, byteOffset + i * elementAddressScale, 2);
            scratchVector.set(uv[0], uv[1], 1);
            scratchVector.transformByMatrix3(matrix);
            result.set([scratchVector[0], scratchVector[1]], i * components);
          }
          if (originalTexCoord === texCoord) {
            updateGltf(accessor, bufferView, gltfData.buffers, result);
          } else {
            createAttribute(texCoord, accessor, primitive, gltfData, result);
          }
        }
      }
    }
  }
  function updateGltf(accessor, bufferView, buffers, newTexCoordArray) {
    accessor.componentType = 5126;
    buffers.push({
      arrayBuffer: newTexCoordArray.buffer,
      byteOffset: 0,
      byteLength: newTexCoordArray.buffer.byteLength
    });
    bufferView.buffer = buffers.length - 1;
    bufferView.byteLength = newTexCoordArray.buffer.byteLength;
    bufferView.byteOffset = 0;
    delete bufferView.byteStride;
  }
  function createAttribute(newTexCoord, originalAccessor, primitive, gltfData, newTexCoordArray) {
    gltfData.buffers.push({
      arrayBuffer: newTexCoordArray.buffer,
      byteOffset: 0,
      byteLength: newTexCoordArray.buffer.byteLength
    });
    const bufferViews = gltfData.json.bufferViews;
    if (!bufferViews) {
      return;
    }
    bufferViews.push({
      buffer: gltfData.buffers.length - 1,
      byteLength: newTexCoordArray.buffer.byteLength,
      byteOffset: 0
    });
    const accessors = gltfData.json.accessors;
    if (!accessors) {
      return;
    }
    accessors.push({
      bufferView: bufferViews?.length - 1,
      byteOffset: 0,
      componentType: 5126,
      count: originalAccessor.count,
      type: "VEC2"
    });
    primitive.attributes[`TEXCOORD_${newTexCoord}`] = accessors.length - 1;
  }
  function makeTransformationMatrix(extensionData) {
    const { offset = [0, 0], rotation = 0, scale: scale2 = [1, 1] } = extensionData;
    const translationMatrix = new Matrix3().set(1, 0, 0, 0, 1, 0, offset[0], offset[1], 1);
    const rotationMatrix = scratchRotationMatrix.set(
      Math.cos(rotation),
      Math.sin(rotation),
      0,
      -Math.sin(rotation),
      Math.cos(rotation),
      0,
      0,
      0,
      1
    );
    const scaleMatrix = scratchScaleMatrix.set(scale2[0], 0, 0, 0, scale2[1], 0, 0, 0, 1);
    return translationMatrix.multiplyRight(rotationMatrix).multiplyRight(scaleMatrix);
  }

  // src/lib/extensions/deprecated/KHR_lights_punctual.ts
  var KHR_lights_punctual_exports = {};
  __export(KHR_lights_punctual_exports, {
    decode: () => decode8,
    encode: () => encode4,
    name: () => name9
  });
  var KHR_LIGHTS_PUNCTUAL = "KHR_lights_punctual";
  var name9 = KHR_LIGHTS_PUNCTUAL;
  async function decode8(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    const extension = gltfScenegraph.getExtension(KHR_LIGHTS_PUNCTUAL);
    if (extension) {
      gltfScenegraph.json.lights = extension.lights;
      gltfScenegraph.removeExtension(KHR_LIGHTS_PUNCTUAL);
    }
    for (const node of json.nodes || []) {
      const nodeExtension = gltfScenegraph.getObjectExtension(node, KHR_LIGHTS_PUNCTUAL);
      if (nodeExtension) {
        node.light = nodeExtension.light;
      }
      gltfScenegraph.removeObjectExtension(node, KHR_LIGHTS_PUNCTUAL);
    }
  }
  async function encode4(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    if (json.lights) {
      const extension = gltfScenegraph.addExtension(KHR_LIGHTS_PUNCTUAL);
      assert3(!extension.lights);
      extension.lights = json.lights;
      delete json.lights;
    }
    if (gltfScenegraph.json.lights) {
      for (const light of gltfScenegraph.json.lights) {
        const node = light.node;
        gltfScenegraph.addObjectExtension(node, KHR_LIGHTS_PUNCTUAL, light);
      }
      delete gltfScenegraph.json.lights;
    }
  }

  // src/lib/extensions/deprecated/KHR_materials_unlit.ts
  var KHR_materials_unlit_exports = {};
  __export(KHR_materials_unlit_exports, {
    decode: () => decode9,
    encode: () => encode5,
    name: () => name10
  });
  var KHR_MATERIALS_UNLIT = "KHR_materials_unlit";
  var name10 = KHR_MATERIALS_UNLIT;
  async function decode9(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    for (const material of json.materials || []) {
      const extension = material.extensions && material.extensions.KHR_materials_unlit;
      if (extension) {
        material.unlit = true;
      }
      gltfScenegraph.removeObjectExtension(material, KHR_MATERIALS_UNLIT);
    }
    gltfScenegraph.removeExtension(KHR_MATERIALS_UNLIT);
  }
  function encode5(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    if (gltfScenegraph.materials) {
      for (const material of json.materials || []) {
        if (material.unlit) {
          delete material.unlit;
          gltfScenegraph.addObjectExtension(material, KHR_MATERIALS_UNLIT, {});
          gltfScenegraph.addExtension(KHR_MATERIALS_UNLIT);
        }
      }
    }
  }

  // src/lib/extensions/deprecated/KHR_techniques_webgl.ts
  var KHR_techniques_webgl_exports = {};
  __export(KHR_techniques_webgl_exports, {
    decode: () => decode10,
    encode: () => encode6,
    name: () => name11
  });
  var KHR_TECHNIQUES_WEBGL = "KHR_techniques_webgl";
  var name11 = KHR_TECHNIQUES_WEBGL;
  async function decode10(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    const extension = gltfScenegraph.getExtension(KHR_TECHNIQUES_WEBGL);
    if (extension) {
      const techniques = resolveTechniques(extension, gltfScenegraph);
      for (const material of json.materials || []) {
        const materialExtension = gltfScenegraph.getObjectExtension(material, KHR_TECHNIQUES_WEBGL);
        if (materialExtension) {
          material.technique = Object.assign(
            {},
            materialExtension,
            // @ts-ignore
            techniques[materialExtension.technique]
          );
          material.technique.values = resolveValues(material.technique, gltfScenegraph);
        }
        gltfScenegraph.removeObjectExtension(material, KHR_TECHNIQUES_WEBGL);
      }
      gltfScenegraph.removeExtension(KHR_TECHNIQUES_WEBGL);
    }
  }
  async function encode6(gltfData, options) {
  }
  function resolveTechniques(techniquesExtension, gltfScenegraph) {
    const { programs = [], shaders = [], techniques = [] } = techniquesExtension;
    const textDecoder = new TextDecoder();
    shaders.forEach((shader) => {
      if (Number.isFinite(shader.bufferView)) {
        shader.code = textDecoder.decode(
          gltfScenegraph.getTypedArrayForBufferView(shader.bufferView)
        );
      } else {
        throw new Error("KHR_techniques_webgl: no shader code");
      }
    });
    programs.forEach((program) => {
      program.fragmentShader = shaders[program.fragmentShader];
      program.vertexShader = shaders[program.vertexShader];
    });
    techniques.forEach((technique) => {
      technique.program = programs[technique.program];
    });
    return techniques;
  }
  function resolveValues(technique, gltfScenegraph) {
    const values = Object.assign({}, technique.values);
    Object.keys(technique.uniforms || {}).forEach((uniform) => {
      if (technique.uniforms[uniform].value && !(uniform in values)) {
        values[uniform] = technique.uniforms[uniform].value;
      }
    });
    Object.keys(values).forEach((uniform) => {
      if (typeof values[uniform] === "object" && values[uniform].index !== void 0) {
        values[uniform].texture = gltfScenegraph.getTexture(values[uniform].index);
      }
    });
    return values;
  }

  // src/lib/api/gltf-extensions.ts
  var EXTENSIONS2 = [
    // 1.0
    // KHR_binary_gltf is handled separately - must be processed before other parsing starts
    // KHR_binary_gltf,
    // 2.0
    EXT_structural_metadata_exports,
    EXT_mesh_features_exports,
    EXT_meshopt_compression_exports,
    EXT_texture_webp_exports,
    // Basisu should come after webp, we want basisu to be preferred if both are provided
    KHR_texture_basisu_exports,
    KHR_draco_mesh_compression_exports,
    KHR_lights_punctual_exports,
    KHR_materials_unlit_exports,
    KHR_techniques_webgl_exports,
    KHR_texture_transform_exports,
    EXT_feature_metadata_exports
  ];
  var EXTENSIONS_ENCODING = [EXT_structural_metadata_exports, EXT_mesh_features_exports];
  function preprocessExtensions(gltf, options = {}, context) {
    const extensions = EXTENSIONS2.filter((extension) => useExtension(extension.name, options));
    for (const extension of extensions) {
      extension.preprocess?.(gltf, options, context);
    }
  }
  async function decodeExtensions(gltf, options = {}, context) {
    const extensions = EXTENSIONS2.filter((extension) => useExtension(extension.name, options));
    for (const extension of extensions) {
      await extension.decode?.(gltf, options, context);
    }
  }
  function encodeExtensions(gltf, options = {}) {
    for (const extension of EXTENSIONS_ENCODING) {
      gltf = extension.encode?.(gltf, options) ?? gltf;
    }
    return gltf;
  }
  function useExtension(extensionName, options) {
    const excludes = options?.gltf?.excludeExtensions || {};
    const exclude = extensionName in excludes && !excludes[extensionName];
    return !exclude;
  }

  // src/lib/extensions/KHR_binary_gltf.ts
  var KHR_BINARY_GLTF = "KHR_binary_glTF";
  function preprocess4(gltfData) {
    const gltfScenegraph = new GLTFScenegraph(gltfData);
    const { json } = gltfScenegraph;
    for (const image of json.images || []) {
      const extension = gltfScenegraph.getObjectExtension(
        image,
        KHR_BINARY_GLTF
      );
      if (extension) {
        Object.assign(image, extension);
      }
      gltfScenegraph.removeObjectExtension(image, KHR_BINARY_GLTF);
    }
    if (json.buffers && json.buffers[0]) {
      delete json.buffers[0].uri;
    }
    gltfScenegraph.removeExtension(KHR_BINARY_GLTF);
  }

  // src/lib/api/normalize-gltf-v1.ts
  var GLTF_ARRAYS = {
    accessors: "accessor",
    animations: "animation",
    buffers: "buffer",
    bufferViews: "bufferView",
    images: "image",
    materials: "material",
    meshes: "mesh",
    nodes: "node",
    samplers: "sampler",
    scenes: "scene",
    skins: "skin",
    textures: "texture"
  };
  var GLTF_KEYS = {
    accessor: "accessors",
    animations: "animation",
    buffer: "buffers",
    bufferView: "bufferViews",
    image: "images",
    material: "materials",
    mesh: "meshes",
    node: "nodes",
    sampler: "samplers",
    scene: "scenes",
    skin: "skins",
    texture: "textures"
  };
  var GLTFV1Normalizer = class {
    idToIndexMap = {
      animations: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      images: {},
      materials: {},
      meshes: {},
      nodes: {},
      samplers: {},
      scenes: {},
      skins: {},
      textures: {}
    };
    json;
    // constructor() {}
    /**
     * Convert (normalize) glTF < 2.0 to glTF 2.0
     * @param gltf - object with json and binChunks
     * @param options
     * @param options normalize Whether to actually normalize
     */
    normalize(gltf, options) {
      this.json = gltf.json;
      const json = gltf.json;
      switch (json.asset && json.asset.version) {
        case "2.0":
          return;
        case void 0:
        case "1.0":
          break;
        default:
          console.warn(`glTF: Unknown version ${json.asset.version}`);
          return;
      }
      if (!options.normalize) {
        throw new Error("glTF v1 is not supported.");
      }
      console.warn("Converting glTF v1 to glTF v2 format. This is experimental and may fail.");
      this._addAsset(json);
      this._convertTopLevelObjectsToArrays(json);
      preprocess4(gltf);
      this._convertObjectIdsToArrayIndices(json);
      this._updateObjects(json);
      this._updateMaterial(json);
    }
    // asset is now required, #642 https://github.com/KhronosGroup/glTF/issues/639
    _addAsset(json) {
      json.asset = json.asset || {};
      json.asset.version = "2.0";
      json.asset.generator = json.asset.generator || "Normalized to glTF 2.0 by loaders.gl";
    }
    _convertTopLevelObjectsToArrays(json) {
      for (const arrayName in GLTF_ARRAYS) {
        this._convertTopLevelObjectToArray(json, arrayName);
      }
    }
    /** Convert one top level object to array */
    _convertTopLevelObjectToArray(json, mapName) {
      const objectMap = json[mapName];
      if (!objectMap || Array.isArray(objectMap)) {
        return;
      }
      json[mapName] = [];
      for (const id in objectMap) {
        const object = objectMap[id];
        object.id = object.id || id;
        const index = json[mapName].length;
        json[mapName].push(object);
        this.idToIndexMap[mapName][id] = index;
      }
    }
    /** Go through all objects in all top-level arrays and replace ids with indices */
    _convertObjectIdsToArrayIndices(json) {
      for (const arrayName in GLTF_ARRAYS) {
        this._convertIdsToIndices(json, arrayName);
      }
      if ("scene" in json) {
        json.scene = this._convertIdToIndex(json.scene, "scene");
      }
      for (const texture of json.textures) {
        this._convertTextureIds(texture);
      }
      for (const mesh of json.meshes) {
        this._convertMeshIds(mesh);
      }
      for (const node of json.nodes) {
        this._convertNodeIds(node);
      }
      for (const node of json.scenes) {
        this._convertSceneIds(node);
      }
    }
    _convertTextureIds(texture) {
      if (texture.source) {
        texture.source = this._convertIdToIndex(texture.source, "image");
      }
    }
    _convertMeshIds(mesh) {
      for (const primitive of mesh.primitives) {
        const { attributes, indices, material } = primitive;
        for (const attributeName in attributes) {
          attributes[attributeName] = this._convertIdToIndex(attributes[attributeName], "accessor");
        }
        if (indices) {
          primitive.indices = this._convertIdToIndex(indices, "accessor");
        }
        if (material) {
          primitive.material = this._convertIdToIndex(material, "material");
        }
      }
    }
    _convertNodeIds(node) {
      if (node.children) {
        node.children = node.children.map((child) => this._convertIdToIndex(child, "node"));
      }
      if (node.meshes) {
        node.meshes = node.meshes.map((mesh) => this._convertIdToIndex(mesh, "mesh"));
      }
    }
    _convertSceneIds(scene) {
      if (scene.nodes) {
        scene.nodes = scene.nodes.map((node) => this._convertIdToIndex(node, "node"));
      }
    }
    /** Go through all objects in a top-level array and replace ids with indices */
    _convertIdsToIndices(json, topLevelArrayName) {
      if (!json[topLevelArrayName]) {
        console.warn(`gltf v1: json doesn't contain attribute ${topLevelArrayName}`);
        json[topLevelArrayName] = [];
      }
      for (const object of json[topLevelArrayName]) {
        for (const key in object) {
          const id = object[key];
          const index = this._convertIdToIndex(id, key);
          object[key] = index;
        }
      }
    }
    _convertIdToIndex(id, key) {
      const arrayName = GLTF_KEYS[key];
      if (arrayName in this.idToIndexMap) {
        const index = this.idToIndexMap[arrayName][id];
        if (!Number.isFinite(index)) {
          throw new Error(`gltf v1: failed to resolve ${key} with id ${id}`);
        }
        return index;
      }
      return id;
    }
    /**
     *
     * @param {*} json
     */
    _updateObjects(json) {
      for (const buffer of this.json.buffers) {
        delete buffer.type;
      }
    }
    /**
     * Update material (set pbrMetallicRoughness)
     * @param {*} json
     */
    _updateMaterial(json) {
      for (const material of json.materials) {
        material.pbrMetallicRoughness = {
          baseColorFactor: [1, 1, 1, 1],
          metallicFactor: 1,
          roughnessFactor: 1
        };
        const textureId = material.values?.tex || material.values?.texture2d_0 || material.values?.diffuseTex;
        const textureIndex = json.textures.findIndex((texture) => texture.id === textureId);
        if (textureIndex !== -1) {
          material.pbrMetallicRoughness.baseColorTexture = { index: textureIndex };
        }
      }
    }
  };
  function normalizeGLTFV1(gltf, options = {}) {
    return new GLTFV1Normalizer().normalize(gltf, options);
  }

  // src/lib/parsers/parse-gltf.ts
  async function parseGLTF(gltf, arrayBufferOrString, byteOffset = 0, options, context) {
    parseGLTFContainerSync(gltf, arrayBufferOrString, byteOffset, options);
    normalizeGLTFV1(gltf, { normalize: options?.gltf?.normalize });
    preprocessExtensions(gltf, options, context);
    if (options?.gltf?.loadBuffers && gltf.json.buffers) {
      await loadBuffers(gltf, options, context);
    }
    if (options?.gltf?.loadImages) {
      await loadImages(gltf, options, context);
    }
    await decodeExtensions(gltf, options, context);
    return gltf;
  }
  function parseGLTFContainerSync(gltf, data, byteOffset, options) {
    if (options.uri) {
      gltf.baseUri = options.uri;
    }
    if (data instanceof ArrayBuffer && !isGLB(data, byteOffset, options)) {
      const textDecoder = new TextDecoder();
      data = textDecoder.decode(data);
    }
    if (typeof data === "string") {
      gltf.json = parseJSON(data);
    } else if (data instanceof ArrayBuffer) {
      const glb = {};
      byteOffset = parseGLBSync(glb, data, byteOffset, options.glb);
      assert3(glb.type === "glTF", `Invalid GLB magic string ${glb.type}`);
      gltf._glb = glb;
      gltf.json = glb.json;
    } else {
      assert3(false, "GLTF: must be ArrayBuffer or string");
    }
    const buffers = gltf.json.buffers || [];
    gltf.buffers = new Array(buffers.length).fill(null);
    if (gltf._glb && gltf._glb.header.hasBinChunk) {
      const { binChunks } = gltf._glb;
      gltf.buffers[0] = {
        arrayBuffer: binChunks[0].arrayBuffer,
        byteOffset: binChunks[0].byteOffset,
        byteLength: binChunks[0].byteLength
      };
    }
    const images = gltf.json.images || [];
    gltf.images = new Array(images.length).fill({});
  }
  async function loadBuffers(gltf, options, context) {
    const buffers = gltf.json.buffers || [];
    for (let i = 0; i < buffers.length; ++i) {
      const buffer = buffers[i];
      if (buffer.uri) {
        const { fetch: fetch2 } = context;
        assert3(fetch2);
        const uri = resolveUrl(buffer.uri, options);
        const response = await context?.fetch?.(uri);
        const arrayBuffer = await response?.arrayBuffer?.();
        gltf.buffers[i] = {
          arrayBuffer,
          byteOffset: 0,
          byteLength: arrayBuffer.byteLength
        };
        delete buffer.uri;
      } else if (gltf.buffers[i] === null) {
        gltf.buffers[i] = {
          arrayBuffer: new ArrayBuffer(buffer.byteLength),
          byteOffset: 0,
          byteLength: buffer.byteLength
        };
      }
    }
  }
  async function loadImages(gltf, options, context) {
    const imageIndices = getReferencesImageIndices(gltf);
    const images = gltf.json.images || [];
    const promises = [];
    for (const imageIndex of imageIndices) {
      promises.push(loadImage(gltf, images[imageIndex], imageIndex, options, context));
    }
    return await Promise.all(promises);
  }
  function getReferencesImageIndices(gltf) {
    const imageIndices = /* @__PURE__ */ new Set();
    const textures = gltf.json.textures || [];
    for (const texture of textures) {
      if (texture.source !== void 0) {
        imageIndices.add(texture.source);
      }
    }
    return Array.from(imageIndices).sort();
  }
  async function loadImage(gltf, image, index, options, context) {
    let arrayBuffer;
    if (image.uri && !image.hasOwnProperty("bufferView")) {
      const uri = resolveUrl(image.uri, options);
      const { fetch: fetch2 } = context;
      const response = await fetch2(uri);
      arrayBuffer = await response.arrayBuffer();
      image.bufferView = {
        data: arrayBuffer
      };
    }
    if (Number.isFinite(image.bufferView)) {
      const array = getTypedArrayForBufferView(gltf.json, gltf.buffers, image.bufferView);
      arrayBuffer = sliceArrayBuffer(array.buffer, array.byteOffset, array.byteLength);
    }
    assert3(arrayBuffer, "glTF image has no data");
    let parsedImage = await parseFromContext(
      arrayBuffer,
      [ImageLoader, BasisLoader],
      {
        ...options,
        mimeType: image.mimeType,
        basis: options.basis || { format: selectSupportedBasisFormat() }
      },
      context
    );
    if (parsedImage && parsedImage[0]) {
      parsedImage = {
        compressed: true,
        // @ts-expect-error
        mipmaps: false,
        width: parsedImage[0].width,
        height: parsedImage[0].height,
        data: parsedImage[0]
      };
    }
    gltf.images = gltf.images || [];
    gltf.images[index] = parsedImage;
  }

  // src/gltf-loader.ts
  var GLTFLoader = {
    dataType: null,
    batchType: null,
    name: "glTF",
    id: "gltf",
    module: "gltf",
    version: VERSION3,
    extensions: ["gltf", "glb"],
    mimeTypes: ["model/gltf+json", "model/gltf-binary"],
    text: true,
    binary: true,
    tests: ["glTF"],
    parse: parse2,
    options: {
      gltf: {
        normalize: true,
        // Normalize glTF v1 to glTF v2 format (not yet stable)
        loadBuffers: true,
        // Fetch any linked .BIN buffers, decode base64
        loadImages: true,
        // Create image objects
        decompressMeshes: true
        // Decompress Draco encoded meshes
      },
      // common?
      log: console
      // eslint-disable-line
    }
  };
  async function parse2(arrayBuffer, options = {}, context) {
    options = { ...GLTFLoader.options, ...options };
    options.gltf = { ...GLTFLoader.options.gltf, ...options.gltf };
    const { byteOffset = 0 } = options;
    const gltf = {};
    return await parseGLTF(gltf, arrayBuffer, byteOffset, options, context);
  }

  // src/lib/encoders/encode-glb.ts
  var MAGIC_glTF2 = 1179937895;
  var MAGIC_JSON = 1313821514;
  var MAGIC_BIN = 5130562;
  var LE = true;
  function encodeGLBSync(glb, dataView, byteOffset = 0, options = {}) {
    const { magic = MAGIC_glTF2, version = 2, json = {}, binary } = glb;
    const byteOffsetStart = byteOffset;
    if (dataView) {
      dataView.setUint32(byteOffset + 0, magic, LE);
      dataView.setUint32(byteOffset + 4, version, LE);
      dataView.setUint32(byteOffset + 8, 0, LE);
    }
    const byteOffsetFileLength = byteOffset + 8;
    byteOffset += 12;
    const byteOffsetJsonHeader = byteOffset;
    if (dataView) {
      dataView.setUint32(byteOffset + 0, 0, LE);
      dataView.setUint32(byteOffset + 4, MAGIC_JSON, LE);
    }
    byteOffset += 8;
    const jsonString = JSON.stringify(json);
    byteOffset = copyPaddedStringToDataView(dataView, byteOffset, jsonString, 4);
    if (dataView) {
      const jsonByteLength = byteOffset - byteOffsetJsonHeader - 8;
      dataView.setUint32(byteOffsetJsonHeader + 0, jsonByteLength, LE);
    }
    if (binary) {
      const byteOffsetBinHeader = byteOffset;
      if (dataView) {
        dataView.setUint32(byteOffset + 0, 0, LE);
        dataView.setUint32(byteOffset + 4, MAGIC_BIN, LE);
      }
      byteOffset += 8;
      byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, binary, 4);
      if (dataView) {
        const binByteLength = byteOffset - byteOffsetBinHeader - 8;
        dataView.setUint32(byteOffsetBinHeader + 0, binByteLength, LE);
      }
    }
    if (dataView) {
      const fileByteLength = byteOffset - byteOffsetStart;
      dataView.setUint32(byteOffsetFileLength, fileByteLength, LE);
    }
    return byteOffset;
  }

  // src/lib/encoders/encode-gltf.ts
  function encodeGLTFSync(gltf, arrayBuffer, byteOffset, options) {
    validateGltf(gltf);
    return encodeGLBSync(gltf, arrayBuffer, byteOffset, options);
  }
  function validateGltf(gltf) {
    if (gltf.buffers && gltf.buffers.length > 1) {
      throw new Error("encodeGLTF: multiple buffers not yet implemented");
    }
  }

  // src/gltf-writer.ts
  var GLTFWriter = {
    dataType: null,
    batchType: null,
    name: "glTF",
    id: "gltf",
    module: "gltf",
    version: VERSION3,
    extensions: ["glb"],
    // We only support encoding to binary GLB, not to JSON GLTF
    mimeTypes: ["model/gltf-binary"],
    // 'model/gltf+json',
    binary: true,
    options: {
      gltf: {}
    },
    encode: async (gltf, options = {}) => encodeSync(gltf, options),
    encodeSync
  };
  function encodeSync(gltf, options = {}) {
    const { byteOffset = 0 } = options;
    const gltfToEncode = encodeExtensions(gltf);
    const byteLength = encodeGLTFSync(gltfToEncode, null, byteOffset, options);
    const arrayBuffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(arrayBuffer);
    encodeGLTFSync(gltfToEncode, dataView, byteOffset, options);
    return arrayBuffer;
  }

  // src/glb-loader.ts
  var GLBLoader = {
    dataType: null,
    batchType: null,
    name: "GLB",
    id: "glb",
    module: "gltf",
    version: VERSION3,
    extensions: ["glb"],
    mimeTypes: ["model/gltf-binary"],
    binary: true,
    parse: parse3,
    parseSync,
    options: {
      glb: {
        strict: false
        // Enables deprecated XVIZ support (illegal CHUNK formats)
      }
    }
  };
  async function parse3(arrayBuffer, options) {
    return parseSync(arrayBuffer, options);
  }
  function parseSync(arrayBuffer, options) {
    const { byteOffset = 0 } = options || {};
    const glb = {};
    parseGLBSync(glb, arrayBuffer, byteOffset, options?.glb);
    return glb;
  }

  // src/glb-writer.ts
  var GLBWriter = {
    name: "GLB",
    id: "glb",
    module: "gltf",
    version: VERSION3,
    extensions: ["glb"],
    mimeTypes: ["model/gltf-binary"],
    binary: true,
    options: {
      glb: {}
    },
    encode: async (glb, options = {}) => encodeSync2(glb, options),
    encodeSync: encodeSync2
  };
  function encodeSync2(glb, options) {
    const { byteOffset = 0 } = options ?? {};
    const byteLength = encodeGLBSync(glb, null, byteOffset, options);
    const arrayBuffer = new ArrayBuffer(byteLength);
    const dataView = new DataView(arrayBuffer);
    encodeGLBSync(glb, dataView, byteOffset, options);
    return arrayBuffer;
  }

  // src/lib/api/post-process-gltf.ts
  var COMPONENTS2 = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16
  };
  var BYTES2 = {
    5120: 1,
    // BYTE
    5121: 1,
    // UNSIGNED_BYTE
    5122: 2,
    // SHORT
    5123: 2,
    // UNSIGNED_SHORT
    5125: 4,
    // UNSIGNED_INT
    5126: 4
    // FLOAT
  };
  var GL_SAMPLER = {
    // Sampler parameters
    TEXTURE_MAG_FILTER: 10240,
    TEXTURE_MIN_FILTER: 10241,
    TEXTURE_WRAP_S: 10242,
    TEXTURE_WRAP_T: 10243,
    // Sampler default values
    REPEAT: 10497,
    LINEAR: 9729,
    NEAREST_MIPMAP_LINEAR: 9986
  };
  var SAMPLER_PARAMETER_GLTF_TO_GL = {
    magFilter: GL_SAMPLER.TEXTURE_MAG_FILTER,
    minFilter: GL_SAMPLER.TEXTURE_MIN_FILTER,
    wrapS: GL_SAMPLER.TEXTURE_WRAP_S,
    wrapT: GL_SAMPLER.TEXTURE_WRAP_T
  };
  var DEFAULT_SAMPLER_PARAMETERS = {
    [GL_SAMPLER.TEXTURE_MAG_FILTER]: GL_SAMPLER.LINEAR,
    [GL_SAMPLER.TEXTURE_MIN_FILTER]: GL_SAMPLER.NEAREST_MIPMAP_LINEAR,
    [GL_SAMPLER.TEXTURE_WRAP_S]: GL_SAMPLER.REPEAT,
    [GL_SAMPLER.TEXTURE_WRAP_T]: GL_SAMPLER.REPEAT
  };
  function makeDefaultSampler() {
    return {
      id: "default-sampler",
      parameters: DEFAULT_SAMPLER_PARAMETERS
    };
  }
  function getBytesFromComponentType(componentType) {
    return BYTES2[componentType];
  }
  function getSizeFromAccessorType(type) {
    return COMPONENTS2[type];
  }
  var GLTFPostProcessor = class {
    baseUri = "";
    // @ts-expect-error
    jsonUnprocessed;
    // @ts-expect-error
    json;
    buffers = [];
    images = [];
    postProcess(gltf, options = {}) {
      const { json, buffers = [], images = [] } = gltf;
      const { baseUri = "" } = gltf;
      assert3(json);
      this.baseUri = baseUri;
      this.buffers = buffers;
      this.images = images;
      this.jsonUnprocessed = json;
      this.json = this._resolveTree(gltf.json, options);
      return this.json;
    }
    // Convert indexed glTF structure into tree structure
    // cross-link index resolution, enum lookup, convenience calculations
    // eslint-disable-next-line complexity, max-statements
    _resolveTree(gltf, options = {}) {
      const json = { ...gltf };
      this.json = json;
      if (gltf.bufferViews) {
        json.bufferViews = gltf.bufferViews.map((bufView, i) => this._resolveBufferView(bufView, i));
      }
      if (gltf.images) {
        json.images = gltf.images.map((image, i) => this._resolveImage(image, i));
      }
      if (gltf.samplers) {
        json.samplers = gltf.samplers.map((sampler, i) => this._resolveSampler(sampler, i));
      }
      if (gltf.textures) {
        json.textures = gltf.textures.map((texture, i) => this._resolveTexture(texture, i));
      }
      if (gltf.accessors) {
        json.accessors = gltf.accessors.map((accessor, i) => this._resolveAccessor(accessor, i));
      }
      if (gltf.materials) {
        json.materials = gltf.materials.map((material, i) => this._resolveMaterial(material, i));
      }
      if (gltf.meshes) {
        json.meshes = gltf.meshes.map((mesh, i) => this._resolveMesh(mesh, i));
      }
      if (gltf.nodes) {
        json.nodes = gltf.nodes.map((node, i) => this._resolveNode(node, i));
        json.nodes = json.nodes.map((node, i) => this._resolveNodeChildren(node));
      }
      if (gltf.skins) {
        json.skins = gltf.skins.map((skin, i) => this._resolveSkin(skin, i));
      }
      if (gltf.scenes) {
        json.scenes = gltf.scenes.map((scene, i) => this._resolveScene(scene, i));
      }
      if (typeof this.json.scene === "number" && json.scenes) {
        json.scene = json.scenes[this.json.scene];
      }
      return json;
    }
    getScene(index) {
      return this._get(this.json.scenes, index);
    }
    getNode(index) {
      return this._get(this.json.nodes, index);
    }
    getSkin(index) {
      return this._get(this.json.skins, index);
    }
    getMesh(index) {
      return this._get(this.json.meshes, index);
    }
    getMaterial(index) {
      return this._get(this.json.materials, index);
    }
    getAccessor(index) {
      return this._get(this.json.accessors, index);
    }
    getCamera(index) {
      return this._get(this.json.cameras, index);
    }
    getTexture(index) {
      return this._get(this.json.textures, index);
    }
    getSampler(index) {
      return this._get(this.json.samplers, index);
    }
    getImage(index) {
      return this._get(this.json.images, index);
    }
    getBufferView(index) {
      return this._get(this.json.bufferViews, index);
    }
    getBuffer(index) {
      return this._get(this.json.buffers, index);
    }
    _get(array, index) {
      if (typeof index === "object") {
        return index;
      }
      const object = array && array[index];
      if (!object) {
        console.warn(`glTF file error: Could not find ${array}[${index}]`);
      }
      return object;
    }
    // PARSING HELPERS
    _resolveScene(scene, index) {
      return {
        ...scene,
        // @ts-ignore
        id: scene.id || `scene-${index}`,
        nodes: (scene.nodes || []).map((node) => this.getNode(node))
      };
    }
    _resolveNode(gltfNode, index) {
      const node = {
        ...gltfNode,
        // @ts-expect-error id could already be present, glTF standard does not prevent it
        id: gltfNode?.id || `node-${index}`
      };
      if (gltfNode.mesh !== void 0) {
        node.mesh = this.getMesh(gltfNode.mesh);
      }
      if (gltfNode.camera !== void 0) {
        node.camera = this.getCamera(gltfNode.camera);
      }
      if (gltfNode.skin !== void 0) {
        node.skin = this.getSkin(gltfNode.skin);
      }
      if (gltfNode.meshes !== void 0 && gltfNode.meshes.length) {
        node.mesh = gltfNode.meshes.reduce(
          (accum, meshIndex) => {
            const mesh = this.getMesh(meshIndex);
            accum.id = mesh.id;
            accum.primitives = accum.primitives.concat(mesh.primitives);
            return accum;
          },
          { primitives: [] }
        );
      }
      return node;
    }
    _resolveNodeChildren(node) {
      if (node.children) {
        node.children = node.children.map((child) => this.getNode(child));
      }
      return node;
    }
    _resolveSkin(gltfSkin, index) {
      const inverseBindMatrices = typeof gltfSkin.inverseBindMatrices === "number" ? this.getAccessor(gltfSkin.inverseBindMatrices) : void 0;
      return {
        ...gltfSkin,
        id: gltfSkin.id || `skin-${index}`,
        inverseBindMatrices
      };
    }
    _resolveMesh(gltfMesh, index) {
      const mesh = {
        ...gltfMesh,
        id: gltfMesh.id || `mesh-${index}`,
        primitives: []
      };
      if (gltfMesh.primitives) {
        mesh.primitives = gltfMesh.primitives.map((gltfPrimitive) => {
          const primitive = {
            ...gltfPrimitive,
            attributes: {},
            indices: void 0,
            material: void 0
          };
          const attributes = gltfPrimitive.attributes;
          for (const attribute in attributes) {
            primitive.attributes[attribute] = this.getAccessor(attributes[attribute]);
          }
          if (gltfPrimitive.indices !== void 0) {
            primitive.indices = this.getAccessor(gltfPrimitive.indices);
          }
          if (gltfPrimitive.material !== void 0) {
            primitive.material = this.getMaterial(gltfPrimitive.material);
          }
          return primitive;
        });
      }
      return mesh;
    }
    _resolveMaterial(gltfMaterial, index) {
      const material = {
        ...gltfMaterial,
        // @ts-expect-error
        id: gltfMaterial.id || `material-${index}`
      };
      if (material.normalTexture) {
        material.normalTexture = { ...material.normalTexture };
        material.normalTexture.texture = this.getTexture(material.normalTexture.index);
      }
      if (material.occlusionTexture) {
        material.occlusionTexture = { ...material.occlusionTexture };
        material.occlusionTexture.texture = this.getTexture(material.occlusionTexture.index);
      }
      if (material.emissiveTexture) {
        material.emissiveTexture = { ...material.emissiveTexture };
        material.emissiveTexture.texture = this.getTexture(material.emissiveTexture.index);
      }
      if (!material.emissiveFactor) {
        material.emissiveFactor = material.emissiveTexture ? [1, 1, 1] : [0, 0, 0];
      }
      if (material.pbrMetallicRoughness) {
        material.pbrMetallicRoughness = { ...material.pbrMetallicRoughness };
        const mr = material.pbrMetallicRoughness;
        if (mr.baseColorTexture) {
          mr.baseColorTexture = { ...mr.baseColorTexture };
          mr.baseColorTexture.texture = this.getTexture(mr.baseColorTexture.index);
        }
        if (mr.metallicRoughnessTexture) {
          mr.metallicRoughnessTexture = { ...mr.metallicRoughnessTexture };
          mr.metallicRoughnessTexture.texture = this.getTexture(mr.metallicRoughnessTexture.index);
        }
      }
      return material;
    }
    _resolveAccessor(gltfAccessor, index) {
      const bytesPerComponent = getBytesFromComponentType(gltfAccessor.componentType);
      const components = getSizeFromAccessorType(gltfAccessor.type);
      const bytesPerElement = bytesPerComponent * components;
      const accessor = {
        ...gltfAccessor,
        // @ts-expect-error
        id: gltfAccessor.id || `accessor-${index}`,
        bytesPerComponent,
        components,
        bytesPerElement,
        value: void 0,
        bufferView: void 0,
        sparse: void 0
      };
      if (gltfAccessor.bufferView !== void 0) {
        accessor.bufferView = this.getBufferView(gltfAccessor.bufferView);
      }
      if (accessor.bufferView) {
        const buffer = accessor.bufferView.buffer;
        const { ArrayType, byteLength } = getAccessorArrayTypeAndLength(accessor, accessor.bufferView);
        const byteOffset = (accessor.bufferView.byteOffset || 0) + (accessor.byteOffset || 0) + buffer.byteOffset;
        let cutBuffer = buffer.arrayBuffer.slice(byteOffset, byteOffset + byteLength);
        if (accessor.bufferView.byteStride) {
          cutBuffer = this._getValueFromInterleavedBuffer(
            buffer,
            byteOffset,
            accessor.bufferView.byteStride,
            accessor.bytesPerElement,
            accessor.count
          );
        }
        accessor.value = new ArrayType(cutBuffer);
      }
      return accessor;
    }
    /**
     * Take values of particular accessor from interleaved buffer
     * various parts of the buffer
     * @param buffer
     * @param byteOffset
     * @param byteStride
     * @param bytesPerElement
     * @param count
     * @returns
     */
    _getValueFromInterleavedBuffer(buffer, byteOffset, byteStride, bytesPerElement, count) {
      const result = new Uint8Array(count * bytesPerElement);
      for (let i = 0; i < count; i++) {
        const elementOffset = byteOffset + i * byteStride;
        result.set(
          new Uint8Array(buffer.arrayBuffer.slice(elementOffset, elementOffset + bytesPerElement)),
          i * bytesPerElement
        );
      }
      return result.buffer;
    }
    _resolveTexture(gltfTexture, index) {
      return {
        ...gltfTexture,
        // @ts-expect-error id could already be present, glTF standard does not prevent it
        id: gltfTexture.id || `texture-${index}`,
        sampler: typeof gltfTexture.sampler === "number" ? this.getSampler(gltfTexture.sampler) : makeDefaultSampler(),
        source: typeof gltfTexture.source === "number" ? this.getImage(gltfTexture.source) : void 0
      };
    }
    _resolveSampler(gltfSampler, index) {
      const sampler = {
        // @ts-expect-error id could already be present, glTF standard does not prevent it
        id: gltfSampler.id || `sampler-${index}`,
        ...gltfSampler,
        parameters: {}
      };
      for (const key in sampler) {
        const glEnum = this._enumSamplerParameter(key);
        if (glEnum !== void 0) {
          sampler.parameters[glEnum] = sampler[key];
        }
      }
      return sampler;
    }
    _enumSamplerParameter(key) {
      return SAMPLER_PARAMETER_GLTF_TO_GL[key];
    }
    _resolveImage(gltfImage, index) {
      const image = {
        ...gltfImage,
        // @ts-expect-error id could already be present, glTF standard does not prevent it
        id: gltfImage.id || `image-${index}`,
        image: null,
        bufferView: gltfImage.bufferView !== void 0 ? this.getBufferView(gltfImage.bufferView) : void 0
      };
      const preloadedImage = this.images[index];
      if (preloadedImage) {
        image.image = preloadedImage;
      }
      return image;
    }
    _resolveBufferView(gltfBufferView, index) {
      const bufferIndex = gltfBufferView.buffer;
      const arrayBuffer = this.buffers[bufferIndex].arrayBuffer;
      let byteOffset = this.buffers[bufferIndex].byteOffset || 0;
      if (gltfBufferView.byteOffset) {
        byteOffset += gltfBufferView.byteOffset;
      }
      const bufferView = {
        // // @ts-expect-error id could already be present, glTF standard does not prevent it
        id: `bufferView-${index}`,
        ...gltfBufferView,
        // ...this.buffers[bufferIndex],
        buffer: this.buffers[bufferIndex],
        data: new Uint8Array(arrayBuffer, byteOffset, gltfBufferView.byteLength)
      };
      return bufferView;
    }
    _resolveCamera(gltfCamera, index) {
      const camera = {
        ...gltfCamera,
        // @ts-expect-error id could already be present, glTF standard does not prevent it
        id: gltfCamera.id || `camera-${index}`
      };
      if (camera.perspective) {
      }
      if (camera.orthographic) {
      }
      return camera;
    }
  };
  function postProcessGLTF(gltf, options) {
    return new GLTFPostProcessor().postProcess(gltf, options);
  }
  return __toCommonJS(bundle_exports);
})();
      return __exports__;
      });
