import { css, html, internalProperty, property } from 'lit-element'
import { NetworkInputProperties } from '../common'
import { convertHexToRgb } from '../common/convert-hex-to-rgb'
import { convertRgbToHex } from '../common/convert-rgb-to-hex'
import { BaseElement } from './base.element'
import { NetworkFormSubmitEvent } from './network-form-submit.event'

export class NetworkFormElement extends BaseElement {
    static get is () { return 'rbn-network-form' }

    static get styles () {
        return [
            super.styles,
            css`
                rbn-container {
                    border-radius: 0;
                }
                form {
                    display: flex;
                    flex-flow: row wrap;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }                
                .form-group {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-between;
                    min-width: 150px;
                    margin: 0.5rem;
                }
                .form-group label {
                    margin-right: 1rem;
                }
                input {
                    outline: 0;
                    border: 0;
                    background-color: transparent;
                    border-bottom: 0.1rem solid var(--color);
                    text-align: center;
                    padding: var(--padding);
                    font-size: var(--font-size);
                }
                input[type="color"] {
                    padding: 0;
                    border-bottom: none;
                }
                input[type='number'] {
                    -moz-appearance:textfield;
                }
                input[invalid] {
                    box-shadow: 0px 0px 0px 2px var(--danger-color);
                    border: 0;
                }

                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                }
            `
        ]
    }

    private readonly defaultFormValues: NetworkInputProperties = {
        nodeSize: 1,
        edgesPerNode: 1,
        colors: {
            on: { red: 0, green: 0, blue: 0, alpha: 0 },
            off: { red: 0, green: 0, blue: 0, alpha: 0 }
        }
    }

    private _networkProperties?: NetworkInputProperties

    @property()
    get networkProperties (): NetworkInputProperties | undefined {
        return this._networkProperties
    }

    set networkProperties (val: NetworkInputProperties | undefined) {
        if (this._networkProperties !== val) {
            this._networkProperties = val
            if (this._networkProperties) {
                this.formValues = { ...this._networkProperties }
            }
        }
    }

    @internalProperty()
    private formValues: NetworkInputProperties = this.defaultFormValues

    render () {
        return html`
            <rbn-container>
                <form>
                    <div class="form-group">
                        <label for="nodeSize">Node size (px)</label>
                        <input type="number"
                            id="nodeSize"
                            value=${(this.formValues && this.formValues.nodeSize) || 1}
                            min="1"
                            max="100"
                            step="1"
                            @input=${(e: InputEvent) => this.onNumberChange(e, 'nodeSize')}/>
                    </div>
                    <div class="form-group">
                        <label for="edgesPerNode">Inputs per node</label>
                        <input type="number"
                            id="edgesPerNode"
                            value=${this.formValues.edgesPerNode || 1}
                            min="1"
                            max="10"
                            step="1"
                            @input=${(e: InputEvent) => this.onNumberChange(e, 'edgesPerNode')}/>
                    </div>
                    <div class="form-group">
                        <label for="onColor">Color 1</label>
                        <input type="color"
                            id="onColor"
                            value="${convertRgbToHex(this.formValues.colors.on)}"
                            @input=${(e: InputEvent) => this.onColorChange(e, 'on')} />
                    </div>
                    <div class="form-group">
                        <label for="offColor">Color 0</label>
                        <input type="color"
                            id="offColor"
                            value="${convertRgbToHex(this.formValues.colors.off)}"
                            @input=${(e: InputEvent) => this.onColorChange(e, 'off')} />
                    </div>
                </form>
            </rbn-container>
        `
    }

    private parseNumberInput (input: string | null, min: number, max: number): { isValid: boolean, value?: number } {
        if (!input) { return { isValid: false } }
        const value = Number.parseFloat(input)
        if (!Number.isInteger(value)) { return { isValid: false } }

        if (min > value || value > max) { return { isValid: false } }
        return { isValid: true, value }
    }

    private onNumberChange ({ target }: InputEvent, key: 'edgesPerNode' | 'nodeSize') {
        const el = target as HTMLInputElement
        const inputValue = el?.value
        const max = key === 'edgesPerNode' ? 10 : 100
        const { isValid, value } = this.parseNumberInput(inputValue, 1, max)
        if (isValid && value !== null && value !== undefined) {
            this.formValues = {
                ...this.formValues,
                [key]: value
            }
            this.submitChange()
            el.removeAttribute('invalid')
        } else {
            el.setAttribute('invalid', '')
        }
    }

    private onColorChange ({ target }: InputEvent, key: 'on' | 'off') {
        const value = convertHexToRgb((target as HTMLInputElement)?.value)
        this.formValues = {
            ...this.formValues,
            colors: {
                ...this.formValues.colors,
                [key]: { ...value, alpha: 255 }
            }
        }
        this.submitChange()
    }

    private submitChange () {
        this.dispatchEvent(new NetworkFormSubmitEvent(this.formValues))
    }
}
