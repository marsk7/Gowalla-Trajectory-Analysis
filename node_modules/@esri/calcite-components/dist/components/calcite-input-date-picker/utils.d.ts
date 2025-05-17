/**
 * Specifies if an ISO string date (YYYY-MM-DD) has two digit year.
 *
 * @param {string} value
 * @returns {boolean}
 */
export declare function isTwoDigitYear(value: string): boolean;
/**
 * Returns a normalized year to current century from a given two digit year number.
 *
 * @param {number} twoDigitYear
 * @returns {string}
 */
export declare function normalizeToCurrentCentury(twoDigitYear: number): number;
