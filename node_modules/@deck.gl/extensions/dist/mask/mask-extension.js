// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { COORDINATE_SYSTEM, LayerExtension, log } from '@deck.gl/core';
import mask from "./shader-module.js";
import MaskEffect from "./mask-effect.js";
const defaultProps = {
    maskId: '',
    maskByInstance: undefined,
    maskInverted: false
};
/** Allows layers to show/hide objects by a geofence. */
class MaskExtension extends LayerExtension {
    initializeState() {
        this.context.deck?._addDefaultEffect(new MaskEffect());
    }
    getShaders() {
        // Infer by geometry if 'maskByInstance' prop isn't explictly set
        let maskByInstance = 'instancePositions' in this.getAttributeManager().attributes;
        // Users can override by setting the `maskByInstance` prop
        if (this.props.maskByInstance !== undefined) {
            maskByInstance = Boolean(this.props.maskByInstance);
        }
        this.state.maskByInstance = maskByInstance;
        return {
            modules: [mask]
        };
    }
    /* eslint-disable camelcase */
    draw({ context, shaderModuleProps }) {
        const maskProps = {};
        maskProps.maskByInstance = Boolean(this.state.maskByInstance);
        const { maskId, maskInverted } = this.props;
        const { maskChannels } = shaderModuleProps.mask || {};
        const { viewport } = context;
        if (maskChannels && maskChannels[maskId]) {
            const { index, bounds, coordinateOrigin: fromCoordinateOrigin } = maskChannels[maskId];
            let { coordinateSystem: fromCoordinateSystem } = maskChannels[maskId];
            maskProps.enabled = true;
            maskProps.channel = index;
            maskProps.inverted = maskInverted;
            if (fromCoordinateSystem === COORDINATE_SYSTEM.DEFAULT) {
                fromCoordinateSystem = viewport.isGeospatial
                    ? COORDINATE_SYSTEM.LNGLAT
                    : COORDINATE_SYSTEM.CARTESIAN;
            }
            const opts = { modelMatrix: null, fromCoordinateOrigin, fromCoordinateSystem };
            const bl = this.projectPosition([bounds[0], bounds[1], 0], opts);
            const tr = this.projectPosition([bounds[2], bounds[3], 0], opts);
            maskProps.bounds = [bl[0], bl[1], tr[0], tr[1]];
        }
        else {
            if (maskId) {
                log.warn(`Could not find a mask layer with id: ${maskId}`)();
            }
            maskProps.enabled = false;
        }
        this.setShaderModuleProps({ mask: maskProps });
    }
}
MaskExtension.defaultProps = defaultProps;
MaskExtension.extensionName = 'MaskExtension';
export default MaskExtension;
//# sourceMappingURL=mask-extension.js.map