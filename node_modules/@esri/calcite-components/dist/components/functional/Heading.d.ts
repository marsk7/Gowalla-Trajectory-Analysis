import { TemplateResult } from 'lit-html';
import { JsxNode, LuminaJsx } from '@arcgis/lumina';
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingProps extends Pick<LuminaJsx.HTMLAttributes, "class" | "key"> {
    level?: HeadingLevel;
}
export declare function constrainHeadingLevel(level: number): HeadingLevel;
export declare const Heading: ({ children, ...props }: HeadingProps & {
    children: JsxNode;
}) => TemplateResult;
export {};
