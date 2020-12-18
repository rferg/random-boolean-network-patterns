import { BooleanFunctionTable } from '../../src/network/boolean-function-table'
import { Node } from '../../src/network/node'

describe('Node', () => {
    describe('constructor', () => {
        it('should throw if no edges provided', () => {
            expect(() => new Node(true, [], {}))
                .toThrowError(/must have at least one edge/i)
        })

        it('should set initial value', () => {
            const initialValue = false

            const node = new Node(initialValue, [0], {})

            expect(node.currentValue).toEqual(initialValue)
        })
    })

    describe('update', () => {
        it('should throw if given networkState does not contain value for edge', () => {
            const edges = [1]
            const networkState = [false]
            const node = new Node(false, edges, { 1: true, 0: true })

            expect(() => node.update(networkState))
                .toThrowError(/was undefined/i)
        })

        it('should throw if function table does not contain value for given inputs', () => {
            const edges = [0]
            const networkState = [false]
            const node = new Node(false, edges, {})

            expect(() => node.update(networkState))
                .toThrowError(/did not find value in function table/i)
        })

        const testCases: {
            edges: number[],
            networkState: boolean[],
            functionTable: BooleanFunctionTable,
            expectedValue: boolean
        }[] = [
            {
                edges: [0, 1],
                networkState: [false, false],
                expectedValue: true,
                functionTable: {
                    '00': true,
                    '01': false,
                    10: false,
                    11: false
                }
            },
            {
                edges: [1, 2],
                networkState: [false, false, false],
                expectedValue: true,
                functionTable: {
                    '00': true,
                    '01': false,
                    10: false,
                    11: false
                }
            },
            {
                edges: [1, 2, 4],
                networkState: [false, false, false, true, true],
                expectedValue: true,
                functionTable: {
                    '001': true
                }
            },
            {
                edges: [4, 2, 1],
                networkState: [false, false, false, true, true],
                expectedValue: false,
                functionTable: {
                    100: false
                }
            },
            {
                edges: [1, 3, 5, 7],
                networkState: [...new Array(8)].map((_, i) => !!(i % 2)),
                expectedValue: true,
                functionTable: {
                    1111: true
                }
            }
        ]

        testCases.forEach(({ edges, networkState, functionTable, expectedValue }) => {
            it(`should return ${expectedValue} with edges ${edges} networkState ${networkState}`, () => {
                const node = new Node(!expectedValue, edges, functionTable)

                const actual = node.update(networkState)

                expect(actual).toEqual(expectedValue)
                expect(node.currentValue).toEqual(expectedValue)
            })
        })
    })
})
