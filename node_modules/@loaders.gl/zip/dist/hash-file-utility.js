// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { MD5Hash } from '@loaders.gl/crypto';
import { concatenateArrayBuffers, concatenateArrayBuffersFromArray } from '@loaders.gl/loader-utils';
import { makeZipCDHeaderIterator } from "./parse-zip/cd-file-header.js";
/**
 * Reads hash file from buffer and returns it in ready-to-use form
 * @param arrayBuffer - buffer containing hash file
 * @returns Map containing hash and offset
 */
export function parseHashTable(arrayBuffer) {
    const dataView = new DataView(arrayBuffer);
    const hashMap = {};
    for (let i = 0; i < arrayBuffer.byteLength; i = i + 24) {
        const offset = dataView.getBigUint64(i + 16, true);
        const hash = bufferToHex(arrayBuffer, i, 16);
        hashMap[hash] = offset;
    }
    return hashMap;
}
function bufferToHex(buffer, start, length) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer, start, length)]
        .map((x) => x.toString(16).padStart(2, '0'))
        .join('');
}
/**
 * generates hash info from zip files "central directory"
 * @param fileProvider - provider of the archive
 * @returns ready to use hash info
 */
export async function makeHashTableFromZipHeaders(fileProvider) {
    const zipCDIterator = makeZipCDHeaderIterator(fileProvider);
    return getHashTable(zipCDIterator);
}
/**
 * creates hash table from file offset iterator
 * @param zipCDIterator iterator to use
 * @returns hash table
 */
export async function getHashTable(zipCDIterator) {
    const md5Hash = new MD5Hash();
    const textEncoder = new TextEncoder();
    const hashTable = {};
    for await (const cdHeader of zipCDIterator) {
        const filename = cdHeader.fileName.split('\\').join('/').toLocaleLowerCase();
        const arrayBuffer = textEncoder.encode(filename).buffer;
        const md5 = await md5Hash.hash(arrayBuffer, 'hex');
        hashTable[md5] = cdHeader.localHeaderOffset;
    }
    return hashTable;
}
/**
 * creates hash file that later can be added to the SLPK archive
 * @param zipCDIterator iterator to use
 * @returns ArrayBuffer containing hash file
 */
export async function composeHashFile(zipCDIterator) {
    const md5Hash = new MD5Hash();
    const textEncoder = new TextEncoder();
    const hashArray = [];
    for await (const cdHeader of zipCDIterator) {
        let filename = cdHeader.fileName.split('\\').join('/');
        // I3S edge case. All files should be lower case by spec. However, ArcGIS
        // and official i3s_converter https://github.com/Esri/i3s-spec/blob/master/i3s_converter/i3s_converter_ReadMe.md
        // expect `3dSceneLayer.json.gz` in camel case
        if (filename !== '3dSceneLayer.json.gz') {
            filename = filename.toLocaleLowerCase();
        }
        const arrayBuffer = textEncoder.encode(filename).buffer;
        const md5 = await md5Hash.hash(arrayBuffer, 'hex');
        hashArray.push(concatenateArrayBuffers(hexStringToBuffer(md5), bigintToBuffer(cdHeader.localHeaderOffset)));
    }
    const bufferArray = hashArray.sort(compareHashes);
    return concatenateArrayBuffersFromArray(bufferArray);
}
/**
 * Function to compare md5 hashes according to https://github.com/Esri/i3s-spec/blob/master/docs/2.0/slpk_hashtable.pcsl.md
 * @param arrA first hash to compare
 * @param arrB second hash to compare
 * @returns 0 if equal, negative number if a<b, pozitive if a>b
 */
function compareHashes(arrA, arrB) {
    const a = new BigUint64Array(arrA);
    const b = new BigUint64Array(arrB);
    return Number(a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
}
/**
 * converts hex string to buffer
 * @param str hex string to convert
 * @returns conversion result
 */
function hexStringToBuffer(str) {
    const byteArray = str.match(/../g)?.map((h) => parseInt(h, 16));
    return new Uint8Array(byteArray ?? new Array(16)).buffer;
}
/**
 * converts bigint to buffer
 * @param n bigint to convert
 * @returns convertion result
 */
function bigintToBuffer(n) {
    return new BigUint64Array([n]).buffer;
}
