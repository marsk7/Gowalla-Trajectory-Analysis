import type { XMLLoaderOptions } from '@loaders.gl/xml';
import type { WMSLayerDescription } from "../lib/parsers/wms/parse-wms-layer-description.js";
export { WMSLayerDescription };
/**
 * Loader for the response to the WMS DescribeLayer request
 */
export declare const WMSLayerDescriptionLoader: {
    readonly dataType: WMSLayerDescription;
    readonly id: "wms-layer-description";
    readonly name: "WMS DescribeLayer";
    readonly parse: (arrayBuffer: ArrayBuffer, options?: XMLLoaderOptions) => Promise<WMSLayerDescription>;
    readonly parseTextSync: (text: string, options?: XMLLoaderOptions) => WMSLayerDescription;
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
//# sourceMappingURL=wms-layer-description-loader.d.ts.map