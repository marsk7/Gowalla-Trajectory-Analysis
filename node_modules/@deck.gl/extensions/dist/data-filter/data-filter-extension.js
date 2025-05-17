// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _deepEqual as deepEqual, LayerExtension, log } from '@deck.gl/core';
import { dataFilter, dataFilter64 } from "./shader-module.js";
import * as aggregator from "./aggregator.js";
const defaultProps = {
    getFilterValue: { type: 'accessor', value: 0 },
    getFilterCategory: { type: 'accessor', value: 0 },
    onFilteredItemsChange: { type: 'function', value: null, optional: true },
    filterEnabled: true,
    filterRange: [-1, 1],
    filterSoftRange: null,
    filterCategories: [0],
    filterTransformSize: true,
    filterTransformColor: true
};
const defaultOptions = {
    categorySize: 0,
    filterSize: 1,
    fp64: false,
    countItems: false
};
const CATEGORY_TYPE_FROM_SIZE = {
    1: 'uint',
    2: 'uvec2',
    3: 'uvec3',
    4: 'uvec4'
};
const DATA_TYPE_FROM_SIZE = {
    1: 'float',
    2: 'vec2',
    3: 'vec3',
    4: 'vec4'
};
/** Adds GPU-based data filtering functionalities to layers. It allows the layer to show/hide objects based on user-defined properties. */
class DataFilterExtension extends LayerExtension {
    constructor(opts = {}) {
        super({ ...defaultOptions, ...opts });
    }
    getShaders(extension) {
        const { categorySize, filterSize, fp64 } = extension.opts;
        const defines = {};
        if (categorySize) {
            defines.DATACATEGORY_TYPE = CATEGORY_TYPE_FROM_SIZE[categorySize];
            defines.DATACATEGORY_CHANNELS = categorySize;
        }
        if (filterSize) {
            defines.DATAFILTER_TYPE = DATA_TYPE_FROM_SIZE[filterSize];
            defines.DATAFILTER_DOUBLE = Boolean(fp64);
        }
        const module = fp64 ? dataFilter64 : dataFilter;
        module.uniformTypes = module.uniformTypesFromOptions(extension.opts);
        return { modules: [module], defines };
    }
    initializeState(context, extension) {
        const attributeManager = this.getAttributeManager();
        const { categorySize, filterSize, fp64 } = extension.opts;
        if (attributeManager) {
            if (filterSize) {
                attributeManager.add({
                    filterValues: {
                        size: filterSize,
                        type: fp64 ? 'float64' : 'float32',
                        stepMode: 'dynamic',
                        accessor: 'getFilterValue'
                    }
                });
            }
            if (categorySize) {
                attributeManager.add({
                    filterCategoryValues: {
                        size: categorySize,
                        stepMode: 'dynamic',
                        accessor: 'getFilterCategory',
                        type: 'uint32',
                        transform: categorySize === 1
                            ? d => extension._getCategoryKey.call(this, d, 0)
                            : d => d.map((x, i) => extension._getCategoryKey.call(this, x, i))
                    }
                });
            }
        }
        const { device } = this.context;
        if (attributeManager && extension.opts.countItems) {
            const useFloatTarget = aggregator.supportsFloatTarget(device);
            // This attribute is needed for variable-width data, e.g. Path, SolidPolygon, Text
            // The vertex shader checks if a vertex has the same "index" as the previous vertex
            // so that we only write one count cross multiple vertices of the same object
            attributeManager.add({
                filterVertexIndices: {
                    size: useFloatTarget ? 1 : 2,
                    vertexOffset: 1,
                    type: 'unorm8',
                    accessor: (object, { index }) => {
                        const i = object && object.__source ? object.__source.index : index;
                        return useFloatTarget ? (i + 1) % 255 : [(i + 1) % 255, Math.floor(i / 255) % 255];
                    },
                    shaderAttributes: {
                        filterPrevIndices: {
                            vertexOffset: 0
                        },
                        filterIndices: {
                            vertexOffset: 1
                        }
                    }
                }
            });
            const filterFBO = aggregator.getFramebuffer(device, useFloatTarget);
            const filterModel = aggregator.getModel(device, attributeManager.getBufferLayouts({ isInstanced: false }), extension.getShaders.call(this, extension), useFloatTarget);
            this.setState({ filterFBO, filterModel });
        }
    }
    // eslint-disable-next-line complexity
    updateState({ props, oldProps, changeFlags }, extension) {
        const attributeManager = this.getAttributeManager();
        const { categorySize } = extension.opts;
        if (this.state.filterModel) {
            const filterNeedsUpdate = 
            // attributeManager must be defined for filterModel to be set
            attributeManager.attributes.filterValues?.needsUpdate() ||
                attributeManager.attributes.filterCategoryValues?.needsUpdate() ||
                props.filterEnabled !== oldProps.filterEnabled ||
                props.filterRange !== oldProps.filterRange ||
                props.filterSoftRange !== oldProps.filterSoftRange ||
                props.filterCategories !== oldProps.filterCategories;
            if (filterNeedsUpdate) {
                this.setState({ filterNeedsUpdate });
            }
        }
        if (attributeManager?.attributes.filterCategoryValues) {
            // Update bitmask if accessor or selected categories has changed
            const categoryBitMaskNeedsUpdate = attributeManager.attributes.filterCategoryValues.needsUpdate() ||
                !deepEqual(props.filterCategories, oldProps.filterCategories, 2);
            if (categoryBitMaskNeedsUpdate) {
                this.setState({ categoryBitMask: null });
            }
            // Need to recreate category map if categorySize has changed
            const resetCategories = changeFlags.dataChanged;
            if (resetCategories) {
                this.setState({
                    categoryMap: Array(categorySize)
                        .fill(0)
                        .map(() => ({}))
                });
                attributeManager.attributes.filterCategoryValues.setNeedsUpdate('categoryMap');
            }
        }
    }
    // eslint-disable-next-line max-statements
    draw(params, extension) {
        const filterFBO = this.state.filterFBO;
        const filterModel = this.state.filterModel;
        const filterNeedsUpdate = this.state.filterNeedsUpdate;
        if (!this.state.categoryBitMask) {
            extension._updateCategoryBitMask.call(this, params, extension);
        }
        const { onFilteredItemsChange, extensions, filterEnabled, filterRange, filterSoftRange, filterTransformSize, filterTransformColor, filterCategories } = this.props;
        const dataFilterProps = {
            extensions,
            filterEnabled,
            filterRange,
            filterSoftRange,
            filterTransformSize,
            filterTransformColor,
            filterCategories
        };
        if (this.state.categoryBitMask) {
            dataFilterProps.categoryBitMask = this.state.categoryBitMask;
        }
        this.setShaderModuleProps({ dataFilter: dataFilterProps });
        /* eslint-disable-next-line camelcase */
        if (filterNeedsUpdate && onFilteredItemsChange && filterModel) {
            const attributeManager = this.getAttributeManager();
            const { attributes: { filterValues, filterCategoryValues, filterVertexIndices } } = attributeManager;
            filterModel.setVertexCount(this.getNumInstances());
            // @ts-expect-error filterValue and filterVertexIndices should always have buffer value
            const attributes = {
                ...filterValues?.getValue(),
                ...filterCategoryValues?.getValue(),
                ...filterVertexIndices?.getValue()
            };
            filterModel.setAttributes(attributes);
            filterModel.shaderInputs.setProps({
                dataFilter: dataFilterProps
            });
            const viewport = [0, 0, filterFBO.width, filterFBO.height];
            const renderPass = filterModel.device.beginRenderPass({
                id: 'data-filter-aggregation',
                framebuffer: filterFBO,
                parameters: { viewport },
                clearColor: [0, 0, 0, 0]
            });
            filterModel.setParameters(aggregator.parameters);
            filterModel.draw(renderPass);
            renderPass.end();
            const color = filterModel.device.readPixelsToArrayWebGL(filterFBO);
            let count = 0;
            for (let i = 0; i < color.length; i++) {
                count += color[i];
            }
            onFilteredItemsChange({ id: this.id, count });
            this.state.filterNeedsUpdate = false;
        }
    }
    finalizeState() {
        const filterFBO = this.state.filterFBO;
        const filterModel = this.state.filterModel;
        // filterFBO.color.delete();
        filterFBO?.destroy();
        filterModel?.destroy();
    }
    /**
     * Updates the bitmask used on the GPU to perform the filter based on the
     * `filterCategories` prop. The mapping between categories and bit in the bitmask
     * is performed by `_getCategoryKey()`
     */
    _updateCategoryBitMask(params, extension) {
        const { categorySize } = extension.opts;
        if (!categorySize)
            return;
        const { filterCategories } = this.props;
        const categoryBitMask = new Uint32Array([0, 0, 0, 0]);
        const categoryFilters = (categorySize === 1 ? [filterCategories] : filterCategories);
        const maxCategories = categorySize === 1 ? 128 : categorySize === 2 ? 64 : 32;
        for (let c = 0; c < categoryFilters.length; c++) {
            const categoryFilter = categoryFilters[c];
            for (const category of categoryFilter) {
                const key = extension._getCategoryKey.call(this, category, c);
                if (key < maxCategories) {
                    const channel = c * (maxCategories / 32) + Math.floor(key / 32);
                    categoryBitMask[channel] += Math.pow(2, key % 32); // 1 << key fails for key > 30
                }
                else {
                    log.warn(`Exceeded maximum number of categories (${maxCategories})`)();
                }
            }
        }
        this.state.categoryBitMask = categoryBitMask;
    }
    /**
     * Returns an index of bit in the bitmask for a given category. If the category has
     * not yet been assigned a bit, a new one is assigned.
     */
    _getCategoryKey(category, channel) {
        const categoryMap = this.state.categoryMap[channel];
        if (!(category in categoryMap)) {
            categoryMap[category] = Object.keys(categoryMap).length;
        }
        return categoryMap[category];
    }
}
DataFilterExtension.defaultProps = defaultProps;
DataFilterExtension.extensionName = 'DataFilterExtension';
export default DataFilterExtension;
//# sourceMappingURL=data-filter-extension.js.map