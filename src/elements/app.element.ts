import { css, html, internalProperty, property } from 'lit-element'
import { Color, Colors, getRandomColor, NetworkInputProperties } from '../common'
import { BaseElement } from './base.element'
import { CanvasDataUrlFetcherEvent } from './canvas-data-url-fetcher.event'
import { ColorsChangeEvent } from './colors-change.event'
import { linkStyles } from './link.styles'
import { NetworkFormSubmitEvent } from './network-form-submit.event'

import githubLogo from '../../assets/github.png'
import { Icon } from './icon'

export class AppElement extends BaseElement {
    static get is () { return 'rbn-app' }

    static get styles () {
        return [
            super.styles,
            linkStyles,
            css`
                :host {
                    display: block;
                    min-height: 100vh;
                }
                rbn-container {
                    max-height: 100vh;
                    overflow-y: auto;
                    border-radius: 0;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1;
                    width: 100%;
                    box-shadow: var(--box-shadow);
                    align-items: center;
                    justify-content: flex-start;
                    transform: translateY(0);
                    transition: transform var(--animation-duration) var(--easing);
                }
                rbn-container[hidden] {
                    display: flex;
                    transform: translateY(-105%);
                }
                rbn-container.options-button-container {
                    width: auto;
                    border-bottom-left-radius: var(--border-radius);
                    opacity: 0.5;
                    right: 0;
                    left: auto;
                    padding: calc(var(--padding) / 2);
                }
                rbn-container.options-button-container:hover {
                    opacity: 1;
                }
                rbn-network-form {
                    width: 100%;
                    margin-bottom: 1rem;
                }
                .actions-container, .top-buttons-container {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    justify-content: center;
                }
                .buttons-group {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: center;
                    align-items: center;
                }
                .top-buttons-container {
                    width: 100%;
                    justify-content: space-between;
                }
                .top-buttons-container #githubLink {
                    display: flex;
                    margin-left: 1rem;
                }
                .top-buttons-container #githubLink img {
                    height: 32px;
                    width: 32px;
                }
                rbn-canvas-image-downloader {
                    margin: 0.5rem;
                }
                *[hidden] {
                    display: none;
                }
                rbn-info {
                    max-width: 800px;
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

    @internalProperty()
    private showInfo = false

    @internalProperty()
    private showForm = false

    connectedCallback () {
        super.connectedCallback()
        this.changeBodyBackgroundColor(this.colors.off)
    }

    render () {
        return html`
            <rbn-container class="options-button-container" ?hidden=${this.showForm}>
                <rbn-button
                    title="Show Options"
                    size="small"
                    @click=${() => { this.showForm = true }}>
                    <rbn-icon size="small" icon=${Icon.Menu}></rbn-icon>
                </rbn-button>
            </rbn-container>
            <rbn-container ?hidden=${!this.showForm}>
                <div class="top-buttons-container">
                    <div class="buttons-group">
                        <button @click=${this.handleMoreInfoClick}>
                            ${this.showInfo ? 'Back' : 'What is this?'}</button>
                        <a  id="githubLink"
                            href="https://github.com/rferg/random-boolean-network-patterns"
                            target="_blank"
                            rel="noopener">
                            <img src="${githubLogo}"
                                alt="GitHub logo"
                                title="GitHub page for this site" />
                        </a>
                    </div>
                    <div class="buttons-group">
                        <rbn-button @click=${() => { this.showForm = false }}
                            title="Close Options"
                            size="small"
                            buttonRole="danger">
                            <rbn-icon size="small" icon=${Icon.X}></rbn-icon>
                        </rbn-button>
                    </div>
                </div>
                <rbn-network-form ?hidden=${this.showInfo}
                    .networkProperties=${this.networkProperties}
                    .colors=${this.colors}
                    @network-form-submit=${this.onFormSubmit}
                    @colors-change=${this.onColorsChange}></rbn-network-form>
                <div class="actions-container" ?hidden=${this.showInfo}>                            
                    <rbn-canvas-image-downloader .canvasDataUrlFetcher=${this.canvasDataUrlFetcher}>
                    </rbn-canvas-image-downloader>
                    <rbn-network-actions
                        .isRunning=${this.isRunning}
                        @generate-network=${this.generateNewNetwork}
                        @running-change=${this.handleRunningChange}></rbn-network-actions>
                </div>
                <rbn-info ?hidden=${!this.showInfo}></rbn-info>
            </rbn-container>
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

    private handleMoreInfoClick () {
        this.showInfo = !this.showInfo
    }
}
