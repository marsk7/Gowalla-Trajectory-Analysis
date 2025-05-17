import type { MapInstance } from "../types/lib.js";
import type Maplibre from "./maplibre.js";
/** These methods may break the react binding if called directly */
declare const skipMethods: readonly ["setMaxBounds", "setMinZoom", "setMaxZoom", "setMinPitch", "setMaxPitch", "setRenderWorldCopies", "setProjection", "setStyle", "addSource", "removeSource", "addLayer", "removeLayer", "setLayerZoomRange", "setFilter", "setPaintProperty", "setLayoutProperty", "setLight", "setTerrain", "setFog", "remove"];
export type MapRef = {
    getMap(): MapInstance;
} & Omit<MapInstance, (typeof skipMethods)[number]>;
export default function createRef(mapInstance: Maplibre): MapRef | null;
export {};
//# sourceMappingURL=create-ref.d.ts.map