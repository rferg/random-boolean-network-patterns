import { css, html, property } from 'lit-element'
import { Colors, getRandomColor, NetworkInputProperties } from '../common'
import { BaseElement } from './base.element'
import { ColorsChangeEvent } from './colors-change.event'
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
        nodeSize: 15,
        edgesPerNode: 3
    }

    @property({ attribute: false })
    colors: Colors = { on: getRandomColor(), off: getRandomColor() }

    @property({ attribute: false })
    isRunning = true

    render () {
        return html`
            <rbn-network-form
                .networkProperties=${this.networkProperties}
                .colors=${this.colors}
                @network-form-submit=${this.onFormSubmit}
                @colors-change=${this.onColorsChange}></rbn-network-form>
            <rbn-network-animator
                isRunning=${this.isRunning}
                .colors=${this.colors}
                .networkProperties=${this.networkProperties}>
            </rbn-network-animator>
            `
    }

    private onFormSubmit ({ value }: NetworkFormSubmitEvent) {
        if (value) {
            this.networkProperties = { ...value }
        }
    }

    private onColorsChange ({ colors }: ColorsChangeEvent) {
        this.colors = colors
    }
}
