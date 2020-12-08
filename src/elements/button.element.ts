import { css, html, property } from 'lit-element'
import { BaseElement } from './base.element'

export class ButtonElement extends BaseElement {
    static get is () { return 'rbn-button' }

    static get styles () {
        return [
            super.styles,
            css`
                :host([buttonRole="primary"]) button {
                    background-color: var(--primary-color);
                }
                :host([buttonRole="danger"]) button {
                    background-color: var(--danger-color);
                }
                :host([disabled]) button {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                button {
                    display: block;
                    text-align: center;
                    background-color: var(--primary-color);
                    padding: var(--padding);
                    outline: none;
                    border: none;
                    transition: opacity var(--animation-duration) var(--easing);
                    font-weight: var(--bold-weight);
                    border-radius: var(--border-radius);
                    font-size: var(--font-size);
                    cursor: pointer;
                }
                button:hover {
                    opacity: 0.5;
                }
                button:focus {
                    box-shadow: var(--focus-shadow);
                }
            `
        ]
    }

    @property({ type: String })
    buttonRole: 'primary' | 'danger' = 'primary'

    @property({ type: Boolean })
    disabled = false

    render () {
        return html`
            <button type="button" ?disabled=${this.disabled}>
                <slot></slot>
            </button>
        `
    }
}
