export declare class FetchError extends Error {
    constructor(message: string, info: {
        url: string;
        reason: string;
        response?: Response;
    });
    /** A best effort reason for why the fetch failed */
    reason: string;
    /** The URL that failed to load. Empty string if not available. */
    url: string;
    /** The Response object, if any. */
    response?: Response;
}
//# sourceMappingURL=fetch-error.d.ts.map