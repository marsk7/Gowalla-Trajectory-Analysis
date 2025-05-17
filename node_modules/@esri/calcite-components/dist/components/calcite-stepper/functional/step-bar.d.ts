import { TemplateResult } from 'lit-html';
interface StepBarProps {
    active: boolean;
    complete: boolean;
    error: boolean;
    disabled: boolean;
}
export declare const CSS: {
    stepBar: string;
    stepBarActive: string;
    stepBarComplete: string;
    stepBarDisabled: string;
    stepBarError: string;
    stepBarInActive: string;
};
export declare const StepBar: ({ disabled, active, complete, error }: StepBarProps) => TemplateResult;
export {};
