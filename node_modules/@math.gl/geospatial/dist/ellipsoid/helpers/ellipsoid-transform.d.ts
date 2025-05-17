import { NumericArray } from '@math.gl/types';
import type { Ellipsoid } from "../ellipsoid.js";
export type AxisDirection = 'up' | 'down' | 'north' | 'east' | 'south' | 'west';
export declare function localFrameToFixedFrame(ellipsoid: Ellipsoid, firstAxis: AxisDirection, secondAxis: AxisDirection, thirdAxis: AxisDirection, cartesianOrigin: Readonly<NumericArray>, result: number[]): number[];
//# sourceMappingURL=ellipsoid-transform.d.ts.map