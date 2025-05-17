import type { NumericArray } from '@math.gl/core';
type LngLatHeightObject = {
    longitude: number;
    latitude: number;
    height: number;
};
type XYZObject = {
    x: number;
    y: number;
    z: number;
};
type Cartographic = LngLatHeightObject | XYZObject | NumericArray;
export declare function fromCartographic(cartographic: Readonly<Cartographic>): number[];
export declare function fromCartographic<NumArrayT>(cartographic: Readonly<Cartographic>, result: NumArrayT, map?: (x: number) => number): NumArrayT;
export declare function fromCartographicToRadians(cartographic: Readonly<Cartographic>, result?: number[]): number[];
export declare function fromCartographicToRadians<TArray>(cartographic: Readonly<Cartographic>, result: TArray): TArray;
export declare function fromCartographicToDegrees(cartographic: Readonly<Cartographic>, result?: number[]): number[];
export declare function fromCartographicToDegrees<TArray>(cartographic: Readonly<Cartographic>, result: TArray): TArray;
export declare function toCartographic<T extends Cartographic>(vector: Readonly<NumericArray>, cartographic: T, map?: (x: number) => number): T;
export declare function toCartographicFromRadians<T extends Cartographic>(vector: Readonly<NumericArray>, cartographic: T): T;
export declare function toCartographicFromDegrees<T extends Cartographic>(vector: Readonly<NumericArray>, cartographic: T): T;
export declare function isWGS84(vector: Readonly<NumericArray>): boolean;
export {};
//# sourceMappingURL=type-utils.d.ts.map