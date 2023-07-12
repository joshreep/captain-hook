import { useCallback, useEffect } from 'react'

type GlobalWindow = Window & typeof globalThis

export default function useEventListener<T extends HTMLElement, K extends keyof HTMLElementEventMap>(
    eventName: K,
    handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
    element?: T,
    condition?: boolean,
): void

export default function useEventListener<T extends GlobalWindow, K extends keyof WindowEventMap>(
    eventName: K,
    handler: (this: Window, ev: WindowEventMap[K]) => void,
    element?: T,
    condition?: boolean,
): void

export default function useEventListener<
    T extends HTMLElement | GlobalWindow,
    K extends keyof WindowEventMap | keyof ElementEventMap,
>(eventName: K, handler: EventListener, element: T, condition = true) {
    const eventListener = useCallback((event: Event) => handler(event), [handler])

    useEffect(() => {
        if (condition) {
            if (element) element.addEventListener?.(eventName, eventListener)
            else window.addEventListener(eventName, eventListener)
        }

        return () => {
            if (condition) {
                if (element) element.removeEventListener?.(eventName, eventListener)
                else window.addEventListener(eventName, eventListener)
            }
        }
    }, [element, eventListener, eventName, condition])
}
