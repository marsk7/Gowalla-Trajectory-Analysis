import * as React from 'react';
import { View } from '@deck.gl/core';
import type { LayersList, Viewport } from '@deck.gl/core';
export type DeckGLRenderCallbackArgs = {
    /**
     * the left offset of the current view, in pixels
     */
    x: number;
    /**
     * the top offset of the current view, in pixels
     */
    y: number;
    /**
     * the width of the current view, in pixels
     */
    width: number;
    /**
     * the height of the current view, in pixels
     */
    height: number;
    /**
     * the view state of the current view
     */
    viewState: any;
    /**
     * the `Viewport` instance of the current view
     */
    viewport: Viewport;
};
export type DeckGLRenderCallback = (args: DeckGLRenderCallbackArgs) => React.ReactNode;
export default function extractJSXLayers({ children, layers, views }: {
    children?: React.ReactNode | DeckGLRenderCallback;
    layers?: LayersList;
    views?: View | View[] | null;
}): {
    children: React.ReactNode[];
    layers: LayersList;
    views: View | View[] | null;
};
//# sourceMappingURL=extract-jsx-layers.d.ts.map