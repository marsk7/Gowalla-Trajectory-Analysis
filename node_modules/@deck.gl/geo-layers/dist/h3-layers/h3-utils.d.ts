import { CoordPair, H3IndexInput } from 'h3-js';
export declare function normalizeLongitudes(vertices: CoordPair[], refLng?: number): void;
export declare function scalePolygon(hexId: H3IndexInput, vertices: CoordPair[], factor: number): void;
export declare function getHexagonCentroid(getHexagon: any, object: any, objectInfo: any): number[];
export declare function h3ToPolygon(hexId: H3IndexInput, coverage?: number): number[][];
export declare function flattenPolygon(vertices: number[][]): Float64Array;
//# sourceMappingURL=h3-utils.d.ts.map