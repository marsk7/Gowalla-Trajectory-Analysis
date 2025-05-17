import type { CustomLayerInterface } from "../types/lib.js";
import type { LayerSpecification } from "../types/style-spec.js";
type OptionalId<T> = T extends {
    id: string;
} ? Omit<T, 'id'> & {
    id?: string;
} : T;
type OptionalSource<T> = T extends {
    source: string;
} ? Omit<T, 'source'> & {
    source?: string;
} : T;
export type LayerProps = (OptionalSource<OptionalId<LayerSpecification>> | CustomLayerInterface) & {
    /** If set, the layer will be inserted before the specified layer */
    beforeId?: string;
};
export declare function Layer(props: LayerProps): any;
export {};
//# sourceMappingURL=layer.d.ts.map