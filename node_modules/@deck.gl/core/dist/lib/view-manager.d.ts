import type Controller from "../controllers/controller.js";
import type { ViewStateChangeParameters, InteractionState } from "../controllers/controller.js";
import type Viewport from "../viewports/viewport.js";
import type View from "../views/view.js";
import type { Timeline } from '@luma.gl/engine';
import type { EventManager } from 'mjolnir.js';
import type { default as MapView, MapViewState } from "../views/map-view.js";
export type ViewOrViews = View | View[] | null;
type ViewStateOf<ViewT> = ViewT extends View<infer ViewStateT> ? ViewStateT : never;
type OneOfViews<ViewsT extends ViewOrViews> = ViewsT extends null ? MapView : ViewsT extends View[] ? ViewsT[number] : ViewsT;
export type AnyViewStateOf<ViewsT extends ViewOrViews> = ViewStateOf<OneOfViews<ViewsT>>;
export type ViewStateMap<ViewsT extends ViewOrViews> = ViewsT extends null ? MapViewState : ViewsT extends View ? ViewStateOf<ViewsT> : {
    [viewId: string]: AnyViewStateOf<ViewsT>;
};
/** This is a very lose type of all "acceptable" viewState
 * It's not good for type hinting but matches what may exist internally
 */
export type ViewStateObject<ViewsT extends ViewOrViews> = ViewStateMap<ViewsT> | AnyViewStateOf<ViewsT> | {
    [viewId: string]: AnyViewStateOf<ViewsT>;
};
/** ViewManager props directly supplied by the user */
type ViewManagerProps<ViewsT extends ViewOrViews> = {
    views: ViewsT;
    viewState: ViewStateObject<ViewsT> | null;
    onViewStateChange?: (params: ViewStateChangeParameters<AnyViewStateOf<ViewsT>>) => void;
    onInteractionStateChange?: (state: InteractionState) => void;
    width?: number;
    height?: number;
};
export default class ViewManager<ViewsT extends View[]> {
    width: number;
    height: number;
    views: View[];
    viewState: ViewStateObject<ViewsT>;
    controllers: {
        [viewId: string]: Controller<any> | null;
    };
    timeline: Timeline;
    private _viewports;
    private _viewportMap;
    private _isUpdating;
    private _needsRedraw;
    private _needsUpdate;
    private _eventManager;
    private _eventCallbacks;
    constructor(props: ViewManagerProps<ViewsT> & {
        timeline: Timeline;
        eventManager: EventManager;
    });
    /** Remove all resources and event listeners */
    finalize(): void;
    /** Check if a redraw is needed */
    needsRedraw(opts?: {
        /** Reset redraw flags to false */
        clearRedrawFlags?: boolean;
    }): string | false;
    /** Mark the manager as dirty. Will rebuild all viewports and update controllers. */
    setNeedsUpdate(reason: string): void;
    /** Checks each viewport for transition updates */
    updateViewStates(): void;
    /** Get a set of viewports for a given width and height
     * TODO - Intention is for deck.gl to autodeduce width and height and drop the need for props
     * @param rect (object, optional) - filter the viewports
     *   + not provided - return all viewports
     *   + {x, y} - only return viewports that contain this pixel
     *   + {x, y, width, height} - only return viewports that overlap with this rectangle
     */
    getViewports(rect?: {
        x: number;
        y: number;
        width?: number;
        height?: number;
    }): Viewport[];
    /** Get a map of all views */
    getViews(): {
        [viewId: string]: View;
    };
    /** Resolves a viewId string to a View */
    getView(viewId: string): View | undefined;
    /** Returns the viewState for a specific viewId. Matches the viewState by
      1. view.viewStateId
      2. view.id
      3. root viewState
      then applies the view's filter if any */
    getViewState(viewOrViewId: string | View): AnyViewStateOf<ViewsT>;
    getViewport(viewId: string): Viewport | undefined;
    /**
     * Unproject pixel coordinates on screen onto world coordinates,
     * (possibly [lon, lat]) on map.
     * - [x, y] => [lng, lat]
     * - [x, y, z] => [lng, lat, Z]
     * @param {Array} xyz -
     * @param {Object} opts - options
     * @param {Object} opts.topLeft=true - Whether origin is top left
     * @return {Array|null} - [lng, lat, Z] or [X, Y, Z]
     */
    unproject(xyz: number[], opts?: {
        topLeft?: boolean;
    }): number[] | null;
    /** Update the manager with new Deck props */
    setProps(props: Partial<ViewManagerProps<ViewsT>>): void;
    private _update;
    private _setSize;
    private _setViews;
    private _setViewState;
    private _createController;
    private _updateController;
    private _rebuildViewports;
    _buildViewportMap(): void;
    _diffViews(newViews: View[], oldViews: View[]): boolean;
}
export {};
//# sourceMappingURL=view-manager.d.ts.map