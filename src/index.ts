import { DrawOptions } from './ui/draw-options'
import { getRandomInteger } from './common/get-random-integer'
import { Network } from './network/network'
import { NetworkDrawer } from './ui/network-drawer'

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

    let columnX = 0
    const options: DrawOptions = {
        startCoordinates: { x: columnX, y: 0 },
        nodeDimensions: { width: 15, height: 15 },
        onColor: {
            red: getRandomInteger(0, 256),
            green: getRandomInteger(0, 256),
            blue: getRandomInteger(0, 256),
            alpha: 255
        },
        offColor: {
            red: getRandomInteger(0, 256),
            green: getRandomInteger(0, 256),
            blue: getRandomInteger(0, 256),
            alpha: 255
        }
    }

    const network = new Network({
        numberOfEdgesPerNode: 3,
        numberOfNodes: Math.ceil(canvasHeight / options.nodeDimensions.height)
    },
    getRandomInteger)

    const drawer = new NetworkDrawer(canvas)

    const drawNetwork = () => {
        drawer.drawNetwork(network.next(), options)

        if (columnX >= canvasWidth) {
            columnX = 0
        } else {
            columnX += options.nodeDimensions.width
        }
        options.startCoordinates.x = columnX
    }

    const draw = () => {
        window.requestAnimationFrame(draw)

        drawNetwork()
    }

    draw()
}
