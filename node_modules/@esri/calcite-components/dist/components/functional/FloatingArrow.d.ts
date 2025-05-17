import { TemplateResult } from 'lit-html';
import { LuminaJsx } from '@arcgis/lumina';
import { FloatingLayout } from '../../utils/floating-ui';
interface FloatingArrowProps extends LuminaJsx.CustomAttributes<SVGSVGElement> {
    floatingLayout: FloatingLayout;
}
/**
 * Renders a SVG element to be used as a floating-ui arrow.
 *
 * This functional component should be rendered inside a `FloatingUIComponent` when it needs an arrow element.
 *
 * @param floatingLayout.floatingLayout
 * @param floatingLayout – The effective floating layout to render the arrow vertically or horizontally. Possible values: `vertical` or `horizontal`.
 *
 * @see [floating-ui](https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/utils/floating-ui.ts).
 * @param floatingLayout.key
 * @param floatingLayout.ref
 */
export declare const FloatingArrow: ({ floatingLayout, key, ref }: FloatingArrowProps) => TemplateResult;
export {};
