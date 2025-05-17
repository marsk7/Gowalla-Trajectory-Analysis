export declare function getCode(opts: {
    getValue: (x: number, y: number) => number;
    threshold: number | number[];
    x: number;
    xRange: [number, number];
    y: number;
    yRange: [number, number];
}): {
    code: number;
    meanCode: number;
};
export declare function getPolygons(opts: {
    x: number;
    y: number;
    z: number;
    code: number;
    meanCode: number;
}): number[][][];
export declare function getLines(opts: {
    x: number;
    y: number;
    z: number;
    code: number;
    meanCode: number;
}): number[][];
//# sourceMappingURL=marching-squares.d.ts.map