import type { ShaderModule } from '@luma.gl/shadertools';
import type { DataFilterExtensionOptions, DataFilterExtensionProps } from "./data-filter-extension.js";
export type Defines = {
    /**
     * Primitive type of parameter used for category filtering. If undefined, category filtering disabled.
     */
    DATACATEGORY_TYPE?: 'uint' | 'uvec2' | 'uvec3' | 'uvec4';
    /**
     * Number of category filtering channels. Must match dimension of `DATACATEGORY_TYPE`
     */
    DATACATEGORY_CHANNELS?: 1 | 2 | 3 | 4;
    /**
     * Primitive type of parameter used for numeric filtering. If undefined, numeric filtering disabled.
     */
    DATAFILTER_TYPE?: 'float' | 'vec2' | 'vec3' | 'vec4';
    /**
     * Enable 64-bit precision in numeric filter.
     */
    DATAFILTER_DOUBLE?: boolean;
};
export type CategoryBitMask = Uint32Array;
export type DataFilterModuleProps = {
    extensions: any[];
    categoryBitMask?: CategoryBitMask;
} & DataFilterExtensionProps;
type UniformTypesFunc = (opts: DataFilterExtensionOptions) => any;
export declare const dataFilter: ShaderModule<DataFilterModuleProps> & {
    uniformTypesFromOptions: UniformTypesFunc;
};
export declare const dataFilter64: ShaderModule<DataFilterModuleProps> & {
    uniformTypesFromOptions: UniformTypesFunc;
};
export {};
//# sourceMappingURL=shader-module.d.ts.map