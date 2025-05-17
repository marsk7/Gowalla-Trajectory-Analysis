import {InvalidColumnError} from '../utils.js';

/** @privateRemarks Source: @carto/react-api */
export interface ModelRequestOptions {
  method: 'GET' | 'POST';
  headers?: Record<string, string>;
  signal?: AbortSignal;
  otherOptions?: Record<string, unknown>;
  body?: string;
}

interface ModelErrorResponse {
  error?: string | string[];
  hint?: string;
  column_name?: string;
}

/**
 * Return more descriptive error from API
 * @privateRemarks Source: @carto/react-api
 */
export function dealWithApiError({
  response,
  data,
}: {
  response: Response;
  data: ModelErrorResponse;
}) {
  if (data.error === 'Column not found') {
    throw new InvalidColumnError(`${data.error} ${data.column_name}`);
  }

  if (
    typeof data.error === 'string' &&
    data.error?.includes('Missing columns')
  ) {
    throw new InvalidColumnError(data.error);
  }

  switch (response.status) {
    case 401:
      throw new Error('Unauthorized access. Invalid credentials');
    case 403:
      throw new Error('Forbidden access to the requested data');
    default:
      throw new Error(
        data && data.error && typeof data.error === 'string'
          ? data.error
          : JSON.stringify(data?.hint || data.error?.[0])
      );
  }
}

/** @privateRemarks Source: @carto/react-api */
export async function makeCall({
  url,
  accessToken,
  opts,
}: {
  url: string;
  accessToken: string;
  opts: ModelRequestOptions;
}) {
  let response;
  let data;
  const isPost = opts?.method === 'POST';
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(isPost && {'Content-Type': 'application/json'}),
        ...opts.headers,
      },
      ...(isPost && {
        method: opts?.method,
        body: opts?.body,
      }),
      signal: opts?.signal,
      ...opts?.otherOptions,
    });
    data = await response.json();
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error;

    throw new Error(`Failed request: ${error as Error}`);
  }

  if (!response.ok) {
    dealWithApiError({response, data});
  }

  return data;
}
