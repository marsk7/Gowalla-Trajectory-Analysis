// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { LayerExtension, COORDINATE_SYSTEM } from '@deck.gl/core';
import project64 from "./project64.js";
/** @deprecated Adds the legacy 64-bit precision to geospatial layers. */
class Fp64Extension extends LayerExtension {
    getShaders() {
        const { coordinateSystem } = this.props;
        if (coordinateSystem !== COORDINATE_SYSTEM.LNGLAT &&
            coordinateSystem !== COORDINATE_SYSTEM.DEFAULT) {
            throw new Error('fp64: coordinateSystem must be LNGLAT');
        }
        return {
            modules: [project64]
        };
    }
    draw(params, extension) {
        const { viewport } = params.context;
        this.setShaderModuleProps({ project64: { viewport } });
    }
}
Fp64Extension.extensionName = 'Fp64Extension';
export default Fp64Extension;
//# sourceMappingURL=fp64-extension.js.map