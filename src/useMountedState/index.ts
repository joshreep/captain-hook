import { SetStateAction, useState } from 'react'
import useIsMounted from '../useIsMounted'

export default function useMountedState<T>(initialState: T) {
    const [state, setState] = useState<T>(initialState)
    const isMounted = useIsMounted()

    function setStateIfMounted(newState: SetStateAction<T>) {
        if (isMounted.current) {
            if (newState instanceof Function) setState((previousState) => newState(previousState))
            else setState(newState)
        }
    }

    return [state, setStateIfMounted] as const
}
