import { Texture } from '@luma.gl/core';
import { AmbientLight } from "./ambient-light.js";
import { DirectionalLight } from "./directional-light.js";
import { PointLight } from "./point-light.js";
import { Matrix4 } from '@math.gl/core';
import type { LightingProps } from '@luma.gl/shadertools';
import type Layer from "../../lib/layer.js";
import type { Effect, EffectContext, PreRenderOptions } from "../../lib/effect.js";
export type LightingEffectProps = Record<string, PointLight | DirectionalLight | AmbientLight>;
export default class LightingEffect implements Effect {
    id: string;
    props: LightingEffectProps;
    shadowColor: [number, number, number, number];
    context?: EffectContext;
    private shadow;
    private ambientLight?;
    private directionalLights;
    private pointLights;
    private shadowPasses;
    private dummyShadowMap;
    private shadowMatrices?;
    constructor(props?: LightingEffectProps);
    setup(context: EffectContext): void;
    setProps(props: LightingEffectProps): void;
    preRender({ layers, layerFilter, viewports, onViewportActive, views }: PreRenderOptions): void;
    getShaderModuleProps(layer: Layer, otherShaderModuleProps: Record<string, any>): {
        shadow: {
            project: any;
            shadowMaps: Texture[];
            dummyShadowMap: Texture;
            shadowColor: [number, number, number, number];
            shadowMatrices: Matrix4[] | undefined;
        } | {
            project?: undefined;
            shadowMaps?: undefined;
            dummyShadowMap?: undefined;
            shadowColor?: undefined;
            shadowMatrices?: undefined;
        };
        lighting: LightingProps;
        phongMaterial: any;
        gouraudMaterial: any;
    };
    cleanup(context: EffectContext): void;
    private _calculateMatrices;
    private _createShadowPasses;
    private _applyDefaultLights;
}
//# sourceMappingURL=lighting-effect.d.ts.map