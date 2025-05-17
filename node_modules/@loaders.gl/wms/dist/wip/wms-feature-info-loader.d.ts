import type { XMLLoaderOptions } from '@loaders.gl/xml';
import type { WMSFeatureInfo } from "../lib/parsers/wms/parse-wms-features.js";
export { WMSFeatureInfo };
/**
 * Loader for the response to the WMS GetFeatureInfo request
 */
export declare const WMSFeatureInfoLoader: {
    readonly dataType: WMSFeatureInfo;
    readonly id: "wms-feature-info";
    readonly name: "WMS FeatureInfo";
    readonly parse: (arrayBuffer: ArrayBuffer, options?: XMLLoaderOptions) => Promise<WMSFeatureInfo>;
    readonly parseTextSync: (text: string, options?: XMLLoaderOptions) => WMSFeatureInfo;
    readonly batchType: never;
    readonly module: "wms";
    readonly version: any;
    readonly worker: false;
    readonly extensions: ["xml"];
    readonly mimeTypes: ["application/vnd.ogc.wms_xml", "application/xml", "text/xml"];
    readonly testText: (text: string) => boolean;
    readonly options: {
        readonly wms: {};
    };
};
//# sourceMappingURL=wms-feature-info-loader.d.ts.map