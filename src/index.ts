import { getElements } from './elements/get-elements'

getElements().forEach(({ name, constructor }) => {
    window.customElements.define(name, constructor)
})
