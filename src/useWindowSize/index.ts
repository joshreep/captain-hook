import { useEffect, useState } from 'react'
import useEventListener from '../useEventListener'

export type WindowSize = {
    width: number
    height: number
    totalPixels: number
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: window.innerWidth,
        height: window.innerHeight,
        totalPixels: window.innerWidth * window.innerHeight,
    })

    function handleResize() {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            totalPixels: window.innerWidth * window.innerHeight,
        })
    }

    useEventListener('resize', handleResize)

    useEffect(() => {
        handleResize()
    }, [])

    return windowSize
}
