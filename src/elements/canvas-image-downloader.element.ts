import { css, html, internalProperty, property, query } from 'lit-element'
import { BaseElement } from './base.element'
import { Icon } from './icon'

export class CanvasImageDownloaderElement extends BaseElement {
    static get is (): string { return 'rbn-canvas-image-downloader' }

    static get styles () {
        return [
            super.styles,
            css`
                a {
                    display: none;
                }
            `
        ]
    }

    @property({ attribute: false })
    canvasDataUrlFetcher?: () => string

    @internalProperty()
    private dataUrl = ''

    @query('#downloadLink')
    downloadLink?: HTMLAnchorElement

    render () {
        return html`
            <a id="downloadLink" download="rbnpattern.png" href="${this.dataUrl}"></a>
            <rbn-button
                buttonRole="primary"
                title="Download current pattern to image file"
                @click=${this.download}>
                <rbn-icon icon="${Icon.Download}"></rbn-icon>
            </rbn-button>
        `
    }

    private async download () {
        if (this.canvasDataUrlFetcher && this.downloadLink) {
            this.dataUrl = this.canvasDataUrlFetcher()
            await this.updateComplete
            this.downloadLink.click()
        }
    }
}
