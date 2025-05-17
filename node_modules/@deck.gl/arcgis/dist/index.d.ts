export { loadArcGISModules } from "./load-modules.js";
export declare const DeckLayer: any;
export declare const DeckRenderer: {
    new (view: __esri.SceneView, props: import("@deck.gl/core").DeckProps): {
        view: __esri.SceneView;
        deck: any;
        resources: import("./commons").RenderResources | null;
        cancelInitialization: (() => void) | null;
        setup(context: any): Promise<void>;
        dispose(): void;
        redraw(): void;
        render(): void;
    };
};
//# sourceMappingURL=index.d.ts.map