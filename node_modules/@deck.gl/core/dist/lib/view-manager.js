// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { deepEqual } from "../utils/deep-equal.js";
import log from "../utils/log.js";
import { flatten } from "../utils/flatten.js";
export default class ViewManager {
    constructor(props) {
        // List of view descriptors, gets re-evaluated when width/height changes
        this.views = [];
        this.width = 100;
        this.height = 100;
        this.viewState = {};
        this.controllers = {};
        this.timeline = props.timeline;
        this._viewports = []; // Generated viewports
        this._viewportMap = {};
        this._isUpdating = false;
        this._needsRedraw = 'First render';
        this._needsUpdate = 'Initialize';
        this._eventManager = props.eventManager;
        this._eventCallbacks = {
            onViewStateChange: props.onViewStateChange,
            onInteractionStateChange: props.onInteractionStateChange
        };
        Object.seal(this);
        // Init with default map viewport
        this.setProps(props);
    }
    /** Remove all resources and event listeners */
    finalize() {
        for (const key in this.controllers) {
            const controller = this.controllers[key];
            if (controller) {
                controller.finalize();
            }
        }
        this.controllers = {};
    }
    /** Check if a redraw is needed */
    needsRedraw(opts = { clearRedrawFlags: false }) {
        const redraw = this._needsRedraw;
        if (opts.clearRedrawFlags) {
            this._needsRedraw = false;
        }
        return redraw;
    }
    /** Mark the manager as dirty. Will rebuild all viewports and update controllers. */
    setNeedsUpdate(reason) {
        this._needsUpdate = this._needsUpdate || reason;
        this._needsRedraw = this._needsRedraw || reason;
    }
    /** Checks each viewport for transition updates */
    updateViewStates() {
        for (const viewId in this.controllers) {
            const controller = this.controllers[viewId];
            if (controller) {
                controller.updateTransition();
            }
        }
    }
    /** Get a set of viewports for a given width and height
     * TODO - Intention is for deck.gl to autodeduce width and height and drop the need for props
     * @param rect (object, optional) - filter the viewports
     *   + not provided - return all viewports
     *   + {x, y} - only return viewports that contain this pixel
     *   + {x, y, width, height} - only return viewports that overlap with this rectangle
     */
    getViewports(rect) {
        if (rect) {
            return this._viewports.filter(viewport => viewport.containsPixel(rect));
        }
        return this._viewports;
    }
    /** Get a map of all views */
    getViews() {
        const viewMap = {};
        this.views.forEach(view => {
            viewMap[view.id] = view;
        });
        return viewMap;
    }
    /** Resolves a viewId string to a View */
    getView(viewId) {
        return this.views.find(view => view.id === viewId);
    }
    /** Returns the viewState for a specific viewId. Matches the viewState by
      1. view.viewStateId
      2. view.id
      3. root viewState
      then applies the view's filter if any */
    getViewState(viewOrViewId) {
        const view = typeof viewOrViewId === 'string' ? this.getView(viewOrViewId) : viewOrViewId;
        // Backward compatibility: view state for single view
        const viewState = (view && this.viewState[view.getViewStateId()]) || this.viewState;
        return view ? view.filterViewState(viewState) : viewState;
    }
    getViewport(viewId) {
        return this._viewportMap[viewId];
    }
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
    unproject(xyz, opts) {
        const viewports = this.getViewports();
        const pixel = { x: xyz[0], y: xyz[1] };
        for (let i = viewports.length - 1; i >= 0; --i) {
            const viewport = viewports[i];
            if (viewport.containsPixel(pixel)) {
                const p = xyz.slice();
                p[0] -= viewport.x;
                p[1] -= viewport.y;
                return viewport.unproject(p, opts);
            }
        }
        return null;
    }
    /** Update the manager with new Deck props */
    setProps(props) {
        if (props.views) {
            this._setViews(props.views);
        }
        if (props.viewState) {
            this._setViewState(props.viewState);
        }
        if ('width' in props || 'height' in props) {
            this._setSize(props.width, props.height);
        }
        // Important: avoid invoking _update() inside itself
        // Nested updates result in unexpected side effects inside _rebuildViewports()
        // when using auto control in pure-js
        if (!this._isUpdating) {
            this._update();
        }
    }
    //
    // PRIVATE METHODS
    //
    _update() {
        this._isUpdating = true;
        // Only rebuild viewports if the update flag is set
        if (this._needsUpdate) {
            this._needsUpdate = false;
            this._rebuildViewports();
        }
        // If viewport transition(s) are triggered during viewports update, controller(s)
        // will immediately call `onViewStateChange` which calls `viewManager.setProps` again.
        if (this._needsUpdate) {
            this._needsUpdate = false;
            this._rebuildViewports();
        }
        this._isUpdating = false;
    }
    _setSize(width, height) {
        if (width !== this.width || height !== this.height) {
            this.width = width;
            this.height = height;
            this.setNeedsUpdate('Size changed');
        }
    }
    // Update the view descriptor list and set change flag if needed
    // Does not actually rebuild the `Viewport`s until `getViewports` is called
    _setViews(views) {
        views = flatten(views, Boolean);
        const viewsChanged = this._diffViews(views, this.views);
        if (viewsChanged) {
            this.setNeedsUpdate('views changed');
        }
        this.views = views;
    }
    _setViewState(viewState) {
        if (viewState) {
            // depth = 3 when comparing viewStates: viewId.position.0
            const viewStateChanged = !deepEqual(viewState, this.viewState, 3);
            if (viewStateChanged) {
                this.setNeedsUpdate('viewState changed');
            }
            this.viewState = viewState;
        }
        else {
            log.warn('missing `viewState` or `initialViewState`')();
        }
    }
    _createController(view, props) {
        const Controller = props.type;
        const controller = new Controller({
            timeline: this.timeline,
            eventManager: this._eventManager,
            // Set an internal callback that calls the prop callback if provided
            onViewStateChange: this._eventCallbacks.onViewStateChange,
            onStateChange: this._eventCallbacks.onInteractionStateChange,
            makeViewport: viewState => this.getView(view.id)?.makeViewport({
                viewState,
                width: this.width,
                height: this.height
            })
        });
        return controller;
    }
    _updateController(view, viewState, viewport, controller) {
        const controllerProps = view.controller;
        if (controllerProps && viewport) {
            const resolvedProps = {
                ...viewState,
                ...controllerProps,
                id: view.id,
                x: viewport.x,
                y: viewport.y,
                width: viewport.width,
                height: viewport.height
            };
            // Create controller if not already existing or if the type of the
            // controller has changed.
            if (!controller || controller.constructor !== controllerProps.type) {
                controller = this._createController(view, resolvedProps);
            }
            if (controller) {
                controller.setProps(resolvedProps);
            }
            return controller;
        }
        return null;
    }
    // Rebuilds viewports from descriptors towards a certain window size
    _rebuildViewports() {
        const { views } = this;
        const oldControllers = this.controllers;
        this._viewports = [];
        this.controllers = {};
        let invalidateControllers = false;
        // Create controllers in reverse order, so that views on top receive events first
        for (let i = views.length; i--;) {
            const view = views[i];
            const viewState = this.getViewState(view);
            const viewport = view.makeViewport({ viewState, width: this.width, height: this.height });
            let oldController = oldControllers[view.id];
            const hasController = Boolean(view.controller);
            if (hasController && !oldController) {
                // When a new controller is added, invalidate all controllers below it so that
                // events are registered in the correct order
                invalidateControllers = true;
            }
            if ((invalidateControllers || !hasController) && oldController) {
                // Remove and reattach invalidated controller
                oldController.finalize();
                oldController = null;
            }
            // Update the controller
            this.controllers[view.id] = this._updateController(view, viewState, viewport, oldController);
            if (viewport) {
                this._viewports.unshift(viewport);
            }
        }
        // Remove unused controllers
        for (const id in oldControllers) {
            const oldController = oldControllers[id];
            if (oldController && !this.controllers[id]) {
                oldController.finalize();
            }
        }
        this._buildViewportMap();
    }
    _buildViewportMap() {
        // Build a view id to view index
        this._viewportMap = {};
        this._viewports.forEach(viewport => {
            if (viewport.id) {
                // TODO - issue warning if multiple viewports use same id
                this._viewportMap[viewport.id] = this._viewportMap[viewport.id] || viewport;
            }
        });
    }
    // Check if viewport array has changed, returns true if any change
    // Note that descriptors can be the same
    _diffViews(newViews, oldViews) {
        if (newViews.length !== oldViews.length) {
            return true;
        }
        return newViews.some((_, i) => !newViews[i].equals(oldViews[i]));
    }
}
//# sourceMappingURL=view-manager.js.map