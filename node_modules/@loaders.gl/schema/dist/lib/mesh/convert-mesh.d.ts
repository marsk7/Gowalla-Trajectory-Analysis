import type { Mesh } from "../../types/category-mesh.js";
import type { ColumnarTable, ArrowTable } from "../../types/category-table.js";
type TargetShape = 'mesh' | 'columnar-table' | 'arrow-table';
/**
 * Convert a mesh to a specific shape
 */
export declare function convertMesh(mesh: Mesh, shape: TargetShape, options?: any): Mesh | ColumnarTable | ArrowTable;
/**
 * Convert a loaders.gl Mesh to a Columnar Table
 * @param mesh
 * @returns
 */
export declare function convertMeshToColumnarTable(mesh: Mesh): ColumnarTable;
export {};
//# sourceMappingURL=convert-mesh.d.ts.map