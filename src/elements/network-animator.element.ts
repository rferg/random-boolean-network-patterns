import { css, property } from 'lit-element'
import { Colors, getRandomColor, getRandomInteger, NetworkInputProperties } from '../common'
import { networkServiceFactory, NetworkService } from '../network'
import { BaseElement } from './base.element'
import { CanvasDataUrlFetcherEvent } from './canvas-data-url-fetcher.event'

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
    private hasStarted = false
    private canvas?: HTMLCanvasElement

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

    private _colors: Colors = { on: getRandomColor(), off: getRandomColor() }

    @property({ attribute: false })
    get colors (): Colors {
        return this._colors
    }

    set colors (val: Colors) {
        if (val !== this._colors) {
            this._colors = val
            if (this.hasStarted && this.service) {
                this.service.changeColors(this._colors)
            }
        }
    }

    constructor () {
        super()
        this.handleWindowResize = this.handleWindowResize.bind(this)
    }

    connectedCallback () {
        this.canvas = document.createElement('canvas')
        this.shadowRoot?.appendChild(this.canvas)
        this.setCanvasToWindowSize()
        this.service = networkServiceFactory(this.canvas, getRandomInteger)
        this.updateNetwork()
        this.hasStarted = true

        window.addEventListener('resize', this.handleWindowResize)

        this.dispatchEvent(new CanvasDataUrlFetcherEvent(
            () => this.canvas?.toDataURL() ?? ''
        ))
    }

    disconnectedCallback () {
        window.removeEventListener('resize', this.handleWindowResize)
    }

    private updateNetwork () {
        if (this.service) {
            this.service.startNew({
                onColor: this.colors.on,
                offColor: this.colors.off,
                nodeDimensions: {
                    width: this.networkProperties.nodeSize,
                    height: this.networkProperties.nodeSize
                },
                numberOfEdgesPerNode: this.networkProperties.edgesPerNode
            })
            this.hasStarted = true
        }
    }

    private setCanvasToWindowSize () {
        console.log('resize event')
        if (this.canvas) {
            this.canvas.height = window.innerHeight
            this.canvas.width = window.innerWidth
        }
    }

    private handleWindowResize () {
        this.setCanvasToWindowSize()
    }
}
