import { DragDetail, MoveDetail } from '../../utils/sortableComponent';
import { Block } from '../calcite-block/customElement.js';
import { BlockGroup } from './customElement.js';
export interface BlockDragDetail extends DragDetail {
    toEl: HTMLCalciteBlockGroupElement;
    fromEl: HTMLCalciteBlockGroupElement;
    dragEl: HTMLCalciteBlockElement;
}
export interface BlockMoveDetail extends MoveDetail {
    toEl: HTMLCalciteBlockGroupElement;
    fromEl: HTMLCalciteBlockGroupElement;
    dragEl: HTMLCalciteBlockElement;
    relatedEl: HTMLCalciteBlockElement;
}
