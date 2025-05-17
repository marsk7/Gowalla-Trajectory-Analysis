import type { DefaultProps } from '@deck.gl/core';
import ColumnLayer, { ColumnLayerProps } from "./column-layer.js";
/** All properties supported by GridCellLayer. */
export type GridCellLayerProps<DataT = unknown> = _GridCellLayerProps & ColumnLayerProps<DataT>;
/** Properties added by GridCellLayer. */
type _GridCellLayerProps = {
    /**
     * @default 1000
     */
    cellSize?: number;
};
export default class GridCellLayer<DataT = any, ExtraPropsT extends {} = {}> extends ColumnLayer<DataT, ExtraPropsT & Required<_GridCellLayerProps>> {
    static layerName: string;
    static defaultProps: DefaultProps<GridCellLayerProps<unknown>>;
    protected _updateGeometry(): void;
    draw({ uniforms }: {
        uniforms: any;
    }): void;
}
export {};
//# sourceMappingURL=grid-cell-layer.d.ts.map