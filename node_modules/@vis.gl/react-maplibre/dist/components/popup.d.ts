import * as React from 'react';
import type { PopupInstance, PopupOptions } from "../types/lib.js";
import type { PopupEvent } from "../types/events.js";
export type PopupProps = PopupOptions & {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onOpen?: (e: PopupEvent) => void;
    onClose?: (e: PopupEvent) => void;
    children?: React.ReactNode;
};
export declare const Popup: React.MemoExoticComponent<React.ForwardRefExoticComponent<PopupOptions & {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onOpen?: (e: PopupEvent) => void;
    onClose?: (e: PopupEvent) => void;
    children?: React.ReactNode;
} & React.RefAttributes<PopupInstance>>>;
//# sourceMappingURL=popup.d.ts.map