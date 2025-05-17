import type { Deck, Viewport, Widget, WidgetPlacement } from '@deck.gl/core';
export type CompassWidgetProps = {
    id?: string;
    /**
     * Widget positioning within the view. Default 'top-left'.
     */
    placement?: WidgetPlacement;
    /**
     * View to attach to and interact with. Required when using multiple views.
     */
    viewId?: string | null;
    /**
     * Tooltip message.
     */
    label?: string;
    /**
     * Bearing and pitch reset transition duration in ms.
     */
    transitionDuration?: number;
    /**
     * CSS inline style overrides.
     */
    style?: Partial<CSSStyleDeclaration>;
    /**
     * Additional CSS class.
     */
    className?: string;
};
export declare class CompassWidget implements Widget<CompassWidgetProps> {
    id: string;
    props: CompassWidgetProps;
    placement: WidgetPlacement;
    viewId?: string | null;
    viewports: {
        [id: string]: Viewport;
    };
    deck?: Deck<any>;
    element?: HTMLDivElement;
    constructor(props: CompassWidgetProps);
    setProps(props: Partial<CompassWidgetProps>): void;
    onViewportChange(viewport: Viewport): void;
    onAdd({ deck }: {
        deck: Deck<any>;
    }): HTMLDivElement;
    getRotation(viewport?: Viewport): number[];
    private update;
    onRemove(): void;
    handleCompassReset(viewport: Viewport): void;
}
//# sourceMappingURL=compass-widget.d.ts.map