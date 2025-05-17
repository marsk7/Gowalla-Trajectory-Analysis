import { MenuItem } from './customElement.js';
export interface MenuItemCustomEvent {
    event: KeyboardEvent;
    children?: HTMLCalciteMenuItemElement[];
    isSubmenuOpen?: boolean;
}
export type Layout = "horizontal" | "vertical";
