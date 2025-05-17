import { Input } from "../input/input.js";
import type { Manager } from "../manager.js";
/**
 * Pointer events input
 */
export declare class PointerEventInput extends Input {
    store: PointerEvent[];
    constructor(manager: Manager);
    /**
     * handle mouse events
     */
    handler(ev: PointerEvent): void;
}
//# sourceMappingURL=pointerevent.d.ts.map