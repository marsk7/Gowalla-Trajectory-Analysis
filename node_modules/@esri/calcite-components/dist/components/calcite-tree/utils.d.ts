import { TreeItem } from '../calcite-tree-item/customElement.js';
import { Tree } from './customElement.js';
export declare function isTreeItem(element: Element): element is HTMLCalciteTreeItemElement;
export declare function getTraversableItems(root: HTMLCalciteTreeElement): HTMLCalciteTreeItemElement[];
