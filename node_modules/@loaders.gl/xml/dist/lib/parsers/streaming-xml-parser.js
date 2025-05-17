// loaders.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
// @ts-nocheck
/* eslint-disable */
import { SAXParser } from "../../sax-ts/sax.js";
/**
 * StreamingXMLParser builds a JSON object using the events emitted by the SAX parser
 */
export class StreamingXMLParser {
    parser;
    result = undefined;
    previousStates = [];
    currentState = Object.freeze({ container: [], key: null });
    // jsonpath: JSONPath = new JSONPath();
    constructor(options) {
        this.reset();
        this.parser = new SAXParser({
            onready: () => {
                this.previousStates.length = 0;
                this.currentState.container.length = 0;
            },
            onopentag: ({ name, attributes, isSelfClosing }) => {
                this._openObject({});
                if (typeof name !== 'undefined') {
                    this.parser.emit('onkey', name);
                }
            },
            onkey: (name) => {
                this.currentState.key = name;
            },
            onclosetag: () => {
                this._closeObject();
            },
            onopenarray: () => {
                this._openArray();
            },
            onclosearray: () => {
                this._closeArray();
            },
            ontext: (value) => {
                this._pushOrSet(value);
            },
            onerror: (error) => {
                throw error;
            },
            onend: () => {
                this.result = this.currentState.container.pop();
            },
            ...options
        });
    }
    reset() {
        this.result = undefined;
        this.previousStates = [];
        this.currentState = Object.freeze({ container: [], key: null });
    }
    write(chunk) {
        this.parser.write(chunk);
    }
    close() {
        this.parser.close();
    }
    // PRIVATE METHODS
    _pushOrSet(value) {
        const { container, key } = this.currentState;
        if (key !== null) {
            container[key] = value;
            this.currentState.key = null;
        }
        else if (Array.isArray(container)) {
            container.push(value);
        }
        else if (container) {
            // break for debug
        }
    }
    _openArray(newContainer = []) {
        // this.jsonpath.push(null);
        this._pushOrSet(newContainer);
        this.previousStates.push(this.currentState);
        this.currentState = { container: newContainer, isArray: true, key: null };
    }
    _closeArray() {
        // this.jsonpath.pop();
        this.currentState = this.previousStates.pop();
    }
    _openObject(newContainer = {}) {
        // this.jsonpath.push(null);
        this._pushOrSet(newContainer);
        this.previousStates.push(this.currentState);
        this.currentState = { container: newContainer, isArray: false, key: null };
    }
    _closeObject() {
        // this.jsonpath.pop();
        this.currentState = this.previousStates.pop();
    }
}
