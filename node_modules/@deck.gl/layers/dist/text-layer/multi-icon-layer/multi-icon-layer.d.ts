import IconLayer from "../../icon-layer/icon-layer.js";
import type { IconLayerProps } from "../../icon-layer/icon-layer.js";
import type { Accessor, Color, UpdateParameters, DefaultProps } from '@deck.gl/core';
type _MultiIconLayerProps<DataT> = {
    getIconOffsets?: Accessor<DataT, number[]>;
    sdf?: boolean;
    smoothing?: number;
    outlineWidth?: number;
    outlineColor?: Color;
};
export type MultiIconLayerProps<DataT = unknown> = _MultiIconLayerProps<DataT> & IconLayerProps<DataT>;
export default class MultiIconLayer<DataT, ExtraPropsT extends {} = {}> extends IconLayer<DataT, ExtraPropsT & Required<_MultiIconLayerProps<DataT>>> {
    static defaultProps: DefaultProps<MultiIconLayerProps<unknown>>;
    static layerName: string;
    state: IconLayer['state'] & {
        outlineColor: [number, number, number, number];
    };
    getShaders(): any;
    initializeState(): void;
    updateState(params: UpdateParameters<this>): void;
    draw(params: any): void;
    protected getInstanceOffset(icons: string): number[];
    getInstanceColorMode(icons: string): number;
    getInstanceIconFrame(icons: string): number[];
}
export {};
//# sourceMappingURL=multi-icon-layer.d.ts.map