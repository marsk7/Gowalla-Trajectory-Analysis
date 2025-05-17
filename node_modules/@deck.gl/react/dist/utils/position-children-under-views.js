// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { createElement } from 'react';
import { View } from '@deck.gl/core';
import { inheritsFrom } from "./inherits-from.js";
import evaluateChildren, { isComponent } from "./evaluate-children.js";
import { DeckGlContext } from "./deckgl-context.js";
// Iterate over views and reposition children associated with views
// TODO - Can we supply a similar function for the non-React case?
export default function positionChildrenUnderViews({ children, deck, ContextProvider = DeckGlContext.Provider }) {
    // @ts-expect-error accessing protected property
    const { viewManager } = deck || {};
    if (!viewManager || !viewManager.views.length) {
        return [];
    }
    const views = {};
    const defaultViewId = viewManager.views[0].id;
    // Sort children by view id
    for (const child of children) {
        // Unless child is a View, position / render as part of the default view
        let viewId = defaultViewId;
        let viewChildren = child;
        if (isComponent(child) && inheritsFrom(child.type, View)) {
            viewId = child.props.id || defaultViewId;
            viewChildren = child.props.children;
        }
        const viewport = viewManager.getViewport(viewId);
        const viewState = viewManager.getViewState(viewId);
        // Drop (auto-hide) elements with viewId that are not matched by any current view
        if (viewport) {
            viewState.padding = viewport.padding;
            const { x, y, width, height } = viewport;
            // Resolve potentially relative dimensions using the deck.gl container size
            viewChildren = evaluateChildren(viewChildren, {
                x,
                y,
                width,
                height,
                viewport,
                viewState
            });
            if (!views[viewId]) {
                views[viewId] = {
                    viewport,
                    children: []
                };
            }
            views[viewId].children.push(viewChildren);
        }
    }
    // Render views
    return Object.keys(views).map(viewId => {
        const { viewport, children: viewChildren } = views[viewId];
        const { x, y, width, height } = viewport;
        const style = {
            position: 'absolute',
            left: x,
            top: y,
            width,
            height
        };
        const key = `view-${viewId}`;
        // If children is passed as an array, React will throw the "each element in a list needs
        // a key" warning. Sending each child as separate arguments removes this requirement.
        const viewElement = createElement('div', { key, id: key, style }, ...viewChildren);
        const contextValue = {
            deck,
            viewport,
            // @ts-expect-error accessing protected property
            container: deck.canvas.offsetParent,
            // @ts-expect-error accessing protected property
            eventManager: deck.eventManager,
            onViewStateChange: params => {
                params.viewId = viewId;
                // @ts-expect-error accessing protected method
                deck._onViewStateChange(params);
            },
            widgets: []
        };
        const providerKey = `view-${viewId}-context`;
        return createElement(ContextProvider, { key: providerKey, value: contextValue }, viewElement);
    });
}
//# sourceMappingURL=position-children-under-views.js.map