import { Type } from "./arrow-like-type.js";
/**
 * Gets type information from an Arrow type object or "mock" Arrow type object
 * @param arrowTypeLike Arrow Type or type object of similar shape
 */
export declare function getTypeInfo(arrowTypeLike: any): {
    typeId: Type;
    ArrayType: ArrayLike<unknown>;
    typeName: string;
    typeEnumName?: string;
    precision?: number;
};
//# sourceMappingURL=get-type-info.d.ts.map