export default function setGlobals(mapLib, props) {
    const { RTLTextPlugin, maxParallelImageRequests, workerCount, workerUrl } = props;
    if (RTLTextPlugin &&
        mapLib.getRTLTextPluginStatus &&
        mapLib.getRTLTextPluginStatus() === 'unavailable') {
        const { pluginUrl, lazy = true } = typeof RTLTextPlugin === 'string' ? { pluginUrl: RTLTextPlugin } : RTLTextPlugin;
        mapLib.setRTLTextPlugin(pluginUrl, (error) => {
            if (error) {
                // eslint-disable-next-line
                console.error(error);
            }
        }, lazy);
    }
    if (maxParallelImageRequests !== undefined) {
        mapLib.setMaxParallelImageRequests(maxParallelImageRequests);
    }
    if (workerCount !== undefined) {
        mapLib.setWorkerCount(workerCount);
    }
    if (workerUrl !== undefined) {
        mapLib.setWorkerUrl(workerUrl);
    }
}
//# sourceMappingURL=set-globals.js.map