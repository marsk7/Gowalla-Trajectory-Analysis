import type { DataSourceProps } from '@loaders.gl/loader-utils';
import { DataSource, Source } from '@loaders.gl/loader-utils';
/**
 * Creates a source from a service
 * If type is not supplied, will try to automatically detect the the
 * @param url URL to the data source
 * @param type type of source. if not known, set to 'auto'
 * @returns an DataSource instance
 */
export declare function createDataSource<DataSourcePropsT extends DataSourceProps = DataSourceProps, DataSourceT extends DataSource = DataSource>(data: string | Blob, sources: Source[], props: DataSourcePropsT & {
    type?: string;
}): DataSourceT;
//# sourceMappingURL=create-data-source.d.ts.map