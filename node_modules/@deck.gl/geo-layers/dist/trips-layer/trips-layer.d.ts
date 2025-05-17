import type { NumericArray } from '@math.gl/core';
import { AccessorFunction, DefaultProps } from '@deck.gl/core';
import { PathLayer, PathLayerProps } from '@deck.gl/layers';
/** All properties supported by TripsLayer. */
export type TripsLayerProps<DataT = unknown> = _TripsLayerProps<DataT> & PathLayerProps<DataT>;
/** Properties added by TripsLayer. */
type _TripsLayerProps<DataT = unknown> = {
    /**
     * Whether or not the path fades out.
     * @default true
     */
    fadeTrail?: boolean;
    /**
     * Trail length.
     * @default 120
     */
    trailLength?: number;
    /**
     * The current time of the frame.
     * @default 0
     */
    currentTime?: number;
    /**
     * Timestamp accessor.
     */
    getTimestamps?: AccessorFunction<DataT, NumericArray>;
};
/** Render animated paths that represent vehicle trips. */
export default class TripsLayer<DataT = any, ExtraProps extends {} = {}> extends PathLayer<DataT, Required<_TripsLayerProps<DataT>> & ExtraProps> {
    static layerName: string;
    static defaultProps: DefaultProps<TripsLayerProps<unknown>>;
    getShaders(): any;
    initializeState(): void;
    draw(params: any): void;
}
export {};
//# sourceMappingURL=trips-layer.d.ts.map