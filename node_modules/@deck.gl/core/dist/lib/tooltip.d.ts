import type { Widget, WidgetPlacement } from "./widget-manager.js";
import type { PickingInfo } from "./picking/pick-info.js";
import type Viewport from "../viewports/viewport.js";
import type Deck from "./deck.js";
export type TooltipContent = null | string | {
    text?: string;
    html?: string;
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
};
export default class Tooltip implements Widget {
    id: string;
    placement: WidgetPlacement;
    props: {};
    isVisible: boolean;
    deck?: Deck<any>;
    element?: HTMLDivElement;
    lastViewport?: Viewport;
    onAdd({ deck }: {
        deck: Deck<any>;
    }): HTMLDivElement;
    onRemove(): void;
    setProps(): void;
    onViewportChange(viewport: Viewport): void;
    onHover(info: PickingInfo): void;
    setTooltip(displayInfo: TooltipContent, x?: number, y?: number): void;
}
//# sourceMappingURL=tooltip.d.ts.map