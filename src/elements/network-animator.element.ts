import { LitElement, property } from 'lit-element'
import { Color, getRandomColor, getRandomInteger } from '../common'
import { networkServiceFactory, NetworkService } from '../network'

type Colors = { on: Color, off: Color }

export class NetworkAnimatorElement extends LitElement {
    private readonly canvasId = 'networkCanvas'
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

    private _colors: Colors = { on: getRandomColor(), off: getRandomColor() }
    @property({ attribute: false })
    get colors (): Colors {
        return this._colors
    }

    set colors (val: Colors) {
        if (this._colors !== val) {
            this._colors = val
            this.updateNetwork()
        }
    }

    private _nodeSize = 15
    @property({ type: Number })
    get nodeSize (): number {
        return this._nodeSize
    }

    set nodeSize (val: number) {
        if (this._nodeSize !== val) {
            this._nodeSize = val
            this.updateNetwork()
        }
    }

    private _edgesPerNode = 3
    @property({ type: Number })
    get edgesPerNode (): number {
        return this._edgesPerNode
    }

    set edgesPerNode (val: number) {
        if (this._edgesPerNode !== val) {
            this._edgesPerNode = val
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
            onColor: this.colors.on,
            offColor: this.colors.off,
            nodeDimensions: { width: this.nodeSize, height: this.nodeSize },
            numberOfEdgesPerNode: this.edgesPerNode
        })
    }
}
