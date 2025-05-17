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

  // bundle.ts
  var bundle_exports = {};
  __export(bundle_exports, {
    DRACO_EXTERNAL_LIBRARIES: () => DRACO_EXTERNAL_LIBRARIES,
    DRACO_EXTERNAL_LIBRARY_URLS: () => DRACO_EXTERNAL_LIBRARY_URLS,
    DracoLoader: () => DracoLoader2,
    DracoWorkerLoader: () => DracoLoader,
    DracoWriter: () => DracoWriter,
    DracoWriterWorker: () => DracoWriterWorker
  });
  __reExport(bundle_exports, __toESM(require_core(), 1));

  // src/lib/utils/version.ts
  var VERSION = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

  // src/draco-loader.ts
  var DracoLoader = {
    dataType: null,
    batchType: null,
    name: "Draco",
    id: "draco",
    module: "draco",
    // shapes: ['mesh'],
    version: VERSION,
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
  function deduceMeshField(name, attribute, optionalMetadata) {
    const type = getDataTypeFromTypedArray(attribute.value);
    const metadata = optionalMetadata ? optionalMetadata : makeMeshAttributeMetadata(attribute);
    return {
      name,
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

  // src/lib/utils/get-draco-schema.ts
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

  // src/lib/draco-parser.ts
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
  function assert(condition, message) {
    if (!condition) {
      throw new Error(message || "loaders.gl assertion failed.");
    }
  }

  // ../worker-utils/src/lib/env-utils/globals.ts
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
    // @ts-ignore process.browser
    typeof process !== "object" || String(process) !== "[object process]" || process.browser
  );
  var isWorker = typeof importScripts === "function";
  var isMobile = typeof window !== "undefined" && typeof window.orientation !== "undefined";
  var matches = typeof process !== "undefined" && process.version && /v([0-9]*)/.exec(process.version);
  var nodeVersion = matches && parseFloat(matches[1]) || 0;

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
    if (!isBrowser) {
      return `modules/${moduleName}/dist/libs/${libraryName}`;
    }
    if (options.CDN) {
      assert(options.CDN.startsWith("http"));
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
    if (!isBrowser) {
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
    if (!isBrowser) {
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
    if (isBrowser || !readFileAsArrayBuffer || url.startsWith("http")) {
      const response = await fetch(url);
      return await response.arrayBuffer();
    }
    return await readFileAsArrayBuffer(url);
  }
  async function loadAsText(url) {
    const { readFileAsText } = globalThis.loaders || {};
    if (isBrowser || !readFileAsText || url.startsWith("http")) {
      const response = await fetch(url);
      return await response.text();
    }
    return await readFileAsText(url);
  }

  // src/lib/draco-module-loader.ts
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
  var loadEncoderPromise;
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
  async function loadDracoEncoderModule(options) {
    const modules = options.modules || {};
    if (modules.draco3d) {
      loadEncoderPromise ||= modules.draco3d.createEncoderModule({}).then((draco) => {
        return { draco };
      });
    } else {
      loadEncoderPromise ||= loadDracoEncoder(options);
    }
    return await loadEncoderPromise;
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
  async function loadDracoEncoder(options) {
    let DracoEncoderModule = await loadLibrary(
      DRACO_EXTERNAL_LIBRARY_URLS[DRACO_EXTERNAL_LIBRARIES.ENCODER],
      "draco",
      options,
      DRACO_EXTERNAL_LIBRARIES.ENCODER
    );
    DracoEncoderModule = DracoEncoderModule || globalThis.DracoEncoderModule;
    return new Promise((resolve) => {
      DracoEncoderModule({
        onModuleLoaded: (draco) => resolve({ draco })
        // Module is Promise-like. Wrap in object to avoid loop.
      });
    });
  }

  // src/lib/draco-builder.ts
  var GLTF_TO_DRACO_ATTRIBUTE_NAME_MAP = {
    POSITION: "POSITION",
    NORMAL: "NORMAL",
    COLOR_0: "COLOR",
    TEXCOORD_0: "TEX_COORD"
  };
  var noop = () => {
  };
  var DracoBuilder = class {
    draco;
    dracoEncoder;
    dracoMeshBuilder;
    dracoMetadataBuilder;
    log;
    // draco - the draco decoder, either import `draco3d` or load dynamically
    constructor(draco) {
      this.draco = draco;
      this.dracoEncoder = new this.draco.Encoder();
      this.dracoMeshBuilder = new this.draco.MeshBuilder();
      this.dracoMetadataBuilder = new this.draco.MetadataBuilder();
    }
    destroy() {
      this.destroyEncodedObject(this.dracoMeshBuilder);
      this.destroyEncodedObject(this.dracoEncoder);
      this.destroyEncodedObject(this.dracoMetadataBuilder);
      this.dracoMeshBuilder = null;
      this.dracoEncoder = null;
      this.draco = null;
    }
    // TBD - when does this need to be called?
    destroyEncodedObject(object) {
      if (object) {
        this.draco.destroy(object);
      }
    }
    /**
     * Encode mesh or point cloud
     * @param mesh =({})
     * @param options
     */
    encodeSync(mesh, options = {}) {
      this.log = noop;
      this._setOptions(options);
      return options.pointcloud ? this._encodePointCloud(mesh, options) : this._encodeMesh(mesh, options);
    }
    // PRIVATE
    _getAttributesFromMesh(mesh) {
      const attributes = { ...mesh, ...mesh.attributes };
      if (mesh.indices) {
        attributes.indices = mesh.indices;
      }
      return attributes;
    }
    _encodePointCloud(pointcloud, options) {
      const dracoPointCloud = new this.draco.PointCloud();
      if (options.metadata) {
        this._addGeometryMetadata(dracoPointCloud, options.metadata);
      }
      const attributes = this._getAttributesFromMesh(pointcloud);
      this._createDracoPointCloud(dracoPointCloud, attributes, options);
      const dracoData = new this.draco.DracoInt8Array();
      try {
        const encodedLen = this.dracoEncoder.EncodePointCloudToDracoBuffer(
          dracoPointCloud,
          false,
          dracoData
        );
        if (!(encodedLen > 0)) {
          throw new Error("Draco encoding failed.");
        }
        this.log(`DRACO encoded ${dracoPointCloud.num_points()} points
        with ${dracoPointCloud.num_attributes()} attributes into ${encodedLen} bytes`);
        return dracoInt8ArrayToArrayBuffer(dracoData);
      } finally {
        this.destroyEncodedObject(dracoData);
        this.destroyEncodedObject(dracoPointCloud);
      }
    }
    _encodeMesh(mesh, options) {
      const dracoMesh = new this.draco.Mesh();
      if (options.metadata) {
        this._addGeometryMetadata(dracoMesh, options.metadata);
      }
      const attributes = this._getAttributesFromMesh(mesh);
      this._createDracoMesh(dracoMesh, attributes, options);
      const dracoData = new this.draco.DracoInt8Array();
      try {
        const encodedLen = this.dracoEncoder.EncodeMeshToDracoBuffer(dracoMesh, dracoData);
        if (encodedLen <= 0) {
          throw new Error("Draco encoding failed.");
        }
        this.log(`DRACO encoded ${dracoMesh.num_points()} points
        with ${dracoMesh.num_attributes()} attributes into ${encodedLen} bytes`);
        return dracoInt8ArrayToArrayBuffer(dracoData);
      } finally {
        this.destroyEncodedObject(dracoData);
        this.destroyEncodedObject(dracoMesh);
      }
    }
    /**
     * Set encoding options.
     * @param {{speed?: any; method?: any; quantization?: any;}} options
     */
    _setOptions(options) {
      if ("speed" in options) {
        this.dracoEncoder.SetSpeedOptions(...options.speed);
      }
      if ("method" in options) {
        const dracoMethod = this.draco[options.method || "MESH_SEQUENTIAL_ENCODING"];
        this.dracoEncoder.SetEncodingMethod(dracoMethod);
      }
      if ("quantization" in options) {
        for (const attribute in options.quantization) {
          const bits = options.quantization[attribute];
          const dracoPosition = this.draco[attribute];
          this.dracoEncoder.SetAttributeQuantization(dracoPosition, bits);
        }
      }
    }
    /**
     * @param {Mesh} dracoMesh
     * @param {object} attributes
     * @returns {Mesh}
     */
    _createDracoMesh(dracoMesh, attributes, options) {
      const optionalMetadata = options.attributesMetadata || {};
      try {
        const positions = this._getPositionAttribute(attributes);
        if (!positions) {
          throw new Error("positions");
        }
        const vertexCount = positions.length / 3;
        for (let attributeName in attributes) {
          const attribute = attributes[attributeName];
          attributeName = GLTF_TO_DRACO_ATTRIBUTE_NAME_MAP[attributeName] || attributeName;
          const uniqueId = this._addAttributeToMesh(dracoMesh, attributeName, attribute, vertexCount);
          if (uniqueId !== -1) {
            this._addAttributeMetadata(dracoMesh, uniqueId, {
              name: attributeName,
              ...optionalMetadata[attributeName] || {}
            });
          }
        }
      } catch (error) {
        this.destroyEncodedObject(dracoMesh);
        throw error;
      }
      return dracoMesh;
    }
    /**
     * @param {} dracoPointCloud
     * @param {object} attributes
     */
    _createDracoPointCloud(dracoPointCloud, attributes, options) {
      const optionalMetadata = options.attributesMetadata || {};
      try {
        const positions = this._getPositionAttribute(attributes);
        if (!positions) {
          throw new Error("positions");
        }
        const vertexCount = positions.length / 3;
        for (let attributeName in attributes) {
          const attribute = attributes[attributeName];
          attributeName = GLTF_TO_DRACO_ATTRIBUTE_NAME_MAP[attributeName] || attributeName;
          const uniqueId = this._addAttributeToMesh(
            dracoPointCloud,
            attributeName,
            attribute,
            vertexCount
          );
          if (uniqueId !== -1) {
            this._addAttributeMetadata(dracoPointCloud, uniqueId, {
              name: attributeName,
              ...optionalMetadata[attributeName] || {}
            });
          }
        }
      } catch (error) {
        this.destroyEncodedObject(dracoPointCloud);
        throw error;
      }
      return dracoPointCloud;
    }
    /**
     * @param mesh
     * @param attributeName
     * @param attribute
     * @param vertexCount
     */
    _addAttributeToMesh(mesh, attributeName, attribute, vertexCount) {
      if (!ArrayBuffer.isView(attribute)) {
        return -1;
      }
      const type = this._getDracoAttributeType(attributeName);
      const size = attribute.length / vertexCount;
      if (type === "indices") {
        const numFaces = attribute.length / 3;
        this.log(`Adding attribute ${attributeName}, size ${numFaces}`);
        this.dracoMeshBuilder.AddFacesToMesh(mesh, numFaces, attribute);
        return -1;
      }
      this.log(`Adding attribute ${attributeName}, size ${size}`);
      const builder = this.dracoMeshBuilder;
      const { buffer } = attribute;
      switch (attribute.constructor) {
        case Int8Array:
          return builder.AddInt8Attribute(mesh, type, vertexCount, size, new Int8Array(buffer));
        case Int16Array:
          return builder.AddInt16Attribute(mesh, type, vertexCount, size, new Int16Array(buffer));
        case Int32Array:
          return builder.AddInt32Attribute(mesh, type, vertexCount, size, new Int32Array(buffer));
        case Uint8Array:
        case Uint8ClampedArray:
          return builder.AddUInt8Attribute(mesh, type, vertexCount, size, new Uint8Array(buffer));
        case Uint16Array:
          return builder.AddUInt16Attribute(mesh, type, vertexCount, size, new Uint16Array(buffer));
        case Uint32Array:
          return builder.AddUInt32Attribute(mesh, type, vertexCount, size, new Uint32Array(buffer));
        case Float32Array:
          return builder.AddFloatAttribute(mesh, type, vertexCount, size, new Float32Array(buffer));
        default:
          console.warn("Unsupported attribute type", attribute);
          return -1;
      }
    }
    /**
     * DRACO can compress attributes of know type better
     * TODO - expose an attribute type map?
     * @param attributeName
     */
    _getDracoAttributeType(attributeName) {
      switch (attributeName.toLowerCase()) {
        case "indices":
          return "indices";
        case "position":
        case "positions":
        case "vertices":
          return this.draco.POSITION;
        case "normal":
        case "normals":
          return this.draco.NORMAL;
        case "color":
        case "colors":
          return this.draco.COLOR;
        case "texcoord":
        case "texcoords":
          return this.draco.TEX_COORD;
        default:
          return this.draco.GENERIC;
      }
    }
    _getPositionAttribute(attributes) {
      for (const attributeName in attributes) {
        const attribute = attributes[attributeName];
        const dracoType = this._getDracoAttributeType(attributeName);
        if (dracoType === this.draco.POSITION) {
          return attribute;
        }
      }
      return null;
    }
    /**
     * Add metadata for the geometry.
     * @param dracoGeometry - WASM Draco Object
     * @param metadata
     */
    _addGeometryMetadata(dracoGeometry, metadata) {
      const dracoMetadata = new this.draco.Metadata();
      this._populateDracoMetadata(dracoMetadata, metadata);
      this.dracoMeshBuilder.AddMetadata(dracoGeometry, dracoMetadata);
    }
    /**
     * Add metadata for an attribute to geometry.
     * @param dracoGeometry - WASM Draco Object
     * @param uniqueAttributeId
     * @param metadata
     */
    _addAttributeMetadata(dracoGeometry, uniqueAttributeId, metadata) {
      const dracoAttributeMetadata = new this.draco.Metadata();
      this._populateDracoMetadata(dracoAttributeMetadata, metadata);
      this.dracoMeshBuilder.SetMetadataForAttribute(
        dracoGeometry,
        uniqueAttributeId,
        dracoAttributeMetadata
      );
    }
    /**
     * Add contents of object or map to a WASM Draco Metadata Object
     * @param dracoMetadata - WASM Draco Object
     * @param metadata
     */
    _populateDracoMetadata(dracoMetadata, metadata) {
      for (const [key, value] of getEntries(metadata)) {
        switch (typeof value) {
          case "number":
            if (Math.trunc(value) === value) {
              this.dracoMetadataBuilder.AddIntEntry(dracoMetadata, key, value);
            } else {
              this.dracoMetadataBuilder.AddDoubleEntry(dracoMetadata, key, value);
            }
            break;
          case "object":
            if (value instanceof Int32Array) {
              this.dracoMetadataBuilder.AddIntEntryArray(dracoMetadata, key, value, value.length);
            }
            break;
          case "string":
          default:
            this.dracoMetadataBuilder.AddStringEntry(dracoMetadata, key, value);
        }
      }
    }
  };
  function dracoInt8ArrayToArrayBuffer(dracoData) {
    const byteLength = dracoData.size();
    const outputBuffer = new ArrayBuffer(byteLength);
    const outputData = new Int8Array(outputBuffer);
    for (let i = 0; i < byteLength; ++i) {
      outputData[i] = dracoData.GetValue(i);
    }
    return outputBuffer;
  }
  function getEntries(container) {
    const hasEntriesFunc = container.entries && !container.hasOwnProperty("entries");
    return hasEntriesFunc ? container.entries() : Object.entries(container);
  }

  // src/draco-writer.ts
  var DEFAULT_DRACO_WRITER_OPTIONS = {
    pointcloud: false,
    // Set to true if pointcloud (mode: 0, no indices)
    attributeNameEntry: "name"
    // Draco Compression Parameters
    // method: 'MESH_EDGEBREAKER_ENCODING', // Use draco defaults
    // speed: [5, 5], // Use draco defaults
    // quantization: { // Use draco defaults
    //   POSITION: 10
    // }
  };
  var DracoWriter = {
    name: "DRACO",
    id: "draco",
    module: "draco",
    version: VERSION,
    extensions: ["drc"],
    options: {
      draco: DEFAULT_DRACO_WRITER_OPTIONS
    },
    encode
  };
  async function encode(data, options = {}) {
    const { draco } = await loadDracoEncoderModule(options);
    const dracoBuilder = new DracoBuilder(draco);
    try {
      return dracoBuilder.encodeSync(data, options.draco);
    } finally {
      dracoBuilder.destroy();
    }
  }

  // src/index.ts
  var DracoWriterWorker = {
    id: "draco-writer",
    name: "Draco compressed geometry writer",
    module: "draco",
    version: VERSION,
    worker: true,
    options: {
      draco: {},
      source: null
    }
  };
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
  return __toCommonJS(bundle_exports);
})();
      return __exports__;
      });
