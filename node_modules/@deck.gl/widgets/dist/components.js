import { jsx as _jsx } from "preact/jsx-runtime";
// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export const IconButton = props => {
    const { className, label, onClick } = props;
    return (_jsx("div", { className: "deck-widget-button", children: _jsx("button", { className: `deck-widget-icon-button ${className}`, type: "button", onClick: onClick, title: label, children: _jsx("div", { className: "deck-widget-icon" }) }) }));
};
export const ButtonGroup = props => {
    const { children, orientation } = props;
    return _jsx("div", { className: `deck-widget-button-group ${orientation}`, children: children });
};
export const GroupedIconButton = props => {
    const { className, label, onClick } = props;
    return (_jsx("button", { className: `deck-widget-icon-button ${className}`, type: "button", onClick: onClick, title: label, children: _jsx("div", { className: "deck-widget-icon" }) }));
};
//# sourceMappingURL=components.js.map