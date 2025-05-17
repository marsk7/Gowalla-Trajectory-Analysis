import { assert } from '@loaders.gl/loader-utils';
import { getBinaryImageMetadata } from "../category-api/binary-image-api.js";
// Use polyfills if installed to parsed image using get-pixels
export async function parseToNodeImage(arrayBuffer, options) {
    const { mimeType } = getBinaryImageMetadata(arrayBuffer) || {};
    // @ts-ignore
    const parseImageNode = globalThis.loaders?.parseImageNode;
    assert(parseImageNode); // '@loaders.gl/polyfills not installed'
    // @ts-expect-error TODO should we throw error in this case?
    return await parseImageNode(arrayBuffer, mimeType);
}
