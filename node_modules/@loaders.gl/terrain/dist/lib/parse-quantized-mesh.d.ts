import { Mesh } from '@loaders.gl/schema';
export type ParseQuantizedMeshOptions = {
    bounds?: [number, number, number, number];
    skirtHeight?: number | null;
};
export declare function parseQuantizedMesh(arrayBuffer: ArrayBuffer, options?: ParseQuantizedMeshOptions): Mesh;
//# sourceMappingURL=parse-quantized-mesh.d.ts.map