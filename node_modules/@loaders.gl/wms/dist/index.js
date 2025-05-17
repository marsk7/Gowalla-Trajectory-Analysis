// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export { CSWCapabilitiesLoader } from "./csw-capabilities-loader.js";
export { CSWDomainLoader } from "./csw-domain-loader.js";
export { CSWRecordsLoader } from "./csw-records-loader.js";
// WMS - Web Map Service
export { WMSErrorLoader } from "./wms-error-loader.js";
export { WMSCapabilitiesLoader } from "./wms-capabilities-loader.js";
export { WMSFeatureInfoLoader as _WMSFeatureInfoLoader } from "./wip/wms-feature-info-loader.js";
export { WMSLayerDescriptionLoader as _WMSLayerDescriptionLoader } from "./wip/wms-layer-description-loader.js";
export { WFSCapabilitiesLoader as _WFSCapabilitiesLoader } from "./wfs-capabilities-loader.js";
export { GMLLoader as _GMLLoader } from "./gml-loader.js";
// EXPERIMENTAL: DATA SOURCES
// OGC Services
// export {CSWSource} from './services/ogc/csw-service';
export { WMSSource, WMSImageSource } from "./services/ogc/wms-service.js";
// ArcGIS SourceLoaders
export { getArcGISServices as _getArcGISServices } from "./services/arcgis/arcgis-server.js";
export { ArcGISImageServerSource as _ArcGISImageServerSource } from "./services/arcgis/arcgis-image-server.js";
// DEPRECATED: TODO - remove once deck.gl has been udpated
export { ImageSource } from '@loaders.gl/loader-utils';
export { createImageSource } from "./lib/deprecated/create-image-source.js";
