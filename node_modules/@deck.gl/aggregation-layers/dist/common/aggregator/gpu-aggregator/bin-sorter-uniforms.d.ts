import { NumberArray2, NumberArray4 } from '@math.gl/core';
export type BinSorterProps = {
    binIdRange: NumberArray4;
    targetSize: NumberArray2;
};
export declare const binSorterUniforms: {
    readonly name: "binSorter";
    readonly vs: "uniform binSorterUniforms {\n  ivec4 binIdRange;\n  ivec2 targetSize;\n} binSorter;\n";
    readonly uniformTypes: {
        readonly binIdRange: "vec4<i32>";
        readonly targetSize: "vec2<i32>";
    };
};
//# sourceMappingURL=bin-sorter-uniforms.d.ts.map