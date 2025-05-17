// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/**
 * Convert a mesh to a specific shape
 */
export function convertMesh(mesh, shape, options) {
    switch (shape || 'mesh') {
        case 'mesh':
            return mesh;
        case 'columnar-table':
            return convertMeshToColumnarTable(mesh);
        // case 'arrow-table':
        //   return {
        //     shape: 'arrow-table',
        //     data: convertMeshToArrowTable(mesh)
        //   };
        default:
            throw new Error(`Unsupported shape ${options?.shape}`);
    }
}
/**
 * Convert a loaders.gl Mesh to a Columnar Table
 * @param mesh
 * @returns
 */
export function convertMeshToColumnarTable(mesh) {
    const columns = {};
    for (const [columnName, attribute] of Object.entries(mesh.attributes)) {
        columns[columnName] = attribute.value;
    }
    return {
        shape: 'columnar-table',
        schema: mesh.schema,
        data: columns
    };
}
