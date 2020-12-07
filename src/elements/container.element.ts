import { css, html } from 'lit-element'
import { BaseElement } from './base.element'

export class ContainerElement extends BaseElement {
    static get is () { return 'rbn-container' }

    static get styles () {
        return [
            super.styles,
            css`
                :host {
                    padding: var(--padding);
                    border-radius: var(--border-radius);
                    background-color: var(--container-background-color);
                    border-radius: var(--border-radius);
                    display: flex;
                    flex-flow: column nowrap;
                    align-items: flex-start;
                    justify-content: center;
                }
            `
        ]
    }

    render () {
        return html`<slot></slot>`
    }
}
