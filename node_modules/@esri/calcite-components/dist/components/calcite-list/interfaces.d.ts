import { DragDetail, MoveDetail } from '../../utils/sortableComponent';
import { ListItem } from '../calcite-list-item/customElement.js';
import { ListItemGroup } from '../calcite-list-item-group/customElement.js';
import { List } from './customElement.js';
export type ListDisplayMode = "flat" | "nested";
export interface ListDragDetail extends DragDetail {
    toEl: HTMLCalciteListElement;
    fromEl: HTMLCalciteListElement;
    dragEl: HTMLCalciteListItemElement;
}
export interface ListMoveDetail extends MoveDetail {
    toEl: HTMLCalciteListElement;
    fromEl: HTMLCalciteListElement;
    dragEl: HTMLCalciteListItemElement;
    relatedEl: HTMLCalciteListItemElement;
}
export type ListElement = HTMLCalciteListItemElement | HTMLCalciteListItemGroupElement;
