import type { LayerProps } from "../../types/layer-props.js";
export type LayerUniforms = {
    opacity?: number;
};
export declare const layerUniforms: {
    readonly name: "layer";
    readonly vs: "uniform layerUniforms {\n  uniform float opacity;\n} layer;\n";
    readonly fs: "uniform layerUniforms {\n  uniform float opacity;\n} layer;\n";
    readonly getUniforms: (props: Partial<LayerProps>) => {
        opacity: number;
    };
    readonly uniformTypes: {
        readonly opacity: "f32";
    };
};
//# sourceMappingURL=layer-uniforms.d.ts.map