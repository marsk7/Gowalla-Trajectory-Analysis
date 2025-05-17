/**
 * Geoparquet JSON schema for geo metadata
 * @see https://github.com/geoarrow/geoarrow/blob/main/metadata.md
 * @see https://github.com/opengeospatial/geoparquet/blob/main/format-specs/geoparquet.md
 */
export declare const GEOPARQUET_METADATA_JSON_SCHEMA: {
    $schema: string;
    title: string;
    description: string;
    type: string;
    required: string[];
    properties: {
        version: {
            type: string;
            const: string;
        };
        primary_column: {
            type: string;
            minLength: number;
        };
        columns: {
            type: string;
            minProperties: number;
            patternProperties: {
                '.+': {
                    type: string;
                    required: string[];
                    properties: {
                        encoding: {
                            type: string;
                            const: string;
                        };
                        geometry_types: {
                            type: string;
                            uniqueItems: boolean;
                            items: {
                                type: string;
                                pattern: string;
                            };
                        };
                        crs: {
                            oneOf: ({
                                $ref: string;
                                type?: undefined;
                            } | {
                                type: string;
                                $ref?: undefined;
                            })[];
                        };
                        edges: {
                            type: string;
                            enum: string[];
                        };
                        orientation: {
                            type: string;
                            const: string;
                        };
                        bbox: {
                            type: string;
                            items: {
                                type: string;
                            };
                            oneOf: {
                                description: string;
                                minItems: number;
                                maxItems: number;
                            }[];
                        };
                        epoch: {
                            type: string;
                        };
                    };
                };
            };
            additionalProperties: boolean;
        };
    };
};
//# sourceMappingURL=geoparquet-metadata-schema.d.ts.map