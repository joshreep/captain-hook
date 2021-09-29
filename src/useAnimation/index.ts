import { useEffect, useState } from 'react'
import easing, { EasingMap } from '../easing'

export default function useAnimation(easingName: keyof EasingMap, duration = 500, delay = 0) {
    const elapsed = useAnimationTimer(duration, delay)

    const n = Math.min(1, elapsed / duration)

    return easing[easingName](n)
}

function useAnimationTimer(duration = 1000, delay = 0) {
    const [elapsedTime, setElapsedTime] = useState(0)

    useEffect(() => {
        let animationFrame: number, timerStop: NodeJS.Timeout, start: number

        function onFrame() {
            setElapsedTime(Date.now() - start)
            loop()
        }

        function loop() {
            animationFrame = requestAnimationFrame(onFrame)
        }

        function onStart() {
            timerStop = setTimeout(() => {
                cancelAnimationFrame(animationFrame)
                setElapsedTime(Date.now() - start)
            }, duration)

            start = Date.now()
            loop()
        }

        const timerDelay = setTimeout(onStart, delay)

        return () => {
            clearTimeout(timerStop)
            clearTimeout(timerDelay)
            cancelAnimationFrame(animationFrame)
        }
    }, [delay, duration])

    return elapsedTime
}
