import type { NumericArray } from '@math.gl/core';
import { ParsedPBRMaterial } from '@luma.gl/gltf';
import { Model } from '@luma.gl/engine';
import type { MeshAttribute, MeshAttributes } from '@loaders.gl/schema';
import type { UpdateParameters, DefaultProps, LayerContext } from '@deck.gl/core';
import { SimpleMeshLayer, SimpleMeshLayerProps } from '@deck.gl/mesh-layers';
export type Mesh = {
    attributes: MeshAttributes;
    indices?: MeshAttribute;
};
/** All properties supported by MeshLayer. */
export type MeshLayerProps<DataT = unknown> = _MeshLayerProps & SimpleMeshLayerProps<DataT>;
/** Properties added by MeshLayer. */
type _MeshLayerProps = {
    /**
     * PBR material object. _lighting must be pbr for this to work
     */
    pbrMaterial?: any;
    /**
     * List of feature ids.
     */
    featureIds?: NumericArray | null;
};
export default class MeshLayer<DataT = any, ExtraProps extends {} = {}> extends SimpleMeshLayer<DataT, Required<_MeshLayerProps> & ExtraProps> {
    static layerName: string;
    static defaultProps: DefaultProps<MeshLayerProps<unknown>>;
    getShaders(): any;
    initializeState(): void;
    updateState(params: UpdateParameters<this>): void;
    draw(opts: any): void;
    protected getModel(mesh: Mesh): Model;
    updatePbrMaterialUniforms(material: any): void;
    parseMaterial(material: any, mesh: Mesh): ParsedPBRMaterial;
    calculateFeatureIdsPickingColors(attribute: any): void;
    finalizeState(context: LayerContext): void;
}
export {};
//# sourceMappingURL=mesh-layer.d.ts.map