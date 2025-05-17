import LayerManager from "./layer-manager.js";
import ViewManager from "./view-manager.js";
import EffectManager from "./effect-manager.js";
import DeckRenderer from "./deck-renderer.js";
import DeckPicker from "./deck-picker.js";
import { WidgetManager, Widget } from "./widget-manager.js";
import Tooltip from "./tooltip.js";
import { AnimationLoop } from '@luma.gl/engine';
import type { Device, Framebuffer, Parameters } from '@luma.gl/core';
import type { ShaderModule } from '@luma.gl/shadertools';
import { Stats } from '@probe.gl/stats';
import { EventManager } from 'mjolnir.js';
import { RecognizerOptions } from "./constants.js";
import type { Effect } from "./effect.js";
import type { FilterContext } from "../passes/layers-pass.js";
import type Layer from "./layer.js";
import type View from "../views/view.js";
import type Viewport from "../viewports/viewport.js";
import type { EventManagerOptions, MjolnirGestureEvent, MjolnirPointerEvent } from 'mjolnir.js';
import type { TypedArrayManagerOptions } from "../utils/typed-array-manager.js";
import type { ViewStateChangeParameters, InteractionState } from "../controllers/controller.js";
import type { PickingInfo } from "./picking/pick-info.js";
import type { LayersList } from "./layer-manager.js";
import type { TooltipContent } from "./tooltip.js";
import type { ViewStateMap, AnyViewStateOf, ViewOrViews, ViewStateObject } from "./view-manager.js";
import { CreateDeviceProps } from '@luma.gl/core';
export type DeckMetrics = {
    fps: number;
    setPropsTime: number;
    updateAttributesTime: number;
    framesRedrawn: number;
    pickTime: number;
    pickCount: number;
    gpuTime: number;
    gpuTimePerFrame: number;
    cpuTime: number;
    cpuTimePerFrame: number;
    bufferMemory: number;
    textureMemory: number;
    renderbufferMemory: number;
    gpuMemory: number;
};
type CursorState = {
    /** Whether the cursor is over a pickable object */
    isHovering: boolean;
    /** Whether the cursor is down */
    isDragging: boolean;
};
export type DeckProps<ViewsT extends ViewOrViews = null> = {
    /** Id of this Deck instance */
    id?: string;
    /** Width of the canvas, a number in pixels or a valid CSS string.
     * @default `'100%'`
     */
    width?: string | number | null;
    /** Height of the canvas, a number in pixels or a valid CSS string.
     * @default `'100%'`
     */
    height?: string | number | null;
    /** Additional CSS styles for the canvas. */
    style?: Partial<CSSStyleDeclaration> | null;
    /** Controls the resolution of drawing buffer used for rendering.
     * @default `true` (use browser devicePixelRatio)
     */
    useDevicePixels?: boolean | number;
    /** Extra pixels around the pointer to include while picking.
     * @default `0`
     */
    pickingRadius?: number;
    /** WebGL parameters to be set before each frame is rendered. */
    parameters?: Parameters;
    /** If supplied, will be called before a layer is drawn to determine whether it should be rendered. */
    layerFilter?: ((context: FilterContext) => boolean) | null;
    /** The container to append the auto-created canvas to.
     * @default `document.body`
     */
    parent?: HTMLDivElement | null;
    /** The canvas to render into.
     * Can be either a HTMLCanvasElement or the element id.
     * Will be auto-created if not supplied.
     */
    canvas?: HTMLCanvasElement | string | null;
    /** Use an existing luma.gl GPU device. @note If not supplied, a new device will be created using props.deviceProps */
    device?: Device | null;
    /** A new device will be created using these props, assuming that an existing device is not supplied using props.device) */
    deviceProps?: CreateDeviceProps;
    /** WebGL context @deprecated Use props.deviceProps.webgl. Also note that preserveDrawingBuffers is true by default */
    gl?: WebGL2RenderingContext | null;
    /**
     * The array of Layer instances to be rendered.
     * Nested arrays are accepted, as well as falsy values (`null`, `false`, `undefined`)
     */
    layers?: LayersList;
    /** The array of effects to be rendered. A lighting effect will be added if an empty array is supplied. */
    effects?: Effect[];
    /** A single View instance, or an array of `View` instances.
     * @default `new MapView()`
     */
    views?: ViewsT;
    /** Options for viewport interactivity, e.g. pan, rotate and zoom with mouse, touch and keyboard.
     * This is a shorthand for defining interaction with the `views` prop if you are using the default view (i.e. a single `MapView`)
     */
    controller?: View['props']['controller'];
    /**
     * An object that describes the view state for each view in the `views` prop.
     * Use if the camera state should be managed external to the `Deck` instance.
     */
    viewState?: ViewStateMap<ViewsT> | null;
    /**
     * If provided, the `Deck` instance will track camera state changes automatically,
     * with `initialViewState` as its initial settings.
     */
    initialViewState?: ViewStateMap<ViewsT> | null;
    /** Allow browser default touch actions.
     * @default `'none'`
     */
    touchAction?: EventManagerOptions['touchAction'];
    /**
     * Optional mjolnir.js recognizer options
     */
    eventRecognizerOptions?: RecognizerOptions;
    /** (Experimental) Render to a custom frame buffer other than to screen. */
    _framebuffer?: Framebuffer | null;
    /** (Experimental) Forces deck.gl to redraw layers every animation frame. */
    _animate?: boolean;
    /** (Experimental) If set to `false`, force disables all picking features, disregarding the `pickable` prop set in any layer. */
    _pickable?: boolean;
    /** (Experimental) Fine-tune attribute memory usage. See documentation for details. */
    _typedArrayManagerProps?: TypedArrayManagerOptions;
    /** An array of Widget instances to be added to the parent element. */
    widgets?: Widget[];
    /** Called once the GPU Device has been initiated. */
    onDeviceInitialized?: (device: Device) => void;
    /** @deprecated Called once the WebGL context has been initiated. */
    onWebGLInitialized?: (gl: WebGL2RenderingContext) => void;
    /** Called when the canvas resizes. */
    onResize?: (dimensions: {
        width: number;
        height: number;
    }) => void;
    /** Called when the user has interacted with the deck.gl canvas, e.g. using mouse, touch or keyboard. */
    onViewStateChange?: <ViewStateT extends AnyViewStateOf<ViewsT>>(params: ViewStateChangeParameters<ViewStateT>) => ViewStateT | null | void;
    /** Called when the user has interacted with the deck.gl canvas, e.g. using mouse, touch or keyboard. */
    onInteractionStateChange?: (state: InteractionState) => void;
    /** Called just before the canvas rerenders. */
    onBeforeRender?: (context: {
        device: Device;
        gl: WebGL2RenderingContext;
    }) => void;
    /** Called right after the canvas rerenders. */
    onAfterRender?: (context: {
        device: Device;
        gl: WebGL2RenderingContext;
    }) => void;
    /** Called once after gl context and all Deck components are created. */
    onLoad?: () => void;
    /** Called if deck.gl encounters an error.
     * If this callback is set to `null`, errors are silently ignored.
     * @default `console.error`
     */
    onError?: ((error: Error, layer?: Layer) => void) | null;
    /** Called when the pointer moves over the canvas. */
    onHover?: ((info: PickingInfo, event: MjolnirPointerEvent) => void) | null;
    /** Called when clicking on the canvas. */
    onClick?: ((info: PickingInfo, event: MjolnirGestureEvent) => void) | null;
    /** Called when the user starts dragging on the canvas. */
    onDragStart?: ((info: PickingInfo, event: MjolnirGestureEvent) => void) | null;
    /** Called when dragging the canvas. */
    onDrag?: ((info: PickingInfo, event: MjolnirGestureEvent) => void) | null;
    /** Called when the user releases from dragging the canvas. */
    onDragEnd?: ((info: PickingInfo, event: MjolnirGestureEvent) => void) | null;
    /** (Experimental) Replace the default redraw procedure */
    _customRender?: ((reason: string) => void) | null;
    /** (Experimental) Called once every second with performance metrics. */
    _onMetrics?: ((metrics: DeckMetrics) => void) | null;
    /** A custom callback to retrieve the cursor type. */
    getCursor?: (state: CursorState) => string;
    /** Callback that takes a hovered-over point and renders a tooltip. */
    getTooltip?: ((info: PickingInfo) => TooltipContent) | null;
    /** (Debug) Flag to enable WebGL debug mode. Requires importing `@luma.gl/debug`. */
    debug?: boolean;
    /** (Debug) Render the picking buffer to screen. */
    drawPickingColors?: boolean;
};
export default class Deck<ViewsT extends ViewOrViews = null> {
    static defaultProps: DeckProps<null>;
    static VERSION: any;
    readonly props: Required<DeckProps<ViewsT>>;
    readonly width: number;
    readonly height: number;
    readonly userData: Record<string, any>;
    protected device: Device | null;
    protected canvas: HTMLCanvasElement | null;
    protected viewManager: ViewManager<View[]> | null;
    protected layerManager: LayerManager | null;
    protected effectManager: EffectManager | null;
    protected deckRenderer: DeckRenderer | null;
    protected deckPicker: DeckPicker | null;
    protected eventManager: EventManager | null;
    protected widgetManager: WidgetManager | null;
    protected tooltip: Tooltip | null;
    protected animationLoop: AnimationLoop | null;
    /** Internal view state if no callback is supplied */
    protected viewState: ViewStateObject<ViewsT> | null;
    protected cursorState: CursorState;
    protected stats: Stats;
    protected metrics: DeckMetrics;
    private _metricsCounter;
    private _needsRedraw;
    private _pickRequest;
    /**
     * Pick and store the object under the pointer on `pointerdown`.
     * This object is reused for subsequent `onClick` and `onDrag*` callbacks.
     */
    private _lastPointerDownInfo;
    constructor(props: DeckProps<ViewsT>);
    /** Stop rendering and dispose all resources */
    finalize(): void;
    /** Partially update props */
    setProps(props: DeckProps<ViewsT>): void;
    /**
     * Check if a redraw is needed
     * @returns `false` or a string summarizing the redraw reason
     */
    needsRedraw(opts?: {
        /** Reset the redraw flag afterwards. Default `true` */
        clearRedrawFlags: boolean;
    }): false | string;
    /**
     * Redraw the GL context
     * @param reason If not provided, only redraw if deemed necessary. Otherwise redraw regardless of internal states.
     * @returns
     */
    redraw(reason?: string): void;
    /** Flag indicating that the Deck instance has initialized its resources and it's safe to call public methods. */
    get isInitialized(): boolean;
    /** Get a list of views that are currently rendered */
    getViews(): View[];
    /** Get a list of viewports that are currently rendered.
     * @param rect If provided, only returns viewports within the given bounding box.
     */
    getViewports(rect?: {
        x: number;
        y: number;
        width?: number;
        height?: number;
    }): Viewport[];
    /** Get the current canvas element. */
    getCanvas(): HTMLCanvasElement | null;
    /** Query the object rendered on top at a given point */
    pickObject(opts: {
        /** x position in pixels */
        x: number;
        /** y position in pixels */
        y: number;
        /** Radius of tolerance in pixels. Default `0`. */
        radius?: number;
        /** A list of layer ids to query from. If not specified, then all pickable and visible layers are queried. */
        layerIds?: string[];
        /** If `true`, `info.coordinate` will be a 3D point by unprojecting the `x, y` screen coordinates onto the picked geometry. Default `false`. */
        unproject3D?: boolean;
    }): PickingInfo | null;
    pickMultipleObjects(opts: {
        /** x position in pixels */
        x: number;
        /** y position in pixels */
        y: number;
        /** Radius of tolerance in pixels. Default `0`. */
        radius?: number;
        /** Specifies the max number of objects to return. Default `10`. */
        depth?: number;
        /** A list of layer ids to query from. If not specified, then all pickable and visible layers are queried. */
        layerIds?: string[];
        /** If `true`, `info.coordinate` will be a 3D point by unprojecting the `x, y` screen coordinates onto the picked geometry. Default `false`. */
        unproject3D?: boolean;
    }): PickingInfo[];
    pickObjects(opts: {
        /** Left of the bounding box in pixels */
        x: number;
        /** Top of the bounding box in pixels */
        y: number;
        /** Width of the bounding box in pixels. Default `1` */
        width?: number;
        /** Height of the bounding box in pixels. Default `1` */
        height?: number;
        /** A list of layer ids to query from. If not specified, then all pickable and visible layers are queried. */
        layerIds?: string[];
        /** If specified, limits the number of objects that can be returned. */
        maxObjects?: number | null;
    }): PickingInfo[];
    /** Experimental
     * Add a global resource for sharing among layers
     */
    _addResources(resources: {
        [id: string]: any;
    }, forceUpdate?: boolean): void;
    /** Experimental
     * Remove a global resource
     */
    _removeResources(resourceIds: string[]): void;
    /** Experimental
     * Register a default effect. Effects will be sorted by order, those with a low order will be rendered first
     */
    _addDefaultEffect(effect: Effect): void;
    _addDefaultShaderModule(module: ShaderModule<Record<string, unknown>>): void;
    _removeDefaultShaderModule(module: ShaderModule<Record<string, unknown>>): void;
    private _pick;
    /** Resolve props.canvas to element */
    private _createCanvas;
    /** Updates canvas width and/or height, if provided as props */
    private _setCanvasSize;
    /** If canvas size has changed, reads out the new size and update */
    private _updateCanvasSize;
    private _createAnimationLoop;
    private _getViewState;
    private _getViews;
    private _onContextLost;
    /** Internal use only: event handler for pointerdown */
    _onPointerMove: (event: MjolnirPointerEvent) => void;
    /** Actually run picking */
    private _pickAndCallback;
    private _updateCursor;
    private _setDevice;
    /** Internal only: default render function (redraw all layers and views) */
    _drawLayers(redrawReason: string, renderOptions?: {
        target?: Framebuffer;
        layerFilter?: (context: FilterContext) => boolean;
        layers?: Layer[];
        viewports?: Viewport[];
        views?: {
            [viewId: string]: View;
        };
        pass?: string;
        effects?: Effect[];
        clearStack?: boolean;
        clearCanvas?: boolean;
    }): void;
    private _onRenderFrame;
    private _onViewStateChange;
    private _onInteractionStateChange;
    /** Internal use only: event handler for click & drag */
    _onEvent: (event: MjolnirGestureEvent) => void;
    /** Internal use only: evnet handler for pointerdown */
    _onPointerDown: (event: MjolnirPointerEvent) => void;
    private _getFrameStats;
    private _getMetrics;
}
export {};
//# sourceMappingURL=deck.d.ts.map