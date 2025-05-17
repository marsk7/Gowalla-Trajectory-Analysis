import { Feature } from 'geojson';
export type AttributeSelector<DataT = Feature, OutT = any> = string | ((d: DataT, info: any) => OutT);
export declare function getAttrValue<DataT = Feature, OutT = any>(attr: string | AttributeSelector<DataT, OutT>, d: DataT, info: any): OutT;
//# sourceMappingURL=utils.d.ts.map