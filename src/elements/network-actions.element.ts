import { css, html, property } from 'lit-element'
import { BaseElement } from './base.element'
import { Icon } from './icon'

export class NetworkActionsElement extends BaseElement {
    static get is () { return 'rbn-network-actions' }

    static get styles () {
        return [
            super.styles,
            css`
                :host {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: center;
                    align-items: center;
                }
                rbn-button {
                    margin: 0.5rem;
                }
            `
        ]
    }

    @property({ attribute: false })
    isRunning = true

    render () {
        return html`
            <rbn-button title="Generate a new random network"
                @click=${this.handleGenerateClick}>
                <rbn-icon icon="${Icon.Refresh}"></rbn-icon>
            </rbn-button>
            <rbn-button title="${this.isRunning ? 'Pause' : 'Resume'}"
                buttonRole="${this.isRunning ? 'danger' : 'success'}"
                @click=${this.handlePlayPauseClick}>
                ${this.isRunning
        ? html`<rbn-icon icon="${Icon.Pause}"></rbn-icon>`
        : html`<rbn-icon icon="${Icon.Play}"></rbn-icon>`}
            </rbn-button>
        `
    }

    private handleGenerateClick () {
        this.dispatchEvent(new CustomEvent<void>('generate-network'))
    }

    private handlePlayPauseClick () {
        this.dispatchEvent(new CustomEvent<boolean>('running-change', { detail: !this.isRunning }))
    }
}
