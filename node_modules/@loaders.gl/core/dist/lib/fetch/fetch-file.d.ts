export declare function isNodePath(url: string): boolean;
export declare function isRequestURL(url: string): boolean;
export declare function isDataURL(url: string): boolean;
/**
 * fetch API compatible function
 * - Supports fetching from Node.js local file system paths
 * - Respects pathPrefix and file aliases
 */
export declare function fetchFile(urlOrData: string | Blob, fetchOptions?: RequestInit): Promise<Response>;
//# sourceMappingURL=fetch-file.d.ts.map