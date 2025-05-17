import { CalciteIconPath } from '@esri/calcite-ui-icons';
import { Scale } from '../interfaces';
import { IconNameOrString } from './interfaces';
export interface FetchIconProps {
    icon: IconNameOrString;
    scale: Scale;
}
/**
 * Icon data cache.
 * Exported for testing purposes.
 *
 * @private
 */
export declare const iconCache: Record<string, CalciteIconPath>;
/**
 * Icon request cache.
 * Exported for testing purposes.
 *
 * @private
 */
export declare const requestCache: Record<string, Promise<CalciteIconPath>>;
export declare const scaleToPx: Record<Scale, number>;
export declare function fetchIcon(props: FetchIconProps): Promise<CalciteIconPath>;
/**
 * Util to retrieve cached icon data based on icon name and scale.
 *
 * @param props – icon properties
 */
export declare function getCachedIconData(props: FetchIconProps): CalciteIconPath;
/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 *
 * @param name – an icon name that can be either kebab or camel-cased
 * @private
 */
export declare function normalizeIconName(name: string): string;
