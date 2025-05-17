import { Texture } from '@luma.gl/core';
export type HeatmapProps = {
    /**
     * Radius of the heatmap blur in pixels, to which the weight of a cell is distributed.
     *
     * @default 20
     */
    radiusPixels?: number;
    /**
     * Controls how weight values are mapped to the colors in `colorTexture`, as an array of two numbers [`minValue`, `maxValue`].
     *
     * @default [0, 1]
     */
    colorDomain?: [number, number];
    /**
     * Value that is multiplied with the total weight at a pixel to obtain the final weight. A value larger than 1 biases the output color towards the higher end of the spectrum, and a value less than 1 biases the output color towards the lower end of the spectrum.
     */
    intensity?: number;
    /**
     * Color LUT for color gradient
     */
    colorTexture: Texture;
    opacity: number;
};
type PassProps = {
    delta: [number, number];
};
export declare const heatmap: {
    readonly name: "heatmap";
    readonly uniformPropTypes: {
        readonly colorDomain: {
            readonly value: readonly [0, 1];
        };
        readonly delta: {
            readonly value: readonly [0, 1];
        };
        readonly intensity: {
            readonly value: 1;
            readonly min: 0.1;
            readonly max: 10;
        };
        readonly opacity: {
            readonly value: 1;
            readonly min: 0;
            readonly max: 1;
        };
        readonly radiusPixels: {
            readonly value: 20;
            readonly min: 0;
            readonly softMax: 100;
        };
    };
    readonly uniformTypes: {
        readonly colorDomain: "vec2<f32>";
        readonly delta: "vec2<f32>";
        readonly intensity: "f32";
        readonly opacity: "f32";
        readonly radiusPixels: "f32";
    };
    readonly getUniforms: (opts: Partial<HeatmapProps & PassProps>) => {
        colorDomain?: undefined;
        colorTexture?: undefined;
        delta?: undefined;
        intensity?: undefined;
        opacity?: undefined;
        radiusPixels?: undefined;
    } | {
        colorDomain: [number, number];
        colorTexture: Texture | undefined;
        delta: [number, number];
        intensity: number;
        opacity: number;
        radiusPixels: number;
    };
    readonly fs: "uniform heatmapUniforms {\n  vec2 colorDomain;\n  vec2 delta;\n  float intensity;\n  float opacity;\n  float radiusPixels;\n} heatmap;\n\nuniform sampler2D colorTexture;\n\nvec3 colorGradient(float value) {\n  return texture(colorTexture, vec2(value, 0.5)).rgb;\n}\n\nconst vec3 SHIFT = vec3(1.0, 256.0, 256.0 * 256.0);\nconst float MAX_VAL = SHIFT.z * 255.0;\nconst float SCALE = MAX_VAL / 8.0;\nvec4 pack(float value) {\n  return vec4(mod(vec3(value, floor(value / SHIFT.yz)), 256.0), 255.0) / 255.0;\n}\nfloat unpack(vec3 color) {\n  return 255.0 * dot(color, SHIFT);\n}\n\nvec4 heatmap_sampleColor(sampler2D source, vec2 texSize, vec2 texCoord) {\n  bool firstPass = (heatmap.delta.y < 0.5);\n  float accumulator = 0.0;\n\n  // Controls quality of heatmap, larger values increase quality at expense of performance\n  float SUPPORT = clamp(heatmap.radiusPixels / 2.0, 8.0, 32.0);\n\n  // Gaussian normalization parameters\n  float sigma = SUPPORT / 3.0;\n  float a = -0.5 / (sigma * sigma);\n  float w0 = 0.3989422804014327 / sigma; // 1D normalization\n  for (float t = -SUPPORT; t <= SUPPORT; t++) {\n    vec2 percent = (t * heatmap.delta - 0.5) / SUPPORT;\n    vec2 delta = percent * heatmap.radiusPixels / texSize;\n    vec4 offsetColor = texture(source, texCoord + delta);\n\n    // Unpack float\n    float value = unpack(offsetColor.rgb);\n\n    // Gaussian\n    float weight = w0 * exp(a * t * t);\n    \n    accumulator += value * weight;\n  }\n\n  if (firstPass) {\n    return pack(accumulator);\n  }\n\n  // Undo scaling to obtain normalized density\n  float density = 10.0 * heatmap.intensity * accumulator / SCALE;\n \n  // Domain also in normalized density units\n  vec2 domain = heatmap.colorDomain;\n\n  // Apply domain\n  float f = (density - domain[0]) / (domain[1] - domain[0]);\n\n  // sqrt/log scaling??\n  // float f = (log(density) - log(domain[0] + 1.0)) / (log(domain[1] + 1.0) - log(domain[0] + 1.0));\n  // f = sqrt(f);\n\n  // Color map\n  vec4 color = vec4(0.0);\n  color.rgb = colorGradient(f);\n\n  color.a = smoothstep(0.0, 0.1, f);\n  color.a = pow(color.a, 1.0 / 2.2);\n  color.a *= heatmap.opacity;\n\n  return color;\n}\n";
    readonly passes: [{
        readonly sampler: true;
        readonly uniforms: {
            readonly delta: [1, 0];
        };
    }, {
        readonly sampler: true;
        readonly uniforms: {
            readonly delta: [0, 1];
        };
    }];
};
export {};
//# sourceMappingURL=heatmap.d.ts.map