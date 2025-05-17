// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
import { log } from "../log-utils/log.js";
/**
 * Register application-imported modules
 * These modules are typically to big to bundle, or may have issues on some bundlers/environments
 */
export function registerJSModules(modules) {
    globalThis.loaders ||= {};
    globalThis.loaders.modules ||= {};
    Object.assign(globalThis.loaders.modules, modules);
}
/**
 * Get a pre-registered application-imported module, warn if not present
 */
export function checkJSModule(name, caller) {
    const module = globalThis.loaders?.modules?.[name];
    if (!module) {
        log.warn(`${caller}: ${name} library not installed`)();
    }
}
/**
 * Get a pre-registered application-imported module, throw if not present
 */
export function getJSModule(name, caller) {
    const module = globalThis.loaders?.modules?.[name];
    if (!module) {
        throw new Error(`${caller}: ${name} library not installed`);
    }
    return module;
}
/**
 * Get a pre-registered application-imported module, return null if not present
 */
export function getJSModuleOrNull(name) {
    const module = globalThis.loaders?.modules?.[name];
    return module || null;
}
