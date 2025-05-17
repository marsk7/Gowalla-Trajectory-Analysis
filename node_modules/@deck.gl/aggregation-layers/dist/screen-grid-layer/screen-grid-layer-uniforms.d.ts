import { Texture } from '@luma.gl/core';
export type ScreenGridProps = {
    cellSizeClipspace: [number, number];
    gridSizeClipspace: [number, number];
    colorDomain: [number, number];
    colorRange: Texture;
};
export declare const screenGridUniforms: {
    readonly name: "screenGrid";
    readonly vs: "uniform screenGridUniforms {\n  vec2 cellSizeClipspace;\n  vec2 gridSizeClipspace;\n  vec2 colorDomain;\n} screenGrid;\n";
    readonly uniformTypes: {
        readonly cellSizeClipspace: "vec2<f32>";
        readonly gridSizeClipspace: "vec2<f32>";
        readonly colorDomain: "vec2<f32>";
    };
};
//# sourceMappingURL=screen-grid-layer-uniforms.d.ts.map