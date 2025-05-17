import { Deck, MapView, _GlobeView as GlobeView } from '@deck.gl/core';
import type { MapViewState } from '@deck.gl/core';
import type { Parameters } from '@luma.gl/core';
import type MapboxLayer from "./mapbox-layer.js";
import type { Map } from "./types.js";
export declare function getDeckInstance({ map, gl, deck }: {
    map: Map & {
        __deck?: Deck<any> | null;
    };
    gl: WebGL2RenderingContext;
    deck?: Deck<any>;
}): Deck<any>;
export declare function removeDeckInstance(map: Map & {
    __deck?: Deck | null;
}): void;
export declare function getDefaultParameters(map: Map, interleaved: boolean): Parameters;
export declare function addLayer(deck: Deck, layer: MapboxLayer<any>): void;
export declare function removeLayer(deck: Deck, layer: MapboxLayer<any>): void;
export declare function updateLayer(deck: Deck, layer: MapboxLayer<any>): void;
export declare function drawLayer(deck: Deck, map: Map, layer: MapboxLayer<any>, renderParameters: any): void;
export declare function getDefaultView(map: Map): GlobeView | MapView;
export declare function getViewState(map: Map): MapViewState & {
    repeat: boolean;
    padding: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
};
//# sourceMappingURL=deck-utils.d.ts.map