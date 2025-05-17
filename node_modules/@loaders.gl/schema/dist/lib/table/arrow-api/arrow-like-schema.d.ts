import { SchemaMetadata, Field } from "../../../types/schema.js";
import { ArrowLikeField } from "./arrow-like-field.js";
export declare class ArrowLikeSchema {
    fields: ArrowLikeField[];
    metadata: Map<string, string>;
    constructor(fields: ArrowLikeField[] | Field[], metadata?: SchemaMetadata | Map<string, string>);
    compareTo(other: ArrowLikeSchema): boolean;
    select(...columnNames: string[]): ArrowLikeSchema;
    selectAt(...columnIndices: number[]): ArrowLikeSchema;
    assign(schemaOrFields: ArrowLikeSchema | ArrowLikeField[]): ArrowLikeSchema;
}
//# sourceMappingURL=arrow-like-schema.d.ts.map