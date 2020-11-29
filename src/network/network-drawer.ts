import { DrawOptions } from './draw-options'
import { NetworkDrawerError } from './network-drawer-error'

export class NetworkDrawer {
    private readonly canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D

    constructor (canvas: HTMLCanvasElement) {
        if (!canvas) {
            throw new NetworkDrawerError('Canvas does not exist.')
        }
        this.canvas = canvas

        const context = this.canvas.getContext('2d')
        if (!context) {
            throw new NetworkDrawerError('Could not get 2D canvas rendering context.')
        }
        this.context = context
    }

    drawNetwork (
        networkValues: boolean[],
        {
            nodeDimensions,
            onColor,
            offColor,
            startCoordinates
        }: DrawOptions): void {
        const canvasHeight = this.canvas.height
        const nodeWidth = nodeDimensions.width > 0 ? nodeDimensions.width : 1
        const nodeHeight = (nodeDimensions.height) > 0 ? nodeDimensions.height : 1
        const imageData = this.context.createImageData(nodeWidth, canvasHeight)
        let valueIndex = -1
        let currentValue = false
        for (let i = 0; i < imageData.data.length; i += 4) {
            const pixelIndex = Math.floor(i / 4)
            const { x, y } = this.getPixelCoordinates(pixelIndex, imageData.width)
            if (!x && !(y % nodeHeight)) {
                valueIndex++
                currentValue = networkValues[valueIndex]
            }

            const { red, blue, green, alpha } = currentValue ? onColor : offColor
            imageData.data[i] = red
            imageData.data[i + 1] = green
            imageData.data[i + 2] = blue
            imageData.data[i + 3] = alpha
        }

        this.context.putImageData(imageData, startCoordinates.x, startCoordinates.y)
    }

    private getPixelCoordinates (pixelIndex: number, imageDataWidth: number): { x: number, y: number} {
        const x = pixelIndex % imageDataWidth
        const y = Math.floor(pixelIndex / imageDataWidth)
        return { x, y }
    }
}
