import { html } from 'lit-element'
import { BaseElement } from './base.element'

export class AppElement extends BaseElement {
    render () {
        return html`<rbn-network-animator></rbn-network-animator>`
    }
}
