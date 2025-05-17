import * as React from 'react';
import { MapRef } from "../maplibre/create-ref.js";
type MountedMapsContextValue = {
    maps: {
        [id: string]: MapRef;
    };
    onMapMount: (map: MapRef, id: string) => void;
    onMapUnmount: (id: string) => void;
};
export declare const MountedMapsContext: React.Context<MountedMapsContextValue>;
export declare const MapProvider: React.FC<{
    children?: React.ReactNode;
}>;
export type MapCollection = {
    [id: string]: MapRef | undefined;
    current?: MapRef;
};
export declare function useMap(): MapCollection;
export {};
//# sourceMappingURL=use-map.d.ts.map