import { List } from '../calcite-list/customElement.js';
import { ListItem } from './customElement.js';
export declare const listSelector = "calcite-list";
export declare const listItemGroupSelector = "calcite-list-item-group";
export declare const listItemSelector = "calcite-list-item";
export declare function expandedAncestors(el: HTMLCalciteListItemElement): void;
export declare function getListItemChildren(slotEl: HTMLSlotElement): {
    lists: HTMLCalciteListElement[];
    items: HTMLCalciteListItemElement[];
};
export declare function updateListItemChildren(slotEl: HTMLSlotElement): void;
export declare function getDepth(element: HTMLElement, includeGroup?: boolean): number;
export declare function isListItem(element: Element): element is HTMLCalciteListItemElement;
