import type { DeckProps } from '@deck.gl/core';
export type GoogleMapsOverlayProps = Omit<DeckProps, 'width' | 'height' | 'gl' | 'deviceProps' | 'parent' | 'canvas' | '_customRender' | 'viewState' | 'initialViewState' | 'controller'> & {
    interleaved?: boolean;
};
export default class GoogleMapsOverlay {
    private props;
    private _map;
    private _deck;
    private _overlay;
    constructor(props: GoogleMapsOverlayProps);
    /** Add/remove the overlay from a map. */
    setMap(map: google.maps.Map | null): void;
    /**
     * Update (partial) props.
     */
    setProps(props: Partial<GoogleMapsOverlayProps>): void;
    /** Equivalent of `deck.pickObject`. */
    pickObject(params: any): {
        color: Uint8Array | null;
        layer: import("@deck.gl/core").Layer | null;
        sourceLayer?: import("@deck.gl/core").Layer | null;
        viewport?: import("@deck.gl/core").Viewport;
        index: number;
        picked: boolean;
        object?: any;
        x: number;
        y: number;
        pixel?: [number, number];
        coordinate?: number[];
        devicePixel?: [number, number];
        pixelRatio: number;
    } | null;
    /** Equivalent of `deck.pickObjects`.  */
    pickMultipleObjects(params: any): {
        color: Uint8Array | null;
        layer: import("@deck.gl/core").Layer | null;
        sourceLayer?: import("@deck.gl/core").Layer | null;
        viewport?: import("@deck.gl/core").Viewport;
        index: number;
        picked: boolean;
        object?: any;
        x: number;
        y: number;
        pixel?: [number, number];
        coordinate?: number[];
        devicePixel?: [number, number];
        pixelRatio: number;
    }[] | null;
    /** Equivalent of `deck.pickMultipleObjects`. */
    pickObjects(params: any): {
        color: Uint8Array | null;
        layer: import("@deck.gl/core").Layer | null;
        sourceLayer?: import("@deck.gl/core").Layer | null;
        viewport?: import("@deck.gl/core").Viewport;
        index: number;
        picked: boolean;
        object?: any;
        x: number;
        y: number;
        pixel?: [number, number];
        coordinate?: number[];
        devicePixel?: [number, number];
        pixelRatio: number;
    }[] | null;
    /** Remove the overlay and release all underlying resources. */
    finalize(): void;
    _createOverlay(map: google.maps.Map): void;
    _onAdd(): void;
    _onContextRestored({ gl }: {
        gl: any;
    }): void;
    _onContextLost(): void;
    _onRemove(): void;
    _onDrawRaster(): void;
    _onDrawVectorInterleaved({ gl, transformer }: {
        gl: any;
        transformer: any;
    }): void;
    _onDrawVectorOverlay({ transformer }: {
        transformer: any;
    }): void;
}
//# sourceMappingURL=google-maps-overlay.d.ts.map