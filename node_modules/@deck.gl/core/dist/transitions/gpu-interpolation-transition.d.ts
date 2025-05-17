import type { Device } from '@luma.gl/core';
import { Timeline } from '@luma.gl/engine';
import Attribute from "../lib/attribute/attribute.js";
import { GPUTransitionBase } from "./gpu-transition.js";
import type { InterpolationTransitionSettings } from "../lib/attribute/transition-settings.js";
export default class GPUInterpolationTransition extends GPUTransitionBase<InterpolationTransitionSettings> {
    type: string;
    private transform;
    constructor({ device, attribute, timeline }: {
        device: Device;
        attribute: Attribute;
        timeline: Timeline;
    });
    start(transitionSettings: InterpolationTransitionSettings, numInstances: number): void;
    onUpdate(): void;
    delete(): void;
}
//# sourceMappingURL=gpu-interpolation-transition.d.ts.map