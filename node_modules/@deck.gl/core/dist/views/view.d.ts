import Viewport from "../viewports/viewport.js";
import type Controller from "../controllers/controller.js";
import type { ControllerOptions } from "../controllers/controller.js";
import type { TransitionProps } from "../controllers/transition-manager.js";
import type { Padding } from "../viewports/viewport.js";
import type { ConstructorOf } from "../types/types.js";
export type CommonViewState = TransitionProps;
export type CommonViewProps<ViewState> = {
    /** A unique id of the view. In a multi-view use case, this is important for matching view states and place contents into this view. */
    id?: string;
    /** A relative (e.g. `'50%'`) or absolute position. Default `0`. */
    x?: number | string;
    /** A relative (e.g. `'50%'`) or absolute position. Default `0`. */
    y?: number | string;
    /** A relative (e.g. `'50%'`) or absolute extent. Default `'100%'`. */
    width?: number | string;
    /** A relative (e.g. `'50%'`) or absolute extent. Default `'100%'`. */
    height?: number | string;
    /** Padding around the view, expressed in either relative (e.g. `'50%'`) or absolute pixels. Default `null`. */
    padding?: {
        left?: number | string;
        right?: number | string;
        top?: number | string;
        bottom?: number | string;
    } | null;
    /** When using multiple views, set this flag to wipe the pixels drawn by other overlaping views */
    clear?: boolean;
    /** State of the view */
    viewState?: string | ({
        id?: string;
    } & Partial<ViewState>);
    /** Options for viewport interactivity. */
    controller?: null | boolean | ConstructorOf<Controller<any>> | (ControllerOptions & {
        type?: ConstructorOf<Controller<any>>;
    });
};
export default abstract class View<ViewState extends CommonViewState = CommonViewState, ViewProps extends CommonViewProps<ViewState> = CommonViewProps<ViewState>> {
    id: string;
    abstract getViewportType(viewState: ViewState): ConstructorOf<Viewport>;
    protected abstract get ControllerType(): ConstructorOf<Controller<any>>;
    private _x;
    private _y;
    private _width;
    private _height;
    private _padding;
    readonly props: ViewProps;
    constructor(props: ViewProps);
    equals(view: this): boolean;
    /** Make viewport from canvas dimensions and view state */
    makeViewport({ width, height, viewState }: {
        width: number;
        height: number;
        viewState: ViewState;
    }): Viewport | null;
    getViewStateId(): string;
    filterViewState(viewState: ViewState): ViewState;
    /** Resolve the dimensions of the view from overall canvas dimensions */
    getDimensions({ width, height }: {
        width: number;
        height: number;
    }): {
        x: number;
        y: number;
        width: number;
        height: number;
        padding?: Padding;
    };
    get controller(): (ControllerOptions & {
        type: ConstructorOf<Controller<any>>;
    }) | null;
}
//# sourceMappingURL=view.d.ts.map