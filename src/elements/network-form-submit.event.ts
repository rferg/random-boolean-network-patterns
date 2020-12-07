import { NetworkInputProperties } from '../common'

export class NetworkFormSubmitEvent extends CustomEvent<NetworkInputProperties | undefined> {
    static get eventType (): string { return 'network-form-submit' }

    get value (): NetworkInputProperties | undefined {
        return this.detail
    }

    constructor (value: NetworkInputProperties | undefined) {
        super(NetworkFormSubmitEvent.eventType, { detail: value })
    }
}
