import { TemplateResult } from 'lit-html';
import { Position, Scale } from '../interfaces';
import { Tooltip } from '../calcite-tooltip/customElement.js';
interface ExpandToggleProps {
    expanded: boolean;
    expandText: string;
    collapseText: string;
    expandLabel: string;
    collapseLabel: string;
    el: HTMLElement;
    position: Position;
    tooltip?: HTMLCalciteTooltipElement;
    toggle: () => void;
    ref?: (el: HTMLElement) => void;
    scale?: Scale;
}
export declare function toggleChildActionText({ el, expanded, }: {
    el: HTMLElement;
    expanded: boolean;
}): void;
export declare const ExpandToggle: ({ expanded, expandText, collapseText, expandLabel, collapseLabel, toggle, el, position, tooltip, ref, scale, }: ExpandToggleProps) => TemplateResult;
export {};
