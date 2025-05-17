import type { Layer, LayerContext, Accessor, UpdateParameters } from '@deck.gl/core';
import { LayerExtension } from '@deck.gl/core';
type FilterCategory = number | string;
export type DataFilterExtensionProps<DataT = any> = {
    /**
     * Accessor to retrieve the value for each object that it will be filtered by.
     * Returns either a number (if `filterSize: 1`) or an array of numbers.
     */
    getFilterValue?: Accessor<DataT, number | number[]>;
    /**
     * Accessor to retrieve the category (`number | string`) for each object that it will be filtered by.
     * Returns either a single category (if `filterSize: 1`) or an array of categories.
     */
    getFilterCategory?: Accessor<DataT, FilterCategory | FilterCategory[]>;
    /**
     * Enable/disable the data filter. If the data filter is disabled, all objects are rendered.
     * @default true
     */
    filterEnabled?: boolean;
    /**
     * The [min, max] bounds which defines whether an object should be rendered.
     * If an object's filtered value is within the bounds, the object will be rendered; otherwise it will be hidden.
     * @default [-1, 1]
     */
    filterRange?: [number, number] | [number, number][];
    /**
     * If specified, objects will be faded in/out instead of abruptly shown/hidden.
     * When the filtered value is outside of the bounds defined by `filterSoftRange` but still within the bounds defined by `filterRange`, the object will be rendered as "faded."
     * @default null
     */
    filterSoftRange?: [number, number] | [number, number][] | null;
    /**
     * When an object is "faded", manipulate its size so that it appears smaller or thinner. Only works if `filterSoftRange` is specified.
     * @default true
     */
    filterTransformSize?: boolean;
    /**
     * When an object is "faded", manipulate its opacity so that it appears more translucent. Only works if `filterSoftRange` is specified.
     * @default true
     */
    filterTransformColor?: boolean;
    /**
     * The categories which define whether an object should be rendered.
     * @default []
     */
    filterCategories?: FilterCategory[] | FilterCategory[][];
    /**
     * Only called if the `countItems` option is enabled.
     */
    onFilteredItemsChange?: (evt: {
        /** The id of the source layer. */
        id: string;
        /** The number of data objects that pass the filter. */
        count: number;
    }) => void;
};
export type DataFilterExtensionOptions = {
    /**
     * The size of the category filter (number of columns to filter by). The category filter can show/hide data based on 1-4 properties of each object. Set to `0` to disable category filtering.
     * @default 0
     */
    categorySize?: 0 | 1 | 2 | 3 | 4;
    /**
     * The size of the filter (number of columns to filter by). The data filter can show/hide data based on 1-4 numeric properties of each object. Set to `0` to disable numeric filtering.
     * @default 1
     */
    filterSize?: 0 | 1 | 2 | 3 | 4;
    /**
     * Use 64-bit precision instead of 32-bit.
     * @default false
     */
    fp64?: boolean;
    /**
     * If `true`, reports the number of filtered objects with the `onFilteredItemsChange` callback.
     * @default `false`.
     */
    countItems?: boolean;
};
/** Adds GPU-based data filtering functionalities to layers. It allows the layer to show/hide objects based on user-defined properties. */
export default class DataFilterExtension extends LayerExtension<Required<DataFilterExtensionOptions>> {
    static defaultProps: {
        getFilterValue: {
            type: string;
            value: number;
        };
        getFilterCategory: {
            type: string;
            value: number;
        };
        onFilteredItemsChange: {
            type: string;
            value: null;
            optional: boolean;
        };
        filterEnabled: boolean;
        filterRange: number[];
        filterSoftRange: null;
        filterCategories: number[];
        filterTransformSize: boolean;
        filterTransformColor: boolean;
    };
    static extensionName: string;
    constructor(opts?: DataFilterExtensionOptions);
    getShaders(this: Layer<DataFilterExtensionProps>, extension: this): any;
    initializeState(this: Layer<DataFilterExtensionProps>, context: LayerContext, extension: this): void;
    updateState(this: Layer<DataFilterExtensionProps>, { props, oldProps, changeFlags }: UpdateParameters<Layer<DataFilterExtensionProps>>, extension: this): void;
    draw(this: Layer<DataFilterExtensionProps>, params: any, extension: this): void;
    finalizeState(this: Layer<DataFilterExtensionProps>): void;
    /**
     * Updates the bitmask used on the GPU to perform the filter based on the
     * `filterCategories` prop. The mapping between categories and bit in the bitmask
     * is performed by `_getCategoryKey()`
     */
    _updateCategoryBitMask(this: Layer<DataFilterExtensionProps>, params: any, extension: this): void;
    /**
     * Returns an index of bit in the bitmask for a given category. If the category has
     * not yet been assigned a bit, a new one is assigned.
     */
    _getCategoryKey(this: Layer<DataFilterExtensionProps>, category: FilterCategory, channel: number): number;
}
export {};
//# sourceMappingURL=data-filter-extension.d.ts.map