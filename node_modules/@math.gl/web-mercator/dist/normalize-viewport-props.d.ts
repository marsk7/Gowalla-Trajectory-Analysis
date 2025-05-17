/** Description of viewport */
export type ViewportProps = {
    width: number;
    height: number;
    longitude: number;
    latitude: number;
    zoom: number;
    pitch?: number;
    bearing?: number;
};
/**
 * Apply mathematical constraints to viewport props
 * @param props
 */
export declare function normalizeViewportProps(props: ViewportProps): ViewportProps;
//# sourceMappingURL=normalize-viewport-props.d.ts.map