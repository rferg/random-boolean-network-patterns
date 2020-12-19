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
                :host([buttonRole="success"]) button {
                    background-color: var(--success-color);
                }
                :host([disabled]) button {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                :host([size="small"]) button {
                    padding: calc(var(--padding) / 4);
                    font-size: calc(var(--font-size) / 4);
                }
                :host([size="large"]) button {
                    padding: calc(var(--padding) * 2);
                    font-size: calc(var(--font-size) * 2);
                }
                button {
                    display: block;
                    text-align: center;
                    background-color: var(--primary-color);
                    padding: var(--padding);
                    outline: none;
                    border: 0.15rem solid transparent;
                    transition: opacity var(--animation-duration) var(--easing),
                        border-color var(--animation-duration) var(--easing),
                        background-color var(--animation-duration) var(--easing);
                    font-weight: var(--bold-weight);
                    border-radius: var(--border-radius);
                    font-size: var(--font-size);
                    cursor: pointer;
                }
                button:hover {
                    opacity: 0.7;
                }
                button:focus {
                    box-shadow: none;
                    border-color: var(--light-primary);
                }
            `
        ]
    }

    @property({ type: String })
    buttonRole: 'primary' | 'danger' | 'success' = 'primary'

    @property({ type: Boolean })
    disabled = false

    @property({ type: String })
    size: 'large' | 'normal' | 'small' = 'normal'

    @property({ type: String })
    title = ''

    render () {
        return html`
            <button type="button"
                @click=${this.handleClick}
                ?disabled=${this.disabled}
                title=${this.title}>
                <slot></slot>
            </button>
        `
    }

    handleClick ({ currentTarget, detail }: MouseEvent) {
        // Remove focus from button when clicked, but not when
        // "Enter" key is hit.  Detail is 1 if mouse click and
        // 0 if keypress.
        if (detail && currentTarget && !this.disabled) {
            (currentTarget as HTMLButtonElement).blur()
        }
    }
}
