import type { MjolnirEventRaw } from "../types.js";
export interface InputOptions {
    enable?: boolean;
}
export declare class Input<EventType extends MjolnirEventRaw, Options extends InputOptions> {
    element: HTMLElement;
    options: Options;
    callback: (e: EventType) => void;
    constructor(element: HTMLElement, callback: (e: EventType) => void, options: Options);
}
//# sourceMappingURL=input.d.ts.map