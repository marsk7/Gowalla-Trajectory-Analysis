import { Field } from "../../../types/schema.js";
export interface ArrayType<T = unknown> {
    readonly length: number;
    [n: number]: T;
}
export declare function makeColumnFromField(field: Field, length: number): ArrayType;
//# sourceMappingURL=table-column.d.ts.map