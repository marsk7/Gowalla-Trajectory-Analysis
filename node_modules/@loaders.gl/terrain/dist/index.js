// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { parseFromContext } from '@loaders.gl/loader-utils';
import { parseQuantizedMesh } from "./lib/parse-quantized-mesh.js";
import { makeTerrainMeshFromImage } from "./lib/parse-terrain.js";
import { TerrainLoader as TerrainWorkerLoader } from "./terrain-loader.js";
import { QuantizedMeshLoader as QuantizedMeshWorkerLoader } from "./quantized-mesh-loader.js";
// TerrainLoader
export { TerrainWorkerLoader };
export const TerrainLoader = {
    ...TerrainWorkerLoader,
    parse: parseTerrain
};
export async function parseTerrain(arrayBuffer, options, context) {
    const loadImageOptions = {
        ...options,
        mimeType: 'application/x.image',
        image: { ...options?.image, type: 'data' }
    };
    const image = await parseFromContext(arrayBuffer, [], loadImageOptions, context);
    // Extend function to support additional mesh generation options (square grid or delatin)
    const terrainOptions = { ...TerrainLoader.options.terrain, ...options?.terrain };
    // @ts-expect-error sort out image typing asap
    return makeTerrainMeshFromImage(image, terrainOptions);
}
// QuantizedMeshLoader
export { QuantizedMeshWorkerLoader };
/**
 * Loader for quantized meshes
 */
export const QuantizedMeshLoader = {
    ...QuantizedMeshWorkerLoader,
    parseSync: (arrayBuffer, options) => parseQuantizedMesh(arrayBuffer, options?.['quantized-mesh']),
    parse: async (arrayBuffer, options) => parseQuantizedMesh(arrayBuffer, options?.['quantized-mesh'])
};
