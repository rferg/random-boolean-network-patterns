import { Colors } from '../common'

export class ColorsChangeEvent extends CustomEvent<Colors> {
    static get eventType (): string { return 'colors-change' }

    get colors (): Colors {
        return this.detail
    }

    constructor (colors: Colors) {
        super(ColorsChangeEvent.eventType, { detail: colors })
    }
}
