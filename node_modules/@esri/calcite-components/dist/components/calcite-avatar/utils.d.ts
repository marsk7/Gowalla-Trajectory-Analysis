import { RGB } from '../calcite-color-picker/interfaces';
/**
 * Convert a string to a valid hex by hashing its contents
 * and using the hash as a seed for three distinct color values
 *
 * @param string
 */
export declare function stringToHex(string: string): string;
/**
 * Find the hue of a color given the separate RGB color channels
 *
 * @param rgb
 */
export declare function rgbToHue(rgb: RGB): number;
/**
 * For a hex color, find the hue
 *
 * @param hex {string} - form of "#------"
 */
export declare function hexToHue(hex: string): number;
