import { Pan, InputDirection, Pinch, Tap } from 'mjolnir.js';
import type { PanRecognizerOptions, PinchRecognizerOptions, TapRecognizerOptions } from 'mjolnir.js';
/**
 * The coordinate system that positions/dimensions are defined in.
 */
export declare const COORDINATE_SYSTEM: {
    /**
     * `LNGLAT` if rendering into a geospatial viewport, `CARTESIAN` otherwise
     */
    readonly DEFAULT: -1;
    /**
     * Positions are interpreted as [longitude, latitude, elevation]
     * longitude/latitude are in degrees, elevation is in meters.
     * Dimensions are in meters.
     */
    readonly LNGLAT: 1;
    /**
     * Positions are interpreted as [x, y, z] in meter offsets from the coordinate origin.
     * Dimensions are in meters.
     */
    readonly METER_OFFSETS: 2;
    /**
     * Positions are interpreted as [deltaLng, deltaLat, elevation] from the coordinate origin.
     * deltaLng/deltaLat are in degrees, elevation is in meters.
     * Dimensions are in meters.
     */
    readonly LNGLAT_OFFSETS: 3;
    /**
     * Positions and dimensions are in the common units of the viewport.
     */
    readonly CARTESIAN: 0;
};
export type CoordinateSystem = -1 | 0 | 1 | 2 | 3;
/**
 * How coordinates are transformed from the world space into the common space.
 */
export declare const PROJECTION_MODE: {
    /**
     * Render geospatial data in Web Mercator projection
     */
    readonly WEB_MERCATOR: 1;
    /**
     * Render geospatial data as a 3D globe
     */
    readonly GLOBE: 2;
    /**
     * (Internal use only) Web Mercator projection at high zoom
     */
    readonly WEB_MERCATOR_AUTO_OFFSET: 4;
    /**
     * No transformation
     */
    readonly IDENTITY: 0;
};
export declare const UNIT: {
    readonly common: 0;
    readonly meters: 1;
    readonly pixels: 2;
};
export declare const EVENT_HANDLERS: {
    [eventName: string]: string;
};
export declare const RECOGNIZERS: {
    readonly multipan: readonly [typeof Pan, {
        readonly threshold: 10;
        readonly direction: InputDirection.Vertical;
        readonly pointers: 2;
    }];
    readonly pinch: readonly [typeof Pinch, {}, null, readonly ["multipan"]];
    readonly pan: readonly [typeof Pan, {
        readonly threshold: 1;
    }, readonly ["pinch"], readonly ["multipan"]];
    readonly dblclick: readonly [typeof Tap, {
        readonly event: "dblclick";
        readonly taps: 2;
    }];
    readonly click: readonly [typeof Tap, {
        readonly event: "click";
    }, null, readonly ["dblclick"]];
};
export type RecognizerOptions = {
    pinch?: Omit<PinchRecognizerOptions, 'event' | 'enable'>;
    multipan?: Omit<PanRecognizerOptions, 'event' | 'enable'>;
    pan?: Omit<PanRecognizerOptions, 'event' | 'enable'>;
    dblclick?: Omit<TapRecognizerOptions, 'event' | 'enable'>;
    click?: Omit<TapRecognizerOptions, 'event' | 'enable'>;
};
/**
 * @deprecated Use string constants directly
 */
export declare const OPERATION: {
    readonly DRAW: "draw";
    readonly MASK: "mask";
    readonly TERRAIN: "terrain";
};
//# sourceMappingURL=constants.d.ts.map