import Transition from "./transition.js";
import type { Device, Buffer } from '@luma.gl/core';
import type { Timeline } from '@luma.gl/engine';
import type Attribute from "../lib/attribute/attribute.js";
import type { TransitionSettings } from "../lib/attribute/transition-settings.js";
import type { NumericArray } from "../types/types.js";
export interface GPUTransition {
    get type(): string;
    get inProgress(): boolean;
    get attributeInTransition(): Attribute;
    /** Called when an attribute's values have changed and we need to start animating towards the new values */
    start(transitionSettings: TransitionSettings, numInstances: number): void;
    /** Called while transition is in progress */
    update(): boolean;
    /** Called when transition is interrupted */
    cancel(): void;
    /** Called when transition is disposed */
    delete(): void;
}
export declare abstract class GPUTransitionBase<SettingsT extends TransitionSettings> implements GPUTransition {
    abstract get type(): string;
    device: Device;
    attribute: Attribute;
    transition: Transition;
    settings?: SettingsT;
    /** The attribute that holds the buffer in transition */
    attributeInTransition: Attribute;
    protected buffers: Buffer[];
    /** The vertex count of the last buffer.
     * Buffer may be larger than the actual length we want to use
     * because we only reallocate buffers when they grow, not when they shrink,
     * due to performance costs */
    protected currentLength: number;
    /** The start indices of the last buffer. */
    protected currentStartIndices: NumericArray | null;
    constructor({ device, attribute, timeline }: {
        device: Device;
        attribute: Attribute;
        timeline: Timeline;
    });
    get inProgress(): boolean;
    start(transitionSettings: SettingsT, numInstances: number, duration?: number): void;
    update(): boolean;
    abstract onUpdate(): void;
    protected setBuffer(buffer: Buffer): void;
    cancel(): void;
    delete(): void;
}
//# sourceMappingURL=gpu-transition.d.ts.map