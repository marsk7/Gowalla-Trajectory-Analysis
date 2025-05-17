import { CompositeLayer, LayerDataSource, LayerContext, UpdateParameters, CompositeLayerProps, Attribute, AttributeManager } from '@deck.gl/core';
import { Aggregator } from "./aggregator/aggregator.js";
export type AggregationLayerProps<DataT> = CompositeLayerProps & {
    data: LayerDataSource<DataT>;
};
export default abstract class AggregationLayer<DataT, ExtraPropsT extends {} = {}> extends CompositeLayer<Required<AggregationLayer<DataT>> & ExtraPropsT> {
    static layerName: string;
    state: {
        aggregatorType: string;
        aggregator: Aggregator;
    };
    /** Allow this layer to participates in the draw cycle */
    get isDrawable(): boolean;
    abstract getAggregatorType(): string;
    /** Called to create an Aggregator instance */
    abstract createAggregator(type: string): Aggregator;
    /** Called when some attributes change, a chance to mark Aggregator as dirty */
    abstract onAttributeChange(id: string): void;
    initializeState(): void;
    updateState(params: UpdateParameters<this>): boolean;
    finalizeState(context: LayerContext): void;
    protected updateAttributes(changedAttributes: {
        [id: string]: Attribute;
    }): void;
    draw({ shaderModuleProps }: {
        shaderModuleProps: any;
    }): void;
    _getAttributeManager(): AttributeManager;
}
//# sourceMappingURL=aggregation-layer.d.ts.map