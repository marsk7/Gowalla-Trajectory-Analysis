import { ComboboxItemGroup } from '../calcite-combobox-item-group/customElement.js';
import { ComboboxItem } from '../calcite-combobox-item/customElement.js';
export type ComboboxChildElement = HTMLCalciteComboboxItemElement | HTMLCalciteComboboxItemGroupElement;
export type SelectionDisplay = "all" | "fit" | "single";
export interface ItemData extends BaseData {
    description: string;
    metadata: Record<string, unknown>;
    shortHeading: string;
    textLabel: string;
    el: HTMLCalciteComboboxItemElement | HTMLCalciteComboboxItemGroupElement;
}
export type GroupData = BaseData;
interface BaseData {
    label: string;
}
export {};
