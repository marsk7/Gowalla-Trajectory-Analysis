import type { SourceSpecification, CanvasSourceSpecification } from "../types/style-spec.js";
export type SourceProps = (SourceSpecification | CanvasSourceSpecification) & {
    id?: string;
    children?: any;
};
export declare function Source(props: SourceProps): any;
//# sourceMappingURL=source.d.ts.map