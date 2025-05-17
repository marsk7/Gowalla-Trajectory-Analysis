import { Texture } from '@luma.gl/core';
import { Model } from '@luma.gl/engine';
import { Layer, UpdateParameters, Color } from '@deck.gl/core';
import { ShaderModule } from '@luma.gl/shadertools';
import type { ScaleType } from "../common/types.js";
/** Proprties added by ScreenGridCellLayer. */
export type _ScreenGridCellLayerProps = {
    cellSizePixels: number;
    cellMarginPixels: number;
    colorScaleType: ScaleType;
    colorDomain: () => [number, number];
    colorRange?: Color[];
};
export default class ScreenGridCellLayer<ExtraPropsT extends {} = {}> extends Layer<ExtraPropsT & Required<_ScreenGridCellLayerProps>> {
    static layerName: string;
    state: {
        model?: Model;
        colorTexture: Texture;
    };
    getShaders(): {
        vs: string;
        fs: string;
        modules: ShaderModule[];
    };
    initializeState(): void;
    updateState(params: UpdateParameters<this>): void;
    finalizeState(context: any): void;
    draw({ uniforms }: {
        uniforms: any;
    }): void;
    _getModel(): Model;
}
//# sourceMappingURL=screen-grid-cell-layer.d.ts.map