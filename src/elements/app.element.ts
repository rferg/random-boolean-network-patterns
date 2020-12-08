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
                rbn-container {
                    border-radius: 0;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                    box-shadow: var(--box-shadow);
                    align-items: center;
                }
                rbn-network-form {
                    width: 100%;
                    margin-bottom: 1rem;
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
            <rbn-container>
                <rbn-network-form
                    .networkProperties=${this.networkProperties}
                    .colors=${this.colors}
                    @network-form-submit=${this.onFormSubmit}
                    @colors-change=${this.onColorsChange}></rbn-network-form>
                <rbn-network-actions
                    .isRunning=${this.isRunning}
                    @generate-network=${this.generateNewNetwork}
                    @running-change=${this.handleRunningChange}></rbn-network-actions>
            </rbn-container>
            <rbn-network-animator
                .isRunning=${this.isRunning}
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

    private generateNewNetwork () {
        this.networkProperties = { ...this.networkProperties }
    }

    private handleRunningChange ({ detail: isRunning }: CustomEvent<boolean>) {
        this.isRunning = isRunning
    }
}
