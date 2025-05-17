// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
export default class ViewState {
    constructor(props, state) {
        this._viewportProps = this.applyConstraints(props);
        this._state = state;
    }
    getViewportProps() {
        return this._viewportProps;
    }
    getState() {
        return this._state;
    }
}
//# sourceMappingURL=view-state.js.map