import { Accessor, Color, CompositeLayer, CompositeLayerProps, Layer, PickingInfo, Unit, Material, UpdateParameters, DefaultProps } from '@deck.gl/core';
import type { BinaryFeatureCollection } from '@loaders.gl/schema';
import type { Feature, Geometry, GeoJSON } from 'geojson';
import { SeparatedGeometries } from "./geojson.js";
import { SubLayersProps } from "./geojson-layer-props.js";
/** All properties supported by GeoJsonLayer */
export type GeoJsonLayerProps<FeaturePropertiesT = unknown> = _GeoJsonLayerProps<FeaturePropertiesT> & CompositeLayerProps;
/** Properties added by GeoJsonLayer */
export type _GeoJsonLayerProps<FeaturePropertiesT> = {
    data: string | GeoJSON | Feature[] | BinaryFeatureCollection | Promise<GeoJSON | Feature[] | BinaryFeatureCollection>;
    /**
     * How to render Point and MultiPoint features in the data.
     *
     * Supported types are:
     *  * `'circle'`
     *  * `'icon'`
     *  * `'text'`
     *
     * @default 'circle'
     */
    pointType?: string;
} & _GeoJsonLayerFillProps<FeaturePropertiesT> & _GeoJsonLayerStrokeProps<FeaturePropertiesT> & _GeoJsonLayer3DProps<FeaturePropertiesT> & _GeoJsonLayerPointCircleProps<FeaturePropertiesT> & _GeojsonLayerIconPointProps<FeaturePropertiesT> & _GeojsonLayerTextPointProps<FeaturePropertiesT>;
/** GeoJsonLayer fill options. */
type _GeoJsonLayerFillProps<FeaturePropertiesT> = {
    /**
     * Whether to draw a filled polygon (solid fill).
     *
     * Note that only the area between the outer polygon and any holes will be filled.
     *
     * @default true
     */
    filled?: boolean;
    /**
     * Fill collor value or accessor.
     *
     * @default [0, 0, 0, 255]
     */
    getFillColor?: Accessor<Feature<Geometry, FeaturePropertiesT>, Color>;
};
/** GeoJsonLayer stroke options. */
type _GeoJsonLayerStrokeProps<FeaturePropertiesT> = {
    /**
     * Whether to draw an outline around the polygon (solid fill).
     *
     * Note that both the outer polygon as well the outlines of any holes will be drawn.
     *
     * @default true
     */
    stroked?: boolean;
    /**
     * Line color value or accessor.
     *
     * @default [0, 0, 0, 255]
     */
    getLineColor?: Accessor<Feature<Geometry, FeaturePropertiesT>, Color>;
    /**
     * Line width value or accessor.
     *
     * @default 1
     */
    getLineWidth?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    /**
     * The units of the line width, one of `meters`, `common`, and `pixels`.
     *
     * @default 'meters'
     * @see Unit.
     */
    lineWidthUnits?: Unit;
    /**
     * A multiplier that is applied to all line widths
     *
     * @default 1
     */
    lineWidthScale?: number;
    /**
     * The minimum line width in pixels.
     *
     * @default 0
     */
    lineWidthMinPixels?: number;
    /**
     * The maximum line width in pixels
     *
     * @default Number.MAX_SAFE_INTEGER
     */
    lineWidthMaxPixels?: number;
    /**
     * Type of joint. If `true`, draw round joints. Otherwise draw miter joints.
     *
     * @default false
     */
    lineJointRounded?: boolean;
    /**
     * The maximum extent of a joint in ratio to the stroke width.
     *
     * Only works if `lineJointRounded` is false.
     *
     * @default 4
     */
    lineMiterLimit?: number;
    /**
     * Type of line caps.
     *
     * If `true`, draw round caps. Otherwise draw square caps.
     *
     * @default false
     */
    lineCapRounded?: boolean;
    /**
     * If `true`, extrude the line in screen space (width always faces the camera).
     * If `false`, the width always faces up.
     *
     * @default false
     */
    lineBillboard?: boolean;
};
/** GeoJsonLayer 3D options. */
type _GeoJsonLayer3DProps<FeaturePropertiesT> = {
    /**
     * Extrude Polygon and MultiPolygon features along the z-axis if set to true
     *
     * Based on the elevations provided by the `getElevation` accessor.
     *
     * @default false
     */
    extruded?: boolean;
    /**
     * Whether to generate a line wireframe of the hexagon.
     *
     * @default false
     */
    wireframe?: boolean;
    /**
     * (Experimental) This prop is only effective with `XYZ` data.
     * When true, polygon tesselation will be performed on the plane with the largest area, instead of the xy plane.
     * @default false
     */
    _full3d?: boolean;
    /**
     * Elevation valur or accessor.
     *
     * Only used if `extruded: true`.
     *
     * @default 1000
     */
    getElevation?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    /**
     * Elevation multiplier.
     *
     * The final elevation is calculated by `elevationScale * getElevation(d)`.
     * `elevationScale` is a handy property to scale all elevation without updating the data.
     *
     * @default 1
     */
    elevationScale?: boolean;
    /**
     * Material settings for lighting effect. Applies to extruded polgons.
     *
     * @default true
     * @see https://deck.gl/docs/developer-guide/using-lighting
     */
    material?: Material;
};
/** GeoJsonLayer Properties forwarded to `ScatterPlotLayer` if `pointType` is `'circle'` */
export type _GeoJsonLayerPointCircleProps<FeaturePropertiesT> = {
    getPointRadius?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    pointRadiusUnits?: Unit;
    pointRadiusScale?: number;
    pointRadiusMinPixels?: number;
    pointRadiusMaxPixels?: number;
    pointAntialiasing?: boolean;
    pointBillboard?: boolean;
    /** @deprecated use getPointRadius */
    getRadius?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
};
/** GeoJsonLayer properties forwarded to `IconLayer` if `pointType` is `'icon'` */
type _GeojsonLayerIconPointProps<FeaturePropertiesT> = {
    iconAtlas?: any;
    iconMapping?: any;
    getIcon?: Accessor<Feature<Geometry, FeaturePropertiesT>, any>;
    getIconSize?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    getIconColor?: Accessor<Feature<Geometry, FeaturePropertiesT>, Color>;
    getIconAngle?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    getIconPixelOffset?: Accessor<Feature<Geometry, FeaturePropertiesT>, number[]>;
    iconSizeUnits?: Unit;
    iconSizeScale?: number;
    iconSizeMinPixels?: number;
    iconSizeMaxPixels?: number;
    iconBillboard?: boolean;
    iconAlphaCutoff?: number;
};
/** GeoJsonLayer properties forwarded to `TextLayer` if `pointType` is `'text'` */
type _GeojsonLayerTextPointProps<FeaturePropertiesT> = {
    getText?: Accessor<Feature<Geometry, FeaturePropertiesT>, any>;
    getTextColor?: Accessor<Feature<Geometry, FeaturePropertiesT>, Color>;
    getTextAngle?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    getTextSize?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    getTextAnchor?: Accessor<Feature<Geometry, FeaturePropertiesT>, string>;
    getTextAlignmentBaseline?: Accessor<Feature<Geometry, FeaturePropertiesT>, string>;
    getTextPixelOffset?: Accessor<Feature<Geometry, FeaturePropertiesT>, number[]>;
    getTextBackgroundColor?: Accessor<Feature<Geometry, FeaturePropertiesT>, Color>;
    getTextBorderColor?: Accessor<Feature<Geometry, FeaturePropertiesT>, Color>;
    getTextBorderWidth?: Accessor<Feature<Geometry, FeaturePropertiesT>, number>;
    textSizeUnits?: Unit;
    textSizeScale?: number;
    textSizeMinPixels?: number;
    textSizeMaxPixels?: number;
    textCharacterSet?: any;
    textFontFamily?: string;
    textFontWeight?: number;
    textLineHeight?: number;
    textMaxWidth?: number;
    textWordBreak?: string;
    textBackground?: boolean;
    textBackgroundPadding?: number[];
    textOutlineColor?: Color;
    textOutlineWidth?: number;
    textBillboard?: boolean;
    textFontSettings?: any;
};
type GeoJsonPickingInfo = PickingInfo & {
    featureType?: string | null;
    info?: any;
};
/** Render GeoJSON formatted data as polygons, lines and points (circles, icons and/or texts). */
export default class GeoJsonLayer<FeaturePropertiesT = any, ExtraProps extends {} = {}> extends CompositeLayer<Required<_GeoJsonLayerProps<FeaturePropertiesT>> & ExtraProps> {
    static layerName: string;
    static defaultProps: DefaultProps<GeoJsonLayerProps<unknown>>;
    state: {
        layerProps: Partial<SubLayersProps>;
        features: Partial<SeparatedGeometries>;
        featuresDiff: Partial<{
            [key in keyof SeparatedGeometries]: {
                startRow: number;
                endRow: number;
            }[];
        }>;
        binary?: boolean;
    };
    initializeState(): void;
    updateState({ props, changeFlags }: UpdateParameters<this>): void;
    private _updateStateBinary;
    private _updateStateJSON;
    getPickingInfo(params: any): GeoJsonPickingInfo;
    _updateAutoHighlight(info: GeoJsonPickingInfo): void;
    private _renderPolygonLayer;
    private _renderLineLayers;
    private _renderPointLayers;
    renderLayers(): (false | Layer<{}> | (false | Layer<{}>)[] | null)[];
    protected getSubLayerAccessor<In, Out>(accessor: Accessor<In, Out>): Accessor<In, Out>;
}
export {};
//# sourceMappingURL=geojson-layer.d.ts.map