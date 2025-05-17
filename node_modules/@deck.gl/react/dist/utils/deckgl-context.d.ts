import type { EventManager } from 'mjolnir.js';
import type { Deck, DeckProps, Viewport, Widget } from '@deck.gl/core';
export type DeckGLContextValue = {
    viewport: Viewport;
    container: HTMLElement;
    eventManager: EventManager;
    onViewStateChange: DeckProps['onViewStateChange'];
    deck?: Deck<any>;
    widgets?: Widget[];
};
export declare const DeckGlContext: import("react").Context<DeckGLContextValue>;
//# sourceMappingURL=deckgl-context.d.ts.map