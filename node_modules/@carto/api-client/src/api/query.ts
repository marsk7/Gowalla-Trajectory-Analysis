// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors

import {SOURCE_DEFAULTS} from '../sources/index.js';
import type {
  SourceOptions,
  QuerySourceOptions,
  QueryResult,
} from '../sources/types.js';
import {buildQueryUrl} from './endpoints.js';
import {requestWithParameters} from './request-with-parameters.js';
import {APIErrorContext} from './carto-api-error.js';
import {getClient} from '../client.js';

export type QueryOptions = SourceOptions & QuerySourceOptions;
type UrlParameters = {q: string; queryParameters?: string};

export const query = async function (
  options: QueryOptions
): Promise<QueryResult> {
  const {
    apiBaseUrl = SOURCE_DEFAULTS.apiBaseUrl,
    maxLengthURL = SOURCE_DEFAULTS.maxLengthURL,
    clientId = getClient(),
    localCache,
    connectionName,
    sqlQuery,
    queryParameters,
  } = options;
  const urlParameters: UrlParameters = {q: sqlQuery};

  if (queryParameters) {
    urlParameters.queryParameters = JSON.stringify(queryParameters);
  }

  const baseUrl = buildQueryUrl({apiBaseUrl, connectionName});
  const headers = {
    Authorization: `Bearer ${options.accessToken}`,
    ...options.headers,
  };
  const parameters = {client: clientId, ...urlParameters};

  const errorContext: APIErrorContext = {
    requestType: 'SQL',
    connection: options.connectionName,
    type: 'query',
    source: JSON.stringify(parameters, undefined, 2),
  };
  return await requestWithParameters<QueryResult>({
    baseUrl,
    parameters,
    headers,
    errorContext,
    maxLengthURL,
    localCache,
  });
};
