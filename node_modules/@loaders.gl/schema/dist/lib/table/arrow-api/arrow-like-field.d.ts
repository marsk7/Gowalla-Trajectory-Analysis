import { DataType } from "./arrow-like-type.js";
/**
 * ArrowJS `Field` API-compatible class for row-based tables
 * https://loaders.gl/arrowjs/docs/api-reference/field
 * A field holds name, nullable, and metadata information about a table "column"
 * A Schema is essentially a list of fields
 */
export declare class ArrowLikeField {
    name: string;
    type: DataType;
    nullable: boolean;
    metadata: Map<string, string>;
    constructor(name: string, type: DataType, nullable?: boolean, metadata?: Map<string, string>);
    get typeId(): number;
    clone(): ArrowLikeField;
    compareTo(other: this): boolean;
    toString(): string;
}
//# sourceMappingURL=arrow-like-field.d.ts.map