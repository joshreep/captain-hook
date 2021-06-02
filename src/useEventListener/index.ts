import { useCallback, useEffect } from 'react'

const useEventListener = <T extends HTMLElement>(
    eventName: string,
    handler: EventListener,
    element: T | (Window & typeof globalThis) = window
) => {
    const eventListener = useCallback((event: Event) => handler(event), [handler])

    useEffect(() => {
        element.addEventListener?.(eventName, eventListener)

        return () => {
            element.removeEventListener?.(eventName, eventListener)
        }
    }, [element, eventListener, eventName])
}

export default useEventListener
