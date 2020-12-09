import { Color, Colors } from '../common'
import { DrawOptions } from './draw-options'
import { Network } from './network'
import { NetworkDrawer } from './network-drawer'
import { NetworkOptions } from './network-options'

type NetworkFactory = (options: NetworkOptions) => Network

export class NetworkService {
    private readonly canvas: HTMLCanvasElement
    private readonly drawer: NetworkDrawer
    private readonly networkFactory: NetworkFactory
    private network?: Network
    private currentRequestId?: number
    private currentDrawOptions?: DrawOptions

    constructor (
        canvas: HTMLCanvasElement,
        networkFactory: NetworkFactory,
        drawerFactory: (canvas: HTMLCanvasElement) => NetworkDrawer) {
        this.canvas = canvas
        this.drawer = drawerFactory(this.canvas)
        this.networkFactory = networkFactory
    }

    startNew ({
        numberOfEdgesPerNode,
        nodeDimensions,
        onColor,
        offColor
    }: {
        numberOfEdgesPerNode: number,
        nodeDimensions: { width: number, height: number },
        onColor: Color,
        offColor: Color
    }): void {
        this.network = this.networkFactory({
            numberOfEdgesPerNode,
            numberOfNodes: Math.ceil(this.canvas.height / nodeDimensions.height)
        })

        this.currentDrawOptions = {
            startCoordinates: { x: 0, y: 0 },
            nodeDimensions,
            onColor,
            offColor
        }

        this.resumeCurrent()
    }

    changeColors ({ on, off }: Colors): void {
        if (!this.currentDrawOptions) {
            throw new Error('Attempted to change network colors before being initialized.')
        }
        this.currentDrawOptions.onColor = on
        this.currentDrawOptions.offColor = off
    }

    resumeCurrent (): void {
        if (!this.network) {
            throw new Error('Network was not initialized before attempting to draw.')
        }

        if (!this.currentDrawOptions) {
            throw new Error('Draw options were not initialized before attempting to draw.')
        }

        const draw = () => {
            const canvasWidth = this.canvas.width
            this.currentRequestId = window.requestAnimationFrame(draw)
            if (this.network && this.currentDrawOptions) {
                this.drawNetwork(this.network, this.drawer, this.currentDrawOptions, canvasWidth)
            } else {
                throw new Error('Network and/or draw options were not defined when trying to draw.')
            }
        }

        this.pauseCurrent()
        draw()
    }

    pauseCurrent (): void {
        if (this.currentRequestId) {
            window.cancelAnimationFrame(this.currentRequestId)
            this.currentRequestId = undefined
        }
    }

    resizeCanvas (width: number, height: number): void {
        this.drawer.resizeCanvas(width, height)
    }

    private drawNetwork (
        network: Network,
        drawer: NetworkDrawer,
        drawOptions: DrawOptions,
        canvasWidth: number): void {
        drawer.drawNetwork(network.next(), drawOptions)

        if (drawOptions.startCoordinates.x >= canvasWidth) {
            drawOptions.startCoordinates.x = 0
        } else {
            drawOptions.startCoordinates.x += drawOptions.nodeDimensions.width
        }
    }
}
