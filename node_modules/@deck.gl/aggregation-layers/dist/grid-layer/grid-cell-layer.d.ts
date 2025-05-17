import { Texture } from '@luma.gl/core';
import { UpdateParameters, Color } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import type { ScaleType } from "../common/types.js";
/** Proprties added by GridCellLayer. */
type GridCellLayerProps = {
    cellSizeCommon: [number, number];
    cellOriginCommon: [number, number];
    colorDomain: [number, number];
    colorCutoff: [number, number] | null;
    colorRange: Color[];
    colorScaleType: ScaleType;
    elevationDomain: [number, number];
    elevationCutoff: [number, number] | null;
    elevationRange: [number, number];
};
export declare class GridCellLayer<ExtraPropsT extends {} = {}> extends ColumnLayer<null, ExtraPropsT & Required<GridCellLayerProps>> {
    static layerName: string;
    state: ColumnLayer['state'] & {
        colorTexture: Texture;
    };
    getShaders(): any;
    initializeState(): void;
    updateState(params: UpdateParameters<this>): void;
    finalizeState(context: any): void;
    protected _updateGeometry(): void;
    draw({ uniforms }: {
        uniforms: any;
    }): void;
}
export {};
//# sourceMappingURL=grid-cell-layer.d.ts.map