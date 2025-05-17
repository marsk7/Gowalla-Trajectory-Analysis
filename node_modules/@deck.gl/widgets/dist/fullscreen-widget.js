import { jsx as _jsx } from "preact/jsx-runtime";
// deck.gl
// SPDX-License-Identifier: MIT
// Copyright (c) vis.gl contributors
/* global document */
import { _deepEqual as deepEqual, _applyStyles as applyStyles, _removeStyles as removeStyles } from '@deck.gl/core';
import { render } from 'preact';
import { IconButton } from "./components.js";
export class FullscreenWidget {
    constructor(props) {
        this.id = 'fullscreen';
        this.placement = 'top-left';
        this.fullscreen = false;
        this.id = props.id ?? this.id;
        this.placement = props.placement ?? this.placement;
        this.props = {
            ...props,
            enterLabel: props.enterLabel ?? 'Enter Fullscreen',
            exitLabel: props.exitLabel ?? 'Exit Fullscreen',
            style: props.style ?? {}
        };
    }
    onAdd({ deck }) {
        const { style, className } = this.props;
        const el = document.createElement('div');
        el.classList.add('deck-widget', 'deck-widget-fullscreen');
        if (className)
            el.classList.add(className);
        applyStyles(el, style);
        this.deck = deck;
        this.element = el;
        this.update();
        document.addEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
        return el;
    }
    onRemove() {
        this.deck = undefined;
        this.element = undefined;
        document.removeEventListener('fullscreenchange', this.onFullscreenChange.bind(this));
    }
    update() {
        const { enterLabel, exitLabel } = this.props;
        const element = this.element;
        if (!element) {
            return;
        }
        const ui = (_jsx(IconButton, { onClick: this.handleClick.bind(this), label: this.fullscreen ? exitLabel : enterLabel, className: this.fullscreen ? 'deck-widget-fullscreen-exit' : 'deck-widget-fullscreen-enter' }));
        render(ui, element);
    }
    setProps(props) {
        this.placement = props.placement ?? this.placement;
        const oldProps = this.props;
        const el = this.element;
        if (el) {
            if (oldProps.className !== props.className) {
                if (oldProps.className)
                    el.classList.remove(oldProps.className);
                if (props.className)
                    el.classList.add(props.className);
            }
            if (!deepEqual(oldProps.style, props.style, 1)) {
                removeStyles(el, oldProps.style);
                applyStyles(el, props.style);
            }
        }
        Object.assign(this.props, props);
        this.update();
    }
    getContainer() {
        return this.props.container || this.deck?.getCanvas()?.parentElement;
    }
    onFullscreenChange() {
        const prevFullscreen = this.fullscreen;
        const fullscreen = document.fullscreenElement === this.getContainer();
        if (prevFullscreen !== fullscreen) {
            this.fullscreen = !this.fullscreen;
        }
        this.update();
    }
    async handleClick() {
        if (this.fullscreen) {
            await this.exitFullscreen();
        }
        else {
            await this.requestFullscreen();
        }
        this.update();
    }
    async requestFullscreen() {
        const container = this.getContainer();
        if (container?.requestFullscreen) {
            await container.requestFullscreen({ navigationUI: 'hide' });
        }
        else {
            this.togglePseudoFullscreen();
        }
    }
    async exitFullscreen() {
        if (document.exitFullscreen) {
            await document.exitFullscreen();
        }
        else {
            this.togglePseudoFullscreen();
        }
    }
    togglePseudoFullscreen() {
        this.getContainer()?.classList.toggle('deck-pseudo-fullscreen');
    }
}
//# sourceMappingURL=fullscreen-widget.js.map