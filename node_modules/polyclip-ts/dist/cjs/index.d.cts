declare type Ring = [number, number][];
declare type Poly = Ring[];
declare type MultiPoly = Poly[];
declare type Geom = Poly | MultiPoly;

declare const union: (geom: Geom, ...moreGeoms: Geom[]) => MultiPoly;
declare const intersection: (geom: Geom, ...moreGeoms: Geom[]) => MultiPoly;
declare const xor: (geom: Geom, ...moreGeoms: Geom[]) => MultiPoly;
declare const difference: (geom: Geom, ...moreGeoms: Geom[]) => MultiPoly;
declare const setPrecision: (eps?: number | undefined) => void;

export { type Geom, difference, intersection, setPrecision, union, xor };
