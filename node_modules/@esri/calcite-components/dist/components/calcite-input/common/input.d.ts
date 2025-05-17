export type InputComponent = NumericInputComponent | TextualInputComponent | DateTimeInputComponent;
export interface DateTimeInputComponent {
    min: string;
    max: string;
}
export interface NumericInputComponent {
    min: number;
    max: number;
    step: number | "any";
}
export interface TextualInputComponent {
    pattern?: string;
    minLength: number;
    maxLength: number;
}
/** Exported for testing purposes only */
export declare const minMaxStepTypes: string[];
/** Exported for testing purposes only */
export declare const patternTypes: string[];
/** Exported for testing purposes only */
export declare const minMaxLengthTypes: string[];
/**
 * Synchronizes the hidden form input with the validation-related input properties.
 *
 * Note: loss of precision is expected due to the hidden input's value and validation-constraint props being strings.
 *
 * @param type - The input type.
 * @param inputComponent
 * @param hiddenFormInput
 */
export declare function syncHiddenFormInput(type: HTMLInputElement["type"] | "textarea", inputComponent: InputComponent, hiddenFormInput: HTMLInputElement): void;
