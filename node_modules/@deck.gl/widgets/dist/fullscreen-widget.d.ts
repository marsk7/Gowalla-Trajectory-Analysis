import type { Deck, Widget, WidgetPlacement } from '@deck.gl/core';
export type FullscreenWidgetProps = {
    id?: string;
    /**
     * Widget positioning within the view. Default 'top-left'.
     */
    placement?: WidgetPlacement;
    /**
     * A [compatible DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#Compatible_elements) which should be made full screen.
     * By default, the map container element will be made full screen.
     */
    container?: HTMLElement;
    /**
     * Tooltip message when out of fullscreen.
     */
    enterLabel?: string;
    /**
     * Tooltip message when fullscreen.
     */
    exitLabel?: string;
    /**
     * CSS inline style overrides.
     */
    style?: Partial<CSSStyleDeclaration>;
    /**
     * Additional CSS class.
     */
    className?: string;
};
export declare class FullscreenWidget implements Widget<FullscreenWidgetProps> {
    id: string;
    props: FullscreenWidgetProps;
    placement: WidgetPlacement;
    deck?: Deck<any>;
    element?: HTMLDivElement;
    fullscreen: boolean;
    constructor(props: FullscreenWidgetProps);
    onAdd({ deck }: {
        deck: Deck<any>;
    }): HTMLDivElement;
    onRemove(): void;
    private update;
    setProps(props: Partial<FullscreenWidgetProps>): void;
    getContainer(): HTMLElement | null | undefined;
    onFullscreenChange(): void;
    handleClick(): Promise<void>;
    requestFullscreen(): Promise<void>;
    exitFullscreen(): Promise<void>;
    togglePseudoFullscreen(): void;
}
//# sourceMappingURL=fullscreen-widget.d.ts.map