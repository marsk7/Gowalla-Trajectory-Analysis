import { DefaultProps } from '@deck.gl/core';
import { ArcLayer, ArcLayerProps } from '@deck.gl/layers';
/** All properties supported by GreatCircleLayer. */
export type GreatCircleLayerProps<DataT = unknown> = ArcLayerProps<DataT>;
/** @deprecated Use ArcLayer with `greatCircle: true` instead */
export default class GreatCircleLayer<DataT = any, ExtraProps extends {} = {}> extends ArcLayer<DataT, ExtraProps> {
    static layerName: string;
    static defaultProps: DefaultProps<ArcLayerProps>;
}
//# sourceMappingURL=great-circle-layer.d.ts.map