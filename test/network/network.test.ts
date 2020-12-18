import { RandomIntegerGenerator } from '../../src/common'
import { Network, NetworkOptions } from '../../src/network'

const noOpRandom: RandomIntegerGenerator = (_: number, __: number) => 0

describe('Network', () => {
    describe('constructor', () => {
        it('should throw if numberOfNodes in options is <= 0', () => {
            expect(() => new Network({ numberOfNodes: 0, numberOfEdgesPerNode: 1 }, noOpRandom))
                .toThrowError(/nodes in network must be greater than 0/i)
            expect(() => new Network({ numberOfNodes: -1, numberOfEdgesPerNode: 1 }, noOpRandom))
                .toThrowError(/nodes in network must be greater than 0/i)
        })

        it('should throw if numberOfEdgesPerNode in options is <= 0', () => {
            expect(() => new Network({ numberOfNodes: 1, numberOfEdgesPerNode: 0 }, noOpRandom))
                .toThrowError(/edges per node must be greater than 0/i)
            expect(() => new Network({ numberOfNodes: 1, numberOfEdgesPerNode: -1 }, noOpRandom))
                .toThrowError(/edges per node must be greater than 0/i)
        })
    })

    describe('next', () => {
        it('should return correct number of node states (one run)', () => {
            const numberOfNodes = 7
            const network = new Network({ numberOfNodes, numberOfEdgesPerNode: 1 }, noOpRandom)

            const state = network.next()

            expect(state.length).toEqual(numberOfNodes)
        })

        it('should return correct number of node states (multiple runs)', () => {
            const numberOfNodes = 9
            const network = new Network({ numberOfNodes, numberOfEdgesPerNode: 1 }, noOpRandom)

            const states: boolean[][] = []
            for (let i = 0; i < 3; i++) {
                states.push(network.next())
            }

            expect(states.every(s => s.length === numberOfNodes)).toBe(true)
        })

        it('should return expected node values', () => {
            const alwaysTrue: RandomIntegerGenerator = (_, __) => 1
            const alwaysFalse: RandomIntegerGenerator = (_, __) => 0
            const options: NetworkOptions = { numberOfNodes: 3, numberOfEdgesPerNode: 2 }
            const alwaysTrueNetwork = new Network(options, alwaysTrue)
            const alwaysFalseNetwork = new Network(options, alwaysFalse)

            for (let i = 0; i < 3; i++) {
                const shouldBeTrues = alwaysTrueNetwork.next()
                const shouldBeFalses = alwaysFalseNetwork.next()

                shouldBeTrues.forEach(x => expect(x).toBe(true))
                shouldBeFalses.forEach(x => expect(x).toBe(false))
            }
        })
    })
})
