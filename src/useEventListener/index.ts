import { useCallback, useEffect } from 'react'

const useEventListener = <T extends Element>(
    eventName: string,
    handler: EventListener,
    element: T | (Window & typeof globalThis) = window,
    condition = true
) => {
    const eventListener = useCallback((event: Event) => handler(event), [handler])

    useEffect(() => {
        if (condition) element.addEventListener?.(eventName, eventListener)

        return () => {
            if (condition) element.removeEventListener?.(eventName, eventListener)
        }
    }, [element, eventListener, eventName, condition])
}

export default useEventListener
