import { Color } from './color'
import { getRandomInteger } from './get-random-integer'

export function getRandomColor (): Color {
    return {
        red: getRandomInteger(0, 256),
        green: getRandomInteger(0, 256),
        blue: getRandomInteger(0, 256),
        alpha: 255
    }
}
