import { Schema, GeoJSONTable } from '@loaders.gl/schema';
import type { VectorSourceProps, VectorSourceMetadata, GetFeaturesParameters, LoaderWithParser } from '@loaders.gl/loader-utils';
import { VectorSource } from '@loaders.gl/loader-utils';
export type ArcGISImageServiceQueryOptions = {
    returnGeometry: boolean;
    where: '1%3D1';
    outSR: 4326;
    outFields: string | '*';
    inSR: 4326;
    geometry: `${-90}%2C+${30}%2C+${-70}%2C+${50}`;
    geometryType: 'esriGeometryEnvelope';
    spatialRel: 'esriSpatialRelIntersects';
    geometryPrecision: number;
    resultType: 'tile';
    f?: 'geojson';
};
/**
 * @ndeprecated This is a WIP, not fully implemented
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm
 */
export declare const ArcGISFeatureServerSource: {
    readonly name: "ArcGISFeatureServer";
    readonly id: "arcgis-feature-server";
    readonly module: "wms";
    readonly version: "0.0.0";
    readonly extensions: [];
    readonly mimeTypes: [];
    readonly options: {
        readonly url: never;
        readonly 'arcgis-feature-server': {
            /** Tabular loaders, normally the GeoJSONLoader */
            readonly loaders: [];
        };
    };
    readonly type: "arcgis-feature-server";
    readonly fromUrl: true;
    readonly fromBlob: false;
    readonly testURL: (url: string) => boolean;
    readonly createDataSource: (url: string | Blob, props: ArcGISVectorSourceProps) => ArcGISVectorSource;
};
export type ArcGISVectorSourceProps = VectorSourceProps & {
    url: string;
    'arcgis-feature-server'?: {
        loaders: LoaderWithParser[];
    };
};
/**
 * ArcGIS ImageServer
 * Note - exports a big API, that could be exposed here if there is a use case
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm
 */
export declare class ArcGISVectorSource extends VectorSource<ArcGISVectorSourceProps> {
    data: string;
    protected formatSpecificMetadata: Promise<any>;
    constructor(props: ArcGISVectorSourceProps);
    /** TODO - not yet clear if we can find schema information in the FeatureServer metadata or if we need to request a feature */
    getSchema(): Promise<Schema>;
    getMetadata(options: {
        formatSpecificMetadata: any;
    }): Promise<VectorSourceMetadata>;
    getFeatures(parameters: GetFeaturesParameters): Promise<GeoJSONTable>;
    protected _getFormatSpecificMetadata(): Promise<any>;
}
/** Sample metadata
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/feature-service.htm
 */
//# sourceMappingURL=arcgis-feature-server.d.ts.map