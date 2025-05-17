import type { TextureView } from '@luma.gl/core';
export type ScreenProps = {
    texSrc: TextureView;
    texSize: [number, number];
};
export declare const screenUniforms: {
    readonly name: "screen";
    readonly fs: "uniform screenUniforms {\n  vec2 texSize;\n} screen;\n";
    readonly uniformTypes: {
        readonly texSize: "vec2<f32>";
    };
};
//# sourceMappingURL=screen-pass-uniforms.d.ts.map