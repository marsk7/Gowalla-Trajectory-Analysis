// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {DEFAULT_API_BASE_URL} from '../constants.js';
import {DEFAULT_MAX_LENGTH_URL} from '../constants-internal.js';
import {buildSourceUrl} from '../api/endpoints.js';
import {requestWithParameters} from '../api/request-with-parameters.js';
import type {
  GeojsonResult,
  JsonResult,
  SourceOptionalOptions,
  SourceRequiredOptions,
  TilejsonMapInstantiation,
  TilejsonResult,
} from './types.js';
import {MapType} from '../types.js';
import {APIErrorContext} from '../api/index.js';
import {getClient} from '../client.js';

export const SOURCE_DEFAULTS: Omit<SourceOptionalOptions, 'clientId'> = {
  apiBaseUrl: DEFAULT_API_BASE_URL,
  format: 'tilejson',
  headers: {},
  maxLengthURL: DEFAULT_MAX_LENGTH_URL,
};

export async function baseSource<UrlParameters extends Record<string, unknown>>(
  endpoint: MapType,
  options: Partial<SourceOptionalOptions> & SourceRequiredOptions,
  urlParameters: UrlParameters
): Promise<TilejsonResult | GeojsonResult | JsonResult> {
  const {accessToken, connectionName, cache, ...optionalOptions} = options;
  const mergedOptions = {
    ...SOURCE_DEFAULTS,
    clientId: getClient(),
    accessToken,
    connectionName,
    endpoint,
  };
  for (const key in optionalOptions) {
    if (optionalOptions[key as keyof typeof optionalOptions]) {
      (mergedOptions as any)[key] =
        optionalOptions[key as keyof typeof optionalOptions];
    }
  }
  const baseUrl = buildSourceUrl(mergedOptions);
  const {clientId, maxLengthURL, format, localCache} = mergedOptions;
  const headers = {
    Authorization: `Bearer ${options.accessToken}`,
    ...options.headers,
  };
  const parameters = {client: clientId, ...urlParameters};

  const errorContext: APIErrorContext = {
    requestType: 'Map instantiation',
    connection: options.connectionName,
    type: endpoint,
    source: JSON.stringify(parameters, undefined, 2),
  };
  const mapInstantiation =
    await requestWithParameters<TilejsonMapInstantiation>({
      baseUrl,
      parameters,
      headers,
      errorContext,
      maxLengthURL,
      localCache,
    });

  const dataUrl = mapInstantiation[format].url[0];
  if (cache) {
    cache.value = parseInt(
      new URL(dataUrl).searchParams.get('cache') || '',
      10
    );
  }
  errorContext.requestType = 'Map data';

  if (format === 'tilejson') {
    const json = await requestWithParameters<TilejsonResult>({
      baseUrl: dataUrl,
      parameters: {client: clientId},
      headers,
      errorContext,
      maxLengthURL,
      localCache,
    });
    if (accessToken) {
      json.accessToken = accessToken;
    }
    return json;
  }

  return await requestWithParameters<GeojsonResult | JsonResult>({
    baseUrl: dataUrl,
    parameters: {client: clientId},
    headers,
    errorContext,
    maxLengthURL,
    localCache,
  });
}
