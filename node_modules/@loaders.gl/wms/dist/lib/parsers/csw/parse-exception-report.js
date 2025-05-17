// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// import type {XMLLoaderOptions} from '@loaders.gl/xml';
// import {XMLLoader} from '@loaders.gl/xml';
/**
 * Parses a typed data structure from raw XML for `GetDomain` response
 * @note Error handlings is fairly weak
 */
export function parseExceptionReport(parsedXML) {
    // const parsedXML = XMLLoader.parseTextSync?.(text, {
    //   ...options,
    //   xml: {
    //     ...options?.xml,
    //     removeNSPrefix: true,
    //     uncapitalizeKeys: true
    //   }
    // });
    const exceptionReport = parsedXML.exceptionReport;
    if (!exceptionReport) {
        return;
    }
    const errorMessage = exceptionReport.exception?.exceptionText ||
        exceptionReport.exception?.exceptionCode ||
        exceptionReport.exception?.locator ||
        'server error';
    throw new Error(`Catalog Server: ${errorMessage}`);
}
