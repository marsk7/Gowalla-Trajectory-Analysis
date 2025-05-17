import type { Matrix4 } from '@math.gl/core';
export type ScenegraphProps = {
    sizeScale: number;
    sizeMinPixels: number;
    sizeMaxPixels: number;
    sceneModelMatrix: Matrix4;
    composeModelMatrix: boolean;
};
export declare const scenegraphUniforms: {
    readonly name: "scenegraph";
    readonly vs: "uniform scenegraphUniforms {\n  float sizeScale;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  mat4 sceneModelMatrix;\n  bool composeModelMatrix;\n} scenegraph;\n";
    readonly fs: "uniform scenegraphUniforms {\n  float sizeScale;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  mat4 sceneModelMatrix;\n  bool composeModelMatrix;\n} scenegraph;\n";
    readonly uniformTypes: {
        readonly sizeScale: "f32";
        readonly sizeMinPixels: "f32";
        readonly sizeMaxPixels: "f32";
        readonly sceneModelMatrix: "mat4x4<f32>";
        readonly composeModelMatrix: "f32";
    };
};
//# sourceMappingURL=scenegraph-layer-uniforms.d.ts.map