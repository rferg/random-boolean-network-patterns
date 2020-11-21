import { add } from '../src/index'

describe('add', () => {
    it('should return 2 given 1 and 1', () => {
        expect(add(1, 1)).toBe(2)
    })
})
