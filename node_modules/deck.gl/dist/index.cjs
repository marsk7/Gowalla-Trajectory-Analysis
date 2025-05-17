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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// dist/index.js
var dist_exports = {};
__export(dist_exports, {
  AmbientLight: () => import_core.AmbientLight,
  ArcLayer: () => import_layers.ArcLayer,
  Attribute: () => import_core.Attribute,
  AttributeManager: () => import_core.AttributeManager,
  BitmapLayer: () => import_layers.BitmapLayer,
  COORDINATE_SYSTEM: () => import_core.COORDINATE_SYSTEM,
  CPUAggregator: () => import_aggregation_layers.CPUAggregator,
  ColumnLayer: () => import_layers.ColumnLayer,
  CompassWidget: () => import_widgets.CompassWidget,
  CompositeLayer: () => import_core.CompositeLayer,
  ContourLayer: () => import_aggregation_layers.ContourLayer,
  Controller: () => import_core.Controller,
  Deck: () => import_core.Deck,
  DeckGL: () => import_react.DeckGL,
  DeckRenderer: () => import_core.DeckRenderer,
  DirectionalLight: () => import_core.DirectionalLight,
  FirstPersonController: () => import_core.FirstPersonController,
  FirstPersonView: () => import_core.FirstPersonView,
  FirstPersonViewport: () => import_core.FirstPersonViewport,
  FlyToInterpolator: () => import_core.FlyToInterpolator,
  FullscreenWidget: () => import_widgets.FullscreenWidget,
  GeoJsonLayer: () => import_layers.GeoJsonLayer,
  GeohashLayer: () => import_geo_layers.GeohashLayer,
  GreatCircleLayer: () => import_geo_layers.GreatCircleLayer,
  GridCellLayer: () => import_layers.GridCellLayer,
  GridLayer: () => import_aggregation_layers.GridLayer,
  H3ClusterLayer: () => import_geo_layers.H3ClusterLayer,
  H3HexagonLayer: () => import_geo_layers.H3HexagonLayer,
  HeatmapLayer: () => import_aggregation_layers.HeatmapLayer,
  HexagonLayer: () => import_aggregation_layers.HexagonLayer,
  IconLayer: () => import_layers.IconLayer,
  Layer: () => import_core.Layer,
  LayerExtension: () => import_core.LayerExtension,
  LayerManager: () => import_core.LayerManager,
  LightingEffect: () => import_core.LightingEffect,
  LineLayer: () => import_layers.LineLayer,
  LinearInterpolator: () => import_core.LinearInterpolator,
  MVTLayer: () => import_geo_layers.MVTLayer,
  MapController: () => import_core.MapController,
  MapView: () => import_core.MapView,
  OPERATION: () => import_core.OPERATION,
  OrbitController: () => import_core.OrbitController,
  OrbitView: () => import_core.OrbitView,
  OrbitViewport: () => import_core.OrbitViewport,
  OrthographicController: () => import_core.OrthographicController,
  OrthographicView: () => import_core.OrthographicView,
  OrthographicViewport: () => import_core.OrthographicViewport,
  PathLayer: () => import_layers.PathLayer,
  PointCloudLayer: () => import_layers.PointCloudLayer,
  PointLight: () => import_core.PointLight,
  PolygonLayer: () => import_layers.PolygonLayer,
  PostProcessEffect: () => import_core.PostProcessEffect,
  QuadkeyLayer: () => import_geo_layers.QuadkeyLayer,
  S2Layer: () => import_geo_layers.S2Layer,
  ScatterplotLayer: () => import_layers.ScatterplotLayer,
  ScenegraphLayer: () => import_mesh_layers.ScenegraphLayer,
  ScreenGridLayer: () => import_aggregation_layers.ScreenGridLayer,
  SimpleMeshLayer: () => import_mesh_layers.SimpleMeshLayer,
  SolidPolygonLayer: () => import_layers.SolidPolygonLayer,
  TRANSITION_EVENTS: () => import_core.TRANSITION_EVENTS,
  TerrainLayer: () => import_geo_layers.TerrainLayer,
  Tesselator: () => import_core.Tesselator,
  TextLayer: () => import_layers.TextLayer,
  Tile3DLayer: () => import_geo_layers.Tile3DLayer,
  TileLayer: () => import_geo_layers.TileLayer,
  TransitionInterpolator: () => import_core.TransitionInterpolator,
  TripsLayer: () => import_geo_layers.TripsLayer,
  UNIT: () => import_core.UNIT,
  VERSION: () => import_core.VERSION,
  View: () => import_core.View,
  Viewport: () => import_core.Viewport,
  WebGLAggregator: () => import_aggregation_layers.WebGLAggregator,
  WebMercatorViewport: () => import_core.WebMercatorViewport,
  ZoomWidget: () => import_widgets.ZoomWidget,
  _GlobeController: () => import_core._GlobeController,
  _GlobeView: () => import_core._GlobeView,
  _GlobeViewport: () => import_core._GlobeViewport,
  _Tileset2D: () => import_geo_layers._Tileset2D,
  assert: () => import_core.assert,
  createIterable: () => import_core.createIterable,
  default: () => import_react.default,
  fp64LowPart: () => import_core.fp64LowPart,
  getShaderAssembler: () => import_core.getShaderAssembler,
  gouraudLighting: () => import_core.gouraudLighting,
  log: () => import_core.log,
  phongLighting: () => import_core.phongLighting,
  picking: () => import_core.picking,
  project: () => import_core.project,
  project32: () => import_core.project32,
  shadow: () => import_core.shadow
});
module.exports = __toCommonJS(dist_exports);
var import_core = require("@deck.gl/core");
var import_layers = require("@deck.gl/layers");
var import_aggregation_layers = require("@deck.gl/aggregation-layers");
var import_geo_layers = require("@deck.gl/geo-layers");
var import_mesh_layers = require("@deck.gl/mesh-layers");
var import_react = __toESM(require("@deck.gl/react"), 1);
var import_widgets = require("@deck.gl/widgets");
//# sourceMappingURL=index.cjs.map
