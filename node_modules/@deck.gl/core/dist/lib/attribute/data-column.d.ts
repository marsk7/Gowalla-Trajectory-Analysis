import type { Device } from '@luma.gl/core';
import { Buffer, BufferLayout, VertexType } from '@luma.gl/core';
import type { TypedArray, NumericArray, TypedArrayConstructor } from "../../types/types.js";
export type DataType = Exclude<VertexType, 'float16'>;
export type LogicalDataType = DataType | 'float64';
export type BufferAccessor = {
    /** Vertex data type. */
    type?: DataType;
    /** The number of elements per vertex attribute. */
    size?: number;
    /** Offset of the first vertex attribute into the buffer, in bytes. */
    offset?: number;
    /** The offset between the beginning of consecutive vertex attributes, in bytes. */
    stride?: number;
};
export type ShaderAttributeOptions = Partial<BufferAccessor> & {
    offset: number;
    stride: number;
    vertexOffset?: number;
    elementOffset?: number;
};
export type DataColumnOptions<Options> = Options & Omit<BufferAccessor, 'type'> & {
    id?: string;
    vertexOffset?: number;
    fp64?: boolean;
    /** Vertex data type.
     * @default 'float32'
     */
    type?: LogicalDataType;
    /** Internal API, use `type` instead */
    logicalType?: LogicalDataType;
    isIndexed?: boolean;
    defaultValue?: number | number[];
};
export type DataColumnSettings<Options> = DataColumnOptions<Options> & {
    type: DataType;
    size: number;
    logicalType?: LogicalDataType;
    normalized: boolean;
    bytesPerElement: number;
    defaultValue: number[];
    defaultType: TypedArrayConstructor;
};
type DataColumnInternalState<Options, State> = State & {
    externalBuffer: Buffer | null;
    bufferAccessor: DataColumnSettings<Options>;
    allocatedValue: TypedArray | null;
    numInstances: number;
    bounds: [number[], number[]] | null;
    constant: boolean;
};
export default class DataColumn<Options, State> {
    device: Device;
    id: string;
    size: number;
    settings: DataColumnSettings<Options>;
    value: NumericArray | null;
    doublePrecision: boolean;
    protected _buffer: Buffer | null;
    protected state: DataColumnInternalState<Options, State>;
    constructor(device: Device, opts: DataColumnOptions<Options>, state: State);
    get isConstant(): boolean;
    get buffer(): Buffer;
    get byteOffset(): number;
    get numInstances(): number;
    set numInstances(n: number);
    delete(): void;
    getBuffer(): Buffer | null;
    getValue(attributeName?: string, options?: Partial<ShaderAttributeOptions> | null): Record<string, Buffer | TypedArray | null>;
    protected _getBufferLayout(attributeName?: string, options?: Partial<ShaderAttributeOptions> | null): BufferLayout;
    setAccessor(accessor: DataColumnSettings<Options>): void;
    getAccessor(): DataColumnSettings<Options>;
    getBounds(): [number[], number[]] | null;
    setData(data: TypedArray | Buffer | ({
        constant?: boolean;
        value?: NumericArray;
        buffer?: Buffer;
        /** Set to `true` if supplying float values to a unorm attribute */
        normalized?: boolean;
    } & Partial<BufferAccessor>)): boolean;
    updateSubBuffer(opts?: {
        startOffset?: number;
        endOffset?: number;
    }): void;
    allocate(numInstances: number, copy?: boolean): boolean;
    protected _checkExternalBuffer(opts: {
        value?: NumericArray;
        normalized?: boolean;
    }): void;
    normalizeConstant(value: NumericArray): NumericArray;
    protected _normalizeValue(value: any, out: NumericArray, start: number): NumericArray;
    protected _areValuesEqual(value1: any, value2: any): boolean;
    protected _createBuffer(byteLength: number): Buffer;
}
export {};
//# sourceMappingURL=data-column.d.ts.map