import type { Attribute } from '@deck.gl/core';
/** This is designed to mirror a vertex shader function
 * For each vertex, calculates a value from attribtes, vertex index and options (uniforms)
 */
export type VertexAccessor<ValueT, OptionsT = undefined> = {
    /** Attribute ids that provide input to getValue, used to index into the attributes map.
     * For example `['position', 'size']`
     */
    sources?: string[];
    /** Called for each data point to retrieve a value during update. */
    getValue: (
    /** Attributes at the vertex index */
    data: any, 
    /** Vertex index */
    index: number, 
    /** Shared options across all vertices */
    options: OptionsT) => ValueT;
};
/** Evaluate a VertexAccessor with a set of attributes */
export declare function evaluateVertexAccessor<ValueT, OptionsT>(accessor: VertexAccessor<ValueT, OptionsT>, attributes: Record<string, Attribute>, options: OptionsT): (vertexIndex: number) => ValueT;
//# sourceMappingURL=vertex-accessor.d.ts.map