import { BooleanFunctionTable } from './boolean-function-table'
import { NetworkOptions } from './network-options'
import { Node } from './node'
import { RandomIntegerGenerator } from './random-integer-generator'

export class Network {
    private readonly numberOfNodes: number
    private readonly numberOfEdgesPerNode: number
    private readonly randomGenerator: RandomIntegerGenerator
    private nodes: Node[] = []

    constructor (
        { numberOfNodes, numberOfEdgesPerNode }: NetworkOptions,
        randomGenerator: RandomIntegerGenerator
    ) {
        if (numberOfNodes <= 0) {
            throw new Error('Number of nodes in network must be greater than 0.')
        }
        if (numberOfEdgesPerNode <= 0) {
            throw new Error('Number of edges per node must be greater than 0.')
        }

        this.numberOfNodes = numberOfNodes
        this.numberOfEdgesPerNode = numberOfEdgesPerNode
        this.randomGenerator = randomGenerator
    }

    next (): boolean[] {
        if (!this.nodes.length) {
            return this.start()
        }
        const currentState = this.nodes.map(node => node.currentValue)
        const newState: boolean[] = []
        this.nodes.forEach((node, i) => {
            newState[i] = node.update(currentState)
        })
        return newState
    }

    private start (): boolean[] {
        const values: boolean [] = []
        const functionTables = this.createBooleanFunctionTables(this.numberOfEdgesPerNode)
        for (let nodeIndex = 0; nodeIndex < this.numberOfNodes; nodeIndex++) {
            const table = functionTables[this.randomGenerator(0, functionTables.length)]
            const edges: number[] = []
            for (let edgeIndex = 0; edgeIndex < this.numberOfEdgesPerNode; edgeIndex++) {
                edges.push(this.randomGenerator(0, this.numberOfNodes))
            }
            const initialValue = !!this.randomGenerator(0, 2)
            values.push(initialValue)
            this.nodes.push(new Node(initialValue, edges, table))
        }
        return values
    }

    private createBooleanFunctionTables (numberOfInputs: number): BooleanFunctionTable[] {
        const tables: BooleanFunctionTable[] = []
        const numberOfTables = this.calculateNumberOfPossibleBooleanFunctions(numberOfInputs)
        const inputCombinations = this.getInputCombinations(numberOfInputs)
        for (let tableIndex = 0; tableIndex < numberOfTables; tableIndex++) {
            const table: BooleanFunctionTable = {}
            inputCombinations.forEach((key, rowIndex) => {
                table[key] = !!(tableIndex & (1 << rowIndex))
            })
            tables.push(table)
        }
        return tables
    }

    private getInputCombinations (numberOfInputs: number): string[] {
        const combinations: string[] = []
        const numberOfCombinations = 1 << numberOfInputs // Equal to 1 * 2 ** numberOfInputs
        for (let rowIndex = 0; rowIndex < numberOfCombinations; rowIndex++) {
            let truthValues: string = ''
            for (let columnIndex = 0; columnIndex < numberOfInputs; columnIndex++) {
                truthValues += ((rowIndex & (1 << columnIndex)) ? '1' : '0')
            }
            combinations.push(truthValues)
        }
        return combinations
    }

    private calculateNumberOfPossibleBooleanFunctions (numberOfInputs: number): number {
        return 2 ** (2 ** numberOfInputs)
    }
}
