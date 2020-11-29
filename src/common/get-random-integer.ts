import { RandomIntegerGenerator } from './random-integer-generator'

export const getRandomInteger: RandomIntegerGenerator = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}
