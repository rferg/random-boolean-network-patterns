import { Color } from '../common'

export interface DrawOptions {
    startCoordinates: { x: number, y: number }
    nodeDimensions: { height: number, width: number }
    onColor: Color
    offColor: Color
}
