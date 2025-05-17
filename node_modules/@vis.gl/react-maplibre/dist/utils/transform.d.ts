import type { MaplibreProps } from "../maplibre/maplibre.js";
import type { ViewState } from "../types/common.js";
import type { TransformLike } from "../types/internal.js";
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export declare function transformToViewState(tr: TransformLike): ViewState;
/**
 * Applies requested view state to a transform
 * @returns an object containing detected changes
 */
export declare function applyViewStateToTransform(
/** An object that describes Maplibre's camera state */
tr: TransformLike, 
/** Props from Map component */
props: MaplibreProps): Partial<TransformLike>;
//# sourceMappingURL=transform.d.ts.map