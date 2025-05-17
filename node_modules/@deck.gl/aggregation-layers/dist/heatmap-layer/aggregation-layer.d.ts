import { CompositeLayer, AttributeManager, LayerDataSource, UpdateParameters, CompositeLayerProps, Attribute } from '@deck.gl/core';
export type AggregationLayerProps<DataT> = CompositeLayerProps & {
    data: LayerDataSource<DataT>;
};
/** Legacy AggregationLayer, to be removed in v9.1 */
export default abstract class AggregationLayer<DataT, ExtraPropsT extends {} = {}> extends CompositeLayer<Required<AggregationLayer<DataT>> & ExtraPropsT> {
    static layerName: string;
    state: {
        ignoreProps?: Record<string, any>;
        dimensions?: any;
        changedAttributes?: Record<string, any>;
    };
    initializeAggregationLayer(dimensions: any): void;
    updateState(opts: UpdateParameters<this>): void;
    updateAttributes(changedAttributes: any): void;
    getAttributes(): {
        [id: string]: Attribute;
    };
    getModuleSettings(): any;
    updateShaders(shaders: any): void;
    /**
     * Checks if aggregation is dirty
     * @param {Object} updateOpts - object {props, oldProps, changeFlags}
     * @param {Object} params - object {dimension, compareAll}
     * @param {Object} params.dimension - {props, accessors} array of props and/or accessors
     * @param {Boolean} params.compareAll - when `true` it will include non layer props for comparision
     * @returns {Boolean} - returns true if dimensions' prop or accessor is changed
     **/
    isAggregationDirty(updateOpts: any, params?: {
        compareAll?: boolean;
        dimension?: any;
    }): string | boolean;
    /**
     * Checks if an attribute is changed
     * @param {String} name - name of the attribute
     * @returns {Boolean} - `true` if attribute `name` is changed, `false` otherwise,
     *                       If `name` is not passed or `undefiend`, `true` if any attribute is changed, `false` otherwise
     **/
    isAttributeChanged(name?: string): boolean | undefined;
    _getAttributeManager(): AttributeManager;
}
//# sourceMappingURL=aggregation-layer.d.ts.map