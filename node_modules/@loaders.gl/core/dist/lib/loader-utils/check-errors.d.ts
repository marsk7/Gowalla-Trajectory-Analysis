/**
 * Check reponse status, if not OK extract error message and throw error
 * @param response
 */
export declare function checkFetchResponseStatus(response: Response): Promise<void>;
/**
 * Check response status synchronously, if not OK extract error message and throw error
 * Not able to extract as good an error message as the async version
 * @param response
 */
export declare function checkFetchResponseStatusSync(response: Response): void;
//# sourceMappingURL=check-errors.d.ts.map