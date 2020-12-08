import { AppElement } from './app.element'
import { ButtonElement } from './button.element'
import { ContainerElement } from './container.element'
import { NetworkActionsElement } from './network-actions.element'
import { NetworkAnimatorElement } from './network-animator.element'
import { NetworkFormElement } from './network-form.element'

interface ClassType<T> extends Function {
    new (...args: any[]): T
}

export function getElements (): {
    name: string,
    constructor: ClassType<HTMLElement>
}[] {
    return [
        { name: AppElement.is, constructor: AppElement },
        { name: NetworkAnimatorElement.is, constructor: NetworkAnimatorElement },
        { name: ContainerElement.is, constructor: ContainerElement },
        { name: ButtonElement.is, constructor: ButtonElement },
        { name: NetworkFormElement.is, constructor: NetworkFormElement },
        { name: NetworkActionsElement.is, constructor: NetworkActionsElement }
    ]
}
