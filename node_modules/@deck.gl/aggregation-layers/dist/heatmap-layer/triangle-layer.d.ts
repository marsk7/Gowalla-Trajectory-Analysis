import type { Buffer, Device, Texture } from '@luma.gl/core';
import { Model } from '@luma.gl/engine';
import { Layer, LayerContext } from '@deck.gl/core';
type _TriangleLayerProps = {
    data: {
        attributes: {
            positions: Buffer;
            texCoords: Buffer;
        };
    };
    colorDomain: [number, number];
    aggregationMode: number;
    threshold: number;
    intensity: number;
    vertexCount: number;
    colorTexture: Texture;
    maxTexture: Texture;
    weightsTexture: Texture;
};
export default class TriangleLayer extends Layer<_TriangleLayerProps> {
    static layerName: string;
    state: {
        model: Model;
        positions: Buffer;
        texCoords: Buffer;
    };
    getShaders(): any;
    initializeState({ device }: LayerContext): void;
    _getModel(device: Device): Model;
    draw(): void;
}
export {};
//# sourceMappingURL=triangle-layer.d.ts.map