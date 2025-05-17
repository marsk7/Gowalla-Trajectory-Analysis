import type { Subtree, Availability } from "../../../types.js";
import type { LoaderContext, LoaderOptions } from '@loaders.gl/loader-utils';
/**
 * Parse subtree file
 * Spec - https://github.com/CesiumGS/3d-tiles/tree/main/extensions/3DTILES_implicit_tiling#subtree-file-format
 * @param data
 * @returns
 */
export default function parse3DTilesSubtree(data: ArrayBuffer, options: LoaderOptions | undefined, context: LoaderContext | undefined): Promise<Subtree>;
/**
 * Load explicit bitstream for subtree availability data.
 * @param subtree - subtree data
 * @param availabilityObject - tileAvailability / contentAvailability / childSubtreeAvailability object
 * @param internalBinaryBuffer - subtree binary buffer
 * @param context - loaders.gl context
 */
export declare function loadExplicitBitstream(subtree: Subtree, availabilityObject: Availability, internalBinaryBuffer: ArrayBuffer, context: LoaderContext | undefined): Promise<void>;
//# sourceMappingURL=parse-3d-tile-subtree.d.ts.map