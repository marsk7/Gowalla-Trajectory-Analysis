// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { _GeoCellLayer as GeoCellLayer } from '@deck.gl/geo-layers';
import { getQuadbinPolygon } from "./quadbin-utils.js";
const defaultProps = {
    getQuadbin: { type: 'accessor', value: (d) => d.quadbin }
};
class QuadbinLayer extends GeoCellLayer {
    indexToBounds() {
        const { data, extruded, getQuadbin } = this.props;
        // To avoid z-fighting reduce polygon footprint when extruding
        const coverage = extruded ? 0.99 : 1;
        return {
            data,
            _normalize: false,
            positionFormat: 'XY',
            getPolygon: (x, objectInfo) => getQuadbinPolygon(getQuadbin(x, objectInfo), coverage),
            updateTriggers: { getPolygon: coverage }
        };
    }
}
QuadbinLayer.layerName = 'QuadbinLayer';
QuadbinLayer.defaultProps = defaultProps;
export default QuadbinLayer;
//# sourceMappingURL=quadbin-layer.js.map