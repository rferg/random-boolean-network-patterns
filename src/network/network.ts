import { BooleanFunctionTable } from './boolean-function-table'
import { NetworkOptions } from './network-options'
import { Node } from './node'
import { RandomIntegerGenerator } from '../common/random-integer-generator'

export class Network {
    private readonly numberOfNodes: number
    private readonly numberOfEdgesPerNode: number
    private readonly randomGenerator: RandomIntegerGenerator
    private nodes: Node[] = []
    private inputCombinationCache?: string[]

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
        for (let nodeIndex = 0; nodeIndex < this.numberOfNodes; nodeIndex++) {
            const table = this.getRandomBooleanFunctionTable(this.numberOfEdgesPerNode)
            const edges: number[] = []
            for (let edgeIndex = 0; edgeIndex < this.numberOfEdgesPerNode; edgeIndex++) {
                edges.push(this.randomGenerator(0, this.numberOfNodes))
            }
            const initialValue = this.getRandomBoolean()
            values.push(initialValue)
            this.nodes.push(new Node(initialValue, edges, table))
        }
        return values
    }

    private getRandomBooleanFunctionTable (numberOfInputs: number): BooleanFunctionTable {
        const table: BooleanFunctionTable = {}
        const inputCombinations = this.getInputCombinations(numberOfInputs)
        inputCombinations.forEach(input => {
            table[input] = this.getRandomBoolean()
        })
        return table
    }

    private getInputCombinations (numberOfInputs: number): string[] {
        if (this.inputCombinationCache) {
            return this.inputCombinationCache
        }
        const combinations: string[] = []
        const numberOfCombinations = 1 << numberOfInputs // Equal to 1 * 2 ** numberOfInputs
        for (let rowIndex = 0; rowIndex < numberOfCombinations; rowIndex++) {
            let truthValues: string = ''
            for (let columnIndex = 0; columnIndex < numberOfInputs; columnIndex++) {
                truthValues += ((rowIndex & (1 << columnIndex)) ? '1' : '0')
            }
            combinations.push(truthValues)
        }

        this.inputCombinationCache = combinations

        return combinations
    }

    private getRandomBoolean (): boolean {
        return !!this.randomGenerator(0, 2)
    }
}
