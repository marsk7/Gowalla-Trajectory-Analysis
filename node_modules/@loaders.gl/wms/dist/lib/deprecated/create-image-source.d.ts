import type { Source, ImageSource, ImageSourceProps } from '@loaders.gl/loader-utils';
import type { WMSImageSourceProps } from "../../services/ogc/wms-service.js";
/** @deprecated */
export type ImageServiceType = 'wms' | 'arcgis-image-server' | 'template';
/**
 * * @deprecated Use createDataSource from @loaders.gl/core
 */
type CreateImageSourceProps = ImageSourceProps & WMSImageSourceProps & {
    url: string;
    type?: ImageServiceType | 'auto';
};
/**
 * Creates an image source
 * If type is not supplied, will try to automatically detect the the
 * @param url URL to the image source
 * @param type type of source. if not known, set to 'auto'
 * @returns an ImageSource instance
 *
 * @deprecated Use createDataSource from @loaders.gl/core
 */
export declare function createImageSource(props: CreateImageSourceProps, sources?: Source<import("@loaders.gl/loader-utils").DataSource<import("@loaders.gl/loader-utils").DataSourceProps>, any>[]): ImageSource;
export {};
//# sourceMappingURL=create-image-source.d.ts.map