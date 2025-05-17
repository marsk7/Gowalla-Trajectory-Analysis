export type AmbientLightOptions = {
    id?: string;
    /** Light color, [r, g, b] in the 0-255 range
     * @default [255, 255, 255]
     */
    color?: [number, number, number];
    /** Light intensity, higher number is brighter
     * @default 1.0
     */
    intensity?: number;
};
export declare class AmbientLight {
    id: string;
    color: [number, number, number];
    intensity: number;
    type: "ambient";
    constructor(props?: AmbientLightOptions);
}
//# sourceMappingURL=ambient-light.d.ts.map