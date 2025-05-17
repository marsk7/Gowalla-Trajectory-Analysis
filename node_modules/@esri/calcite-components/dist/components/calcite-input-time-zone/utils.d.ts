import { SupportedLocale } from '../../utils/locale';
import { InputTimeZone } from './customElement.js';
import { OffsetStyle, TimeZone, TimeZoneItem, TimeZoneItemGroup, TimeZoneMode } from './interfaces';
export declare function getUserTimeZoneOffset(): number;
export declare function getUserTimeZoneName(): string;
export declare function getNormalizer(mode: TimeZoneMode): Promise<(timeZone: TimeZone) => TimeZone>;
export declare function createTimeZoneItems(locale: SupportedLocale, messages: InputTimeZone["messages"], mode: TimeZoneMode, referenceDate: Date, standardTime: OffsetStyle): Promise<TimeZoneItem[] | TimeZoneItemGroup[]>;
export declare function getSelectedRegionTimeZoneLabel(city: string, country: string, messages: InputTimeZone["messages"]): string;
export declare function getMessageOrKeyFallback(messages: InputTimeZone["messages"], key: string): string;
/**
 * Exported for testing purposes only
 *
 * @private
 */
export declare function getCity(timeZone: string): string;
/**
 * Exported for testing purposes only
 *
 * @private
 */
export declare function toUserFriendlyName(timeZoneName: string): string;
export declare function findTimeZoneItemByProp(timeZoneItems: TimeZoneItem[] | TimeZoneItemGroup[], prop: string, valueToMatch: string | number | null): TimeZoneItem | null;
