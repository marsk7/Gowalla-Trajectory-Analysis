import * as React from 'react';
import type { PopupInstance, MarkerInstance, MarkerOptions } from "../types/lib.js";
import type { MarkerEvent, MarkerDragEvent } from "../types/events.js";
export type MarkerProps = MarkerOptions & {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    popup?: PopupInstance;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onClick?: (e: MarkerEvent<MouseEvent>) => void;
    onDragStart?: (e: MarkerDragEvent) => void;
    onDrag?: (e: MarkerDragEvent) => void;
    onDragEnd?: (e: MarkerDragEvent) => void;
    children?: React.ReactNode;
};
export declare const Marker: React.MemoExoticComponent<React.ForwardRefExoticComponent<MarkerOptions & {
    /** Longitude of the anchor location */
    longitude: number;
    /** Latitude of the anchor location */
    latitude: number;
    popup?: PopupInstance;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    onClick?: (e: MarkerEvent<MouseEvent>) => void;
    onDragStart?: (e: MarkerDragEvent) => void;
    onDrag?: (e: MarkerDragEvent) => void;
    onDragEnd?: (e: MarkerDragEvent) => void;
    children?: React.ReactNode;
} & React.RefAttributes<MarkerInstance>>>;
//# sourceMappingURL=marker.d.ts.map