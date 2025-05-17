// @loaders.gl, MIT license
/**
 * Typesafe promisify implementation
 * @link https://dev.to/_gdelgado/implement-a-type-safe-version-of-node-s-promisify-in-7-lines-of-code-in-typescript-2j34
 * @param fn
 * @returns
 */
export function promisify1(fn) {
    return (args) => new Promise((resolve, reject) => fn(args, (error, callbackArgs) => (error ? reject(error) : resolve(callbackArgs))));
}
export function promisify2(fn) {
    return (arg1, arg2) => new Promise((resolve, reject) => fn(arg1, arg2, (error, callbackArgs) => (error ? reject(error) : resolve(callbackArgs))));
}
export function promisify3(fn) {
    return (arg1, arg2, arg3) => new Promise((resolve, reject) => fn(arg1, arg2, arg3, (error, callbackArgs) => (error ? reject(error) : resolve(callbackArgs))));
}
