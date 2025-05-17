import {DEFAULT_GEO_COLUMN} from '../constants-internal.js';
import {
  Filter,
  FilterLogicalOperator,
  MapType,
  QueryParameters,
  SpatialFilter,
} from '../types.js';
import {assert, isPureObject} from '../utils.js';
import {ModelRequestOptions, makeCall} from './common.js';
import {ApiVersion} from '../constants.js';
import {SpatialDataType, SpatialFilterPolyfillMode} from '../sources/types.js';

/** @privateRemarks Source: @carto/react-api */
const AVAILABLE_MODELS = [
  'category',
  'histogram',
  'formula',
  'pick',
  'timeseries',
  'range',
  'scatterplot',
  'table',
] as const;

export type Model = (typeof AVAILABLE_MODELS)[number];

export interface ModelSource {
  type: MapType;
  apiVersion: ApiVersion;
  apiBaseUrl: string;
  accessToken: string;
  clientId: string;
  connectionName: string;
  data: string;
  filters?: Record<string, Filter>;
  filtersLogicalOperator?: FilterLogicalOperator;
  spatialFilter?: SpatialFilter;
  queryParameters?: QueryParameters;
  spatialDataColumn?: string;
  spatialDataType?: SpatialDataType;
  spatialFiltersMode?: SpatialFilterPolyfillMode;
  /** original resolution of the spatial index data as stored in the DW */
  dataResolution?: number;
}

const {V3} = ApiVersion;
const REQUEST_GET_MAX_URL_LENGTH = 2048;

/**
 * Execute a SQL model request.
 * @privateRemarks Source: @carto/react-api
 */
export function executeModel(props: {
  model: Model;
  source: ModelSource;
  params: Record<string, unknown>;
  opts?: Partial<ModelRequestOptions>;
}) {
  assert(props.source, 'executeModel: missing source');
  assert(props.model, 'executeModel: missing model');
  assert(props.params, 'executeModel: missing params');

  assert(
    AVAILABLE_MODELS.includes(props.model),
    `executeModel: model provided isn't valid. Available models: ${AVAILABLE_MODELS.join(
      ', '
    )}`
  );

  const {model, source, params, opts} = props;
  const {type, apiVersion, apiBaseUrl, accessToken, connectionName, clientId} =
    source;

  assert(apiBaseUrl, 'executeModel: missing apiBaseUrl');
  assert(accessToken, 'executeModel: missing accessToken');
  assert(apiVersion === V3, 'executeModel: SQL Model API requires CARTO 3+');
  assert(type !== 'tileset', 'executeModel: Tilesets not supported');

  let url = `${apiBaseUrl}/v3/sql/${connectionName}/model/${model}`;

  const {
    data,
    filters,
    filtersLogicalOperator = 'and',
    spatialDataType = 'geo',
    spatialFiltersMode = 'intersects',
  } = source;

  const queryParams: Record<string, unknown> = {
    type,
    client: clientId,
    source: data,
    params,
    queryParameters: source.queryParameters || '',
    filters,
    filtersLogicalOperator,
  };

  const spatialDataColumn = source.spatialDataColumn || DEFAULT_GEO_COLUMN;

  // Picking Model API requires 'spatialDataColumn'.
  if (model === 'pick') {
    queryParams.spatialDataColumn = spatialDataColumn;
  }

  // API supports multiple filters, we apply it only to spatialDataColumn
  const spatialFilters = source.spatialFilter
    ? {[spatialDataColumn]: source.spatialFilter}
    : undefined;

  if (spatialFilters) {
    queryParams.spatialFilters = spatialFilters;
    queryParams.spatialDataColumn = spatialDataColumn;
    queryParams.spatialDataType = spatialDataType;
  }

  if (spatialDataType !== 'geo') {
    queryParams.spatialFiltersMode = spatialFiltersMode;
  }

  const urlWithSearchParams =
    url + '?' + objectToURLSearchParams(queryParams).toString();
  const isGet = urlWithSearchParams.length <= REQUEST_GET_MAX_URL_LENGTH;
  if (isGet) {
    url = urlWithSearchParams;
  }
  return makeCall({
    url,
    accessToken: source.accessToken,
    opts: {
      ...opts,
      method: isGet ? 'GET' : 'POST',
      ...(!isGet && {body: JSON.stringify(queryParams)}),
    },
  });
}

function objectToURLSearchParams(object: Record<string, unknown>) {
  const params = new URLSearchParams();
  for (const key in object) {
    if (isPureObject(object[key])) {
      params.append(key, JSON.stringify(object[key]));
    } else if (Array.isArray(object[key])) {
      params.append(key, JSON.stringify(object[key]));
    } else if (object[key] === null) {
      params.append(key, 'null');
    } else if (object[key] !== undefined) {
      params.append(key, String(object[key] as unknown));
    }
  }
  return params;
}
