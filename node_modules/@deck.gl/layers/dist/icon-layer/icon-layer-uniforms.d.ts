import { Texture } from '@luma.gl/core';
type IconBindingProps = {
    iconsTexture: Texture;
};
type IconUniformProps = {
    sizeScale: number;
    iconsTextureDim: [number, number];
    sizeMinPixels: number;
    sizeMaxPixels: number;
    billboard: boolean;
    sizeUnits: number;
    alphaCutoff: number;
};
export type IconProps = IconBindingProps & IconUniformProps;
export declare const iconUniforms: {
    readonly name: "icon";
    readonly vs: "uniform iconUniforms {\n  float sizeScale;\n  vec2 iconsTextureDim;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  bool billboard;\n  highp int sizeUnits;\n  float alphaCutoff;\n} icon;\n";
    readonly fs: "uniform iconUniforms {\n  float sizeScale;\n  vec2 iconsTextureDim;\n  float sizeMinPixels;\n  float sizeMaxPixels;\n  bool billboard;\n  highp int sizeUnits;\n  float alphaCutoff;\n} icon;\n";
    readonly uniformTypes: {
        readonly sizeScale: "f32";
        readonly iconsTextureDim: "vec2<f32>";
        readonly sizeMinPixels: "f32";
        readonly sizeMaxPixels: "f32";
        readonly billboard: "f32";
        readonly sizeUnits: "i32";
        readonly alphaCutoff: "f32";
    };
};
export {};
//# sourceMappingURL=icon-layer-uniforms.d.ts.map