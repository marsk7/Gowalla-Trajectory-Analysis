import { ListItem } from './customElement.js';
export type ItemData = {
    label: string;
    description: string;
    metadata: Record<string, unknown>;
    el: HTMLCalciteListItemElement;
    heading?: string[];
};
