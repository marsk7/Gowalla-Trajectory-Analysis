// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { FullscreenWidget as _FullscreenWidget } from '@deck.gl/widgets';
import { useWidget } from "../utils/use-widget.js";
export const FullscreenWidget = (props = {}) => {
    useWidget(_FullscreenWidget, props);
    return null;
};
//# sourceMappingURL=fullscreen-widget.js.map