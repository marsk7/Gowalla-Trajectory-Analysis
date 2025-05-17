/**
 * Check is the object has FileProvider members
 * @param fileProvider - tested object
 */
export const isFileProvider = (fileProvider) => {
    return (fileProvider?.getUint8 &&
        fileProvider?.slice &&
        fileProvider?.length);
};
