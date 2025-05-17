import { NumericProp } from "./carto-tile.js";
export interface Tile {
    properties: Record<string, string>[];
    numericProps: Record<string, NumericProp>;
}
export declare class TileReader {
    static read(pbf: any, end?: number): Tile;
    static _readField(this: void, tag: number, obj: Tile, pbf: any): void;
}
//# sourceMappingURL=carto-properties-tile.d.ts.map