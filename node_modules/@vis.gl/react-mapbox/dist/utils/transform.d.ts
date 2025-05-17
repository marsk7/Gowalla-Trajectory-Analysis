import type { MapboxProps } from "../mapbox/mapbox.js";
import type { ViewState } from "../types/common.js";
import type { Transform } from "../types/internal.js";
/**
 * Make a copy of a transform
 * @param tr
 */
export declare function cloneTransform(tr: Transform): Transform;
/**
 * Copy projection from one transform to another. This only applies to mapbox-gl transforms
 * @param src the transform to copy projection settings from
 * @param dest to transform to copy projection settings to
 */
export declare function syncProjection(src: Transform, dest: Transform): void;
/**
 * Capture a transform's current state
 * @param transform
 * @returns descriptor of the view state
 */
export declare function transformToViewState(tr: Transform): ViewState;
/**
 * Mutate a transform to match the given view state
 * @param transform
 * @param viewState
 * @returns true if the transform has changed
 */
export declare function applyViewStateToTransform(tr: Transform, props: MapboxProps): boolean;
//# sourceMappingURL=transform.d.ts.map