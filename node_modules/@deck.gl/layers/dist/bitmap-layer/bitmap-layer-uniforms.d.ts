import type { Texture } from '@luma.gl/core';
export type BitmapProps = {
    bounds: [number, number, number, number];
    coordinateConversion: number;
    desaturate: number;
    tintColor: [number, number, number];
    transparentColor: [number, number, number, number];
    bitmapTexture: Texture;
};
export declare const bitmapUniforms: {
    readonly name: "bitmap";
    readonly vs: "uniform bitmapUniforms {\n  vec4 bounds;\n  float coordinateConversion;\n  float desaturate;\n  vec3 tintColor;\n  vec4 transparentColor;\n} bitmap;\n";
    readonly fs: "uniform bitmapUniforms {\n  vec4 bounds;\n  float coordinateConversion;\n  float desaturate;\n  vec3 tintColor;\n  vec4 transparentColor;\n} bitmap;\n";
    readonly uniformTypes: {
        readonly bounds: "vec4<f32>";
        readonly coordinateConversion: "f32";
        readonly desaturate: "f32";
        readonly tintColor: "vec3<f32>";
        readonly transparentColor: "vec4<f32>";
    };
};
//# sourceMappingURL=bitmap-layer-uniforms.d.ts.map