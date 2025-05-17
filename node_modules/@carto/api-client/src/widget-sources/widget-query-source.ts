import {
  H3QuerySourceOptions,
  QuadbinQuerySourceOptions,
  VectorQuerySourceOptions,
} from '../sources/index.js';
import {
  WidgetRemoteSource,
  WidgetRemoteSourceProps,
} from './widget-remote-source.js';
import {ModelSource} from '../models/model.js';
import {Filters} from '../types.js';

type LayerQuerySourceOptions =
  | Omit<VectorQuerySourceOptions, 'filters'>
  | Omit<H3QuerySourceOptions, 'filters'>
  | Omit<QuadbinQuerySourceOptions, 'filters'>;

export type WidgetQuerySourceResult = {widgetSource: WidgetQuerySource};

/**
 * Source for Widget API requests on a data source defined by a SQL query.
 *
 * Generally not intended to be constructed directly. Instead, call
 * {@link vectorQuerySource}, {@link h3QuerySource}, or {@link quadbinQuerySource},
 * which can be shared with map layers. Sources contain a `widgetSource` property,
 * for use by widget implementations.
 *
 * Example:
 *
 * ```javascript
 * import { vectorQuerySource } from '@carto/api-client';
 *
 * const data = vectorQuerySource({
 *   accessToken: '••••',
 *   connectionName: 'carto_dw',
 *   sqlQuery: 'SELECT * FROM carto-demo-data.demo_tables.retail_stores'
 * });
 *
 * const { widgetSource } = await data;
 * ```
 */
export class WidgetQuerySource extends WidgetRemoteSource<
  LayerQuerySourceOptions & WidgetRemoteSourceProps
> {
  protected override getModelSource(
    filters: Filters | undefined,
    filterOwner?: string
  ): ModelSource {
    return {
      ...super._getModelSource(filters, filterOwner),
      type: 'query',
      data: this.props.sqlQuery,
      queryParameters: this.props.queryParameters,
    };
  }
}
