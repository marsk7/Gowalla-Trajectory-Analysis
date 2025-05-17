import type { Device } from '@luma.gl/core';
/**
 * Base class for passes
 * @todo v9 - should the luma.gl RenderPass be owned by this class?
 * Currently owned by subclasses
 */
export default class Pass {
    /** string id, mainly for debugging */
    id: string;
    /** The luma.gl Device that this pass is associated with */
    device: Device;
    /** TODO v9 - inject prop types from parent */
    props: any;
    /** Create a new Pass instance */
    constructor(device: Device, props?: {
        id: string;
    });
    setProps(props: any): void;
    render(params: any): void;
    cleanup(): void;
}
//# sourceMappingURL=pass.d.ts.map