import type Layer from "../../lib/layer.js";
export type PointLightOptions = {
    id?: string;
    /** Light color, [r, g, b] in the 0-255 range
     * @default [255, 255, 255]
     */
    color?: [number, number, number];
    /** Light intensity, higher number is brighter
     * @default 1.0
     */
    intensity?: number;
    /** Light position [x, y, z] in the common space
     * @default [0.0, 0.0, 1.0]
     */
    position?: [number, number, number];
    /** Light attenuation
     * @default [1.0, 0.0, 0.0]
     */
    attenuation?: [number, number, number];
};
export declare class PointLight {
    id: string;
    color: [number, number, number];
    intensity: number;
    type: "point";
    position: [number, number, number];
    attenuation: [number, number, number];
    protected projectedLight: PointLight;
    constructor(props?: PointLightOptions);
    getProjectedLight({ layer }: {
        layer: Layer;
    }): PointLight;
}
//# sourceMappingURL=point-light.d.ts.map