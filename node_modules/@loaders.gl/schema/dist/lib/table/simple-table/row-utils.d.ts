/** Convert an object row to an array row */
export declare function convertToObjectRow(arrayRow: unknown[], headers: string[] | null): {
    [columnName: string]: unknown;
};
/** Convert an object row to an array row */
export declare function convertToArrayRow(objectRow: {
    [columnName: string]: unknown;
}, headers: string[] | null): unknown[];
/** Get headers from a sample array row */
export declare function inferHeadersFromArrayRow(arrayRow: unknown[]): string[];
/** Get headers from a smaple object row */
export declare function inferHeadersFromObjectRow(row: {
    [columnName: string]: unknown;
}): string[];
//# sourceMappingURL=row-utils.d.ts.map