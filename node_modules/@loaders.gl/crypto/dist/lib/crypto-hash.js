import { getJSModule, registerJSModules } from '@loaders.gl/loader-utils';
import { Hash } from "./hash.js";
/**
 * A transform that calculates Cryptographic Hash using Crypto JS library
 * @deprecated Warning, experimental class
 */
export class CryptoHash extends Hash {
    name;
    options;
    /** Name of digest algorithm */
    _algorithm;
    /** CryptoJS algorithm */
    _algo;
    constructor(options) {
        super();
        this.options = options;
        registerJSModules(options?.modules);
        this._algorithm = this.options?.crypto?.algorithm;
        if (!this._algorithm) {
            throw new Error(this.name);
        }
        this.name = this._algorithm.toLowerCase();
    }
    async preload() {
        const CryptoJS = getJSModule('CryptoJS', this.name);
        this._algo = CryptoJS.algo[this._algorithm];
    }
    /**
     * Atomic hash calculation
     * @returns base64 encoded hash
     */
    async hash(input, encoding) {
        await this.preload();
        const hash = this._algo.create();
        if (!hash) {
            throw new Error(this.name);
        }
        const CryptoJS = getJSModule('CryptoJS', this.name);
        // arrayBuffer is accepted, even though types and docs say no
        // https://stackoverflow.com/questions/25567468/how-to-decrypt-an-arraybuffer
        const typedWordArray = CryptoJS.lib.WordArray.create(input);
        // Map our encoding constant to Crypto library
        const enc = encoding === 'base64' ? CryptoJS.enc.Base64 : CryptoJS.enc.Hex;
        return hash.update(typedWordArray).finalize().toString(enc);
    }
    async *hashBatches(asyncIterator, encoding = 'base64') {
        await this.preload();
        const CryptoJS = getJSModule('CryptoJS', this.name);
        const hash = this._algo.create();
        if (!hash) {
            throw new Error(this.name);
        }
        for await (const chunk of asyncIterator) {
            // arrayBuffer is accepted, even though types and docs say no
            // https://stackoverflow.com/questions/25567468/how-to-decrypt-an-arraybuffer
            const typedWordArray = CryptoJS.lib.WordArray.create(chunk);
            hash.update(typedWordArray);
            yield chunk;
        }
        // Map our encoding constant to Crypto library
        const enc = encoding === 'base64' ? CryptoJS.enc.Base64 : CryptoJS.enc.Hex;
        const digest = hash.finalize().toString(enc);
        this.options?.crypto?.onEnd?.({ hash: digest });
    }
}
