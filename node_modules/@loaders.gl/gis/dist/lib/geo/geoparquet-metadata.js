// GEO METADATA
/**
 * Reads the GeoMetadata object from the metadata
 * @note geoarrow / parquet schema is stringified into a single key-value pair in the parquet metadata
 */
export function getGeoMetadata(schema) {
    const geoMetadata = parseJSONStringMetadata(schema, 'geo');
    if (!geoMetadata) {
        return null;
    }
    for (const column of Object.values(geoMetadata.columns || {})) {
        if (column.encoding) {
            column.encoding = column.encoding.toLowerCase();
        }
    }
    return geoMetadata;
}
/**
 * Stores a geoarrow / geoparquet geo metadata object in the schema
 * @note geoarrow / geoparquet geo metadata is a single stringified JSON field
 */
export function setGeoMetadata(schema, geoMetadata) {
    const stringifiedGeoMetadata = JSON.stringify(geoMetadata);
    schema.metadata.geo = stringifiedGeoMetadata;
}
/**
 * Unpacks geo metadata into separate metadata fields (parses the long JSON string)
 * @note geoarrow / parquet schema is stringified into a single key-value pair in the parquet metadata
 */
export function unpackGeoMetadata(schema) {
    const geoMetadata = getGeoMetadata(schema);
    if (!geoMetadata) {
        return;
    }
    // Store Parquet Schema Level Metadata
    const { version, primary_column, columns } = geoMetadata;
    if (version) {
        schema.metadata['geo.version'] = version;
    }
    if (primary_column) {
        schema.metadata['geo.primary_column'] = primary_column;
    }
    // store column names as comma separated list
    schema.metadata['geo.columns'] = Object.keys(columns || {}).join('');
    for (const [columnName, columnMetadata] of Object.entries(columns || {})) {
        const field = schema.fields.find((field) => field.name === columnName);
        if (field) {
            if (field.name === primary_column) {
                setFieldMetadata(field, 'geo.primary_field', 'true');
            }
            unpackGeoFieldMetadata(field, columnMetadata);
        }
    }
}
// eslint-disable-next-line complexity
function unpackGeoFieldMetadata(field, columnMetadata) {
    for (const [key, value] of Object.entries(columnMetadata || {})) {
        switch (key) {
            case 'geometry_types':
                setFieldMetadata(field, `geo.${key}`, value.join(','));
                break;
            case 'bbox':
                setFieldMetadata(field, `geo.crs.${key}`, JSON.stringify(value));
                break;
            case 'crs':
                // @ts-ignore
                for (const [crsKey, crsValue] of Object.entries(value || {})) {
                    switch (crsKey) {
                        case 'id':
                            // prettier-ignore
                            const crsId = typeof crsValue === 'object'
                                ? // @ts-ignore
                                    `${crsValue?.authority}:${crsValue?.code}`
                                : JSON.stringify(crsValue);
                            setFieldMetadata(field, `geo.crs.${crsKey}`, crsId);
                            break;
                        default:
                            setFieldMetadata(field, `geo.crs.${crsKey}`, typeof crsValue === 'string' ? crsValue : JSON.stringify(crsValue));
                            break;
                    }
                }
                break;
            case 'edges':
            default:
                setFieldMetadata(field, `geo.${key}`, typeof value === 'string' ? value : JSON.stringify(value));
        }
    }
}
function setFieldMetadata(field, key, value) {
    field.metadata = field.metadata || {};
    field.metadata[key] = value;
}
// HELPERS
/** Parse a key with stringified arrow metadata */
export function parseJSONStringMetadata(schema, metadataKey) {
    const stringifiedMetadata = schema.metadata[metadataKey];
    if (!stringifiedMetadata) {
        return null;
    }
    try {
        const metadata = JSON.parse(stringifiedMetadata);
        if (!metadata || typeof metadata !== 'object') {
            return null;
        }
        return metadata;
    }
    catch {
        return null;
    }
}
export function unpackJSONStringMetadata(schema, metadataKey) {
    const json = parseJSONStringMetadata(schema, metadataKey);
    for (const [key, value] of Object.entries(json || {})) {
        schema.metadata[`${metadataKey}.${key}`] =
            typeof value === 'string' ? value : JSON.stringify(value);
    }
}
