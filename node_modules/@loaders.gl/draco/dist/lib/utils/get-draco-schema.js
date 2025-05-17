import { deduceMeshField } from '@loaders.gl/schema';
/** Extract an arrow-like schema from a Draco mesh */
export function getDracoSchema(attributes, loaderData, indices) {
    const metadata = makeMetadata(loaderData.metadata);
    const fields = [];
    const namedLoaderDataAttributes = transformAttributesLoaderData(loaderData.attributes);
    for (const attributeName in attributes) {
        const attribute = attributes[attributeName];
        const field = getArrowFieldFromAttribute(attributeName, attribute, namedLoaderDataAttributes[attributeName]);
        fields.push(field);
    }
    if (indices) {
        const indicesField = getArrowFieldFromAttribute('indices', indices);
        fields.push(indicesField);
    }
    return { fields, metadata };
}
function transformAttributesLoaderData(loaderData) {
    const result = {};
    for (const key in loaderData) {
        const dracoAttribute = loaderData[key];
        result[dracoAttribute.name || 'undefined'] = dracoAttribute;
    }
    return result;
}
function getArrowFieldFromAttribute(attributeName, attribute, loaderData) {
    const metadataMap = loaderData ? makeMetadata(loaderData.metadata) : undefined;
    const field = deduceMeshField(attributeName, attribute, metadataMap);
    return field;
}
function makeMetadata(metadata) {
    Object.entries(metadata);
    const serializedMetadata = {};
    for (const key in metadata) {
        serializedMetadata[`${key}.string`] = JSON.stringify(metadata[key]);
    }
    return serializedMetadata;
}
