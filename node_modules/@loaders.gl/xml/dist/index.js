// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export { XMLLoader } from "./xml-loader.js";
export { HTMLLoader } from "./html-loader.js";
export { SAXParser as SAXParser } from "./sax-ts/sax.js";
// Utilities
export { convertXMLValueToArray, convertXMLFieldToArrayInPlace } from "./lib/xml-utils/xml-utils.js";
// Experimental
export { uncapitalize as _uncapitalize, uncapitalizeKeys as _uncapitalizeKeys } from "./lib/xml-utils/uncapitalize.js";
