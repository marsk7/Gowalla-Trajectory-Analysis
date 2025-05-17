/**
 * @internal
 * @privateRemarks Source: @carto/react-core, @carto/constants, @deck.gl/carto
 */
let client = 'deck-gl-carto';

/**
 * Returns current client ID, used to categorize API requests. For internal use only.
 *
 * @internal
 * @privateRemarks Source: @carto/react-core
 */
export function getClient() {
  return client;
}

/**
 * Sets current client ID, used to categorize API requests. For internal use only.
 *
 * @internal
 * @privateRemarks Source: @carto/react-core
 */
export function setClient(c: string) {
  client = c;
}
