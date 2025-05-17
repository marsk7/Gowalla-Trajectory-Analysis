// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/** Convert an object row to an array row */
export function convertToObjectRow(arrayRow, headers) {
    if (!arrayRow) {
        throw new Error('null row');
    }
    const objectRow = {};
    if (headers) {
        for (let i = 0; i < headers.length; i++) {
            objectRow[headers[i]] = arrayRow[i];
        }
    }
    else {
        for (let i = 0; i < arrayRow.length; i++) {
            const columnName = `column-${i}`;
            objectRow[columnName] = arrayRow[i];
        }
    }
    return objectRow;
}
/** Convert an object row to an array row */
export function convertToArrayRow(objectRow, headers) {
    if (!objectRow) {
        throw new Error('null row');
    }
    if (headers) {
        const arrayRow = new Array(headers.length);
        for (let i = 0; i < headers.length; i++) {
            arrayRow[i] = objectRow[headers[i]];
        }
        return arrayRow;
    }
    return Object.values(objectRow);
}
/** Get headers from a sample array row */
export function inferHeadersFromArrayRow(arrayRow) {
    const headers = [];
    for (let i = 0; i < arrayRow.length; i++) {
        const columnName = `column-${i}`;
        headers.push(columnName);
    }
    return headers;
}
/** Get headers from a smaple object row */
export function inferHeadersFromObjectRow(row) {
    return Object.keys(row);
}
