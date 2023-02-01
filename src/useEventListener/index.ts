import { useCallback, useEffect } from 'react'

type GlobalWindow = Window & typeof globalThis

export default function useEventListener<T extends Element, K extends keyof ElementEventMap>(
    eventName: K,
    handler: (this: Element, ev: ElementEventMap[K]) => void,
    element: T,
    condition?: boolean
): void

export default function useEventListener<T extends GlobalWindow, K extends keyof WindowEventMap>(
    eventName: K,
    handler: (this: Window, ev: WindowEventMap[K]) => void,
    element?: T,
    condition?: boolean
): void

export default function useEventListener<
    T extends Element | GlobalWindow,
    K extends keyof WindowEventMap | keyof ElementEventMap
>(eventName: K, handler: EventListener, element: T, condition = true) {
    const eventListener = useCallback((event: Event) => handler(event), [handler])

    useEffect(() => {
        if (condition) element.addEventListener?.(eventName, eventListener)

        return () => {
            if (condition) element.removeEventListener?.(eventName, eventListener)
        }
    }, [element, eventListener, eventName, condition])
}
