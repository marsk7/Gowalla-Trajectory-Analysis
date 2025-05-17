import * as React from 'react';
import { Deck } from '@deck.gl/core';
import { DeckGLRenderCallback } from "./utils/extract-jsx-layers.js";
import type { DeckGLContextValue } from "./utils/deckgl-context.js";
import type { DeckProps, View } from '@deck.gl/core';
export type ViewOrViews = View | View[] | null;
/** DeckGL React component props */
export type DeckGLProps<ViewsT extends ViewOrViews = null> = Omit<DeckProps<ViewsT>, 'width' | 'height' | 'gl' | 'parent' | 'canvas' | '_customRender'> & {
    Deck?: typeof Deck;
    width?: string | number;
    height?: string | number;
    children?: React.ReactNode | DeckGLRenderCallback;
    ref?: React.Ref<DeckGLRef<ViewsT>>;
    ContextProvider?: React.Context<DeckGLContextValue>['Provider'];
};
export type DeckGLRef<ViewsT extends ViewOrViews = null> = {
    deck?: Deck<ViewsT>;
    pickObject: Deck['pickObject'];
    pickObjects: Deck['pickObjects'];
    pickMultipleObjects: Deck['pickMultipleObjects'];
};
declare const DeckGL: <ViewsT extends ViewOrViews>(props: DeckGLProps<ViewsT>) => React.ReactElement;
export default DeckGL;
//# sourceMappingURL=deckgl.d.ts.map