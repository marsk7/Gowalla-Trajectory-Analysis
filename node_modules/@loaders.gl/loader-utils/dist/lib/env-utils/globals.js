// Purpose: include this in your module to avoid
// dependencies on micro modules like 'global' and 'is-browser';
/* eslint-disable no-restricted-globals */
const globals = {
    self: typeof self !== 'undefined' && self,
    window: typeof window !== 'undefined' && window,
    global: typeof global !== 'undefined' && global,
    document: typeof document !== 'undefined' && document
};
const self_ = globals.self || globals.window || globals.global || {};
const window_ = globals.window || globals.self || globals.global || {};
const global_ = globals.global || globals.self || globals.window || {};
const document_ = globals.document || {};
export { self_ as self, window_ as window, global_ as global, document_ as document };
/** true if running in a browser */
export const isBrowser = 
// @ts-ignore process does not exist on browser
Boolean(typeof process !== 'object' || String(process) !== '[object process]' || process.browser);
/** true if running in a worker thread */
export const isWorker = typeof importScripts === 'function';
// Extract node major version
const matches = typeof process !== 'undefined' && process.version && /v([0-9]*)/.exec(process.version);
/** Major Node version (as a number) */
export const nodeVersion = (matches && parseFloat(matches[1])) || 0;
