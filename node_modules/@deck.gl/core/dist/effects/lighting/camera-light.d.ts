import { PointLight } from "./point-light.js";
import type Layer from "../../lib/layer.js";
export default class CameraLight extends PointLight {
    getProjectedLight({ layer }: {
        layer: Layer;
    }): PointLight;
}
//# sourceMappingURL=camera-light.d.ts.map