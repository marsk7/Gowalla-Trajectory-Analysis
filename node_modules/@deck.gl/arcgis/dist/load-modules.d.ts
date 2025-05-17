import { ILoadScriptOptions } from 'esri-loader';
type LoadedModules = {
    DeckLayer: any;
    DeckRenderer: any;
    modules?: unknown[];
};
export declare function loadArcGISModules(modules: string[], loadScriptOptions: ILoadScriptOptions): Promise<LoadedModules>;
export {};
//# sourceMappingURL=load-modules.d.ts.map