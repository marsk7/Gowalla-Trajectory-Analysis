import type { Device, Buffer, VertexFormat } from '@luma.gl/core';
import { NumericArray } from "../types/types.js";
import Attribute from "../lib/attribute/attribute.js";
/** Create a new empty attribute with the same settings: type, shader layout etc. */
export declare function cloneAttribute(attribute: Attribute): Attribute;
/** Returns the GLSL attribute type for the given number of float32 components. */
export declare function getAttributeTypeFromSize(size: number): string;
/** Returns the {@link VertexFormat} for the given number of float32 components. */
export declare function getFloat32VertexFormat(size: number): VertexFormat;
export declare function cycleBuffers(buffers: Buffer[]): void;
export declare function getAttributeBufferLength(attribute: Attribute, numInstances: number): number;
export declare function matchBuffer({ device, source, target }: {
    device: Device;
    source: Buffer;
    target?: Buffer;
}): Buffer;
export declare function padBuffer({ device, buffer, attribute, fromLength, toLength, fromStartIndices, getData }: {
    device: Device;
    buffer?: Buffer;
    attribute: Attribute;
    fromLength: number;
    toLength: number;
    fromStartIndices?: NumericArray | null;
    getData?: (toValue: NumericArray, chunk?: NumericArray) => NumericArray;
}): Buffer;
//# sourceMappingURL=gpu-transition-utils.d.ts.map