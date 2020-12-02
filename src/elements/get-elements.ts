import { AppElement } from './app.element'
import { NetworkAnimatorElement } from './network-animator.element'

interface ClassType<T> extends Function {
    new (...args: any[]): T
}

export function getElements (): {
    name: string,
    constructor: ClassType<HTMLElement>
}[] {
    return [
        { name: 'rbn-app', constructor: AppElement },
        { name: 'rbn-network-animator', constructor: NetworkAnimatorElement }
    ]
}
