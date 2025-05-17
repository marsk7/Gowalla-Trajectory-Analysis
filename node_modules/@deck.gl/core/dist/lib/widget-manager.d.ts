import type Deck from "./deck.js";
import type Viewport from "../viewports/viewport.js";
import type { PickingInfo } from "./picking/pick-info.js";
import type { MjolnirPointerEvent, MjolnirGestureEvent } from 'mjolnir.js';
import type Layer from "./layer.js";
export interface Widget<PropsT = any> {
    /** Unique identifier of the widget. */
    id: string;
    /** Widget prop types. */
    props: PropsT;
    /**
     * The view id that this widget is being attached to. Default `null`.
     * If assigned, this widget will only respond to events occurred inside the specific view that matches this id.
     */
    viewId?: string | null;
    /** Widget positioning within the view. Default 'top-left'. */
    placement?: WidgetPlacement;
    _element?: HTMLDivElement | null;
    /** Called when the widget is added to a Deck instance.
     * @returns an optional UI element that should be appended to the Deck container */
    onAdd: (params: {
        /** The Deck instance that the widget is attached to */
        deck: Deck<any>;
        /** The id of the view that the widget is attached to */
        viewId: string | null;
    }) => HTMLDivElement | null;
    /** Called when the widget is removed */
    onRemove?: () => void;
    /** Called to update widget options */
    setProps: (props: Partial<PropsT>) => void;
    /** Called when the containing view is changed */
    onViewportChange?: (viewport: Viewport) => void;
    /** Called when the containing view is redrawn */
    onRedraw?: (params: {
        viewports: Viewport[];
        layers: Layer[];
    }) => void;
    /** Called when a hover event occurs */
    onHover?: (info: PickingInfo, event: MjolnirPointerEvent) => void;
    /** Called when a click event occurs */
    onClick?: (info: PickingInfo, event: MjolnirGestureEvent) => void;
    /** Called when a drag event occurs */
    onDrag?: (info: PickingInfo, event: MjolnirGestureEvent) => void;
    /** Called when a dragstart event occurs */
    onDragStart?: (info: PickingInfo, event: MjolnirGestureEvent) => void;
    /** Called when a dragend event occurs */
    onDragEnd?: (info: PickingInfo, event: MjolnirGestureEvent) => void;
}
declare const PLACEMENTS: {
    readonly 'top-left': {
        readonly top: 0;
        readonly left: 0;
    };
    readonly 'top-right': {
        readonly top: 0;
        readonly right: 0;
    };
    readonly 'bottom-left': {
        readonly bottom: 0;
        readonly left: 0;
    };
    readonly 'bottom-right': {
        readonly bottom: 0;
        readonly right: 0;
    };
    readonly fill: {
        readonly top: 0;
        readonly left: 0;
        readonly bottom: 0;
        readonly right: 0;
    };
};
export type WidgetPlacement = keyof typeof PLACEMENTS;
export declare class WidgetManager {
    deck: Deck<any>;
    parentElement?: HTMLElement | null;
    /** Widgets added via the imperative API */
    private defaultWidgets;
    /** Widgets received from the declarative API */
    private widgets;
    /** Resolved widgets from both imperative and declarative APIs */
    private resolvedWidgets;
    /** Mounted HTML containers */
    private containers;
    /** Viewport provided to widget on redraw */
    private lastViewports;
    constructor({ deck, parentElement }: {
        deck: Deck<any>;
        parentElement?: HTMLElement | null;
    });
    getWidgets(): Widget[];
    /** Declarative API to configure widgets */
    setProps(props: {
        widgets?: Widget[];
    }): void;
    finalize(): void;
    /** Imperative API. Widgets added this way are not affected by the declarative prop. */
    addDefault(widget: Widget): void;
    /** Resolve widgets from the declarative prop */
    private _setWidgets;
    private _add;
    private _remove;
    private _getContainer;
    private _updateContainers;
    onRedraw({ viewports, layers }: {
        viewports: Viewport[];
        layers: Layer[];
    }): void;
    onHover(info: PickingInfo, event: MjolnirPointerEvent): void;
    onEvent(info: PickingInfo, event: MjolnirGestureEvent): void;
}
export {};
//# sourceMappingURL=widget-manager.d.ts.map