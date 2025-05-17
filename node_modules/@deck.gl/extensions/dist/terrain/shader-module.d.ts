import { ProjectProps } from '@deck.gl/core';
import type { Texture } from '@luma.gl/core';
import type { Bounds } from "../utils/projection-utils.js";
import type { TerrainCover } from "./terrain-cover.js";
/** Module parameters expected by the terrain shader module */
export type TerrainModuleProps = {
    project: ProjectProps;
    isPicking: boolean;
    heightMap: Texture | null;
    heightMapBounds?: Bounds | null;
    dummyHeightMap: Texture;
    terrainCover?: TerrainCover | null;
    drawToTerrainHeightMap?: boolean;
    useTerrainHeightMap?: boolean;
    terrainSkipRender?: boolean;
};
/** A model can have one of the following modes */
export declare const TERRAIN_MODE: {
    NONE: number;
    /** A terrain layer rendering encoded ground elevation into the height map */
    WRITE_HEIGHT_MAP: number;
    /** An offset layer reading encoded ground elevation from the height map */
    USE_HEIGHT_MAP: number;
    /** A terrain layer rendering to screen, using the cover fbo overlaid with its own texture */
    USE_COVER: number;
    /** A terrain layer rendering to screen, using the cover fbo as texture */
    USE_COVER_ONLY: number;
    /** Draped layer is rendered into a texture, and never to screen */
    SKIP: number;
};
export declare const terrainModule: {
    readonly name: "terrain";
    readonly dependencies: [{
        readonly name: "project";
        readonly dependencies: [{
            name: string;
            vs: string;
        }, {
            readonly name: "geometry";
            readonly source: "const SMOOTH_EDGE_RADIUS: f32 = 0.5;\n\nstruct VertexGeometry {\n  position: vec4<f32>,\n  worldPosition: vec3<f32>,\n  worldPositionAlt: vec3<f32>,\n  normal: vec3<f32>,\n  uv: vec2<f32>,\n  pickingColor: vec3<f32>,\n};\n\nvar<private> geometry_: VertexGeometry = VertexGeometry(\n  vec4<f32>(0.0, 0.0, 1.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0),\n  vec2<f32>(0.0, 0.0),\n  vec3<f32>(0.0, 0.0, 0.0)\n);\n\nstruct FragmentGeometry {\n  uv: vec2<f32>,\n};\n\nvar<private> fragmentGeometry: FragmentGeometry;\n\nfn smoothedge(edge: f32, x: f32) -> f32 {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n";
            readonly vs: "#define SMOOTH_EDGE_RADIUS 0.5\n\nstruct VertexGeometry {\n  vec4 position;\n  vec3 worldPosition;\n  vec3 worldPositionAlt;\n  vec3 normal;\n  vec2 uv;\n  vec3 pickingColor;\n} geometry = VertexGeometry(\n  vec4(0.0, 0.0, 1.0, 0.0),\n  vec3(0.0),\n  vec3(0.0),\n  vec3(0.0),\n  vec2(0.0),\n  vec3(0.0)\n);\n";
            readonly fs: "#define SMOOTH_EDGE_RADIUS 0.5\n\nstruct FragmentGeometry {\n  vec2 uv;\n} geometry;\n\nfloat smoothedge(float edge, float x) {\n  return smoothstep(edge - SMOOTH_EDGE_RADIUS, edge + SMOOTH_EDGE_RADIUS, x);\n}\n";
        }];
        readonly source: string;
        readonly vs: string;
        readonly getUniforms: (opts?: ProjectProps | {}) => {};
        readonly uniformTypes: {
            readonly wrapLongitude: "f32";
            readonly coordinateSystem: "i32";
            readonly commonUnitsPerMeter: "vec3<f32>";
            readonly projectionMode: "i32";
            readonly scale: "f32";
            readonly commonUnitsPerWorldUnit: "vec3<f32>";
            readonly commonUnitsPerWorldUnit2: "vec3<f32>";
            readonly center: "vec4<f32>";
            readonly modelMatrix: "mat4x4<f32>";
            readonly viewProjectionMatrix: "mat4x4<f32>";
            readonly viewportSize: "vec2<f32>";
            readonly devicePixelRatio: "f32";
            readonly focalDistance: "f32";
            readonly cameraPosition: "vec3<f32>";
            readonly coordinateOrigin: "vec3<f32>";
            readonly commonOrigin: "vec3<f32>";
            readonly pseudoMeters: "f32";
        };
    }];
    readonly vs: string;
    readonly fs: string;
    readonly inject: {
        readonly 'vs:#main-start': "\nif (terrain.mode == TERRAIN_MODE_SKIP) {\n  gl_Position = vec4(0.0);\n  return;\n}\n";
        readonly 'vs:DECKGL_FILTER_GL_POSITION': "\ncommonPos = geometry.position.xyz;\nif (terrain.mode == TERRAIN_MODE_WRITE_HEIGHT_MAP) {\n  vec2 texCoords = (commonPos.xy - terrain.bounds.xy) / terrain.bounds.zw;\n  position = vec4(texCoords * 2.0 - 1.0, 0.0, 1.0);\n  commonPos.z += project.commonOrigin.z;\n}\nif (terrain.mode == TERRAIN_MODE_USE_HEIGHT_MAP) {\n  vec3 anchor = geometry.worldPosition;\n  anchor.z = 0.0;\n  vec3 anchorCommon = project_position(anchor);\n  vec2 texCoords = (anchorCommon.xy - terrain.bounds.xy) / terrain.bounds.zw;\n  if (texCoords.x >= 0.0 && texCoords.y >= 0.0 && texCoords.x <= 1.0 && texCoords.y <= 1.0) {\n    float terrainZ = texture(terrain_map, texCoords).r;\n    geometry.position.z += terrainZ;\n    position = project_common_position_to_clipspace(geometry.position);\n  }\n}\n    ";
        readonly 'fs:#main-start': "\nif (terrain.mode == TERRAIN_MODE_WRITE_HEIGHT_MAP) {\n  fragColor = vec4(commonPos.z, 0.0, 0.0, 1.0);\n  return;\n}\n    ";
        readonly 'fs:DECKGL_FILTER_COLOR': "\nif ((terrain.mode == TERRAIN_MODE_USE_COVER) || (terrain.mode == TERRAIN_MODE_USE_COVER_ONLY)) {\n  vec2 texCoords = (commonPos.xy - terrain.bounds.xy) / terrain.bounds.zw;\n  vec4 pixel = texture(terrain_map, texCoords);\n  if (terrain.mode == TERRAIN_MODE_USE_COVER_ONLY) {\n    color = pixel;\n  } else {\n    // pixel is premultiplied\n    color = pixel + color * (1.0 - pixel.a);\n  }\n  return;\n}\n    ";
    };
    readonly getUniforms: (opts?: Partial<TerrainModuleProps>) => {
        mode: number;
        terrain_map: Texture;
        bounds: [number, number, number, number];
    } | {
        mode?: undefined;
        terrain_map?: undefined;
        bounds?: undefined;
    };
    readonly uniformTypes: {
        readonly mode: "f32";
        readonly bounds: "vec4<f32>";
    };
};
//# sourceMappingURL=shader-module.d.ts.map