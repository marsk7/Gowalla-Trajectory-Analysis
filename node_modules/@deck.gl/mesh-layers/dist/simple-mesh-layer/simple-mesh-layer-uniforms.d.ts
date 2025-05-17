import type { Texture } from '@luma.gl/core';
export type SimpleMeshProps = {
    sizeScale?: number;
    composeModelMatrix?: boolean;
    hasTexture?: boolean;
    flatShading?: boolean;
    sampler?: Texture;
};
export declare const simpleMeshUniforms: {
    readonly name: "simpleMesh";
    readonly vs: "uniform simpleMeshUniforms {\n  float sizeScale;\n  bool composeModelMatrix;\n  bool hasTexture;\n  bool flatShading;\n} simpleMesh;\n";
    readonly fs: "uniform simpleMeshUniforms {\n  float sizeScale;\n  bool composeModelMatrix;\n  bool hasTexture;\n  bool flatShading;\n} simpleMesh;\n";
    readonly uniformTypes: {
        readonly sizeScale: "f32";
        readonly composeModelMatrix: "f32";
        readonly hasTexture: "f32";
        readonly flatShading: "f32";
    };
};
//# sourceMappingURL=simple-mesh-layer-uniforms.d.ts.map