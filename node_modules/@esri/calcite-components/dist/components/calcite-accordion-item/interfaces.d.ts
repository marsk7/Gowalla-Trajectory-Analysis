import { Accordion } from '../calcite-accordion/customElement.js';
import { AccordionItem } from './customElement.js';
export interface RegistryEntry {
    parent: HTMLCalciteAccordionElement;
    position: number;
}
export interface RequestedItem {
    requestedAccordionItem: HTMLCalciteAccordionItemElement;
}
