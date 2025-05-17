import { Alert } from './customElement.js';
export declare const alertQueueTimeoutMs = 300;
export default class AlertManager {
    private registeredElements;
    private queueTimeoutId;
    registerElement(alert: HTMLCalciteAlertElement): void;
    unregisterElement(alert: HTMLCalciteAlertElement): void;
    private updateAlerts;
}
