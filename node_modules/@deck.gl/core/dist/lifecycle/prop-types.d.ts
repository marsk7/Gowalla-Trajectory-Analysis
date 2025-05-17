import type Component from "./component.js";
import type { Color, TextureSource } from "../types/layer-props.js";
import type { SamplerProps } from '@luma.gl/core';
type BasePropType<ValueT> = {
    value: ValueT;
    async?: boolean;
    validate?: (value: any, propType: PropType) => boolean;
    equal?: (value1: ValueT, value2: ValueT, propType: PropType) => boolean;
};
/**
 * Normalized prop type definition
 */
export type PropType = BasePropType<any> & {
    type: string;
    name: string;
    transform?: (value: any, propType: PropType, component: Component<any>) => any;
    release?: (value: any, propType: PropType, component: Component<any>) => void;
};
type DefaultProp<T> = T | DeprecatedProp | BooleanPropType | NumberPropType | ColorPropType | ImagePropType | DataPropType<T> | ArrayPropType<T> | ObjectPropType<T> | AccessorPropType<T> | FunctionPropType<T>;
export type DefaultProps<PropsT extends {} = {}> = {
    [propName in keyof PropsT]?: DefaultProp<Required<PropsT>[propName]>;
};
type BooleanPropType = BasePropType<boolean> & {
    type: 'boolean';
};
type NumberPropType = BasePropType<number> & {
    type: 'number';
    min?: number;
    max?: number;
};
type ColorPropType = BasePropType<Color | null> & {
    type: 'color';
    optional?: boolean;
};
type ArrayPropType<T = any[]> = BasePropType<T> & {
    type: 'array';
    optional?: boolean;
    /** Ignore change in the prop value.
     * @default false
     */
    ignore?: boolean;
    /** Deep-compare two prop values. Only used if `ignore: false`.
     * When a number is supplied, used as the depth of deep-comparison. 0 is equivalent to shallow comparison, -1 is infinite depth
     * When a boolean is supplied, `true` is equivalent to `1` (shallow compare all child fields)
     * @default false
     */
    compare?: boolean | number;
};
type AccessorPropType<T = any> = BasePropType<T> & {
    type: 'accessor';
};
type FunctionPropType<T = Function> = BasePropType<T> & {
    type: 'function';
    optional?: boolean;
    /** @deprecated use `ignore` instead */
    compare?: boolean;
    /** Ignore change in the prop value.
     * @default true
     */
    ignore?: boolean;
};
type DataPropType<T = any> = BasePropType<T> & {
    type: 'data';
};
type ImagePropType = BasePropType<TextureSource | null> & {
    type: 'image';
    parameters?: SamplerProps;
};
type ObjectPropType<T = any> = BasePropType<T> & {
    type: 'object';
    optional?: boolean;
    /** Ignore change in the prop value.
     * @default false
     */
    ignore?: boolean;
    /** Deep-compare two prop values. Only used if `ignore: false`.
     * When a number is supplied, used as the depth of deep-comparison. 0 is equivalent to shallow comparison, -1 is infinite depth
     * When a boolean is supplied, `true` is equivalent to `1` (shallow compare all child fields)
     * @default false
     */
    compare?: boolean | number;
};
type DeprecatedProp = {
    deprecatedFor?: string | string[];
};
type PropTypeDef = DeprecatedProp | boolean | BooleanPropType | number | NumberPropType | string | DataPropType | number[] | ColorPropType | ArrayPropType | AccessorPropType | FunctionPropType | ImagePropType | ObjectPropType | null;
export declare function parsePropTypes(propDefs: Record<string, PropTypeDef>): {
    propTypes: Record<string, PropType>;
    defaultProps: Record<string, any>;
    deprecatedProps: Record<string, string[]>;
};
export {};
//# sourceMappingURL=prop-types.d.ts.map