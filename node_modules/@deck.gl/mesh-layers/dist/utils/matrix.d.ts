export declare const MATRIX_ATTRIBUTES: {
    size: number;
    accessor: string[];
    shaderAttributes: {
        readonly instanceModelMatrixCol0: {
            readonly size: 3;
            readonly elementOffset: 0;
        };
        readonly instanceModelMatrixCol1: {
            readonly size: 3;
            readonly elementOffset: 3;
        };
        readonly instanceModelMatrixCol2: {
            readonly size: 3;
            readonly elementOffset: 6;
        };
        readonly instanceTranslation: {
            readonly size: 3;
            readonly elementOffset: 9;
        };
    };
    update(attribute: any, { startRow, endRow }: {
        startRow: any;
        endRow: any;
    }): void;
};
export declare function shouldComposeModelMatrix(viewport: any, coordinateSystem: any): boolean;
//# sourceMappingURL=matrix.d.ts.map