import { Layer, DefaultProps, LayerContext, Material } from '@deck.gl/core';
import { SamplerProps, Texture } from '@luma.gl/core';
import { Model } from '@luma.gl/engine';
import { ParsedPBRMaterial } from '@luma.gl/gltf';
import type { LayerProps, LayerDataSource, UpdateParameters, Accessor, Position, Color, TextureSource } from '@deck.gl/core';
import type { MeshAttribute, MeshAttributes } from '@loaders.gl/schema';
import type { Geometry as GeometryType } from '@luma.gl/engine';
type Mesh = GeometryType | {
    attributes: MeshAttributes;
    indices?: MeshAttribute;
} | MeshAttributes;
type _SimpleMeshLayerProps<DataT> = {
    data: LayerDataSource<DataT>;
    mesh: string | Mesh | Promise<Mesh> | null;
    texture?: string | TextureSource | Promise<TextureSource>;
    /** Customize the [texture parameters](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter). */
    textureParameters?: SamplerProps | null;
    /** Anchor position accessor. */
    getPosition?: Accessor<DataT, Position>;
    /** Color value or accessor.
     * If `mesh` does not contain vertex colors, use this color to render each object.
     * If `mesh` contains vertex colors, then the two colors are mixed together.
     * Use `[255, 255, 255]` to use the original mesh colors.
     * If `texture` is assigned, then both colors will be ignored.
     * @default [0, 0, 0, 255]
     */
    getColor?: Accessor<DataT, Color>;
    /**
     * Orientation in [pitch, yaw, roll] in degrees.
     * @see https://en.wikipedia.org/wiki/Euler_angles
     * @default [0, 0, 0]
     */
    getOrientation?: Accessor<DataT, [number, number, number]>;
    /**
     * Scaling factor of the model along each axis.
     * @default [1, 1, 1]
     */
    getScale?: Accessor<DataT, [number, number, number]>;
    /**
     * Translation from the anchor point, [x, y, z] in meters.
     * @default [0, 0, 0]
     */
    getTranslation?: Accessor<DataT, [number, number, number]>;
    /**
     * TransformMatrix. If specified, `getOrientation`, `getScale` and `getTranslation` are ignored.
     */
    getTransformMatrix?: Accessor<DataT, number[]>;
    /**
     * Multiplier to scale each geometry by.
     * @default 1
     */
    sizeScale?: number;
    /**
     * (Experimental) If rendering only one instance of the mesh, set this to false to treat mesh positions
     * as deltas of the world coordinates of the anchor.
     * E.g. in LNGLAT coordinates, mesh positions are interpreted as meter offsets by default.
     * setting _instanced to false interpreted mesh positions as lnglat deltas.
     * @default true
     */
    _instanced?: boolean;
    /**
     * Whether to render the mesh in wireframe mode.
     * @default false
     */
    wireframe?: boolean;
    /**
     * Material props for lighting effect.
     *
     * @default true
     * @see https://deck.gl/docs/developer-guide/using-lighting#constructing-a-material-instance
     */
    material?: Material;
};
export type SimpleMeshLayerProps<DataT = unknown> = _SimpleMeshLayerProps<DataT> & LayerProps;
/** Render a number of instances of an arbitrary 3D geometry. */
export default class SimpleMeshLayer<DataT = any, ExtraPropsT extends {} = {}> extends Layer<ExtraPropsT & Required<_SimpleMeshLayerProps<DataT>>> {
    static defaultProps: DefaultProps<SimpleMeshLayerProps<unknown>>;
    static layerName: string;
    state: {
        parsedPBRMaterial?: ParsedPBRMaterial;
        model?: Model;
        emptyTexture: Texture;
        hasNormals?: boolean;
        positionBounds?: [number[], number[]] | null;
    };
    getShaders(): any;
    getBounds(): [number[], number[]] | null;
    initializeState(): void;
    updateState(params: UpdateParameters<this>): void;
    finalizeState(context: LayerContext): void;
    draw({ uniforms }: {
        uniforms: any;
    }): void;
    get isLoaded(): boolean;
    protected getModel(mesh: Mesh): Model;
    private setTexture;
}
export {};
//# sourceMappingURL=simple-mesh-layer.d.ts.map