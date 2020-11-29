import { getRandomInteger } from './common'
import { Network, NetworkDrawer, NetworkOptions } from './network'
import { NetworkService } from './network/network-service'

window.onload = () => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    const service = new NetworkService(
        canvas,
        (options: NetworkOptions) => new Network(options, getRandomInteger),
        (cvs: HTMLCanvasElement) => new NetworkDrawer(cvs))

    const nodeDimensions = { width: 15, height: 15 }
    const onColor = {
        red: getRandomInteger(0, 256),
        green: getRandomInteger(0, 256),
        blue: getRandomInteger(0, 256),
        alpha: 255
    }
    const offColor = {
        red: getRandomInteger(0, 256),
        green: getRandomInteger(0, 256),
        blue: getRandomInteger(0, 256),
        alpha: 255
    }

    service.startNew({
        numberOfEdgesPerNode: 3,
        onColor,
        offColor,
        nodeDimensions
    })

    let isRunning = true

    document.addEventListener('keypress', ({ key }) => {
        if (key === ' ') {
            if (isRunning) {
                service.pauseCurrent()
            } else {
                service.resumeCurrent()
            }
            isRunning = !isRunning
        }
    })
}
