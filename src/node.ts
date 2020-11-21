import { BooleanFunctionTable } from './boolean-function-table'

export class Node {
    private readonly edges: number[]
    private readonly functionTable: BooleanFunctionTable
    private _currentValue: boolean = false
    get currentValue (): boolean {
        return this._currentValue
    }

    set currentValue (val: boolean) {
        if (val !== this._currentValue) { this._currentValue = val }
    }

    constructor (initialValue: boolean, edges: number[], functionTable: BooleanFunctionTable) {
        if (!edges?.length) {
            throw new Error('Node must have at least one edge.')
        }

        this.currentValue = initialValue
        this.edges = edges
        this.functionTable = functionTable
    }

    update (networkState: boolean[]): boolean {
        const key = this.edges.reduce((result, edge) => {
            const connectedNodeValue = networkState[edge]
            if (connectedNodeValue === undefined) {
                throw new Error(`Value for node ${edge} was undefined.`)
            }
            return result + (connectedNodeValue ? '1' : '0')
        }, '')

        const newValue = this.functionTable[key]

        if (newValue === undefined) {
            throw new Error(`Did not find value in function table with key "${key}".`)
        }

        this.currentValue = newValue
        return newValue
    }
}
