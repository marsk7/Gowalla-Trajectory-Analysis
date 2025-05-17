import type { Device } from '@luma.gl/core';
import type { Timeline } from '@luma.gl/engine';
import type Attribute from "./attribute.js";
export default class AttributeTransitionManager {
    id: string;
    private device;
    private timeline?;
    private transitions;
    private needsRedraw;
    private numInstances;
    constructor(device: Device, { id, timeline }: {
        id: string;
        timeline?: Timeline;
    });
    finalize(): void;
    update({ attributes, transitions, numInstances }: {
        attributes: {
            [id: string]: Attribute;
        };
        transitions: any;
        numInstances: number;
    }): void;
    hasAttribute(attributeName: string): boolean;
    getAttributes(): {
        [id: string]: Attribute;
    };
    run(): boolean;
    private _removeTransition;
    private _updateAttribute;
}
//# sourceMappingURL=attribute-transition-manager.d.ts.map