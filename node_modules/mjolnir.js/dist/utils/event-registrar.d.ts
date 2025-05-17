import type { EventManager } from "../event-manager.js";
import type { MjolnirEventRaw, MjolnirEventWrapper, MjolnirEvent, MjolnirEventHandler } from "../types.js";
export type HandlerOptions = {
    /** Optional element from which the event is originated from.
     * @default 'root'
     */
    srcElement?: 'root' | HTMLElement;
    /** Handler with higher priority will be called first.
     * Handler with the same priority will be called in the order of registration.
     * @default 0
     */
    priority?: number;
};
type EventHandler = {
    type: string;
    handler: (event: MjolnirEvent) => void;
    once?: boolean;
    passive?: boolean;
    srcElement: 'root' | HTMLElement;
    priority: number;
};
export declare class EventRegistrar {
    eventManager: EventManager;
    recognizerName: string;
    handlers: EventHandler[];
    handlersByElement: Map<'root' | HTMLElement, EventHandler[]>;
    _active: boolean;
    constructor(eventManager: EventManager, recognizerName: string);
    isEmpty(): boolean;
    add(type: string, handler: MjolnirEventHandler, options?: HandlerOptions, once?: boolean, passive?: boolean): void;
    remove(type: string, handler: MjolnirEventHandler): void;
    /**
     * Handles hammerjs event
     */
    handleEvent: (event: MjolnirEventRaw) => void;
    /**
     * Invoke handlers on a particular element
     */
    _emit<T extends MjolnirEventRaw>(event: MjolnirEventWrapper<T>, srcElement: 'root' | HTMLElement): void;
    /**
     * Normalizes hammerjs and custom events to have predictable fields.
     */
    _normalizeEvent<T extends MjolnirEventRaw>(event: T): MjolnirEventWrapper<T>;
}
export {};
//# sourceMappingURL=event-registrar.d.ts.map