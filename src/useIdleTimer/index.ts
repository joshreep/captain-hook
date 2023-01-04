import { useCallback, useEffect, useRef } from 'react'
import useMountedState from '../useMountedState'

export enum IdleTimerState {
    Idle = 'IDLE',
    Active = 'ACTIVE',
}

export type UseIdleTimerProps = {
    defaultState?: IdleTimerState
    element?: Element | Window
    events?: (keyof WindowEventMap | keyof ElementEventMap)[]
    onActive?: () => void
    onIdle?: () => void
    timeout: number
}

/**
 * ## useIdleTimer
 */
export default function useIdleTimer({
    defaultState = IdleTimerState.Active,
    element = window,
    events = ['keydown', 'keyup', 'mousemove'],
    onActive,
    onIdle,
    timeout,
}: UseIdleTimerProps) {
    if (!timeout) throw new Error('`timeout` is a required prop')

    const [state, setState] = useMountedState(defaultState)

    const setIdle = useCallback(() => {
        setState(IdleTimerState.Idle)
    }, [setState])

    const timeoutRef = useRef(setTimeout(setIdle, timeout))

    const setActive = useCallback(() => {
        clearTimeout(timeoutRef.current)
        setState(IdleTimerState.Active)
        timeoutRef.current = setTimeout(setIdle, timeout)
    }, [setIdle, setState, timeout])

    useEffect(() => {
        switch (state) {
            case IdleTimerState.Active: {
                onActive?.()
                break
            }
            case IdleTimerState.Idle: {
                onIdle?.()
                break
            }
        }
    }, [onActive, onIdle, state])

    useEffect(() => {
        events.forEach((event) => element.addEventListener(event, setActive))

        return () => {
            events.forEach((event) => element.removeEventListener(event, setActive))
        }
    }, [element, events, setActive])

    return state
}
