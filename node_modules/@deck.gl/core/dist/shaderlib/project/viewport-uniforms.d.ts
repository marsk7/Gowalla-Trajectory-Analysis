import { Matrix4Like } from '@math.gl/core';
import type Viewport from "../../viewports/viewport.js";
import type { CoordinateSystem } from "../../lib/constants.js";
type Vec3 = [number, number, number];
type Vec4 = [number, number, number, number];
export declare function getOffsetOrigin(viewport: Viewport, coordinateSystem: CoordinateSystem, coordinateOrigin?: Vec3): {
    geospatialOrigin: Vec3 | null;
    shaderCoordinateOrigin: Vec3;
    offsetMode: boolean;
};
export type ProjectUniforms = {
    coordinateSystem: number;
    projectionMode: number;
    coordinateOrigin: Vec3;
    commonOrigin: Vec3;
    center: Vec4;
    pseudoMeters: boolean;
    viewportSize: [number, number];
    devicePixelRatio: number;
    focalDistance: number;
    commonUnitsPerMeter: Vec3;
    commonUnitsPerWorldUnit: Vec3;
    commonUnitsPerWorldUnit2: Vec3;
    /** 2^zoom */
    scale: number;
    wrapLongitude: boolean;
    viewProjectionMatrix: Matrix4Like;
    modelMatrix: Matrix4Like;
    cameraPosition: Vec3;
};
export type ProjectProps = {
    viewport: Viewport;
    devicePixelRatio?: number;
    modelMatrix?: Matrix4Like | null;
    coordinateSystem?: CoordinateSystem;
    coordinateOrigin?: Vec3;
    autoWrapLongitude?: boolean;
};
/**
 * Returns uniforms for shaders based on current projection
 * includes: projection matrix suitable for shaders
 *
 * TODO - Ensure this works with any viewport, not just WebMercatorViewports
 *
 * @param {WebMercatorViewport} viewport -
 * @return {Float32Array} - 4x4 projection matrix that can be used in shaders
 */
export declare function getUniformsFromViewport({ viewport, devicePixelRatio, modelMatrix, coordinateSystem, coordinateOrigin, autoWrapLongitude }: ProjectProps): ProjectUniforms;
export {};
//# sourceMappingURL=viewport-uniforms.d.ts.map