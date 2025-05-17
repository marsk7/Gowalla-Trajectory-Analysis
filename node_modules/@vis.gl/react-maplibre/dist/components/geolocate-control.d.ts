import * as React from 'react';
import type { ControlPosition, GeolocateControlInstance, GeolocateControlOptions } from "../types/lib.js";
import type { GeolocateEvent, GeolocateResultEvent, GeolocateErrorEvent } from "../types/events.js";
export type GeolocateControlProps = GeolocateControlOptions & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    /** Called on each Geolocation API position update that returned as success. */
    onGeolocate?: (e: GeolocateResultEvent) => void;
    /** Called on each Geolocation API position update that returned as an error. */
    onError?: (e: GeolocateErrorEvent) => void;
    /** Called on each Geolocation API position update that returned as success but user position
     * is out of map `maxBounds`. */
    onOutOfMaxBounds?: (e: GeolocateResultEvent) => void;
    /** Called when the GeolocateControl changes to the active lock state. */
    onTrackUserLocationStart?: (e: GeolocateEvent) => void;
    /** Called when the GeolocateControl changes to the background state. */
    onTrackUserLocationEnd?: (e: GeolocateEvent) => void;
};
export declare const GeolocateControl: React.MemoExoticComponent<React.ForwardRefExoticComponent<GeolocateControlOptions & {
    /** Placement of the control relative to the map. */
    position?: ControlPosition;
    /** CSS style override, applied to the control's container */
    style?: React.CSSProperties;
    /** Called on each Geolocation API position update that returned as success. */
    onGeolocate?: (e: GeolocateResultEvent) => void;
    /** Called on each Geolocation API position update that returned as an error. */
    onError?: (e: GeolocateErrorEvent) => void;
    /** Called on each Geolocation API position update that returned as success but user position
     * is out of map `maxBounds`. */
    onOutOfMaxBounds?: (e: GeolocateResultEvent) => void;
    /** Called when the GeolocateControl changes to the active lock state. */
    onTrackUserLocationStart?: (e: GeolocateEvent) => void;
    /** Called when the GeolocateControl changes to the background state. */
    onTrackUserLocationEnd?: (e: GeolocateEvent) => void;
} & React.RefAttributes<GeolocateControlInstance>>>;
//# sourceMappingURL=geolocate-control.d.ts.map