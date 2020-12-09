export class CanvasDataUrlFetcherEvent extends CustomEvent<() => string> {
    static get eventType (): string { return 'canvas-data-url-fetcher' }

    get fetcher (): () => string {
        return this.detail
    }

    constructor (fetcher: () => string) {
        super(CanvasDataUrlFetcherEvent.eventType, { detail: fetcher })
    }
}
