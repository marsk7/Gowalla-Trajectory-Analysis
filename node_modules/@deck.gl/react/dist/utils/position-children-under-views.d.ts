import * as React from 'react';
import type { ViewOrViews } from "../deckgl.js";
import type { Deck } from '@deck.gl/core';
import { type DeckGLContextValue } from "./deckgl-context.js";
export default function positionChildrenUnderViews<ViewsT extends ViewOrViews>({ children, deck, ContextProvider }: {
    children: React.ReactNode[];
    deck?: Deck<ViewsT>;
    ContextProvider?: React.Context<DeckGLContextValue>['Provider'];
}): React.ReactNode[];
//# sourceMappingURL=position-children-under-views.d.ts.map