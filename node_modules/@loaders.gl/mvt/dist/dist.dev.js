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
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // external-global-plugin:@loaders.gl/core
  var require_core = __commonJS({
    "external-global-plugin:@loaders.gl/core"(exports, module) {
      module.exports = globalThis.loaders;
    }
  });

  // ../../node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "../../node_modules/ieee754/index.js"(exports) {
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // ../../node_modules/pbf/index.js
  var require_pbf = __commonJS({
    "../../node_modules/pbf/index.js"(exports, module) {
      "use strict";
      module.exports = Pbf;
      var ieee754 = require_ieee754();
      function Pbf(buf) {
        this.buf = ArrayBuffer.isView && ArrayBuffer.isView(buf) ? buf : new Uint8Array(buf || 0);
        this.pos = 0;
        this.type = 0;
        this.length = this.buf.length;
      }
      Pbf.Varint = 0;
      Pbf.Fixed64 = 1;
      Pbf.Bytes = 2;
      Pbf.Fixed32 = 5;
      var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
      var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
      var TEXT_DECODER_MIN_LENGTH = 12;
      var utf8TextDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8");
      Pbf.prototype = {
        destroy: function() {
          this.buf = null;
        },
        // === READING =================================================================
        readFields: function(readField, result, end) {
          end = end || this.length;
          while (this.pos < end) {
            var val = this.readVarint(), tag = val >> 3, startPos = this.pos;
            this.type = val & 7;
            readField(tag, result, this);
            if (this.pos === startPos)
              this.skip(val);
          }
          return result;
        },
        readMessage: function(readField, result) {
          return this.readFields(readField, result, this.readVarint() + this.pos);
        },
        readFixed32: function() {
          var val = readUInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        readSFixed32: function() {
          var val = readInt32(this.buf, this.pos);
          this.pos += 4;
          return val;
        },
        // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)
        readFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readUInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readSFixed64: function() {
          var val = readUInt32(this.buf, this.pos) + readInt32(this.buf, this.pos + 4) * SHIFT_LEFT_32;
          this.pos += 8;
          return val;
        },
        readFloat: function() {
          var val = ieee754.read(this.buf, this.pos, true, 23, 4);
          this.pos += 4;
          return val;
        },
        readDouble: function() {
          var val = ieee754.read(this.buf, this.pos, true, 52, 8);
          this.pos += 8;
          return val;
        },
        readVarint: function(isSigned) {
          var buf = this.buf, val, b;
          b = buf[this.pos++];
          val = b & 127;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 7;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 14;
          if (b < 128)
            return val;
          b = buf[this.pos++];
          val |= (b & 127) << 21;
          if (b < 128)
            return val;
          b = buf[this.pos];
          val |= (b & 15) << 28;
          return readVarintRemainder(val, isSigned, this);
        },
        readVarint64: function() {
          return this.readVarint(true);
        },
        readSVarint: function() {
          var num = this.readVarint();
          return num % 2 === 1 ? (num + 1) / -2 : num / 2;
        },
        readBoolean: function() {
          return Boolean(this.readVarint());
        },
        readString: function() {
          var end = this.readVarint() + this.pos;
          var pos = this.pos;
          this.pos = end;
          if (end - pos >= TEXT_DECODER_MIN_LENGTH && utf8TextDecoder) {
            return readUtf8TextDecoder(this.buf, pos, end);
          }
          return readUtf8(this.buf, pos, end);
        },
        readBytes: function() {
          var end = this.readVarint() + this.pos, buffer = this.buf.subarray(this.pos, end);
          this.pos = end;
          return buffer;
        },
        // verbose for performance reasons; doesn't affect gzipped size
        readPackedVarint: function(arr, isSigned) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readVarint(isSigned));
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readVarint(isSigned));
          return arr;
        },
        readPackedSVarint: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readSVarint());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSVarint());
          return arr;
        },
        readPackedBoolean: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readBoolean());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readBoolean());
          return arr;
        },
        readPackedFloat: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readFloat());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFloat());
          return arr;
        },
        readPackedDouble: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readDouble());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readDouble());
          return arr;
        },
        readPackedFixed32: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFixed32());
          return arr;
        },
        readPackedSFixed32: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readSFixed32());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSFixed32());
          return arr;
        },
        readPackedFixed64: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readFixed64());
          return arr;
        },
        readPackedSFixed64: function(arr) {
          if (this.type !== Pbf.Bytes)
            return arr.push(this.readSFixed64());
          var end = readPackedEnd(this);
          arr = arr || [];
          while (this.pos < end)
            arr.push(this.readSFixed64());
          return arr;
        },
        skip: function(val) {
          var type = val & 7;
          if (type === Pbf.Varint)
            while (this.buf[this.pos++] > 127) {
            }
          else if (type === Pbf.Bytes)
            this.pos = this.readVarint() + this.pos;
          else if (type === Pbf.Fixed32)
            this.pos += 4;
          else if (type === Pbf.Fixed64)
            this.pos += 8;
          else
            throw new Error("Unimplemented type: " + type);
        },
        // === WRITING =================================================================
        writeTag: function(tag, type) {
          this.writeVarint(tag << 3 | type);
        },
        realloc: function(min) {
          var length = this.length || 16;
          while (length < this.pos + min)
            length *= 2;
          if (length !== this.length) {
            var buf = new Uint8Array(length);
            buf.set(this.buf);
            this.buf = buf;
            this.length = length;
          }
        },
        finish: function() {
          this.length = this.pos;
          this.pos = 0;
          return this.buf.subarray(0, this.length);
        },
        writeFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeSFixed32: function(val) {
          this.realloc(4);
          writeInt32(this.buf, val, this.pos);
          this.pos += 4;
        },
        writeFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeSFixed64: function(val) {
          this.realloc(8);
          writeInt32(this.buf, val & -1, this.pos);
          writeInt32(this.buf, Math.floor(val * SHIFT_RIGHT_32), this.pos + 4);
          this.pos += 8;
        },
        writeVarint: function(val) {
          val = +val || 0;
          if (val > 268435455 || val < 0) {
            writeBigVarint(val, this);
            return;
          }
          this.realloc(4);
          this.buf[this.pos++] = val & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = (val >>>= 7) & 127 | (val > 127 ? 128 : 0);
          if (val <= 127)
            return;
          this.buf[this.pos++] = val >>> 7 & 127;
        },
        writeSVarint: function(val) {
          this.writeVarint(val < 0 ? -val * 2 - 1 : val * 2);
        },
        writeBoolean: function(val) {
          this.writeVarint(Boolean(val));
        },
        writeString: function(str) {
          str = String(str);
          this.realloc(str.length * 4);
          this.pos++;
          var startPos = this.pos;
          this.pos = writeUtf8(this.buf, str, this.pos);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeFloat: function(val) {
          this.realloc(4);
          ieee754.write(this.buf, val, this.pos, true, 23, 4);
          this.pos += 4;
        },
        writeDouble: function(val) {
          this.realloc(8);
          ieee754.write(this.buf, val, this.pos, true, 52, 8);
          this.pos += 8;
        },
        writeBytes: function(buffer) {
          var len = buffer.length;
          this.writeVarint(len);
          this.realloc(len);
          for (var i = 0; i < len; i++)
            this.buf[this.pos++] = buffer[i];
        },
        writeRawMessage: function(fn, obj) {
          this.pos++;
          var startPos = this.pos;
          fn(obj, this);
          var len = this.pos - startPos;
          if (len >= 128)
            makeRoomForExtraLength(startPos, len, this);
          this.pos = startPos - 1;
          this.writeVarint(len);
          this.pos += len;
        },
        writeMessage: function(tag, fn, obj) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeRawMessage(fn, obj);
        },
        writePackedVarint: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedVarint, arr);
        },
        writePackedSVarint: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSVarint, arr);
        },
        writePackedBoolean: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedBoolean, arr);
        },
        writePackedFloat: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFloat, arr);
        },
        writePackedDouble: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedDouble, arr);
        },
        writePackedFixed32: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFixed32, arr);
        },
        writePackedSFixed32: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSFixed32, arr);
        },
        writePackedFixed64: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedFixed64, arr);
        },
        writePackedSFixed64: function(tag, arr) {
          if (arr.length)
            this.writeMessage(tag, writePackedSFixed64, arr);
        },
        writeBytesField: function(tag, buffer) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeBytes(buffer);
        },
        writeFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFixed32(val);
        },
        writeSFixed32Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeSFixed32(val);
        },
        writeFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeFixed64(val);
        },
        writeSFixed64Field: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeSFixed64(val);
        },
        writeVarintField: function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeVarint(val);
        },
        writeSVarintField: function(tag, val) {
          this.writeTag(tag, Pbf.Varint);
          this.writeSVarint(val);
        },
        writeStringField: function(tag, str) {
          this.writeTag(tag, Pbf.Bytes);
          this.writeString(str);
        },
        writeFloatField: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed32);
          this.writeFloat(val);
        },
        writeDoubleField: function(tag, val) {
          this.writeTag(tag, Pbf.Fixed64);
          this.writeDouble(val);
        },
        writeBooleanField: function(tag, val) {
          this.writeVarintField(tag, Boolean(val));
        }
      };
      function readVarintRemainder(l, s, p) {
        var buf = p.buf, h, b;
        b = buf[p.pos++];
        h = (b & 112) >> 4;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 3;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 10;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 17;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 127) << 24;
        if (b < 128)
          return toNum(l, h, s);
        b = buf[p.pos++];
        h |= (b & 1) << 31;
        if (b < 128)
          return toNum(l, h, s);
        throw new Error("Expected varint not more than 10 bytes");
      }
      function readPackedEnd(pbf) {
        return pbf.type === Pbf.Bytes ? pbf.readVarint() + pbf.pos : pbf.pos + 1;
      }
      function toNum(low, high, isSigned) {
        if (isSigned) {
          return high * 4294967296 + (low >>> 0);
        }
        return (high >>> 0) * 4294967296 + (low >>> 0);
      }
      function writeBigVarint(val, pbf) {
        var low, high;
        if (val >= 0) {
          low = val % 4294967296 | 0;
          high = val / 4294967296 | 0;
        } else {
          low = ~(-val % 4294967296);
          high = ~(-val / 4294967296);
          if (low ^ 4294967295) {
            low = low + 1 | 0;
          } else {
            low = 0;
            high = high + 1 | 0;
          }
        }
        if (val >= 18446744073709552e3 || val < -18446744073709552e3) {
          throw new Error("Given varint doesn't fit into 10 bytes");
        }
        pbf.realloc(10);
        writeBigVarintLow(low, high, pbf);
        writeBigVarintHigh(high, pbf);
      }
      function writeBigVarintLow(low, high, pbf) {
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos++] = low & 127 | 128;
        low >>>= 7;
        pbf.buf[pbf.pos] = low & 127;
      }
      function writeBigVarintHigh(high, pbf) {
        var lsb = (high & 7) << 4;
        pbf.buf[pbf.pos++] |= lsb | ((high >>>= 3) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127 | ((high >>>= 7) ? 128 : 0);
        if (!high)
          return;
        pbf.buf[pbf.pos++] = high & 127;
      }
      function makeRoomForExtraLength(startPos, len, pbf) {
        var extraLen = len <= 16383 ? 1 : len <= 2097151 ? 2 : len <= 268435455 ? 3 : Math.floor(Math.log(len) / (Math.LN2 * 7));
        pbf.realloc(extraLen);
        for (var i = pbf.pos - 1; i >= startPos; i--)
          pbf.buf[i + extraLen] = pbf.buf[i];
      }
      function writePackedVarint(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeVarint(arr[i]);
      }
      function writePackedSVarint(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeSVarint(arr[i]);
      }
      function writePackedFloat(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeFloat(arr[i]);
      }
      function writePackedDouble(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeDouble(arr[i]);
      }
      function writePackedBoolean(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeBoolean(arr[i]);
      }
      function writePackedFixed32(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeFixed32(arr[i]);
      }
      function writePackedSFixed32(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeSFixed32(arr[i]);
      }
      function writePackedFixed64(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeFixed64(arr[i]);
      }
      function writePackedSFixed64(arr, pbf) {
        for (var i = 0; i < arr.length; i++)
          pbf.writeSFixed64(arr[i]);
      }
      function readUInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + buf[pos + 3] * 16777216;
      }
      function writeInt32(buf, val, pos) {
        buf[pos] = val;
        buf[pos + 1] = val >>> 8;
        buf[pos + 2] = val >>> 16;
        buf[pos + 3] = val >>> 24;
      }
      function readInt32(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16) + (buf[pos + 3] << 24);
      }
      function readUtf8(buf, pos, end) {
        var str = "";
        var i = pos;
        while (i < end) {
          var b0 = buf[i];
          var c = null;
          var bytesPerSequence = b0 > 239 ? 4 : b0 > 223 ? 3 : b0 > 191 ? 2 : 1;
          if (i + bytesPerSequence > end)
            break;
          var b1, b2, b3;
          if (bytesPerSequence === 1) {
            if (b0 < 128) {
              c = b0;
            }
          } else if (bytesPerSequence === 2) {
            b1 = buf[i + 1];
            if ((b1 & 192) === 128) {
              c = (b0 & 31) << 6 | b1 & 63;
              if (c <= 127) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 3) {
            b1 = buf[i + 1];
            b2 = buf[i + 2];
            if ((b1 & 192) === 128 && (b2 & 192) === 128) {
              c = (b0 & 15) << 12 | (b1 & 63) << 6 | b2 & 63;
              if (c <= 2047 || c >= 55296 && c <= 57343) {
                c = null;
              }
            }
          } else if (bytesPerSequence === 4) {
            b1 = buf[i + 1];
            b2 = buf[i + 2];
            b3 = buf[i + 3];
            if ((b1 & 192) === 128 && (b2 & 192) === 128 && (b3 & 192) === 128) {
              c = (b0 & 15) << 18 | (b1 & 63) << 12 | (b2 & 63) << 6 | b3 & 63;
              if (c <= 65535 || c >= 1114112) {
                c = null;
              }
            }
          }
          if (c === null) {
            c = 65533;
            bytesPerSequence = 1;
          } else if (c > 65535) {
            c -= 65536;
            str += String.fromCharCode(c >>> 10 & 1023 | 55296);
            c = 56320 | c & 1023;
          }
          str += String.fromCharCode(c);
          i += bytesPerSequence;
        }
        return str;
      }
      function readUtf8TextDecoder(buf, pos, end) {
        return utf8TextDecoder.decode(buf.subarray(pos, end));
      }
      function writeUtf8(buf, str, pos) {
        for (var i = 0, c, lead; i < str.length; i++) {
          c = str.charCodeAt(i);
          if (c > 55295 && c < 57344) {
            if (lead) {
              if (c < 56320) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
                lead = c;
                continue;
              } else {
                c = lead - 55296 << 10 | c - 56320 | 65536;
                lead = null;
              }
            } else {
              if (c > 56319 || i + 1 === str.length) {
                buf[pos++] = 239;
                buf[pos++] = 191;
                buf[pos++] = 189;
              } else {
                lead = c;
              }
              continue;
            }
          } else if (lead) {
            buf[pos++] = 239;
            buf[pos++] = 191;
            buf[pos++] = 189;
            lead = null;
          }
          if (c < 128) {
            buf[pos++] = c;
          } else {
            if (c < 2048) {
              buf[pos++] = c >> 6 | 192;
            } else {
              if (c < 65536) {
                buf[pos++] = c >> 12 | 224;
              } else {
                buf[pos++] = c >> 18 | 240;
                buf[pos++] = c >> 12 & 63 | 128;
              }
              buf[pos++] = c >> 6 & 63 | 128;
            }
            buf[pos++] = c & 63 | 128;
          }
        }
        return pos;
      }
    }
  });

  // bundle.ts
  var bundle_exports = {};
  __export(bundle_exports, {
    MVTLoader: () => MVTLoader,
    MVTSource: () => MVTSource,
    MVTWorkerLoader: () => MVTWorkerLoader,
    TableTileSource: () => TableTileSource,
    TileJSONLoader: () => TileJSONLoader
  });
  __reExport(bundle_exports, __toESM(require_core(), 1));

  // src/lib/get-schemas-from-tilejson.ts
  function getSchemaFromTileJSONLayer(layer) {
    const fields = [];
    if (layer.fields) {
      for (const field of layer.fields) {
        fields.push({
          name: field.name,
          type: getDataTypeFromTileJSONField(field),
          metadata: getMetadataFromTileJSONField(field)
        });
      }
    }
    return {
      metadata: getMetadataFromTileJSONLayer(layer),
      fields
    };
  }
  function getMetadataFromTileJSONLayer(layer) {
    const metadata = {};
    for (const [key, value] of Object.entries(layer)) {
      if (key !== "fields" && value) {
        metadata[key] = JSON.stringify(value);
      }
    }
    return metadata;
  }
  function getDataTypeFromTileJSONField(field) {
    switch (field.type.toLowerCase()) {
      case "float32":
        return "float32";
      case "number":
      case "float64":
        return "float64";
      case "string":
      case "utf8":
        return "utf8";
      case "boolean":
        return "bool";
      default:
        return "null";
    }
  }
  function getMetadataFromTileJSONField(field) {
    const metadata = {};
    for (const [key, value] of Object.entries(field)) {
      if (key !== "name" && value) {
        metadata[key] = JSON.stringify(value);
      }
    }
    return metadata;
  }

  // src/lib/parse-tilejson.ts
  var isObject = (x) => x !== null && typeof x === "object";
  function parseTileJSON(jsonMetadata, options) {
    if (!jsonMetadata || !isObject(jsonMetadata)) {
      return null;
    }
    let tileJSON = {
      name: jsonMetadata.name || "",
      description: jsonMetadata.description || ""
    };
    if (typeof jsonMetadata.generator === "string") {
      tileJSON.generator = jsonMetadata.generator;
    }
    if (typeof jsonMetadata.generator_options === "string") {
      tileJSON.generatorOptions = jsonMetadata.generator_options;
    }
    tileJSON.boundingBox = parseBounds(jsonMetadata.bounds) || parseBounds(jsonMetadata.antimeridian_adjusted_bounds);
    tileJSON.center = parseCenter(jsonMetadata.center);
    tileJSON.maxZoom = safeParseFloat(jsonMetadata.maxzoom);
    tileJSON.minZoom = safeParseFloat(jsonMetadata.minzoom);
    if (typeof jsonMetadata?.json === "string") {
      try {
        tileJSON.metaJson = JSON.parse(jsonMetadata.json);
      } catch (error) {
        console.warn("Failed to parse tilejson.json field", error);
      }
    }
    const tilestats = jsonMetadata.tilestats || tileJSON.metaJson?.tilestats;
    const tileStatsLayers = parseTilestatsLayers(tilestats, options);
    const tileJSONlayers = parseTileJSONLayers(jsonMetadata.vector_layers);
    const layers = mergeLayers(tileJSONlayers, tileStatsLayers);
    tileJSON = {
      ...tileJSON,
      layers
    };
    if (tileJSON.maxZoom === null && layers.length > 0) {
      tileJSON.maxZoom = layers[0].maxZoom || null;
    }
    if (tileJSON.minZoom === null && layers.length > 0) {
      tileJSON.minZoom = layers[0].minZoom || null;
    }
    return tileJSON;
  }
  function parseTileJSONLayers(layers) {
    if (!Array.isArray(layers)) {
      return [];
    }
    return layers.map((layer) => parseTileJSONLayer(layer));
  }
  function parseTileJSONLayer(layer) {
    const fields = Object.entries(layer.fields || []).map(([key, datatype]) => ({
      name: key,
      ...attributeTypeToFieldType(String(datatype))
    }));
    const layer2 = { ...layer };
    delete layer2.fields;
    return {
      name: layer.id || "",
      ...layer2,
      fields
    };
  }
  function parseTilestatsLayers(tilestats, options) {
    if (isObject(tilestats) && Array.isArray(tilestats.layers)) {
      return tilestats.layers.map((layer) => parseTilestatsForLayer(layer, options));
    }
    return [];
  }
  function parseTilestatsForLayer(layer, options) {
    const fields = [];
    const indexedAttributes = {};
    const attributes = layer.attributes || [];
    for (const attribute of attributes) {
      const name = attribute.attribute;
      if (typeof name === "string") {
        if (name.split("|").length > 1) {
          const fname = name.split("|")[0];
          indexedAttributes[fname] = indexedAttributes[fname] || [];
          indexedAttributes[fname].push(attribute);
          console.warn("ignoring tilestats indexed field", fname);
        } else if (!fields[name]) {
          fields.push(attributeToField(attribute, options));
        } else {
        }
      }
    }
    return {
      name: layer.layer || "",
      dominantGeometry: layer.geometry,
      fields
    };
  }
  function mergeLayers(layers, tilestatsLayers) {
    return layers.map((layer) => {
      const tilestatsLayer = tilestatsLayers.find((tsLayer) => tsLayer.name === layer.name);
      const fields = tilestatsLayer?.fields || layer.fields || [];
      const mergedLayer = {
        ...layer,
        ...tilestatsLayer,
        fields
      };
      mergedLayer.schema = getSchemaFromTileJSONLayer(mergedLayer);
      return mergedLayer;
    });
  }
  function parseBounds(bounds) {
    const result = fromArrayOrString(bounds);
    if (Array.isArray(result) && result.length === 4 && [result[0], result[2]].every(isLng) && [result[1], result[3]].every(isLat)) {
      return [
        [result[0], result[1]],
        [result[2], result[3]]
      ];
    }
    return void 0;
  }
  function parseCenter(center) {
    const result = fromArrayOrString(center);
    if (Array.isArray(result) && result.length === 3 && isLng(result[0]) && isLat(result[1]) && isZoom(result[2])) {
      return result;
    }
    return null;
  }
  function safeParseFloat(input) {
    const result = typeof input === "string" ? parseFloat(input) : typeof input === "number" ? input : null;
    return result === null || isNaN(result) ? null : result;
  }
  function isLat(num) {
    return Number.isFinite(num) && num <= 90 && num >= -90;
  }
  function isLng(num) {
    return Number.isFinite(num) && num <= 180 && num >= -180;
  }
  function isZoom(num) {
    return Number.isFinite(num) && num >= 0 && num <= 22;
  }
  function fromArrayOrString(data) {
    if (typeof data === "string") {
      return data.split(",").map(parseFloat);
    } else if (Array.isArray(data)) {
      return data;
    }
    return null;
  }
  var attrTypeMap = {
    number: {
      type: "float32"
    },
    numeric: {
      type: "float32"
    },
    string: {
      type: "utf8"
    },
    vachar: {
      type: "utf8"
    },
    float: {
      type: "float32"
    },
    int: {
      type: "int32"
    },
    int4: {
      type: "int32"
    },
    boolean: {
      type: "boolean"
    },
    bool: {
      type: "boolean"
    }
  };
  function attributeToField(attribute = {}, options) {
    const fieldTypes = attributeTypeToFieldType(attribute.type);
    const field = {
      name: attribute.attribute,
      // what happens if attribute type is string...
      // filterProps: getFilterProps(fieldTypes.type, attribute),
      ...fieldTypes
    };
    if (typeof attribute.min === "number") {
      field.min = attribute.min;
    }
    if (typeof attribute.max === "number") {
      field.max = attribute.max;
    }
    if (typeof attribute.count === "number") {
      field.uniqueValueCount = attribute.count;
    }
    if (attribute.values) {
      field.values = attribute.values;
    }
    if (field.values && typeof options.maxValues === "number") {
      field.values = field.values?.slice(0, options.maxValues);
    }
    return field;
  }
  function attributeTypeToFieldType(aType) {
    const type = aType.toLowerCase();
    if (!type || !attrTypeMap[type]) {
    }
    return attrTypeMap[type] || { type: "string" };
  }

  // src/tilejson-loader.ts
  var VERSION = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";
  var TileJSONLoader = {
    dataType: null,
    batchType: null,
    name: "TileJSON",
    id: "tilejson",
    module: "pmtiles",
    version: VERSION,
    worker: true,
    extensions: ["json"],
    mimeTypes: ["application/json"],
    text: true,
    options: {
      tilejson: {
        maxValues: void 0
      }
    },
    parse: async (arrayBuffer, options) => {
      const jsonString = new TextDecoder().decode(arrayBuffer);
      const json = JSON.parse(jsonString);
      const tilejsonOptions = { ...TileJSONLoader.options.tilejson, ...options?.tilejson };
      return parseTileJSON(json, tilejsonOptions);
    },
    parseTextSync: (text, options) => {
      const json = JSON.parse(text);
      const tilejsonOptions = { ...TileJSONLoader.options.tilejson, ...options?.tilejson };
      return parseTileJSON(json, tilejsonOptions);
    }
  };

  // ../schema/src/lib/table/simple-table/data-type.ts
  function getDataTypeFromValue(value, defaultNumberType = "float32") {
    if (value instanceof Date) {
      return "date-millisecond";
    }
    if (value instanceof Number) {
      return defaultNumberType;
    }
    if (typeof value === "string") {
      return "utf8";
    }
    if (value === null || value === "undefined") {
      return "null";
    }
    return "null";
  }
  function getDataTypeFromArray(array) {
    let type = getDataTypeFromTypedArray(array);
    if (type !== "null") {
      return { type, nullable: false };
    }
    if (array.length > 0) {
      type = getDataTypeFromValue(array[0]);
      return { type, nullable: true };
    }
    return { type: "null", nullable: true };
  }
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

  // ../schema/src/lib/table/simple-table/table-schema.ts
  function deduceTableSchema(table) {
    switch (table.shape) {
      case "array-row-table":
      case "object-row-table":
        return deduceSchemaFromRows(table.data);
      case "geojson-table":
        return deduceSchemaFromGeoJSON(table.features);
      case "columnar-table":
        return deduceSchemaFromColumns(table.data);
      case "arrow-table":
      default:
        throw new Error("Deduce schema");
    }
  }
  function deduceSchemaFromColumns(columnarTable) {
    const fields = [];
    for (const [columnName, column] of Object.entries(columnarTable)) {
      const field = deduceFieldFromColumn(column, columnName);
      fields.push(field);
    }
    return { fields, metadata: {} };
  }
  function deduceSchemaFromRows(rowTable) {
    if (!rowTable.length) {
      throw new Error("deduce from empty table");
    }
    const fields = [];
    const row0 = rowTable[0];
    for (const [columnName, value] of Object.entries(row0)) {
      fields.push(deduceFieldFromValue(value, columnName));
    }
    return { fields, metadata: {} };
  }
  function deduceSchemaFromGeoJSON(features2) {
    if (!features2.length) {
      throw new Error("deduce from empty table");
    }
    const fields = [];
    const row0 = features2[0].properties || {};
    for (const [columnName, value] of Object.entries(row0)) {
      fields.push(deduceFieldFromValue(value, columnName));
    }
    return { fields, metadata: {} };
  }
  function deduceFieldFromColumn(column, name) {
    if (ArrayBuffer.isView(column)) {
      const type = getDataTypeFromArray(column);
      return {
        name,
        type: type.type || "null",
        nullable: type.nullable
        // metadata: {}
      };
    }
    if (Array.isArray(column) && column.length > 0) {
      const value = column[0];
      const type = getDataTypeFromValue(value);
      return {
        name,
        type,
        nullable: true
        // metadata: {},
      };
    }
    throw new Error("empty table");
  }
  function deduceFieldFromValue(value, name) {
    const type = getDataTypeFromValue(value);
    return {
      name,
      type,
      nullable: true
      // metadata: {}
    };
  }

  // ../../node_modules/@math.gl/polygon/dist/polygon-utils.js
  var DimIndex = {
    x: 0,
    y: 1,
    z: 2
  };
  function getPolygonSignedArea(points, options = {}) {
    const { start = 0, end = points.length, plane = "xy" } = options;
    const dim = options.size || 2;
    let area2 = 0;
    const i0 = DimIndex[plane[0]];
    const i1 = DimIndex[plane[1]];
    for (let i = start, j = end - dim; i < end; i += dim) {
      area2 += (points[i + i0] - points[j + i0]) * (points[i + i1] + points[j + i1]);
      j = i;
    }
    return area2 / 2;
  }

  // ../../node_modules/@math.gl/polygon/dist/earcut.js
  function earcut(positions, holeIndices, dim = 2, areas, plane = "xy") {
    const hasHoles = holeIndices && holeIndices.length;
    const outerLen = hasHoles ? holeIndices[0] * dim : positions.length;
    let outerNode = linkedList(positions, 0, outerLen, dim, true, areas && areas[0], plane);
    const triangles = [];
    if (!outerNode || outerNode.next === outerNode.prev)
      return triangles;
    let invSize;
    let maxX;
    let maxY;
    let minX;
    let minY;
    let x;
    let y;
    if (hasHoles)
      outerNode = eliminateHoles(positions, holeIndices, outerNode, dim, areas, plane);
    if (positions.length > 80 * dim) {
      minX = maxX = positions[0];
      minY = maxY = positions[1];
      for (let i = dim; i < outerLen; i += dim) {
        x = positions[i];
        y = positions[i + 1];
        if (x < minX)
          minX = x;
        if (y < minY)
          minY = y;
        if (x > maxX)
          maxX = x;
        if (y > maxY)
          maxY = y;
      }
      invSize = Math.max(maxX - minX, maxY - minY);
      invSize = invSize !== 0 ? 32767 / invSize : 0;
    }
    earcutLinked(outerNode, triangles, dim, minX, minY, invSize, 0);
    return triangles;
  }
  function linkedList(data, start, end, dim, clockwise, area2, plane) {
    let i;
    let last;
    if (area2 === void 0) {
      area2 = getPolygonSignedArea(data, { start, end, size: dim, plane });
    }
    let i0 = DimIndex[plane[0]];
    let i1 = DimIndex[plane[1]];
    if (clockwise === area2 < 0) {
      for (i = start; i < end; i += dim)
        last = insertNode(i, data[i + i0], data[i + i1], last);
    } else {
      for (i = end - dim; i >= start; i -= dim)
        last = insertNode(i, data[i + i0], data[i + i1], last);
    }
    if (last && equals(last, last.next)) {
      removeNode(last);
      last = last.next;
    }
    return last;
  }
  function filterPoints(start, end) {
    if (!start)
      return start;
    if (!end)
      end = start;
    let p = start;
    let again;
    do {
      again = false;
      if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
        removeNode(p);
        p = end = p.prev;
        if (p === p.next)
          break;
        again = true;
      } else {
        p = p.next;
      }
    } while (again || p !== end);
    return end;
  }
  function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear)
      return;
    if (!pass && invSize)
      indexCurve(ear, minX, minY, invSize);
    let stop = ear;
    let prev;
    let next;
    while (ear.prev !== ear.next) {
      prev = ear.prev;
      next = ear.next;
      if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
        triangles.push(prev.i / dim | 0);
        triangles.push(ear.i / dim | 0);
        triangles.push(next.i / dim | 0);
        removeNode(ear);
        ear = next.next;
        stop = next.next;
        continue;
      }
      ear = next;
      if (ear === stop) {
        if (!pass) {
          earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);
        } else if (pass === 1) {
          ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
          earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);
        } else if (pass === 2) {
          splitEarcut(ear, triangles, dim, minX, minY, invSize);
        }
        break;
      }
    }
  }
  function isEar(ear) {
    const a = ear.prev;
    const b = ear;
    const c = ear.next;
    if (area(a, b, c) >= 0)
      return false;
    const ax = a.x;
    const bx = b.x;
    const cx = c.x;
    const ay = a.y;
    const by = b.y;
    const cy = c.y;
    const x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx;
    const y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy;
    const x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx;
    const y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    let p = c.next;
    while (p !== a) {
      if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
        return false;
      p = p.next;
    }
    return true;
  }
  function isEarHashed(ear, minX, minY, invSize) {
    const a = ear.prev;
    const b = ear;
    const c = ear.next;
    if (area(a, b, c) >= 0)
      return false;
    const ax = a.x;
    const bx = b.x;
    const cx = c.x;
    const ay = a.y;
    const by = b.y;
    const cy = c.y;
    const x0 = ax < bx ? ax < cx ? ax : cx : bx < cx ? bx : cx;
    const y0 = ay < by ? ay < cy ? ay : cy : by < cy ? by : cy;
    const x1 = ax > bx ? ax > cx ? ax : cx : bx > cx ? bx : cx;
    const y1 = ay > by ? ay > cy ? ay : cy : by > cy ? by : cy;
    const minZ = zOrder(x0, y0, minX, minY, invSize);
    const maxZ = zOrder(x1, y1, minX, minY, invSize);
    let p = ear.prevZ;
    let n = ear.nextZ;
    while (p && p.z >= minZ && n && n.z <= maxZ) {
      if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
        return false;
      p = p.prevZ;
      if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
        return false;
      n = n.nextZ;
    }
    while (p && p.z >= minZ) {
      if (p.x >= x0 && p.x <= x1 && p.y >= y0 && p.y <= y1 && p !== a && p !== c && pointInTriangle(ax, ay, bx, by, cx, cy, p.x, p.y) && area(p.prev, p, p.next) >= 0)
        return false;
      p = p.prevZ;
    }
    while (n && n.z <= maxZ) {
      if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1 && n !== a && n !== c && pointInTriangle(ax, ay, bx, by, cx, cy, n.x, n.y) && area(n.prev, n, n.next) >= 0)
        return false;
      n = n.nextZ;
    }
    return true;
  }
  function cureLocalIntersections(start, triangles, dim) {
    let p = start;
    do {
      const a = p.prev;
      const b = p.next.next;
      if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {
        triangles.push(a.i / dim | 0);
        triangles.push(p.i / dim | 0);
        triangles.push(b.i / dim | 0);
        removeNode(p);
        removeNode(p.next);
        p = start = b;
      }
      p = p.next;
    } while (p !== start);
    return filterPoints(p);
  }
  function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    let a = start;
    do {
      let b = a.next.next;
      while (b !== a.prev) {
        if (a.i !== b.i && isValidDiagonal(a, b)) {
          let c = splitPolygon(a, b);
          a = filterPoints(a, a.next);
          c = filterPoints(c, c.next);
          earcutLinked(a, triangles, dim, minX, minY, invSize, 0);
          earcutLinked(c, triangles, dim, minX, minY, invSize, 0);
          return;
        }
        b = b.next;
      }
      a = a.next;
    } while (a !== start);
  }
  function eliminateHoles(data, holeIndices, outerNode, dim, areas, plane) {
    const queue = [];
    let i;
    let len;
    let start;
    let end;
    let list;
    for (i = 0, len = holeIndices.length; i < len; i++) {
      start = holeIndices[i] * dim;
      end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
      list = linkedList(data, start, end, dim, false, areas && areas[i + 1], plane);
      if (list === list.next)
        list.steiner = true;
      queue.push(getLeftmost(list));
    }
    queue.sort(compareX);
    for (i = 0; i < queue.length; i++) {
      outerNode = eliminateHole(queue[i], outerNode);
    }
    return outerNode;
  }
  function compareX(a, b) {
    return a.x - b.x;
  }
  function eliminateHole(hole, outerNode) {
    const bridge = findHoleBridge(hole, outerNode);
    if (!bridge) {
      return outerNode;
    }
    const bridgeReverse = splitPolygon(bridge, hole);
    filterPoints(bridgeReverse, bridgeReverse.next);
    return filterPoints(bridge, bridge.next);
  }
  function findHoleBridge(hole, outerNode) {
    let p = outerNode;
    const hx = hole.x;
    const hy = hole.y;
    let qx = -Infinity;
    let m;
    do {
      if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
        const x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
        if (x <= hx && x > qx) {
          qx = x;
          m = p.x < p.next.x ? p : p.next;
          if (x === hx)
            return m;
        }
      }
      p = p.next;
    } while (p !== outerNode);
    if (!m)
      return null;
    const stop = m;
    const mx = m.x;
    const my = m.y;
    let tanMin = Infinity;
    let tan;
    p = m;
    do {
      if (hx >= p.x && p.x >= mx && hx !== p.x && pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
        tan = Math.abs(hy - p.y) / (hx - p.x);
        if (locallyInside(p, hole) && (tan < tanMin || tan === tanMin && (p.x > m.x || p.x === m.x && sectorContainsSector(m, p)))) {
          m = p;
          tanMin = tan;
        }
      }
      p = p.next;
    } while (p !== stop);
    return m;
  }
  function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
  }
  function indexCurve(start, minX, minY, invSize) {
    let p = start;
    do {
      if (p.z === 0)
        p.z = zOrder(p.x, p.y, minX, minY, invSize);
      p.prevZ = p.prev;
      p.nextZ = p.next;
      p = p.next;
    } while (p !== start);
    p.prevZ.nextZ = null;
    p.prevZ = null;
    sortLinked(p);
  }
  function sortLinked(list) {
    let e;
    let i;
    let inSize = 1;
    let numMerges;
    let p;
    let pSize;
    let q;
    let qSize;
    let tail;
    do {
      p = list;
      list = null;
      tail = null;
      numMerges = 0;
      while (p) {
        numMerges++;
        q = p;
        pSize = 0;
        for (i = 0; i < inSize; i++) {
          pSize++;
          q = q.nextZ;
          if (!q)
            break;
        }
        qSize = inSize;
        while (pSize > 0 || qSize > 0 && q) {
          if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
            e = p;
            p = p.nextZ;
            pSize--;
          } else {
            e = q;
            q = q.nextZ;
            qSize--;
          }
          if (tail)
            tail.nextZ = e;
          else
            list = e;
          e.prevZ = tail;
          tail = e;
        }
        p = q;
      }
      tail.nextZ = null;
      inSize *= 2;
    } while (numMerges > 1);
    return list;
  }
  function zOrder(x, y, minX, minY, invSize) {
    x = (x - minX) * invSize | 0;
    y = (y - minY) * invSize | 0;
    x = (x | x << 8) & 16711935;
    x = (x | x << 4) & 252645135;
    x = (x | x << 2) & 858993459;
    x = (x | x << 1) & 1431655765;
    y = (y | y << 8) & 16711935;
    y = (y | y << 4) & 252645135;
    y = (y | y << 2) & 858993459;
    y = (y | y << 1) & 1431655765;
    return x | y << 1;
  }
  function getLeftmost(start) {
    let p = start;
    let leftmost = start;
    do {
      if (p.x < leftmost.x || p.x === leftmost.x && p.y < leftmost.y)
        leftmost = p;
      p = p.next;
    } while (p !== start);
    return leftmost;
  }
  function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) >= (ax - px) * (cy - py) && (ax - px) * (by - py) >= (bx - px) * (ay - py) && (bx - px) * (cy - py) >= (cx - px) * (by - py);
  }
  function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
    (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
    (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
    equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0);
  }
  function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  }
  function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
  }
  function intersects(p1, q1, p2, q2) {
    const o1 = sign(area(p1, q1, p2));
    const o2 = sign(area(p1, q1, q2));
    const o3 = sign(area(p2, q2, p1));
    const o4 = sign(area(p2, q2, q1));
    if (o1 !== o2 && o3 !== o4)
      return true;
    if (o1 === 0 && onSegment(p1, p2, q1))
      return true;
    if (o2 === 0 && onSegment(p1, q2, q1))
      return true;
    if (o3 === 0 && onSegment(p2, p1, q2))
      return true;
    if (o4 === 0 && onSegment(p2, q1, q2))
      return true;
    return false;
  }
  function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
  }
  function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
  }
  function intersectsPolygon(a, b) {
    let p = a;
    do {
      if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i && intersects(p, p.next, a, b))
        return true;
      p = p.next;
    } while (p !== a);
    return false;
  }
  function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ? area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 : area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
  }
  function middleInside(a, b) {
    let p = a;
    let inside = false;
    const px = (a.x + b.x) / 2;
    const py = (a.y + b.y) / 2;
    do {
      if (p.y > py !== p.next.y > py && p.next.y !== p.y && px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x)
        inside = !inside;
      p = p.next;
    } while (p !== a);
    return inside;
  }
  function splitPolygon(a, b) {
    const a2 = new Vertex(a.i, a.x, a.y);
    const b2 = new Vertex(b.i, b.x, b.y);
    const an = a.next;
    const bp = b.prev;
    a.next = b;
    b.prev = a;
    a2.next = an;
    an.prev = a2;
    b2.next = a2;
    a2.prev = b2;
    bp.next = b2;
    b2.prev = bp;
    return b2;
  }
  function insertNode(i, x, y, last) {
    const p = new Vertex(i, x, y);
    if (!last) {
      p.prev = p;
      p.next = p;
    } else {
      p.next = last.next;
      p.prev = last;
      last.next.prev = p;
      last.next = p;
    }
    return p;
  }
  function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;
    if (p.prevZ)
      p.prevZ.nextZ = p.nextZ;
    if (p.nextZ)
      p.nextZ.prevZ = p.prevZ;
  }
  var Vertex = class {
    constructor(i, x, y) {
      this.prev = null;
      this.next = null;
      this.z = 0;
      this.prevZ = null;
      this.nextZ = null;
      this.steiner = false;
      this.i = i;
      this.x = x;
      this.y = y;
    }
  };

  // ../gis/src/lib/binary-features/flat-geojson-to-binary.ts
  function flatGeojsonToBinary(features2, geometryInfo, options) {
    const propArrayTypes = extractNumericPropTypes(features2);
    const numericPropKeys = Object.keys(propArrayTypes).filter((k) => propArrayTypes[k] !== Array);
    return fillArrays(
      features2,
      {
        propArrayTypes,
        ...geometryInfo
      },
      {
        numericPropKeys: options && options.numericPropKeys || numericPropKeys,
        PositionDataType: options ? options.PositionDataType : Float32Array,
        triangulate: options ? options.triangulate : true
      }
    );
  }
  function extractNumericPropTypes(features2) {
    const propArrayTypes = {};
    for (const feature of features2) {
      if (feature.properties) {
        for (const key in feature.properties) {
          const val = feature.properties[key];
          propArrayTypes[key] = deduceArrayType(val, propArrayTypes[key]);
        }
      }
    }
    return propArrayTypes;
  }
  function fillArrays(features2, geometryInfo, options) {
    const {
      pointPositionsCount,
      pointFeaturesCount,
      linePositionsCount,
      linePathsCount,
      lineFeaturesCount,
      polygonPositionsCount,
      polygonObjectsCount,
      polygonRingsCount,
      polygonFeaturesCount,
      propArrayTypes,
      coordLength
    } = geometryInfo;
    const { numericPropKeys = [], PositionDataType = Float32Array, triangulate = true } = options;
    const hasGlobalId = features2[0] && "id" in features2[0];
    const GlobalFeatureIdsDataType = features2.length > 65535 ? Uint32Array : Uint16Array;
    const points = {
      type: "Point",
      positions: new PositionDataType(pointPositionsCount * coordLength),
      globalFeatureIds: new GlobalFeatureIdsDataType(pointPositionsCount),
      featureIds: pointFeaturesCount > 65535 ? new Uint32Array(pointPositionsCount) : new Uint16Array(pointPositionsCount),
      numericProps: {},
      properties: [],
      fields: []
    };
    const lines = {
      type: "LineString",
      pathIndices: linePositionsCount > 65535 ? new Uint32Array(linePathsCount + 1) : new Uint16Array(linePathsCount + 1),
      positions: new PositionDataType(linePositionsCount * coordLength),
      globalFeatureIds: new GlobalFeatureIdsDataType(linePositionsCount),
      featureIds: lineFeaturesCount > 65535 ? new Uint32Array(linePositionsCount) : new Uint16Array(linePositionsCount),
      numericProps: {},
      properties: [],
      fields: []
    };
    const polygons = {
      type: "Polygon",
      polygonIndices: polygonPositionsCount > 65535 ? new Uint32Array(polygonObjectsCount + 1) : new Uint16Array(polygonObjectsCount + 1),
      primitivePolygonIndices: polygonPositionsCount > 65535 ? new Uint32Array(polygonRingsCount + 1) : new Uint16Array(polygonRingsCount + 1),
      positions: new PositionDataType(polygonPositionsCount * coordLength),
      globalFeatureIds: new GlobalFeatureIdsDataType(polygonPositionsCount),
      featureIds: polygonFeaturesCount > 65535 ? new Uint32Array(polygonPositionsCount) : new Uint16Array(polygonPositionsCount),
      numericProps: {},
      properties: [],
      fields: []
    };
    if (triangulate) {
      polygons.triangles = [];
    }
    for (const object of [points, lines, polygons]) {
      for (const propName of numericPropKeys) {
        const T = propArrayTypes[propName];
        object.numericProps[propName] = new T(object.positions.length / coordLength);
      }
    }
    lines.pathIndices[linePathsCount] = linePositionsCount;
    polygons.polygonIndices[polygonObjectsCount] = polygonPositionsCount;
    polygons.primitivePolygonIndices[polygonRingsCount] = polygonPositionsCount;
    const indexMap = {
      pointPosition: 0,
      pointFeature: 0,
      linePosition: 0,
      linePath: 0,
      lineFeature: 0,
      polygonPosition: 0,
      polygonObject: 0,
      polygonRing: 0,
      polygonFeature: 0,
      feature: 0
    };
    for (const feature of features2) {
      const geometry = feature.geometry;
      const properties = feature.properties || {};
      switch (geometry.type) {
        case "Point":
          handlePoint(geometry, points, indexMap, coordLength, properties);
          points.properties.push(keepStringProperties(properties, numericPropKeys));
          if (hasGlobalId) {
            points.fields.push({ id: feature.id });
          }
          indexMap.pointFeature++;
          break;
        case "LineString":
          handleLineString(geometry, lines, indexMap, coordLength, properties);
          lines.properties.push(keepStringProperties(properties, numericPropKeys));
          if (hasGlobalId) {
            lines.fields.push({ id: feature.id });
          }
          indexMap.lineFeature++;
          break;
        case "Polygon":
          handlePolygon(geometry, polygons, indexMap, coordLength, properties);
          polygons.properties.push(keepStringProperties(properties, numericPropKeys));
          if (hasGlobalId) {
            polygons.fields.push({ id: feature.id });
          }
          indexMap.polygonFeature++;
          break;
        default:
          throw new Error("Invalid geometry type");
      }
      indexMap.feature++;
    }
    return makeAccessorObjects(points, lines, polygons, coordLength);
  }
  function handlePoint(geometry, points, indexMap, coordLength, properties) {
    points.positions.set(geometry.data, indexMap.pointPosition * coordLength);
    const nPositions = geometry.data.length / coordLength;
    fillNumericProperties(points, properties, indexMap.pointPosition, nPositions);
    points.globalFeatureIds.fill(
      indexMap.feature,
      indexMap.pointPosition,
      indexMap.pointPosition + nPositions
    );
    points.featureIds.fill(
      indexMap.pointFeature,
      indexMap.pointPosition,
      indexMap.pointPosition + nPositions
    );
    indexMap.pointPosition += nPositions;
  }
  function handleLineString(geometry, lines, indexMap, coordLength, properties) {
    lines.positions.set(geometry.data, indexMap.linePosition * coordLength);
    const nPositions = geometry.data.length / coordLength;
    fillNumericProperties(lines, properties, indexMap.linePosition, nPositions);
    lines.globalFeatureIds.fill(
      indexMap.feature,
      indexMap.linePosition,
      indexMap.linePosition + nPositions
    );
    lines.featureIds.fill(
      indexMap.lineFeature,
      indexMap.linePosition,
      indexMap.linePosition + nPositions
    );
    for (let i = 0, il = geometry.indices.length; i < il; ++i) {
      const start = geometry.indices[i];
      const end = i === il - 1 ? geometry.data.length : geometry.indices[i + 1];
      lines.pathIndices[indexMap.linePath++] = indexMap.linePosition;
      indexMap.linePosition += (end - start) / coordLength;
    }
  }
  function handlePolygon(geometry, polygons, indexMap, coordLength, properties) {
    polygons.positions.set(geometry.data, indexMap.polygonPosition * coordLength);
    const nPositions = geometry.data.length / coordLength;
    fillNumericProperties(polygons, properties, indexMap.polygonPosition, nPositions);
    polygons.globalFeatureIds.fill(
      indexMap.feature,
      indexMap.polygonPosition,
      indexMap.polygonPosition + nPositions
    );
    polygons.featureIds.fill(
      indexMap.polygonFeature,
      indexMap.polygonPosition,
      indexMap.polygonPosition + nPositions
    );
    for (let l = 0, ll = geometry.indices.length; l < ll; ++l) {
      const startPosition = indexMap.polygonPosition;
      polygons.polygonIndices[indexMap.polygonObject++] = startPosition;
      const areas = geometry.areas[l];
      const indices = geometry.indices[l];
      const nextIndices = geometry.indices[l + 1];
      for (let i = 0, il = indices.length; i < il; ++i) {
        const start = indices[i];
        const end = i === il - 1 ? (
          // last line, so either read to:
          nextIndices === void 0 ? geometry.data.length : nextIndices[0]
        ) : indices[i + 1];
        polygons.primitivePolygonIndices[indexMap.polygonRing++] = indexMap.polygonPosition;
        indexMap.polygonPosition += (end - start) / coordLength;
      }
      const endPosition = indexMap.polygonPosition;
      triangulatePolygon(polygons, areas, indices, { startPosition, endPosition, coordLength });
    }
  }
  function triangulatePolygon(polygons, areas, indices, {
    startPosition,
    endPosition,
    coordLength
  }) {
    if (!polygons.triangles) {
      return;
    }
    const start = startPosition * coordLength;
    const end = endPosition * coordLength;
    const polygonPositions = polygons.positions.subarray(start, end);
    const offset = indices[0];
    const holes = indices.slice(1).map((n) => (n - offset) / coordLength);
    const triangles = earcut(polygonPositions, holes, coordLength, areas);
    for (let t = 0, tl = triangles.length; t < tl; ++t) {
      polygons.triangles.push(startPosition + triangles[t]);
    }
  }
  function wrapProps(obj, size) {
    const returnObj = {};
    for (const key in obj) {
      returnObj[key] = { value: obj[key], size };
    }
    return returnObj;
  }
  function makeAccessorObjects(points, lines, polygons, coordLength) {
    const binaryFeatures = {
      shape: "binary-feature-collection",
      points: {
        ...points,
        positions: { value: points.positions, size: coordLength },
        globalFeatureIds: { value: points.globalFeatureIds, size: 1 },
        featureIds: { value: points.featureIds, size: 1 },
        numericProps: wrapProps(points.numericProps, 1)
      },
      lines: {
        ...lines,
        positions: { value: lines.positions, size: coordLength },
        pathIndices: { value: lines.pathIndices, size: 1 },
        globalFeatureIds: { value: lines.globalFeatureIds, size: 1 },
        featureIds: { value: lines.featureIds, size: 1 },
        numericProps: wrapProps(lines.numericProps, 1)
      },
      polygons: {
        ...polygons,
        positions: { value: polygons.positions, size: coordLength },
        polygonIndices: { value: polygons.polygonIndices, size: 1 },
        primitivePolygonIndices: { value: polygons.primitivePolygonIndices, size: 1 },
        globalFeatureIds: { value: polygons.globalFeatureIds, size: 1 },
        featureIds: { value: polygons.featureIds, size: 1 },
        numericProps: wrapProps(polygons.numericProps, 1)
      }
      // triangles not expected
    };
    if (binaryFeatures.polygons && polygons.triangles) {
      binaryFeatures.polygons.triangles = { value: new Uint32Array(polygons.triangles), size: 1 };
    }
    return binaryFeatures;
  }
  function fillNumericProperties(object, properties, index, length) {
    for (const numericPropName in object.numericProps) {
      if (numericPropName in properties) {
        const value = properties[numericPropName];
        object.numericProps[numericPropName].fill(value, index, index + length);
      }
    }
  }
  function keepStringProperties(properties, numericKeys) {
    const props = {};
    for (const key in properties) {
      if (!numericKeys.includes(key)) {
        props[key] = properties[key];
      }
    }
    return props;
  }
  function deduceArrayType(x, constructor) {
    if (constructor === Array || !Number.isFinite(x)) {
      return Array;
    }
    return constructor === Float64Array || Math.fround(x) !== x ? Float64Array : Float32Array;
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

  // ../../node_modules/@probe.gl/log/node_modules/@probe.gl/env/dist/lib/globals.js
  var window_2 = globalThis;
  var document_2 = globalThis.document || {};
  var process_ = globalThis.process || {};
  var console_ = globalThis.console;
  var navigator_ = globalThis.navigator || {};

  // ../../node_modules/@probe.gl/log/node_modules/@probe.gl/env/dist/lib/is-electron.js
  function isElectron(mockUserAgent) {
    if (typeof window !== "undefined" && window.process?.type === "renderer") {
      return true;
    }
    if (typeof process !== "undefined" && Boolean(process.versions?.["electron"])) {
      return true;
    }
    const realUserAgent = typeof navigator !== "undefined" && navigator.userAgent;
    const userAgent = mockUserAgent || realUserAgent;
    return Boolean(userAgent && userAgent.indexOf("Electron") >= 0);
  }

  // ../../node_modules/@probe.gl/log/node_modules/@probe.gl/env/dist/lib/is-browser.js
  function isBrowser2() {
    const isNode = (
      // @ts-expect-error
      typeof process === "object" && String(process) === "[object process]" && !process?.browser
    );
    return !isNode || isElectron();
  }

  // ../../node_modules/@probe.gl/log/node_modules/@probe.gl/env/dist/index.js
  var VERSION2 = true ? "4.0.7" : "untranspiled source";

  // ../../node_modules/@probe.gl/log/dist/utils/local-storage.js
  function getStorage(type) {
    try {
      const storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return storage;
    } catch (e) {
      return null;
    }
  }
  var LocalStorage = class {
    constructor(id, defaultConfig, type = "sessionStorage") {
      this.storage = getStorage(type);
      this.id = id;
      this.config = defaultConfig;
      this._loadConfiguration();
    }
    getConfiguration() {
      return this.config;
    }
    setConfiguration(configuration) {
      Object.assign(this.config, configuration);
      if (this.storage) {
        const serialized = JSON.stringify(this.config);
        this.storage.setItem(this.id, serialized);
      }
    }
    // Get config from persistent store, if available
    _loadConfiguration() {
      let configuration = {};
      if (this.storage) {
        const serializedConfiguration = this.storage.getItem(this.id);
        configuration = serializedConfiguration ? JSON.parse(serializedConfiguration) : {};
      }
      Object.assign(this.config, configuration);
      return this;
    }
  };

  // ../../node_modules/@probe.gl/log/dist/utils/formatters.js
  function formatTime(ms) {
    let formatted;
    if (ms < 10) {
      formatted = `${ms.toFixed(2)}ms`;
    } else if (ms < 100) {
      formatted = `${ms.toFixed(1)}ms`;
    } else if (ms < 1e3) {
      formatted = `${ms.toFixed(0)}ms`;
    } else {
      formatted = `${(ms / 1e3).toFixed(2)}s`;
    }
    return formatted;
  }
  function leftPad(string, length = 8) {
    const padLength = Math.max(length - string.length, 0);
    return `${" ".repeat(padLength)}${string}`;
  }

  // ../../node_modules/@probe.gl/log/dist/utils/color.js
  var COLOR;
  (function(COLOR2) {
    COLOR2[COLOR2["BLACK"] = 30] = "BLACK";
    COLOR2[COLOR2["RED"] = 31] = "RED";
    COLOR2[COLOR2["GREEN"] = 32] = "GREEN";
    COLOR2[COLOR2["YELLOW"] = 33] = "YELLOW";
    COLOR2[COLOR2["BLUE"] = 34] = "BLUE";
    COLOR2[COLOR2["MAGENTA"] = 35] = "MAGENTA";
    COLOR2[COLOR2["CYAN"] = 36] = "CYAN";
    COLOR2[COLOR2["WHITE"] = 37] = "WHITE";
    COLOR2[COLOR2["BRIGHT_BLACK"] = 90] = "BRIGHT_BLACK";
    COLOR2[COLOR2["BRIGHT_RED"] = 91] = "BRIGHT_RED";
    COLOR2[COLOR2["BRIGHT_GREEN"] = 92] = "BRIGHT_GREEN";
    COLOR2[COLOR2["BRIGHT_YELLOW"] = 93] = "BRIGHT_YELLOW";
    COLOR2[COLOR2["BRIGHT_BLUE"] = 94] = "BRIGHT_BLUE";
    COLOR2[COLOR2["BRIGHT_MAGENTA"] = 95] = "BRIGHT_MAGENTA";
    COLOR2[COLOR2["BRIGHT_CYAN"] = 96] = "BRIGHT_CYAN";
    COLOR2[COLOR2["BRIGHT_WHITE"] = 97] = "BRIGHT_WHITE";
  })(COLOR || (COLOR = {}));
  var BACKGROUND_INCREMENT = 10;
  function getColor(color) {
    if (typeof color !== "string") {
      return color;
    }
    color = color.toUpperCase();
    return COLOR[color] || COLOR.WHITE;
  }
  function addColor(string, color, background) {
    if (!isBrowser2 && typeof string === "string") {
      if (color) {
        const colorCode = getColor(color);
        string = `\x1B[${colorCode}m${string}\x1B[39m`;
      }
      if (background) {
        const colorCode = getColor(background);
        string = `\x1B[${colorCode + BACKGROUND_INCREMENT}m${string}\x1B[49m`;
      }
    }
    return string;
  }

  // ../../node_modules/@probe.gl/log/dist/utils/autobind.js
  function autobind(obj, predefined = ["constructor"]) {
    const proto = Object.getPrototypeOf(obj);
    const propNames = Object.getOwnPropertyNames(proto);
    const object = obj;
    for (const key of propNames) {
      const value = object[key];
      if (typeof value === "function") {
        if (!predefined.find((name) => key === name)) {
          object[key] = value.bind(obj);
        }
      }
    }
  }

  // ../../node_modules/@probe.gl/log/dist/utils/assert.js
  function assert2(condition, message) {
    if (!condition) {
      throw new Error(message || "Assertion failed");
    }
  }

  // ../../node_modules/@probe.gl/log/dist/utils/hi-res-timestamp.js
  function getHiResTimestamp() {
    let timestamp;
    if (isBrowser2() && window_2.performance) {
      timestamp = window_2?.performance?.now?.();
    } else if ("hrtime" in process_) {
      const timeParts = process_?.hrtime?.();
      timestamp = timeParts[0] * 1e3 + timeParts[1] / 1e6;
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }

  // ../../node_modules/@probe.gl/log/dist/log.js
  var originalConsole = {
    debug: isBrowser2() ? console.debug || console.log : console.log,
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error
  };
  var DEFAULT_LOG_CONFIGURATION = {
    enabled: true,
    level: 0
  };
  function noop() {
  }
  var cache = {};
  var ONCE = { once: true };
  var Log = class {
    constructor({ id } = { id: "" }) {
      this.VERSION = VERSION2;
      this._startTs = getHiResTimestamp();
      this._deltaTs = getHiResTimestamp();
      this.userData = {};
      this.LOG_THROTTLE_TIMEOUT = 0;
      this.id = id;
      this.userData = {};
      this._storage = new LocalStorage(`__probe-${this.id}__`, DEFAULT_LOG_CONFIGURATION);
      this.timeStamp(`${this.id} started`);
      autobind(this);
      Object.seal(this);
    }
    set level(newLevel) {
      this.setLevel(newLevel);
    }
    get level() {
      return this.getLevel();
    }
    isEnabled() {
      return this._storage.config.enabled;
    }
    getLevel() {
      return this._storage.config.level;
    }
    /** @return milliseconds, with fractions */
    getTotal() {
      return Number((getHiResTimestamp() - this._startTs).toPrecision(10));
    }
    /** @return milliseconds, with fractions */
    getDelta() {
      return Number((getHiResTimestamp() - this._deltaTs).toPrecision(10));
    }
    /** @deprecated use logLevel */
    set priority(newPriority) {
      this.level = newPriority;
    }
    /** @deprecated use logLevel */
    get priority() {
      return this.level;
    }
    /** @deprecated use logLevel */
    getPriority() {
      return this.level;
    }
    // Configure
    enable(enabled = true) {
      this._storage.setConfiguration({ enabled });
      return this;
    }
    setLevel(level) {
      this._storage.setConfiguration({ level });
      return this;
    }
    /** return the current status of the setting */
    get(setting) {
      return this._storage.config[setting];
    }
    // update the status of the setting
    set(setting, value) {
      this._storage.setConfiguration({ [setting]: value });
    }
    /** Logs the current settings as a table */
    settings() {
      if (console.table) {
        console.table(this._storage.config);
      } else {
        console.log(this._storage.config);
      }
    }
    // Unconditional logging
    assert(condition, message) {
      if (!condition) {
        throw new Error(message || "Assertion failed");
      }
    }
    warn(message) {
      return this._getLogFunction(0, message, originalConsole.warn, arguments, ONCE);
    }
    error(message) {
      return this._getLogFunction(0, message, originalConsole.error, arguments);
    }
    /** Print a deprecation warning */
    deprecated(oldUsage, newUsage) {
      return this.warn(`\`${oldUsage}\` is deprecated and will be removed in a later version. Use \`${newUsage}\` instead`);
    }
    /** Print a removal warning */
    removed(oldUsage, newUsage) {
      return this.error(`\`${oldUsage}\` has been removed. Use \`${newUsage}\` instead`);
    }
    probe(logLevel, message) {
      return this._getLogFunction(logLevel, message, originalConsole.log, arguments, {
        time: true,
        once: true
      });
    }
    log(logLevel, message) {
      return this._getLogFunction(logLevel, message, originalConsole.debug, arguments);
    }
    info(logLevel, message) {
      return this._getLogFunction(logLevel, message, console.info, arguments);
    }
    once(logLevel, message) {
      return this._getLogFunction(logLevel, message, originalConsole.debug || originalConsole.info, arguments, ONCE);
    }
    /** Logs an object as a table */
    table(logLevel, table, columns) {
      if (table) {
        return this._getLogFunction(logLevel, table, console.table || noop, columns && [columns], {
          tag: getTableHeader(table)
        });
      }
      return noop;
    }
    time(logLevel, message) {
      return this._getLogFunction(logLevel, message, console.time ? console.time : console.info);
    }
    timeEnd(logLevel, message) {
      return this._getLogFunction(logLevel, message, console.timeEnd ? console.timeEnd : console.info);
    }
    timeStamp(logLevel, message) {
      return this._getLogFunction(logLevel, message, console.timeStamp || noop);
    }
    group(logLevel, message, opts = { collapsed: false }) {
      const options = normalizeArguments({ logLevel, message, opts });
      const { collapsed } = opts;
      options.method = (collapsed ? console.groupCollapsed : console.group) || console.info;
      return this._getLogFunction(options);
    }
    groupCollapsed(logLevel, message, opts = {}) {
      return this.group(logLevel, message, Object.assign({}, opts, { collapsed: true }));
    }
    groupEnd(logLevel) {
      return this._getLogFunction(logLevel, "", console.groupEnd || noop);
    }
    // EXPERIMENTAL
    withGroup(logLevel, message, func) {
      this.group(logLevel, message)();
      try {
        func();
      } finally {
        this.groupEnd(logLevel)();
      }
    }
    trace() {
      if (console.trace) {
        console.trace();
      }
    }
    // PRIVATE METHODS
    /** Deduces log level from a variety of arguments */
    _shouldLog(logLevel) {
      return this.isEnabled() && this.getLevel() >= normalizeLogLevel(logLevel);
    }
    _getLogFunction(logLevel, message, method, args, opts) {
      if (this._shouldLog(logLevel)) {
        opts = normalizeArguments({ logLevel, message, args, opts });
        method = method || opts.method;
        assert2(method);
        opts.total = this.getTotal();
        opts.delta = this.getDelta();
        this._deltaTs = getHiResTimestamp();
        const tag = opts.tag || opts.message;
        if (opts.once && tag) {
          if (!cache[tag]) {
            cache[tag] = getHiResTimestamp();
          } else {
            return noop;
          }
        }
        message = decorateMessage(this.id, opts.message, opts);
        return method.bind(console, message, ...opts.args);
      }
      return noop;
    }
  };
  Log.VERSION = VERSION2;
  function normalizeLogLevel(logLevel) {
    if (!logLevel) {
      return 0;
    }
    let resolvedLevel;
    switch (typeof logLevel) {
      case "number":
        resolvedLevel = logLevel;
        break;
      case "object":
        resolvedLevel = logLevel.logLevel || logLevel.priority || 0;
        break;
      default:
        return 0;
    }
    assert2(Number.isFinite(resolvedLevel) && resolvedLevel >= 0);
    return resolvedLevel;
  }
  function normalizeArguments(opts) {
    const { logLevel, message } = opts;
    opts.logLevel = normalizeLogLevel(logLevel);
    const args = opts.args ? Array.from(opts.args) : [];
    while (args.length && args.shift() !== message) {
    }
    switch (typeof logLevel) {
      case "string":
      case "function":
        if (message !== void 0) {
          args.unshift(message);
        }
        opts.message = logLevel;
        break;
      case "object":
        Object.assign(opts, logLevel);
        break;
      default:
    }
    if (typeof opts.message === "function") {
      opts.message = opts.message();
    }
    const messageType = typeof opts.message;
    assert2(messageType === "string" || messageType === "object");
    return Object.assign(opts, { args }, opts.opts);
  }
  function decorateMessage(id, message, opts) {
    if (typeof message === "string") {
      const time = opts.time ? leftPad(formatTime(opts.total)) : "";
      message = opts.time ? `${id}: ${time}  ${message}` : `${id}: ${message}`;
      message = addColor(message, opts.color, opts.background);
    }
    return message;
  }
  function getTableHeader(table) {
    for (const key in table) {
      for (const title in table[key]) {
        return title || "untitled";
      }
    }
    return "empty";
  }

  // ../../node_modules/@probe.gl/log/dist/init.js
  globalThis.probe = {};

  // ../../node_modules/@probe.gl/log/dist/index.js
  var dist_default = new Log({ id: "@probe.gl/log" });

  // ../loader-utils/src/lib/log-utils/log.ts
  var VERSION3 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";
  var version = VERSION3[0] >= "0" && VERSION3[0] <= "9" ? `v${VERSION3}` : "";
  function createLog() {
    const log2 = new Log({ id: "loaders.gl" });
    globalThis.loaders = globalThis.loaders || {};
    globalThis.loaders.log = log2;
    globalThis.loaders.version = version;
    globalThis.probe = globalThis.probe || {};
    globalThis.probe.loaders = log2;
    return log2;
  }
  var log = createLog();

  // ../../node_modules/@probe.gl/stats/dist/utils/hi-res-timestamp.js
  function getHiResTimestamp2() {
    let timestamp;
    if (typeof window !== "undefined" && window.performance) {
      timestamp = window.performance.now();
    } else if (typeof process !== "undefined" && process.hrtime) {
      const timeParts = process.hrtime();
      timestamp = timeParts[0] * 1e3 + timeParts[1] / 1e6;
    } else {
      timestamp = Date.now();
    }
    return timestamp;
  }

  // ../../node_modules/@probe.gl/stats/dist/lib/stat.js
  var Stat = class {
    constructor(name, type) {
      this.sampleSize = 1;
      this.time = 0;
      this.count = 0;
      this.samples = 0;
      this.lastTiming = 0;
      this.lastSampleTime = 0;
      this.lastSampleCount = 0;
      this._count = 0;
      this._time = 0;
      this._samples = 0;
      this._startTime = 0;
      this._timerPending = false;
      this.name = name;
      this.type = type;
      this.reset();
    }
    reset() {
      this.time = 0;
      this.count = 0;
      this.samples = 0;
      this.lastTiming = 0;
      this.lastSampleTime = 0;
      this.lastSampleCount = 0;
      this._count = 0;
      this._time = 0;
      this._samples = 0;
      this._startTime = 0;
      this._timerPending = false;
      return this;
    }
    setSampleSize(samples) {
      this.sampleSize = samples;
      return this;
    }
    /** Call to increment count (+1) */
    incrementCount() {
      this.addCount(1);
      return this;
    }
    /** Call to decrement count (-1) */
    decrementCount() {
      this.subtractCount(1);
      return this;
    }
    /** Increase count */
    addCount(value) {
      this._count += value;
      this._samples++;
      this._checkSampling();
      return this;
    }
    /** Decrease count */
    subtractCount(value) {
      this._count -= value;
      this._samples++;
      this._checkSampling();
      return this;
    }
    /** Add an arbitrary timing and bump the count */
    addTime(time) {
      this._time += time;
      this.lastTiming = time;
      this._samples++;
      this._checkSampling();
      return this;
    }
    /** Start a timer */
    timeStart() {
      this._startTime = getHiResTimestamp2();
      this._timerPending = true;
      return this;
    }
    /** End a timer. Adds to time and bumps the timing count. */
    timeEnd() {
      if (!this._timerPending) {
        return this;
      }
      this.addTime(getHiResTimestamp2() - this._startTime);
      this._timerPending = false;
      this._checkSampling();
      return this;
    }
    getSampleAverageCount() {
      return this.sampleSize > 0 ? this.lastSampleCount / this.sampleSize : 0;
    }
    /** Calculate average time / count for the previous window */
    getSampleAverageTime() {
      return this.sampleSize > 0 ? this.lastSampleTime / this.sampleSize : 0;
    }
    /** Calculate counts per second for the previous window */
    getSampleHz() {
      return this.lastSampleTime > 0 ? this.sampleSize / (this.lastSampleTime / 1e3) : 0;
    }
    getAverageCount() {
      return this.samples > 0 ? this.count / this.samples : 0;
    }
    /** Calculate average time / count */
    getAverageTime() {
      return this.samples > 0 ? this.time / this.samples : 0;
    }
    /** Calculate counts per second */
    getHz() {
      return this.time > 0 ? this.samples / (this.time / 1e3) : 0;
    }
    _checkSampling() {
      if (this._samples === this.sampleSize) {
        this.lastSampleTime = this._time;
        this.lastSampleCount = this._count;
        this.count += this._count;
        this.time += this._time;
        this.samples += this._samples;
        this._time = 0;
        this._count = 0;
        this._samples = 0;
      }
    }
  };

  // ../../node_modules/@probe.gl/stats/dist/lib/stats.js
  var Stats = class {
    constructor(options) {
      this.stats = {};
      this.id = options.id;
      this.stats = {};
      this._initializeStats(options.stats);
      Object.seal(this);
    }
    /** Acquire a stat. Create if it doesn't exist. */
    get(name, type = "count") {
      return this._getOrCreate({ name, type });
    }
    get size() {
      return Object.keys(this.stats).length;
    }
    /** Reset all stats */
    reset() {
      for (const stat of Object.values(this.stats)) {
        stat.reset();
      }
      return this;
    }
    forEach(fn) {
      for (const stat of Object.values(this.stats)) {
        fn(stat);
      }
    }
    getTable() {
      const table = {};
      this.forEach((stat) => {
        table[stat.name] = {
          time: stat.time || 0,
          count: stat.count || 0,
          average: stat.getAverageTime() || 0,
          hz: stat.getHz() || 0
        };
      });
      return table;
    }
    _initializeStats(stats = []) {
      stats.forEach((stat) => this._getOrCreate(stat));
    }
    _getOrCreate(stat) {
      const { name, type } = stat;
      let result = this.stats[name];
      if (!result) {
        if (stat instanceof Stat) {
          result = stat;
        } else {
          result = new Stat(name, type);
        }
        this.stats[name] = result;
      }
      return result;
    }
  };

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

  // ../loader-utils/src/lib/sources/data-source.ts
  var DataSource = class {
    /** A resolved fetch function extracted from loadOptions prop */
    fetch;
    /** The actual load options, if calling a loaders.gl loader */
    loadOptions;
    _needsRefresh = true;
    props;
    constructor(props) {
      this.props = { ...props };
      this.loadOptions = { ...props.loadOptions };
      this.fetch = getFetchFunction(this.loadOptions);
    }
    setProps(props) {
      this.props = Object.assign(this.props, props);
      this.setNeedsRefresh();
    }
    /** Mark this data source as needing a refresh (redraw) */
    setNeedsRefresh() {
      this._needsRefresh = true;
    }
    /**
     * Does this data source need refreshing?
     * @note The specifics of the refresh mechanism depends on type of data source
     */
    getNeedsRefresh(clear = true) {
      const needsRefresh = this._needsRefresh;
      if (clear) {
        this._needsRefresh = false;
      }
      return needsRefresh;
    }
  };
  function getFetchFunction(options) {
    const fetchFunction = options?.fetch;
    if (fetchFunction && typeof fetchFunction === "function") {
      return (url, fetchOptions2) => fetchFunction(url, fetchOptions2);
    }
    const fetchOptions = options?.fetch;
    if (fetchOptions && typeof fetchOptions !== "function") {
      return (url) => fetch(url, fetchOptions);
    }
    return (url) => fetch(url);
  }

  // src/lib/parse-mvt.ts
  var import_pbf = __toESM(require_pbf(), 1);

  // src/lib/utils/geometry-utils.ts
  function signedArea(ring) {
    let sum = 0;
    for (let i = 0, j = ring.length - 1, p1, p2; i < ring.length; j = i++) {
      p1 = ring[i];
      p2 = ring[j];
      sum += (p2[0] - p1[0]) * (p1[1] + p2[1]);
    }
    return sum;
  }
  function convertToLocalCoordinates(coordinates, extent) {
    if (Array.isArray(coordinates[0])) {
      for (const subcoords of coordinates) {
        convertToLocalCoordinates(subcoords, extent);
      }
      return;
    }
    const p = coordinates;
    p[0] /= extent;
    p[1] /= extent;
  }
  function convertToLocalCoordinatesFlat(data, extent) {
    for (let i = 0; i < data.length; ++i) {
      data[i] /= extent;
    }
  }
  function projectToLngLat(line, tileIndex, extent) {
    if (typeof line[0][0] !== "number") {
      for (const point of line) {
        projectToLngLat(point, tileIndex, extent);
      }
      return;
    }
    const size = extent * Math.pow(2, tileIndex.z);
    const x0 = extent * tileIndex.x;
    const y0 = extent * tileIndex.y;
    for (let j = 0; j < line.length; j++) {
      const p = line[j];
      p[0] = (p[0] + x0) * 360 / size - 180;
      const y2 = 180 - (p[1] + y0) * 360 / size;
      p[1] = 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
    }
  }
  function projectToLngLatFlat(data, tileIndex, extent) {
    const { x, y, z } = tileIndex;
    const size = extent * Math.pow(2, z);
    const x0 = extent * x;
    const y0 = extent * y;
    for (let j = 0, jl = data.length; j < jl; j += 2) {
      data[j] = (data[j] + x0) * 360 / size - 180;
      const y2 = 180 - (data[j + 1] + y0) * 360 / size;
      data[j + 1] = 360 / Math.PI * Math.atan(Math.exp(y2 * Math.PI / 180)) - 90;
    }
  }
  function classifyRings(rings) {
    const len = rings.length;
    if (len <= 1)
      return [rings];
    const polygons = [];
    let polygon;
    let ccw;
    for (let i = 0; i < len; i++) {
      const area2 = signedArea(rings[i]);
      if (area2 === 0)
        continue;
      if (ccw === void 0)
        ccw = area2 < 0;
      if (ccw === area2 < 0) {
        if (polygon)
          polygons.push(polygon);
        polygon = [rings[i]];
      } else if (polygon)
        polygon.push(rings[i]);
    }
    if (polygon)
      polygons.push(polygon);
    return polygons;
  }
  function classifyRingsFlat(geom) {
    const len = geom.indices.length;
    const type = "Polygon";
    if (len <= 1) {
      return {
        type,
        data: geom.data,
        areas: [[getPolygonSignedArea(geom.data)]],
        indices: [geom.indices]
      };
    }
    const areas = [];
    const polygons = [];
    let ringAreas = [];
    let polygon = [];
    let ccw;
    let offset = 0;
    for (let endIndex, i = 0, startIndex; i < len; i++) {
      startIndex = geom.indices[i] - offset;
      endIndex = geom.indices[i + 1] - offset || geom.data.length;
      const shape = geom.data.slice(startIndex, endIndex);
      const area2 = getPolygonSignedArea(shape);
      if (area2 === 0) {
        const before = geom.data.slice(0, startIndex);
        const after = geom.data.slice(endIndex);
        geom.data = before.concat(after);
        offset += endIndex - startIndex;
        continue;
      }
      if (ccw === void 0)
        ccw = area2 < 0;
      if (ccw === area2 < 0) {
        if (polygon.length) {
          areas.push(ringAreas);
          polygons.push(polygon);
        }
        polygon = [startIndex];
        ringAreas = [area2];
      } else {
        ringAreas.push(area2);
        polygon.push(startIndex);
      }
    }
    if (ringAreas)
      areas.push(ringAreas);
    if (polygon.length)
      polygons.push(polygon);
    return { type, areas, indices: polygons, data: geom.data };
  }

  // src/lib/vector-tile/vector-tile-feature.ts
  var VectorTileFeature = class {
    properties;
    extent;
    type;
    id;
    _pbf;
    _geometry;
    _keys;
    _values;
    _geometryInfo;
    // eslint-disable-next-line max-params
    constructor(pbf, end, extent, keys, values, geometryInfo) {
      this.properties = {};
      this.extent = extent;
      this.type = 0;
      this.id = null;
      this._pbf = pbf;
      this._geometry = -1;
      this._keys = keys;
      this._values = values;
      this._geometryInfo = geometryInfo;
      pbf.readFields(readFeature, this, end);
    }
    toGeoJSONFeature(coordinates, tileIndex) {
      const coords = this.loadGeometry();
      switch (coordinates) {
        case "wgs84":
          return _toGeoJSONFeature(
            this,
            coords,
            (line) => projectToLngLat(line, tileIndex, this.extent)
          );
        default:
          return _toGeoJSONFeature(this, coords, convertToLocalCoordinates);
      }
    }
    /**
     *
     * @param options
     * @returns
     */
    toBinaryFeature(coordinates, tileIndex) {
      const geom = this.loadFlatGeometry();
      switch (coordinates) {
        case "wgs84":
          return this._toBinaryCoordinates(
            geom,
            (coords) => projectToLngLatFlat(coords, tileIndex, this.extent)
          );
        default:
          return this._toBinaryCoordinates(geom, convertToLocalCoordinatesFlat);
      }
    }
    /** Read a bounding box from the feature */
    // eslint-disable-next-line max-statements
    bbox() {
      const pbf = this._pbf;
      pbf.pos = this._geometry;
      const end = pbf.readVarint() + pbf.pos;
      let cmd = 1;
      let length = 0;
      let x = 0;
      let y = 0;
      let x1 = Infinity;
      let x2 = -Infinity;
      let y1 = Infinity;
      let y2 = -Infinity;
      while (pbf.pos < end) {
        if (length <= 0) {
          const cmdLen = pbf.readVarint();
          cmd = cmdLen & 7;
          length = cmdLen >> 3;
        }
        length--;
        if (cmd === 1 || cmd === 2) {
          x += pbf.readSVarint();
          y += pbf.readSVarint();
          if (x < x1)
            x1 = x;
          if (x > x2)
            x2 = x;
          if (y < y1)
            y1 = y;
          if (y > y2)
            y2 = y;
        } else if (cmd !== 7) {
          throw new Error(`unknown command ${cmd}`);
        }
      }
      return [x1, y1, x2, y2];
    }
    // BINARY HELPERS
    /**
     *
     * @param transform
     * @returns result
     */
    _toBinaryCoordinates(geom, transform) {
      let geometry;
      transform(geom.data, this.extent);
      const coordLength = 2;
      switch (this.type) {
        case 1:
          this._geometryInfo.pointFeaturesCount++;
          this._geometryInfo.pointPositionsCount += geom.indices.length;
          geometry = { type: "Point", ...geom };
          break;
        case 2:
          this._geometryInfo.lineFeaturesCount++;
          this._geometryInfo.linePathsCount += geom.indices.length;
          this._geometryInfo.linePositionsCount += geom.data.length / coordLength;
          geometry = { type: "LineString", ...geom };
          break;
        case 3:
          geometry = classifyRingsFlat(geom);
          this._geometryInfo.polygonFeaturesCount++;
          this._geometryInfo.polygonObjectsCount += geometry.indices.length;
          for (const indices of geometry.indices) {
            this._geometryInfo.polygonRingsCount += indices.length;
          }
          this._geometryInfo.polygonPositionsCount += geometry.data.length / coordLength;
          break;
        default:
          throw new Error(`Invalid geometry type: ${this.type}`);
      }
      const result = { type: "Feature", geometry, properties: this.properties };
      if (this.id !== null) {
        result.id = this.id;
      }
      return result;
    }
    // GEOJSON HELPER
    // eslint-disable-next-line complexity, max-statements
    loadGeometry() {
      const pbf = this._pbf;
      pbf.pos = this._geometry;
      const end = pbf.readVarint() + pbf.pos;
      let cmd = 1;
      let length = 0;
      let x = 0;
      let y = 0;
      const lines = [];
      let line;
      while (pbf.pos < end) {
        if (length <= 0) {
          const cmdLen = pbf.readVarint();
          cmd = cmdLen & 7;
          length = cmdLen >> 3;
        }
        length--;
        switch (cmd) {
          case 1:
          case 2:
            x += pbf.readSVarint();
            y += pbf.readSVarint();
            if (cmd === 1) {
              if (line)
                lines.push(line);
              line = [];
            }
            if (line)
              line.push([x, y]);
            break;
          case 7:
            if (line) {
              line.push(line[0].slice());
            }
            break;
          default:
            throw new Error(`unknown command ${cmd}`);
        }
      }
      if (line)
        lines.push(line);
      return lines;
    }
    /**
     * Expands the protobuf data to an intermediate Flat GeoJSON
     * data format, which maps closely to the binary data buffers.
     * It is similar to GeoJSON, but rather than storing the coordinates
     * in multidimensional arrays, we have a 1D `data` with all the
     * coordinates, and then index into this using the `indices`
     * parameter, e.g.
     *
     * geometry: {
     *   type: 'Point', data: [1,2], indices: [0]
     * }
     * geometry: {
     *   type: 'LineString', data: [1,2,3,4,...], indices: [0]
     * }
     * geometry: {
     *   type: 'Polygon', data: [1,2,3,4,...], indices: [[0, 2]]
     * }
     * Thus the indices member lets us look up the relevant range
     * from the data array.
     * The Multi* versions of the above types share the same data
     * structure, just with multiple elements in the indices array
     */
    // eslint-disable-next-line complexity, max-statements
    loadFlatGeometry() {
      const pbf = this._pbf;
      pbf.pos = this._geometry;
      const endPos = pbf.readVarint() + pbf.pos;
      let cmd = 1;
      let cmdLen;
      let length = 0;
      let x = 0;
      let y = 0;
      let i = 0;
      const indices = [];
      const data = [];
      while (pbf.pos < endPos) {
        if (length <= 0) {
          cmdLen = pbf.readVarint();
          cmd = cmdLen & 7;
          length = cmdLen >> 3;
        }
        length--;
        if (cmd === 1 || cmd === 2) {
          x += pbf.readSVarint();
          y += pbf.readSVarint();
          if (cmd === 1) {
            indices.push(i);
          }
          data.push(x, y);
          i += 2;
        } else if (cmd === 7) {
          if (i > 0) {
            const start = indices[indices.length - 1];
            data.push(data[start], data[start + 1]);
            i += 2;
          }
        } else {
          throw new Error(`unknown command ${cmd}`);
        }
      }
      return { data, indices };
    }
  };
  __publicField(VectorTileFeature, "types", ["Unknown", "Point", "LineString", "Polygon"]);
  function _toGeoJSONFeature(vtFeature, coords, transform) {
    let type = VectorTileFeature.types[vtFeature.type];
    let i;
    let j;
    let coordinates;
    switch (vtFeature.type) {
      case 1:
        const points = [];
        for (i = 0; i < coords.length; i++) {
          points[i] = coords[i][0];
        }
        coordinates = points;
        transform(coordinates, vtFeature.extent);
        break;
      case 2:
        coordinates = coords;
        for (i = 0; i < coordinates.length; i++) {
          transform(coordinates[i], vtFeature.extent);
        }
        break;
      case 3:
        coordinates = classifyRings(coords);
        for (i = 0; i < coordinates.length; i++) {
          for (j = 0; j < coordinates[i].length; j++) {
            transform(coordinates[i][j], vtFeature.extent);
          }
        }
        break;
      default:
        throw new Error("illegal vector tile type");
    }
    if (coordinates.length === 1) {
      coordinates = coordinates[0];
    } else {
      type = `Multi${type}`;
    }
    const result = {
      type: "Feature",
      geometry: {
        type,
        coordinates
      },
      properties: vtFeature.properties
    };
    if (vtFeature.id !== null) {
      result.properties ||= {};
      result.properties.id = vtFeature.id;
    }
    return result;
  }
  function readFeature(tag, feature, pbf) {
    if (feature && pbf) {
      if (tag === 1)
        feature.id = pbf.readVarint();
      else if (tag === 2)
        readTag(pbf, feature);
      else if (tag === 3)
        feature.type = pbf.readVarint();
      else if (tag === 4)
        feature._geometry = pbf.pos;
    }
  }
  function readTag(pbf, feature) {
    const end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) {
      const key = feature._keys[pbf.readVarint()];
      const value = feature._values[pbf.readVarint()];
      feature.properties[key] = value;
    }
  }

  // src/lib/vector-tile/vector-tile-layer.ts
  var VectorTileLayer = class {
    version;
    name;
    extent;
    length;
    _pbf;
    _keys;
    _values;
    _features;
    constructor(pbf, end) {
      this.version = 1;
      this.name = "";
      this.extent = 4096;
      this.length = 0;
      this._pbf = pbf;
      this._keys = [];
      this._values = [];
      this._features = [];
      pbf.readFields(readLayer, this, end);
      this.length = this._features.length;
    }
    /**
     * return feature `i` from this layer as a `VectorTileFeature`
     * @param index
     * @returns feature
     */
    getGeoJSONFeature(i) {
      if (i < 0 || i >= this._features.length) {
        throw new Error("feature index out of bounds");
      }
      this._pbf.pos = this._features[i];
      const end = this._pbf.readVarint() + this._pbf.pos;
      return new VectorTileFeature(this._pbf, end, this.extent, this._keys, this._values);
    }
    /**
     * return binary feature `i` from this layer as a `VectorTileFeature`
     *
     * @param index
     * @param geometryInfo
     * @returns binary feature
     */
    getBinaryFeature(i, geometryInfo) {
      if (i < 0 || i >= this._features.length) {
        throw new Error("feature index out of bounds");
      }
      this._pbf.pos = this._features[i];
      const end = this._pbf.readVarint() + this._pbf.pos;
      return new VectorTileFeature(
        this._pbf,
        end,
        this.extent,
        this._keys,
        this._values,
        geometryInfo
      );
    }
  };
  function readLayer(tag, layer, pbf) {
    if (layer && pbf) {
      if (tag === 15)
        layer.version = pbf.readVarint();
      else if (tag === 1)
        layer.name = pbf.readString();
      else if (tag === 5)
        layer.extent = pbf.readVarint();
      else if (tag === 2)
        layer._features.push(pbf.pos);
      else if (tag === 3)
        layer._keys.push(pbf.readString());
      else if (tag === 4)
        layer._values.push(readValueMessage(pbf));
    }
  }
  function readValueMessage(pbf) {
    let value = null;
    const end = pbf.readVarint() + pbf.pos;
    while (pbf.pos < end) {
      const tag = pbf.readVarint() >> 3;
      value = tag === 1 ? pbf.readString() : tag === 2 ? pbf.readFloat() : tag === 3 ? pbf.readDouble() : tag === 4 ? pbf.readVarint64() : tag === 5 ? pbf.readVarint() : tag === 6 ? pbf.readSVarint() : tag === 7 ? pbf.readBoolean() : null;
    }
    return value;
  }

  // src/lib/vector-tile/vector-tile.ts
  var VectorTile = class {
    layers;
    constructor(pbf, end) {
      this.layers = pbf.readFields(readTile, {}, end);
    }
  };
  function readTile(tag, layers, pbf) {
    if (tag === 3) {
      if (pbf) {
        const layer = new VectorTileLayer(pbf, pbf.readVarint() + pbf.pos);
        if (layer.length && layers) {
          layers[layer.name] = layer;
        }
      }
    }
  }

  // src/lib/parse-mvt.ts
  function parseMVT(arrayBuffer, options) {
    const mvtOptions = checkOptions(options);
    const shape = options?.gis?.format || options?.mvt?.shape || options?.shape;
    switch (shape) {
      case "columnar-table":
        return { shape: "columnar-table", data: parseToBinary(arrayBuffer, mvtOptions) };
      case "geojson-table": {
        const table = {
          shape: "geojson-table",
          type: "FeatureCollection",
          features: parseToGeojsonFeatures(arrayBuffer, mvtOptions)
        };
        return table;
      }
      case "geojson":
        return parseToGeojsonFeatures(arrayBuffer, mvtOptions);
      case "binary-geometry":
        return parseToBinary(arrayBuffer, mvtOptions);
      case "binary":
        return parseToBinary(arrayBuffer, mvtOptions);
      default:
        throw new Error(shape || "undefined shape");
    }
  }
  function parseToBinary(arrayBuffer, options) {
    const [flatGeoJsonFeatures, geometryInfo] = parseToFlatGeoJson(arrayBuffer, options);
    const binaryData = flatGeojsonToBinary(flatGeoJsonFeatures, geometryInfo);
    binaryData.byteLength = arrayBuffer.byteLength;
    return binaryData;
  }
  function parseToFlatGeoJson(arrayBuffer, options) {
    const features2 = [];
    const geometryInfo = {
      coordLength: 2,
      pointPositionsCount: 0,
      pointFeaturesCount: 0,
      linePositionsCount: 0,
      linePathsCount: 0,
      lineFeaturesCount: 0,
      polygonPositionsCount: 0,
      polygonObjectsCount: 0,
      polygonRingsCount: 0,
      polygonFeaturesCount: 0
    };
    if (arrayBuffer.byteLength <= 0) {
      return [features2, geometryInfo];
    }
    const tile = new VectorTile(new import_pbf.default(arrayBuffer));
    const selectedLayers = options && Array.isArray(options.layers) ? options.layers : Object.keys(tile.layers);
    selectedLayers.forEach((layerName) => {
      const vectorTileLayer = tile.layers[layerName];
      if (!vectorTileLayer) {
        return;
      }
      for (let i = 0; i < vectorTileLayer.length; i++) {
        const vectorTileFeature = vectorTileLayer.getBinaryFeature(i, geometryInfo);
        const decodedFeature = getDecodedFeatureBinary(vectorTileFeature, options, layerName);
        features2.push(decodedFeature);
      }
    });
    return [features2, geometryInfo];
  }
  function parseToGeojsonFeatures(arrayBuffer, options) {
    if (arrayBuffer.byteLength <= 0) {
      return [];
    }
    const features2 = [];
    const tile = new VectorTile(new import_pbf.default(arrayBuffer));
    const selectedLayers = Array.isArray(options.layers) ? options.layers : Object.keys(tile.layers);
    selectedLayers.forEach((layerName) => {
      const vectorTileLayer = tile.layers[layerName];
      if (!vectorTileLayer) {
        return;
      }
      for (let i = 0; i < vectorTileLayer.length; i++) {
        const vectorTileFeature = vectorTileLayer.getGeoJSONFeature(i);
        const decodedFeature = getDecodedFeature(vectorTileFeature, options, layerName);
        features2.push(decodedFeature);
      }
    });
    return features2;
  }
  function checkOptions(options) {
    if (!options?.mvt) {
      throw new Error("mvt options required");
    }
    if (options.mvt?.coordinates === "wgs84" && !options.mvt.tileIndex) {
      throw new Error("MVT Loader: WGS84 coordinates need tileIndex property");
    }
    if (options.gis) {
      log.warn('MVTLoader: "options.gis" is deprecated, use "options.mvt.shape" instead')();
    }
    return options.mvt;
  }
  function getDecodedFeature(feature, options, layerName) {
    const decodedFeature = feature.toGeoJSONFeature(
      options.coordinates || "local",
      options.tileIndex
    );
    if (options.layerProperty) {
      decodedFeature.properties ||= {};
      decodedFeature.properties[options.layerProperty] = layerName;
    }
    return decodedFeature;
  }
  function getDecodedFeatureBinary(feature, options, layerName) {
    const decodedFeature = feature.toBinaryFeature(options.coordinates || "local", options.tileIndex);
    if (options.layerProperty && decodedFeature.properties) {
      decodedFeature.properties[options.layerProperty] = layerName;
    }
    return decodedFeature;
  }

  // src/mvt-loader.ts
  var VERSION4 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";
  var MVTWorkerLoader = {
    dataType: null,
    batchType: null,
    name: "Mapbox Vector Tile",
    id: "mvt",
    module: "mvt",
    version: VERSION4,
    // Note: ArcGIS uses '.pbf' extension and 'application/octet-stream'
    extensions: ["mvt", "pbf"],
    mimeTypes: [
      // https://www.iana.org/assignments/media-types/application/vnd.mapbox-vector-tile
      "application/vnd.mapbox-vector-tile",
      "application/x-protobuf"
      // 'application/octet-stream'
    ],
    worker: true,
    category: "geometry",
    options: {
      mvt: {
        shape: "geojson",
        coordinates: "local",
        layerProperty: "layerName",
        layers: void 0,
        tileIndex: void 0
      }
    }
  };
  var MVTLoader = {
    ...MVTWorkerLoader,
    parse: async (arrayBuffer, options) => parseMVT(arrayBuffer, options),
    parseSync: parseMVT,
    binary: true
  };

  // ../images/src/lib/utils/version.ts
  var VERSION5 = typeof __VERSION__ !== "undefined" ? __VERSION__ : "latest";

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
    version: VERSION5,
    mimeTypes: MIME_TYPES,
    extensions: EXTENSIONS,
    parse: parseImage,
    // TODO: byteOffset, byteLength;
    tests: [(arrayBuffer) => Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)))],
    options: DEFAULT_IMAGE_LOADER_OPTIONS
  };

  // src/mvt-source.ts
  var MVTSource = {
    name: "MVT",
    id: "mvt",
    module: "mvt",
    version: "0.0.0",
    extensions: ["mvt"],
    mimeTypes: ["application/octet-stream"],
    options: {
      mvt: {
        // TODO - add options here
      }
    },
    type: "mvt",
    fromUrl: true,
    fromBlob: false,
    testURL: (url) => true,
    createDataSource(url, props) {
      return new MVTTileSource(url, props);
    }
  };
  var MVTTileSource = class extends DataSource {
    props;
    url;
    metadataUrl = null;
    data;
    schema = "tms";
    metadata;
    extension;
    mimeType = null;
    constructor(url, props) {
      super(props);
      this.props = props;
      this.url = resolvePath(url);
      this.metadataUrl = props.mvt?.metadataUrl || `${this.url}/tilejson.json`;
      this.extension = props.mvt?.extension || ".png";
      this.data = this.url;
      this.getTileData = this.getTileData.bind(this);
      this.metadata = this.getMetadata();
      if (isURLTemplate(this.url)) {
        this.schema = "template";
      }
    }
    // @ts-ignore - Metadata type misalignment
    async getMetadata() {
      if (!this.metadataUrl) {
        return null;
      }
      let response;
      try {
        response = await this.fetch(this.metadataUrl);
      } catch (error) {
        console.error(error.message);
        return null;
      }
      if (!response.ok) {
        console.error(response.statusText);
        return null;
      }
      const tileJSON = await response.text();
      const metadata = TileJSONLoader.parseTextSync?.(tileJSON) || null;
      return metadata;
    }
    getTileMIMEType() {
      return this.mimeType;
    }
    async getTile(parameters) {
      const { x, y, z } = parameters;
      const tileUrl = this.getTileURL(x, y, z);
      const response = await this.fetch(tileUrl);
      if (!response.ok) {
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      return arrayBuffer;
    }
    // Tile Source interface implementation: deck.gl compatible API
    // TODO - currently only handles image tiles, not vector tiles
    async getTileData(parameters) {
      const { x, y, z } = parameters.index;
      const arrayBuffer = await this.getTile({ x, y, z, layers: [] });
      if (arrayBuffer === null) {
        return null;
      }
      const imageMetadata = getBinaryImageMetadata(arrayBuffer);
      this.mimeType = this.mimeType || imageMetadata?.mimeType || "application/vnd.mapbox-vector-tile";
      switch (this.mimeType) {
        case "application/vnd.mapbox-vector-tile":
          return await this._parseVectorTile(arrayBuffer, { x, y, z, layers: [] });
        default:
          return await this._parseImageTile(arrayBuffer);
      }
    }
    // ImageTileSource interface implementation
    async getImageTile(tileParams) {
      const arrayBuffer = await this.getTile(tileParams);
      return arrayBuffer ? this._parseImageTile(arrayBuffer) : null;
    }
    async _parseImageTile(arrayBuffer) {
      return await ImageLoader.parse(arrayBuffer, this.loadOptions);
    }
    // VectorTileSource interface implementation
    async getVectorTile(tileParams) {
      const arrayBuffer = await this.getTile(tileParams);
      return arrayBuffer ? this._parseVectorTile(arrayBuffer, tileParams) : null;
    }
    async _parseVectorTile(arrayBuffer, tileParams) {
      const loadOptions = {
        shape: "geojson-table",
        mvt: {
          coordinates: "wgs84",
          tileIndex: { x: tileParams.x, y: tileParams.y, z: tileParams.z },
          ...this.loadOptions?.mvt
        },
        ...this.loadOptions
      };
      return await MVTLoader.parse(arrayBuffer, loadOptions);
    }
    getMetadataUrl() {
      return this.metadataUrl;
    }
    getTileURL(x, y, z) {
      switch (this.schema) {
        case "xyz":
          return `${this.url}/${x}/${y}/${z}${this.extension}`;
        case "tms":
          return `${this.url}/${z}/${x}/${y}${this.extension}`;
        case "template":
          return getURLFromTemplate(this.url, x, y, z, "0");
        default:
          throw new Error(this.schema);
      }
    }
  };
  function isURLTemplate(s) {
    return /(?=.*{z})(?=.*{x})(?=.*({y}|{-y}))|(?=.*{x})(?=.*({y}|{-y})(?=.*{z}))/.test(s);
  }
  var xRegex = new RegExp("{x}", "g");
  var yRegex = new RegExp("{y}", "g");
  var zRegex = new RegExp("{z}", "g");
  function getURLFromTemplate(template, x, y, z, id = "0") {
    if (Array.isArray(template)) {
      const i = stringHash(id) % template.length;
      template = template[i];
    }
    let url = template;
    url = url.replace(xRegex, String(x));
    url = url.replace(yRegex, String(y));
    url = url.replace(zRegex, String(z));
    if (Number.isInteger(y) && Number.isInteger(z)) {
      url = url.replace(/\{-y\}/g, String(Math.pow(2, z) - y - 1));
    }
    return url;
  }
  function stringHash(s) {
    return Math.abs(s.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0) | 0, 0));
  }

  // src/lib/vector-tiler/proto-tile.ts
  function createProtoTile(features2, z, tx, ty, options) {
    const tolerance = z === options.maxZoom ? 0 : options.tolerance / ((1 << z) * options.extent);
    const tile = {
      protoFeatures: [],
      sourceFeatures: null,
      numPoints: 0,
      numSimplified: 0,
      numFeatures: features2.length,
      x: tx,
      y: ty,
      z,
      transformed: false,
      minX: 2,
      minY: 1,
      maxX: -1,
      maxY: 0
    };
    for (const feature of features2) {
      addProtoFeature(tile, feature, tolerance, options);
    }
    return tile;
  }
  function addProtoFeature(tile, feature, tolerance, options) {
    const geometry = feature.geometry;
    const type = feature.type;
    const simplifiedGeometry = [];
    tile.minX = Math.min(tile.minX, feature.minX);
    tile.minY = Math.min(tile.minY, feature.minY);
    tile.maxX = Math.max(tile.maxX, feature.maxX);
    tile.maxY = Math.max(tile.maxY, feature.maxY);
    let simplifiedType;
    switch (type) {
      case "Point":
      case "MultiPoint":
        simplifiedType = 1;
        for (let i = 0; i < geometry.length; i += 3) {
          simplifiedGeometry.push(geometry[i], geometry[i + 1]);
          tile.numPoints++;
          tile.numSimplified++;
        }
        break;
      case "LineString":
        simplifiedType = 2;
        addProtoLine(simplifiedGeometry, geometry, tile, tolerance, false, false);
        break;
      case "MultiLineString":
        simplifiedType = 2;
        for (let i = 0; i < geometry.length; i++) {
          addProtoLine(simplifiedGeometry, geometry[i], tile, tolerance, false, i === 0);
        }
        break;
      case "Polygon":
        simplifiedType = 3;
        for (let i = 0; i < geometry.length; i++) {
          addProtoLine(simplifiedGeometry, geometry[i], tile, tolerance, true, i === 0);
        }
        break;
      case "MultiPolygon":
        simplifiedType = 3;
        for (let k = 0; k < geometry.length; k++) {
          const polygon = geometry[k];
          for (let i = 0; i < polygon.length; i++) {
            addProtoLine(simplifiedGeometry, polygon[i], tile, tolerance, true, i === 0);
          }
        }
        break;
      default:
        throw new Error(`Unknown geometry type: ${type}`);
    }
    if (simplifiedGeometry.length) {
      let tags = feature.tags || null;
      if (type === "LineString" && options.lineMetrics) {
        tags = {};
        for (const key in feature.tags) {
          tags[key] = feature.tags[key];
        }
        tags.mapbox_clip_start = geometry.start / geometry.size;
        tags.mapbox_clip_end = geometry.end / geometry.size;
      }
      const tileFeature = {
        geometry: simplifiedGeometry,
        simplifiedType,
        // @ts-expect-error
        tags
      };
      if (feature.id !== null) {
        tileFeature.id = feature.id;
      }
      tile.protoFeatures.push(tileFeature);
    }
  }
  function addProtoLine(result, geometry, tile, tolerance, isPolygon, isOuter) {
    const sqTolerance = tolerance * tolerance;
    if (tolerance > 0 && geometry.size < (isPolygon ? sqTolerance : tolerance)) {
      tile.numPoints += geometry.length / 3;
      return;
    }
    const ring = [];
    for (let i = 0; i < geometry.length; i += 3) {
      if (tolerance === 0 || geometry[i + 2] > sqTolerance) {
        tile.numSimplified++;
        ring.push(geometry[i], geometry[i + 1]);
      }
      tile.numPoints++;
    }
    if (isPolygon)
      rewind(ring, isOuter);
    result.push(ring);
  }
  function rewind(ring, clockwise) {
    let area2 = 0;
    for (let i = 0, j = ring.length - 2; i < ring.length; j = i, i += 2) {
      area2 += (ring[i] - ring[j]) * (ring[i + 1] + ring[j + 1]);
    }
    if (area2 > 0 === clockwise) {
      for (let i = 0, len = ring.length; i < len / 2; i += 2) {
        const x = ring[i];
        const y = ring[i + 1];
        ring[i] = ring[len - 2 - i];
        ring[i + 1] = ring[len - 1 - i];
        ring[len - 2 - i] = x;
        ring[len - 1 - i] = y;
      }
    }
  }

  // src/lib/vector-tiler/transform-tile.ts
  function transformTile(protoTile, extent) {
    if (protoTile.transformed) {
      return protoTile;
    }
    const z2 = 1 << protoTile.z;
    const tx = protoTile.x;
    const ty = protoTile.y;
    for (const protoFeature of protoTile.protoFeatures) {
      const geom = protoFeature.geometry;
      const simplifiedType = protoFeature.simplifiedType;
      protoFeature.geometry = [];
      if (simplifiedType === 1) {
        for (let j = 0; j < geom.length; j += 2) {
          protoFeature.geometry.push(transformPoint(geom[j], geom[j + 1], extent, z2, tx, ty));
        }
      } else {
        for (let j = 0; j < geom.length; j++) {
          const ring = [];
          for (let k = 0; k < geom[j].length; k += 2) {
            ring.push(transformPoint(geom[j][k], geom[j][k + 1], extent, z2, tx, ty));
          }
          protoFeature.geometry.push(ring);
        }
      }
    }
    protoTile.transformed = true;
    return protoTile;
  }
  function transformPoint(x, y, extent, z2, tx, ty) {
    return [Math.round(extent * (x * z2 - tx)), Math.round(extent * (y * z2 - ty))];
  }

  // src/lib/vector-tiler/tile-to-geojson.ts
  function convertTileToGeoJSON(protoTile, props) {
    const features2 = [];
    for (const rawFeature of protoTile.protoFeatures) {
      if (!rawFeature || !rawFeature.geometry) {
        continue;
      }
      let type;
      let coordinates;
      switch (rawFeature.simplifiedType) {
        case 1:
          if (rawFeature.geometry.length === 1) {
            type = "Point";
            coordinates = rawFeature.geometry[0];
          } else {
            type = "MultiPoint";
            coordinates = rawFeature.geometry;
          }
          break;
        case 2:
          if (rawFeature.geometry.length === 1) {
            type = "LineString";
            coordinates = rawFeature.geometry[0];
          } else {
            type = "MultiLineString";
            coordinates = rawFeature.geometry;
          }
          break;
        case 3:
          if (rawFeature.geometry.length > 1) {
            type = "MultiPolygon";
            coordinates = [rawFeature.geometry];
          } else {
            type = "Polygon";
            coordinates = rawFeature.geometry;
          }
          break;
        default:
          throw new Error(`${rawFeature.simplifiedType}is not a valid simplified type`);
      }
      switch (props.coordinates) {
        case "EPSG:4326":
        case "wgs84":
          projectToLngLat(coordinates, props.tileIndex, props.extent);
          break;
        default:
          convertToLocalCoordinates(coordinates, props.extent);
          break;
      }
      const feature = {
        type: "Feature",
        geometry: {
          type,
          coordinates
        },
        properties: rawFeature.tags || {},
        id: rawFeature.id
      };
      features2.push(feature);
    }
    if (features2.length === 0) {
      return null;
    }
    const table = {
      shape: "geojson-table",
      type: "FeatureCollection",
      features: features2
    };
    return table;
  }

  // src/lib/vector-tiler/features/proto-feature.ts
  function createProtoFeature(id, type, geometry, tags) {
    const feature = {
      // eslint-disable-next-line
      id: id == null ? null : id,
      type,
      simplifiedType: void 0,
      // TODO
      geometry,
      tags,
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity
    };
    switch (type) {
      case "Point":
      case "MultiPoint":
      case "LineString":
        calcLineBBox(feature, geometry);
        break;
      case "MultiLineString":
        for (const line of geometry) {
          calcLineBBox(feature, line);
        }
        break;
      case "Polygon":
        calcLineBBox(feature, geometry[0]);
        break;
      case "MultiPolygon":
        for (const polygon of geometry) {
          calcLineBBox(feature, polygon[0]);
        }
        break;
      default:
        throw new Error(String(type));
    }
    return feature;
  }
  function calcLineBBox(feature, geometry) {
    for (let i = 0; i < geometry.length; i += 3) {
      feature.minX = Math.min(feature.minX, geometry[i]);
      feature.minY = Math.min(feature.minY, geometry[i + 1]);
      feature.maxX = Math.max(feature.maxX, geometry[i]);
      feature.maxY = Math.max(feature.maxY, geometry[i + 1]);
    }
  }

  // src/lib/vector-tiler/features/simplify-path.ts
  function simplifyPath(coords, first, last, sqTolerance) {
    let maxSqDist = sqTolerance;
    const mid = last - first >> 1;
    let minPosToMid = last - first;
    let index;
    const ax = coords[first];
    const ay = coords[first + 1];
    const bx = coords[last];
    const by = coords[last + 1];
    for (let i = first + 3; i < last; i += 3) {
      const d = getSqSegDist(coords[i], coords[i + 1], ax, ay, bx, by);
      if (d > maxSqDist) {
        index = i;
        maxSqDist = d;
      } else if (d === maxSqDist) {
        const posToMid = Math.abs(i - mid);
        if (posToMid < minPosToMid) {
          index = i;
          minPosToMid = posToMid;
        }
      }
    }
    if (maxSqDist > sqTolerance) {
      if (index - first > 3)
        simplifyPath(coords, first, index, sqTolerance);
      coords[index + 2] = maxSqDist;
      if (last - index > 3)
        simplifyPath(coords, index, last, sqTolerance);
    }
  }
  function getSqSegDist(px, py, x, y, bx, by) {
    let dx = bx - x;
    let dy = by - y;
    if (dx !== 0 || dy !== 0) {
      const t = ((px - x) * dx + (py - y) * dy) / (dx * dx + dy * dy);
      if (t > 1) {
        x = bx;
        y = by;
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }
    dx = px - x;
    dy = py - y;
    return dx * dx + dy * dy;
  }

  // src/lib/vector-tiler/features/convert-feature.ts
  function convertFeaturesToProtoFeature(data, options) {
    const protoFeatures = [];
    switch (data.type) {
      case "FeatureCollection":
        let i = 0;
        for (const feature of data.features) {
          protoFeatures.push(convertFeature(feature, options, i++));
        }
        break;
      case "Feature":
        protoFeatures.push(convertFeature(data, options));
        break;
      default:
        protoFeatures.push(convertFeature({ geometry: data }, options));
    }
    return protoFeatures;
  }
  function convertFeature(geojson, options, index) {
    if (!geojson.geometry) {
      return;
    }
    const coords = geojson.geometry.coordinates;
    const type = geojson.geometry.type;
    const tolerance = Math.pow(options.tolerance / ((1 << options.maxZoom) * options.extent), 2);
    let geometry = [];
    let id = geojson.id;
    if (options.promoteId) {
      id = geojson.properties[options.promoteId];
    } else if (options.generateId) {
      id = index || 0;
    }
    switch (type) {
      case "Point":
        convertPoint(coords, geometry);
        break;
      case "MultiPoint":
        for (const p of coords) {
          convertPoint(p, geometry);
        }
        break;
      case "LineString":
        convertLine(coords, geometry, tolerance, false);
        break;
      case "MultiLineString":
        if (options.lineMetrics) {
          for (const line of coords) {
            geometry = [];
            convertLine(line, geometry, tolerance, false);
            features.push(createProtoFeature(id, "LineString", geometry, geojson.properties));
          }
          return;
          convertLines(coords, geometry, tolerance, false);
        }
        break;
      case "Polygon":
        convertLines(coords, geometry, tolerance, true);
        break;
      case "MultiPolygon":
        for (const polygon of coords) {
          const newPolygon = [];
          convertLines(polygon, newPolygon, tolerance, true);
          geometry.push(newPolygon);
        }
        break;
      case "GeometryCollection":
        for (const singleGeometry of geojson.geometry.geometries) {
          convertFeature(
            features,
            {
              id,
              geometry: singleGeometry,
              properties: geojson.properties
            },
            options,
            index
          );
        }
        break;
      default:
        throw new Error("Input data is not a valid GeoJSON object.");
    }
    return createProtoFeature(id, type, geometry, geojson.properties);
  }
  function convertPoint(coords, out) {
    out.push(projectX(coords[0]), projectY(coords[1]), 0);
  }
  function convertLine(ring, out, tolerance, isPolygon) {
    let x0, y0;
    let size = 0;
    for (let j = 0; j < ring.length; j++) {
      const x = projectX(ring[j][0]);
      const y = projectY(ring[j][1]);
      out.push(x, y, 0);
      if (j > 0) {
        if (isPolygon) {
          size += (x0 * y - x * y0) / 2;
        } else {
          size += Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
        }
      }
      x0 = x;
      y0 = y;
    }
    const last = out.length - 3;
    out[2] = 1;
    simplifyPath(out, 0, last, tolerance);
    out[last + 2] = 1;
    out.size = Math.abs(size);
    out.start = 0;
    out.end = out.size;
  }
  function convertLines(rings, out, tolerance, isPolygon) {
    for (let i = 0; i < rings.length; i++) {
      const geom = [];
      convertLine(rings[i], geom, tolerance, isPolygon);
      out.push(geom);
    }
  }
  function projectX(x) {
    return x / 360 + 0.5;
  }
  function projectY(y) {
    const sin = Math.sin(y * Math.PI / 180);
    const y2 = 0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI;
    return y2 < 0 ? 0 : y2 > 1 ? 1 : y2;
  }

  // src/lib/vector-tiler/features/clip-features.ts
  function clipFeatures(features2, scale, k1, k2, axis, minAll, maxAll, options) {
    k1 /= scale;
    k2 /= scale;
    if (minAll >= k1 && maxAll < k2) {
      return features2;
    } else if (maxAll < k1 || minAll >= k2) {
      return null;
    }
    const clipped = [];
    for (const feature of features2) {
      const geometry = feature.geometry;
      let type = feature.type;
      const min = axis === 0 ? feature.minX : feature.minY;
      const max = axis === 0 ? feature.maxX : feature.maxY;
      if (min >= k1 && max < k2) {
        clipped.push(feature);
        continue;
      } else if (max < k1 || min >= k2) {
        continue;
      }
      let newGeometry = [];
      if (type === "Point" || type === "MultiPoint") {
        clipPoints(geometry, newGeometry, k1, k2, axis);
      } else if (type === "LineString") {
        clipLine(geometry, newGeometry, k1, k2, axis, false, options.lineMetrics);
      } else if (type === "MultiLineString") {
        clipLines(geometry, newGeometry, k1, k2, axis, false);
      } else if (type === "Polygon") {
        clipLines(geometry, newGeometry, k1, k2, axis, true);
      } else if (type === "MultiPolygon") {
        for (const polygon of geometry) {
          const newPolygon = [];
          clipLines(polygon, newPolygon, k1, k2, axis, true);
          if (newPolygon.length) {
            newGeometry.push(newPolygon);
          }
        }
      }
      if (newGeometry.length) {
        if (options.lineMetrics && type === "LineString") {
          for (const line of newGeometry) {
            clipped.push(createProtoFeature(feature.id, type, line, feature.tags));
          }
          continue;
        }
        if (type === "LineString" || type === "MultiLineString") {
          if (newGeometry.length === 1) {
            type = "LineString";
            newGeometry = newGeometry[0];
          } else {
            type = "MultiLineString";
          }
        }
        if (type === "Point" || type === "MultiPoint") {
          type = newGeometry.length === 3 ? "Point" : "MultiPoint";
        }
        clipped.push(createProtoFeature(feature.id, type, newGeometry, feature.tags));
      }
    }
    return clipped.length ? clipped : null;
  }
  function clipPoints(geom, newGeom, k1, k2, axis) {
    for (let i = 0; i < geom.length; i += 3) {
      const a = geom[i + axis];
      if (a >= k1 && a <= k2) {
        addPoint(newGeom, geom[i], geom[i + 1], geom[i + 2]);
      }
    }
  }
  function clipLine(geom, newGeom, k1, k2, axis, isPolygon, trackMetrics) {
    let slice = newSlice(geom);
    const intersect2 = axis === 0 ? intersectX : intersectY;
    let len = geom.start;
    let segLen;
    let t;
    for (let i = 0; i < geom.length - 3; i += 3) {
      const ax2 = geom[i];
      const ay2 = geom[i + 1];
      const az2 = geom[i + 2];
      const bx = geom[i + 3];
      const by = geom[i + 4];
      const a2 = axis === 0 ? ax2 : ay2;
      const b = axis === 0 ? bx : by;
      let exited = false;
      if (trackMetrics) {
        segLen = Math.sqrt(Math.pow(ax2 - bx, 2) + Math.pow(ay2 - by, 2));
      }
      if (a2 < k1) {
        if (b > k1) {
          t = intersect2(slice, ax2, ay2, bx, by, k1);
          if (trackMetrics) {
            slice.start = len + segLen * t;
          }
        }
      } else if (a2 > k2) {
        if (b < k2) {
          t = intersect2(slice, ax2, ay2, bx, by, k2);
          if (trackMetrics) {
            slice.start = len + segLen * t;
          }
        }
      } else {
        addPoint(slice, ax2, ay2, az2);
      }
      if (b < k1 && a2 >= k1) {
        t = intersect2(slice, ax2, ay2, bx, by, k1);
        exited = true;
      }
      if (b > k2 && a2 <= k2) {
        t = intersect2(slice, ax2, ay2, bx, by, k2);
        exited = true;
      }
      if (!isPolygon && exited) {
        if (trackMetrics) {
          slice.end = len + segLen * t;
        }
        newGeom.push(slice);
        slice = newSlice(geom);
      }
      if (trackMetrics) {
        len += segLen;
      }
    }
    let last = geom.length - 3;
    const ax = geom[last];
    const ay = geom[last + 1];
    const az = geom[last + 2];
    const a = axis === 0 ? ax : ay;
    if (a >= k1 && a <= k2)
      addPoint(slice, ax, ay, az);
    last = slice.length - 3;
    if (isPolygon && last >= 3 && (slice[last] !== slice[0] || slice[last + 1] !== slice[1])) {
      addPoint(slice, slice[0], slice[1], slice[2]);
    }
    if (slice.length) {
      newGeom.push(slice);
    }
  }
  function newSlice(line) {
    const slice = [];
    slice.size = line.size;
    slice.start = line.start;
    slice.end = line.end;
    return slice;
  }
  function clipLines(geom, newGeom, k1, k2, axis, isPolygon) {
    for (const line of geom) {
      clipLine(line, newGeom, k1, k2, axis, isPolygon, false);
    }
  }
  function addPoint(out, x, y, z) {
    out.push(x, y, z);
  }
  function intersectX(out, ax, ay, bx, by, x) {
    const t = (x - ax) / (bx - ax);
    addPoint(out, x, ay + (by - ay) * t, 1);
    return t;
  }
  function intersectY(out, ax, ay, bx, by, y) {
    const t = (y - ay) / (by - ay);
    addPoint(out, ax + (bx - ax) * t, y, 1);
    return t;
  }

  // src/lib/vector-tiler/features/wrap-features.ts
  function wrapFeatures(features2, options) {
    const buffer = options.buffer / options.extent;
    let merged = features2;
    const left = clipFeatures(features2, 1, -1 - buffer, buffer, 0, -1, 2, options);
    const right = clipFeatures(features2, 1, 1 - buffer, 2 + buffer, 0, -1, 2, options);
    if (left || right) {
      merged = clipFeatures(features2, 1, -buffer, 1 + buffer, 0, -1, 2, options) || [];
      if (left) {
        merged = shiftFeatureCoords(left, 1).concat(merged);
      }
      if (right) {
        merged = merged.concat(shiftFeatureCoords(right, -1));
      }
    }
    return merged;
  }
  function shiftFeatureCoords(features2, offset) {
    const newFeatures = [];
    for (let i = 0; i < features2.length; i++) {
      const feature = features2[i];
      const type = feature.type;
      let newGeometry;
      switch (type) {
        case "Point":
        case "MultiPoint":
        case "LineString":
          newGeometry = shiftCoords(feature.geometry, offset);
          break;
        case "MultiLineString":
        case "Polygon":
          newGeometry = [];
          for (const line of feature.geometry) {
            newGeometry.push(shiftCoords(line, offset));
          }
          break;
        case "MultiPolygon":
          newGeometry = [];
          for (const polygon of feature.geometry) {
            const newPolygon = [];
            for (const line of polygon) {
              newPolygon.push(shiftCoords(line, offset));
            }
            newGeometry.push(newPolygon);
          }
          break;
        default:
          throw new Error(String(type));
      }
      newFeatures.push(createProtoFeature(feature.id, type, newGeometry, feature.tags));
    }
    return newFeatures;
  }
  function shiftCoords(points, offset) {
    const newPoints = [];
    newPoints.size = points.size;
    if (points.start !== void 0) {
      newPoints.start = points.start;
      newPoints.end = points.end;
    }
    for (let i = 0; i < points.length; i += 3) {
      newPoints.push(points[i] + offset, points[i + 1], points[i + 2]);
    }
    return newPoints;
  }

  // src/table-tile-source.ts
  var TableTileSource = {
    name: "TableTiler",
    id: "table-tiler",
    version: "0.0.0",
    extensions: ["mvt"],
    mimeTypes: ["application/octet-stream"],
    options: {
      table: {
        coordinates: "local",
        promoteId: void 0,
        maxZoom: 14,
        indexMaxZoom: 5,
        maxPointsPerTile: 1e4,
        tolerance: 3,
        extent: 4096,
        buffer: 64,
        generateId: void 0
      }
    },
    type: "table",
    testURL: (url) => url.endsWith(".geojson"),
    createDataSource(url, options) {
      const needsLoading = typeof url === "string" || url instanceof Blob;
      const loader = options?.table?.loaders?.[0];
      const tablePromise = needsLoading ? loadTable(url, loader) : url;
      return new DynamicVectorTileSource(tablePromise, options);
    }
    // @ts-expect-error
  };
  async function loadTable(url, loader) {
    if (typeof url === "string") {
      const response = await fetch(url);
      const data2 = await response.arrayBuffer();
      return await loader.parse(data2);
    }
    const data = await url.arrayBuffer();
    return await loader.parse(data);
  }
  var _DynamicVectorTileSource = class {
    /** Stats for this DynamicVectorTileSource */
    stats = new Stats({
      id: "table-tile-source",
      stats: [new Stat("tiles", "count"), new Stat("features", "count")]
    });
    /** MIME type of the tiles emitted by this tile source */
    mimeType = "application/vnd.mapbox-vector-tile";
    localCoordinates = true;
    /** The props that this tile source was created with */
    // @ts-expect-error
    props;
    /* Schema of the data */
    schema = null;
    /** Map of generated tiles, indexed by stringified tile coordinates */
    tiles = {};
    /** Array of tile coordinates */
    tileCoords = [];
    /** Input data has loaded, initial top-level tiling is done, sync methods can now be called */
    ready;
    /** Metadata for the tile source (generated TileJSON/tilestats */
    metadata;
    constructor(table, props) {
      this.props = { ...TableTileSource.options.table, ...props?.table };
      this.getTileData = this.getTileData.bind(this);
      this.ready = this.initializeTilesAsync(table);
      this.metadata = this.getMetadata();
    }
    async initializeTilesAsync(tablePromise) {
      const table = await tablePromise;
      this.schema = deduceTableSchema(table);
      this.createRootTiles(table);
    }
    async getMetadata() {
      await this.ready;
      return { schema: this.schema, minZoom: 0, maxZoom: this.props.maxZoom };
    }
    async getSchema() {
      await this.ready;
      return this.schema;
    }
    /**
     * Get a tile at the specified index
     * @param tileIndex z, x, y of tile
     * @returns
     */
    async getVectorTile(tileIndex) {
      await this.ready;
      const table = this.getTileSync(tileIndex);
      log.info(2, "getVectorTile", tileIndex, table)();
      return table;
    }
    async getTile(tileIndex) {
      await this.ready;
      return this.getTileSync(tileIndex);
    }
    async getTileData(tileParams) {
      const { x, y, z } = tileParams.index;
      const tile = await this.getVectorTile({ x, y, z });
      return tile?.features || [];
    }
    // Implementation
    /**
     * Synchronously request a tile
     * @note Application must await `source.ready` before calling sync methods.
     */
    getTileSync(tileIndex) {
      const protoTile = this.getProtoTile(tileIndex);
      if (!protoTile) {
        return null;
      }
      return convertTileToGeoJSON(protoTile, {
        coordinates: this.props.coordinates,
        tileIndex,
        extent: this.props.extent
      });
    }
    /**
     * Create the initial tiles
     * @note the tiles stores all the features together with additional data
     */
    createRootTiles(table) {
      if (this.props.maxZoom < 0 || this.props.maxZoom > 24) {
        throw new Error("maxZoom should be in the 0-24 range");
      }
      if (this.props.promoteId && this.props.generateId) {
        throw new Error("promoteId and generateId cannot be used together.");
      }
      log.log(1, "DynamicVectorTileSource creating root tiles", this.props)();
      log.time(1, "preprocess table")();
      let features2 = convertFeaturesToProtoFeature(table, this.props);
      log.timeEnd(1, "preprocess table")();
      log.time(1, "generate tiles")();
      features2 = wrapFeatures(features2, this.props);
      if (features2.length === 0) {
        log.log(1, "DynamicVectorTileSource: no features generated")();
        return;
      }
      this.splitTile(features2, 0, 0, 0);
      const rootTile = this.tiles[0];
      log.log(1, `root tile features: ${rootTile.numFeatures}, points: ${rootTile.numPoints}`)();
      log.timeEnd(1, "generate tiles")();
      log.log(
        1,
        `DynamicVectorTileSource: tiles generated: ${this.stats.get("total").count}`,
        this.stats
      )();
    }
    /**
     * Return geojsonvt-style "half formed" vector tile
     * @note Application must await `source.ready` before calling sync methods.
     */
    // eslint-disable-next-line complexity, max-statements
    getProtoTile(tileIndex) {
      const { z, y } = tileIndex;
      let { x } = tileIndex;
      const { extent } = this.props;
      if (z < 0 || z > 24) {
        return null;
      }
      const z2 = 1 << z;
      x = x + z2 & z2 - 1;
      const id = toID(z, x, y);
      if (this.tiles[id]) {
        return transformTile(this.tiles[id], extent);
      }
      log.log(log, "drilling down to z%d-%d-%d", z, x, y)();
      let z0 = z;
      let x0 = x;
      let y0 = y;
      let parent;
      while (!parent && z0 > 0) {
        z0--;
        x0 = x0 >> 1;
        y0 = y0 >> 1;
        parent = this.tiles[toID(z0, x0, y0)];
      }
      if (!parent || !parent.sourceFeatures) {
        return null;
      }
      log.log(1, "found parent tile z%d-%d-%d", z0, x0, y0)();
      log.time(1, "drilling down")();
      this.splitTile(parent.sourceFeatures, z0, x0, y0, z, x, y);
      log.timeEnd(1, "drilling down")();
      return this.tiles[id] ? transformTile(this.tiles[id], extent) : null;
    }
    /**
     * splits features from a parent tile to sub-tiles.
     * @param z, x, and y are the coordinates of the parent tile
     * @param cz, cx, and cy are the coordinates of the target tile
     *
     * If no target tile is specified, splitting stops when we reach the maximum
     * zoom or the number of points is low as specified in the props.
     */
    // eslint-disable-next-line max-params, max-statements, complexity
    splitTile(features2, z, x, y, cz, cx, cy) {
      const stack = [features2, z, x, y];
      while (stack.length) {
        y = stack.pop();
        x = stack.pop();
        z = stack.pop();
        features2 = stack.pop();
        const z2 = 1 << z;
        const id = toID(z, x, y);
        let tile = this.tiles[id];
        if (!tile) {
          log.time(2, "tile creation")();
          tile = this.tiles[id] = createProtoTile(features2, z, x, y, this.props);
          this.tileCoords.push({ z, x, y });
          const key = `z${z}`;
          let stat = this.stats.get(key, "count");
          stat.incrementCount();
          stat = this.stats.get("total");
          stat.incrementCount();
          stat = _DynamicVectorTileSource.stats.get(key, "count");
          stat.incrementCount();
          stat = _DynamicVectorTileSource.stats.get("total");
          stat.incrementCount();
          log.log(
            2,
            "tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",
            z,
            x,
            y,
            tile.numFeatures,
            tile.numPoints,
            tile.numSimplified
          )();
          log.timeEnd(2, "tile creation")();
        }
        tile.sourceFeatures = features2;
        if (cz === void 0) {
          if (z === this.props.indexMaxZoom || tile.numPoints <= this.props.maxPointsPerTile) {
            continue;
          }
        } else if (z === this.props.maxZoom || z === cz) {
          continue;
        } else if (cz !== void 0) {
          const zoomSteps = cz - z;
          if (x !== cx >> zoomSteps || y !== cy >> zoomSteps) {
            continue;
          }
        }
        tile.sourceFeatures = null;
        if (features2.length === 0)
          continue;
        log.time(2, "clipping tile")();
        const k1 = 0.5 * this.props.buffer / this.props.extent;
        const k2 = 0.5 - k1;
        const k3 = 0.5 + k1;
        const k4 = 1 + k1;
        let tl = null;
        let bl = null;
        let tr = null;
        let br = null;
        let left = clipFeatures(features2, z2, x - k1, x + k3, 0, tile.minX, tile.maxX, this.props);
        let right = clipFeatures(features2, z2, x + k2, x + k4, 0, tile.minX, tile.maxX, this.props);
        features2 = null;
        if (left) {
          tl = clipFeatures(left, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, this.props);
          bl = clipFeatures(left, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, this.props);
          left = null;
        }
        if (right) {
          tr = clipFeatures(right, z2, y - k1, y + k3, 1, tile.minY, tile.maxY, this.props);
          br = clipFeatures(right, z2, y + k2, y + k4, 1, tile.minY, tile.maxY, this.props);
          right = null;
        }
        log.timeEnd(2, "clipping tile")();
        stack.push(tl || [], z + 1, x * 2, y * 2);
        stack.push(bl || [], z + 1, x * 2, y * 2 + 1);
        stack.push(tr || [], z + 1, x * 2 + 1, y * 2);
        stack.push(br || [], z + 1, x * 2 + 1, y * 2 + 1);
      }
    }
  };
  var DynamicVectorTileSource = _DynamicVectorTileSource;
  /** Global stats for all DynamicVectorTileSources */
  __publicField(DynamicVectorTileSource, "stats", new Stats({
    id: "table-tile-source-all",
    stats: [new Stat("count", "tiles"), new Stat("count", "features")]
  }));
  function toID(z, x, y) {
    return ((1 << z) * y + x) * 32 + z;
  }
  return __toCommonJS(bundle_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
      return __exports__;
      });
