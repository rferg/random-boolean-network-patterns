import { getRandomInteger } from './get-random-integer'
import { Network } from './network'

window.onload = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    const canvasHeight = canvas.height
    const canvasWidth = canvas.width

    if (!canvas) {
        throw new Error('Canvas not found')
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
        throw new Error('no context')
    }

    let column = 0

    const network = new Network({
        numberOfEdgesPerNode: 2,
        numberOfNodes: canvasHeight
    },
    getRandomInteger)

    const drawNetwork = () => {
        const imageData = ctx.createImageData(1, canvasHeight)
        const values = network.next()
        for (let i = 0; i < imageData.height * 4; i += 4) {
            if (values[Math.floor(i / 4)]) {
                imageData.data[i] = 255
                imageData.data[i + 1] = 255
                imageData.data[i + 2] = 255
            }
            imageData.data[i + 3] = 255
        }

        ctx.putImageData(imageData, column, 0)

        if (column >= canvasWidth) {
            column = 0
        } else {
            column++
        }
    }

    const draw = () => {
        window.requestAnimationFrame(draw)

        drawNetwork()
    }

    draw()
}
