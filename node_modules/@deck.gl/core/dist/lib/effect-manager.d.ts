import type { Effect, EffectContext } from "./effect.js";
export default class EffectManager {
    effects: Effect[];
    private _resolvedEffects;
    /** Effect instances and order preference pairs, sorted by order */
    private _defaultEffects;
    private _needsRedraw;
    private _context;
    constructor(context: EffectContext);
    /**
     * Register a new default effect, i.e. an effect presents regardless of user supplied props.effects
     */
    addDefaultEffect(effect: Effect): void;
    setProps(props: any): void;
    needsRedraw(opts?: {
        clearRedrawFlags: boolean;
    }): false | string;
    getEffects(): Effect[];
    private _setEffects;
    finalize(): void;
}
//# sourceMappingURL=effect-manager.d.ts.map