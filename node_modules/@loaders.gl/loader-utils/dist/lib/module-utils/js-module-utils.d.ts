/**
 * Register application-imported modules
 * These modules are typically to big to bundle, or may have issues on some bundlers/environments
 */
export declare function registerJSModules(modules?: Record<string, any>): void;
/**
 * Get a pre-registered application-imported module, warn if not present
 */
export declare function checkJSModule(name: string, caller: string): void;
/**
 * Get a pre-registered application-imported module, throw if not present
 */
export declare function getJSModule<ModuleT = any>(name: string, caller: string): ModuleT;
/**
 * Get a pre-registered application-imported module, return null if not present
 */
export declare function getJSModuleOrNull<ModuleT = any>(name: string): ModuleT | null;
//# sourceMappingURL=js-module-utils.d.ts.map