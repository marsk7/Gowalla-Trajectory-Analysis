import type Layer from "../../lib/layer.js";
export type DirectionalLightOptions = {
    id?: string;
    /** Light color, [r, g, b] in the 0-255 range
     * @default [255, 255, 255]
     */
    color?: [number, number, number];
    /** Light intensity, higher number is brighter
     * @default 1.0
     */
    intensity?: number;
    /** Light direction in the common space
     * @default [0.0, 0.0, -1.0]
     */
    direction?: [number, number, number];
    /** (Experimental) render shadows cast by this light
     * @default false
     */
    _shadow?: boolean;
};
export declare class DirectionalLight {
    id: string;
    color: [number, number, number];
    intensity: number;
    type: "directional";
    direction: [number, number, number];
    shadow: boolean;
    constructor(props?: DirectionalLightOptions);
    getProjectedLight(opts: {
        layer: Layer;
    }): DirectionalLight;
}
//# sourceMappingURL=directional-light.d.ts.map