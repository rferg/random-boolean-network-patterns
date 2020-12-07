import { css, html, property } from 'lit-element'
import { getRandomColor, NetworkInputProperties } from '../common'
import { BaseElement } from './base.element'
import { NetworkFormSubmitEvent } from './network-form-submit.event'

export class AppElement extends BaseElement {
    static get is () { return 'rbn-app' }

    static get styles () {
        return [
            super.styles,
            css`
                :host {
                    display: block;
                    min-height: 100vh;
                }
                rbn-network-form {
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                }
            `
        ]
    }

    @property({ attribute: false })
    networkProperties: NetworkInputProperties = {
        colors: { on: getRandomColor(), off: getRandomColor() },
        nodeSize: 15,
        edgesPerNode: 3
    }

    @property({ attribute: false })
    isRunning = true

    connectedCallback () {
        super.connectedCallback()
        this.addEventListener('keyup', this.handleKeyUp)
    }

    disconnectedCallback () {
        super.disconnectedCallback()
        this.removeEventListener('keyup', this.handleKeyUp)
    }

    render () {
        return html`
            <rbn-network-form
                .networkProperties=${this.networkProperties}
                @network-form-submit=${this.onFormSubmit}></rbn-network-form>
            <rbn-network-animator
                isRunning=${this.isRunning}
                .networkProperties=${this.networkProperties}>
            </rbn-network-animator>
            `
    }

    private onFormSubmit ({ value }: NetworkFormSubmitEvent) {
        if (value) {
            this.networkProperties = { ...value }
        }
    }

    private handleKeyUp ({ key }: KeyboardEvent) {
        if (key === ' ') {
            this.isRunning = !this.isRunning
        }
    }
}
