import { useCallback, useEffect, useState } from 'react'

function useKeyPress<T extends HTMLElement>(targetKey: string, element?: T) {
    const [keyPressed, setKeyPressed] = useState<boolean>(false)

    const downHandler = useCallback(
        ({ key }: KeyboardEvent) => {
            if (key === targetKey) {
                setKeyPressed(true)
            }
        },
        [targetKey]
    )

    const upHandler = useCallback(
        ({ key }: KeyboardEvent) => {
            if (key === targetKey) {
                setKeyPressed(false)
            }
        },
        [targetKey]
    )

    useEffect(() => {
        if (element) {
            element.addEventListener('keydown', downHandler)
            element.addEventListener('keyup', upHandler)

            return () => {
                element.removeEventListener('keydown', downHandler)
                element.removeEventListener('keyup', upHandler)
            }
        } else {
            window.addEventListener('keydown', downHandler)
            window.addEventListener('keyup', upHandler)

            return () => {
                window.removeEventListener('keydown', downHandler)
                window.removeEventListener('keyup', upHandler)
            }
        }
    }, [downHandler, element, upHandler])

    return keyPressed
}

export default useKeyPress
