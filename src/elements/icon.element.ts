import { css, property, svg, TemplateResult } from 'lit-element'
import { BaseElement } from './base.element'
import { Icon } from './icon'

export class IconElement extends BaseElement {
    static get is () { return 'rbn-icon' }

    static get styles () {
        return [
            super.styles,
            css`
                svg {
                    height: calc(var(--font-size) * 2);
                    stroke: var(--white);
                    fill: var(--white);
                }
                :host([size="small"]) svg {
                    height: var(--font-size);
                }
            `
        ]
    }

    @property({ type: String })
    icon?: Icon

    @property({ type: String, attribute: true })
    size: 'small' | 'normal' = 'normal'

    render () {
        return this.getIconTemplate(this.icon)
    }

    private getIconTemplate (icon: Icon | undefined): TemplateResult {
        switch (icon) {
        case Icon.Refresh:
            return svg`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M6.53718227 3.54888175C4.12548686 4.9267495 2.5 7.52354835 2.5 10.5c0 4.418278 3.581722 8 8 8m4-1c2.2866288-1.4081018 4-4.1175492 4-7 0-4.418278-3.581722-8-8-8"/>
                        <path d="M6.5 8.5v-5H1M14.5 12.5v5H20"/>
                    </g>
                </svg>
                `
        case Icon.Download:
            return svg`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                    <g fill="none" fill-rule="evenodd">
                        <path d="M6.49962296 10.5000862l3.99939594 4.23274118 4.00010306-4.19102189M10.5 3.5v11M4.5 17.5h12"/>
                    </g>
                </svg>
            `
        case Icon.Pause:
            return svg`
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 33">
                    <path stroke-width="2" d="M5.5 32.0156V4m13 28.0156V4"/>
                </svg>
            `
        case Icon.Play:
            return svg`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22"><
                    <path d="M18 11L.75 21.3923V.607696L18 11z"/>
                </svg>
            `
        case Icon.Menu:
            return svg`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21">
                    <g fill="none">
                        <path d="M4.5 7.5h12M4.498 10.5h11.997M4.5 13.5h11.995"/>
                    </g>
                </svg>
            `
        case Icon.X:
            return svg`
                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M2.35355 1.64645L14.3989 13.6918M1.64645 13.6918L13.6918 1.64645"/>
                </svg>
            `
        default:
            return svg``
        }
    }
}
