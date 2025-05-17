// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { EVENT_HANDLERS } from "./constants.js";
import { deepEqual } from "../utils/deep-equal.js";
const PLACEMENTS = {
    'top-left': { top: 0, left: 0 },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    fill: { top: 0, left: 0, bottom: 0, right: 0 }
};
const DEFAULT_PLACEMENT = 'top-left';
const ROOT_CONTAINER_ID = '__root';
export class WidgetManager {
    constructor({ deck, parentElement }) {
        /** Widgets added via the imperative API */
        this.defaultWidgets = [];
        /** Widgets received from the declarative API */
        this.widgets = [];
        /** Resolved widgets from both imperative and declarative APIs */
        this.resolvedWidgets = [];
        /** Mounted HTML containers */
        this.containers = {};
        /** Viewport provided to widget on redraw */
        this.lastViewports = {};
        this.deck = deck;
        this.parentElement = parentElement;
    }
    getWidgets() {
        return this.resolvedWidgets;
    }
    /** Declarative API to configure widgets */
    setProps(props) {
        if (props.widgets && !deepEqual(props.widgets, this.widgets, 1)) {
            this._setWidgets(props.widgets);
        }
    }
    finalize() {
        for (const widget of this.getWidgets()) {
            this._remove(widget);
        }
        this.defaultWidgets.length = 0;
        this.resolvedWidgets.length = 0;
        for (const id in this.containers) {
            this.containers[id].remove();
        }
    }
    /** Imperative API. Widgets added this way are not affected by the declarative prop. */
    addDefault(widget) {
        if (!this.defaultWidgets.find(w => w.id === widget.id)) {
            this._add(widget);
            this.defaultWidgets.push(widget);
            // Update widget list
            this._setWidgets(this.widgets);
        }
    }
    /** Resolve widgets from the declarative prop */
    _setWidgets(nextWidgets) {
        const oldWidgetMap = {};
        for (const widget of this.resolvedWidgets) {
            oldWidgetMap[widget.id] = widget;
        }
        // Clear and rebuild the list
        this.resolvedWidgets.length = 0;
        // Add all default widgets
        for (const widget of this.defaultWidgets) {
            oldWidgetMap[widget.id] = null;
            this.resolvedWidgets.push(widget);
        }
        for (let widget of nextWidgets) {
            const oldWidget = oldWidgetMap[widget.id];
            if (!oldWidget) {
                // Widget is new
                this._add(widget);
            }
            else if (
            // Widget placement changed
            oldWidget.viewId !== widget.viewId ||
                oldWidget.placement !== widget.placement) {
                this._remove(oldWidget);
                this._add(widget);
            }
            else if (widget !== oldWidget) {
                // Widget props changed
                oldWidget.setProps(widget.props);
                widget = oldWidget;
            }
            // mark as matched
            oldWidgetMap[widget.id] = null;
            this.resolvedWidgets.push(widget);
        }
        for (const id in oldWidgetMap) {
            const oldWidget = oldWidgetMap[id];
            if (oldWidget) {
                // No longer exists
                this._remove(oldWidget);
            }
        }
        this.widgets = nextWidgets;
    }
    _add(widget) {
        const { viewId = null, placement = DEFAULT_PLACEMENT } = widget;
        const element = widget.onAdd({ deck: this.deck, viewId });
        if (element) {
            this._getContainer(viewId, placement).append(element);
        }
        widget._element = element;
    }
    _remove(widget) {
        widget.onRemove?.();
        if (widget._element) {
            widget._element.remove();
        }
        widget._element = undefined;
    }
    /* global document */
    _getContainer(viewId, placement) {
        const containerId = viewId || ROOT_CONTAINER_ID;
        let viewContainer = this.containers[containerId];
        if (!viewContainer) {
            viewContainer = document.createElement('div');
            viewContainer.style.pointerEvents = 'none';
            viewContainer.style.position = 'absolute';
            viewContainer.style.overflow = 'hidden';
            this.parentElement?.append(viewContainer);
            this.containers[containerId] = viewContainer;
        }
        let container = viewContainer.querySelector(`.${placement}`);
        if (!container) {
            container = document.createElement('div');
            container.className = placement;
            container.style.position = 'absolute';
            container.style.zIndex = '2';
            Object.assign(container.style, PLACEMENTS[placement]);
            viewContainer.append(container);
        }
        return container;
    }
    _updateContainers() {
        const canvasWidth = this.deck.width;
        const canvasHeight = this.deck.height;
        for (const id in this.containers) {
            const viewport = this.lastViewports[id] || null;
            const visible = id === ROOT_CONTAINER_ID || viewport;
            const container = this.containers[id];
            if (visible) {
                container.style.display = 'block';
                // Align the container with the view
                container.style.left = `${viewport ? viewport.x : 0}px`;
                container.style.top = `${viewport ? viewport.y : 0}px`;
                container.style.width = `${viewport ? viewport.width : canvasWidth}px`;
                container.style.height = `${viewport ? viewport.height : canvasHeight}px`;
            }
            else {
                container.style.display = 'none';
            }
        }
    }
    onRedraw({ viewports, layers }) {
        const viewportsById = viewports.reduce((acc, v) => {
            acc[v.id] = v;
            return acc;
        }, {});
        for (const widget of this.getWidgets()) {
            const { viewId } = widget;
            if (viewId) {
                // Attached to a specific view
                const viewport = viewportsById[viewId];
                if (viewport) {
                    if (widget.onViewportChange) {
                        widget.onViewportChange(viewport);
                    }
                    widget.onRedraw?.({ viewports: [viewport], layers });
                }
            }
            else {
                // Not attached to a specific view
                if (widget.onViewportChange) {
                    for (const viewport of viewports) {
                        widget.onViewportChange(viewport);
                    }
                }
                widget.onRedraw?.({ viewports, layers });
            }
        }
        this.lastViewports = viewportsById;
        this._updateContainers();
    }
    onHover(info, event) {
        for (const widget of this.getWidgets()) {
            const { viewId } = widget;
            if (!viewId || viewId === info.viewport?.id) {
                widget.onHover?.(info, event);
            }
        }
    }
    onEvent(info, event) {
        const eventHandlerProp = EVENT_HANDLERS[event.type];
        if (!eventHandlerProp) {
            return;
        }
        for (const widget of this.getWidgets()) {
            const { viewId } = widget;
            if (!viewId || viewId === info.viewport?.id) {
                widget[eventHandlerProp]?.(info, event);
            }
        }
    }
}
//# sourceMappingURL=widget-manager.js.map