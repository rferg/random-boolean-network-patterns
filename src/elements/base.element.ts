import { css, CSSResultArray, CSSResultOrNative, LitElement } from 'lit-element'

export class BaseElement extends LitElement {
    static get styles (): CSSResultOrNative | CSSResultArray {
        return css`
            :host, * {
                box-sizing: border-box;
                font-family: var(--font-family);
                margin: 0;
                padding: 0;
            }
        `
    }
}
