import { css, property } from 'lit-element'
import { getRandomColor, getRandomInteger, NetworkInputProperties } from '../common'
import { networkServiceFactory, NetworkService } from '../network'
import { BaseElement } from './base.element'

export class NetworkAnimatorElement extends BaseElement {
    static get is () { return 'rbn-network-animator' }

    static get styles () {
        return [
            super.styles,
            css`
                canvas {
                    position: fixed;
                    top: 0;
                    left: 0;
                }
            `
        ]
    }

    private service?: NetworkService

    private _isRunning = true
    @property({ type: Boolean })
    get isRunning (): boolean {
        return this._isRunning
    }

    set isRunning (val: boolean) {
        if (val !== this._isRunning) {
            this._isRunning = val
            if (!this._isRunning) {
                this.service && this.service.pauseCurrent()
            } else {
                this.service && this.service.resumeCurrent()
            }
        }
    }

    private _networkProperties: NetworkInputProperties = {
        colors: { on: getRandomColor(), off: getRandomColor() },
        nodeSize: 15,
        edgesPerNode: 3
    }

    @property({ attribute: false })
    get networkProperties (): NetworkInputProperties {
        return this._networkProperties
    }

    set networkProperties (val: NetworkInputProperties) {
        if (this._networkProperties !== val) {
            this._networkProperties = val
            this.updateNetwork()
        }
    }

    connectedCallback () {
        const canvas: HTMLCanvasElement = document.createElement('canvas')
        this.shadowRoot?.appendChild(canvas)
        canvas.height = window.innerHeight
        canvas.width = window.innerWidth
        this.service = networkServiceFactory(canvas, getRandomInteger)
        this.updateNetwork()
    }

    private updateNetwork () {
        this.service && this.service.startNew({
            onColor: this.networkProperties.colors.on,
            offColor: this.networkProperties.colors.off,
            nodeDimensions: {
                width: this.networkProperties.nodeSize,
                height: this.networkProperties.nodeSize
            },
            numberOfEdgesPerNode: this.networkProperties.edgesPerNode
        })
    }
}
