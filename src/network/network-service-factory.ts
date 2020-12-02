import { RandomIntegerGenerator } from '../common'
import { Network } from './network'
import { NetworkDrawer } from './network-drawer'
import { NetworkOptions } from './network-options'
import { NetworkService } from './network-service'

export function networkServiceFactory (canvas: HTMLCanvasElement, random: RandomIntegerGenerator): NetworkService {
    return new NetworkService(
        canvas,
        (options: NetworkOptions) => new Network(options, random),
        (cvs: HTMLCanvasElement) => new NetworkDrawer(cvs))
}
