import { Log } from '@probe.gl/log';
export declare const probeLog: Log;
type LogFunction = () => void;
export declare class NullLog {
    log(): LogFunction;
    info(): LogFunction;
    warn(): LogFunction;
    error(): LogFunction;
}
export declare class ConsoleLog {
    console: any;
    constructor();
    log(...args: unknown[]): LogFunction;
    info(...args: unknown[]): LogFunction;
    warn(...args: unknown[]): LogFunction;
    error(...args: unknown[]): LogFunction;
}
export {};
//# sourceMappingURL=loggers.d.ts.map