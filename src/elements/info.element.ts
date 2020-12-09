import { css, html } from 'lit-element'
import { BaseElement } from './base.element'
import { headingsStyles } from './headings.styles'
import { linkStyles } from './link.styles'

export class InfoElement extends BaseElement {
    static get is (): string { return 'rbn-info' }
    static get styles () {
        return [
            super.styles,
            headingsStyles,
            linkStyles,
            css`
              p {
                  margin-bottom: 1rem;
              }  
            `
        ]
    }

    render () {
        return html`
            <h1>Visual Patterns with Random Boolean Networks</h1>
            <p>
                Each of the squares on the screen represents the value of a node in a 
                <a href="https://en.wikipedia.org/wiki/Boolean_network" target="_blank">
                    Boolean network
                </a> at a given time point.
            </p>
            <p>The Boolean functions for each node are randomly assigned, as are its input nodes.</p>
        `
    }
}
