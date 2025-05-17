import { RenderResources } from "./commons.js";
import SceneView from '@arcgis/core/views/SceneView';
import type { DeckProps } from '@deck.gl/core';
export default function createDeckRenderer(DeckProps: any, externalRenderers: any): {
    new (view: SceneView, props: DeckProps): {
        view: SceneView;
        deck: any;
        resources: RenderResources | null;
        cancelInitialization: (() => void) | null;
        setup(context: any): Promise<void>;
        dispose(): void;
        redraw(): void;
        render(): void;
    };
};
//# sourceMappingURL=deck-renderer.d.ts.map