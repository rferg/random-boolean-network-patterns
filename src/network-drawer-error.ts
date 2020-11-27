export class NetworkDrawerError extends Error {
    readonly kind: string

    constructor (message: string) {
        super(message)
        this.kind = 'NetworkDrawerError'
    }
}
