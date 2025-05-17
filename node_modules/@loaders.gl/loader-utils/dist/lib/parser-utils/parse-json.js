import { getFirstCharacters } from "../binary-utils/get-first-characters.js";
/**
 * Minimal JSON parser that throws more meaningful error messages
 */
export function parseJSON(string) {
    try {
        return JSON.parse(string);
    }
    catch (_) {
        throw new Error(`Failed to parse JSON from data starting with "${getFirstCharacters(string)}"`);
    }
}
