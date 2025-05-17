import type { Device } from '@luma.gl/core';
import { Timeline } from '@luma.gl/engine';
import Attribute from "../lib/attribute/attribute.js";
import { GPUTransitionBase } from "./gpu-transition.js";
import type { SpringTransitionSettings } from "../lib/attribute/transition-settings.js";
export default class GPUSpringTransition extends GPUTransitionBase<SpringTransitionSettings> {
    type: string;
    private texture;
    private framebuffer;
    private transform;
    constructor({ device, attribute, timeline }: {
        device: Device;
        attribute: Attribute;
        timeline: Timeline;
    });
    start(transitionSettings: SpringTransitionSettings, numInstances: number): void;
    onUpdate(): void;
    delete(): void;
}
//# sourceMappingURL=gpu-spring-transition.d.ts.map