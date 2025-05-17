/** Browser polyfill for Node.js built-in `worker_threads` module.
 * These fills are non-functional, and just intended to ensure that
 * `import 'worker_threads` doesn't break browser builds.
 * The replacement is done in package.json browser field
 */
export declare class NodeWorker {
    terminate(): void;
}
export type { NodeWorker as NodeWorkerType };
export declare const parentPort: null;
//# sourceMappingURL=worker_threads-browser.d.ts.map