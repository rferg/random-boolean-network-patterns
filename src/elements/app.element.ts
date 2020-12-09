import { css, html, internalProperty, property } from 'lit-element'
import { Color, Colors, getRandomColor, NetworkInputProperties } from '../common'
import { BaseElement } from './base.element'
import { CanvasDataUrlFetcherEvent } from './canvas-data-url-fetcher.event'
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
                #focusTarget {
                    position: fixed;
                    top: 0;
                    left: 0;
                    min-height: 33vh;
                    width: 100%;
                    background-color: transparent;
                    z-index: 1;
                    outline: 0;
                    border: 0;
                }
                #focusTarget:focus {
                    outline: 0;
                    border: 0;
                    box-shadow: none;
                }
                #focusTarget rbn-container {
                    border-radius: 0;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                    box-shadow: var(--box-shadow);
                    align-items: center;
                    transform: translateY(-105%);
                    transition: transform var(--animation-duration) var(--easing) var(--animation-duration);
                }
                #focusTarget:hover rbn-container,
                #focusTarget:focus-within rbn-container {
                    transform: translateY(0);
                }
                rbn-network-form {
                    width: 100%;
                    margin-bottom: 1rem;
                }

                .actions-container {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    justify-content: center;
                }
                rbn-canvas-image-downloader {
                    margin: 0.5rem;
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

    @internalProperty()
    private canvasDataUrlFetcher?: () => string

    connectedCallback () {
        super.connectedCallback()
        this.changeBodyBackgroundColor(this.colors.off)
    }

    render () {
        return html`
            <div id="focusTarget" tabindex="0">
                <rbn-container>
                    <rbn-network-form
                        .networkProperties=${this.networkProperties}
                        .colors=${this.colors}
                        @network-form-submit=${this.onFormSubmit}
                        @colors-change=${this.onColorsChange}></rbn-network-form>
                    <div class="actions-container">                            
                        <rbn-canvas-image-downloader .canvasDataUrlFetcher=${this.canvasDataUrlFetcher}>
                        </rbn-canvas-image-downloader>
                        <rbn-network-actions
                            .isRunning=${this.isRunning}
                            @generate-network=${this.generateNewNetwork}
                            @running-change=${this.handleRunningChange}></rbn-network-actions>
                    </div>
                </rbn-container>
            </div>
            <rbn-network-animator
                .isRunning=${this.isRunning}
                .colors=${this.colors}
                .networkProperties=${this.networkProperties}
                @canvas-data-url-fetcher=${this.handleCanvasDataUrlFetcher}>
            </rbn-network-animator>
            `
    }

    private onFormSubmit ({ value }: NetworkFormSubmitEvent) {
        if (value) {
            this.networkProperties = { ...value }
            this.isRunning = true
        }
    }

    private onColorsChange ({ colors }: ColorsChangeEvent) {
        this.colors = colors
        this.changeBodyBackgroundColor(this.colors.off)
    }

    private generateNewNetwork () {
        this.networkProperties = { ...this.networkProperties }
        this.isRunning = true
    }

    private handleRunningChange ({ detail: isRunning }: CustomEvent<boolean>) {
        this.isRunning = isRunning
    }

    private handleCanvasDataUrlFetcher ({ fetcher }: CanvasDataUrlFetcherEvent) {
        this.canvasDataUrlFetcher = fetcher
    }

    private changeBodyBackgroundColor ({ red, green, blue }: Color) {
        document.documentElement.style.setProperty(
            '--body-background-color',
            `rgb(${red},${green},${blue})`)
    }
}
