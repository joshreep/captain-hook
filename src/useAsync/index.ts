import { useCallback, useEffect } from 'react'
import useMountedState from '../useMountedState'

import { Status } from '../constants'

export default function useAsync<T, E extends Error>(asyncFunction: () => Promise<T>, immediate = false) {
    const [status, setStatus] = useMountedState<Status>(Status.Idle)
    const [value, setValue] = useMountedState<T | null>(null)
    const [error, setError] = useMountedState<E | null>(null)

    const execute = useCallback(() => {
        console.debug('executing async function')
        setStatus(Status.Pending)
        setValue(null)
        setError(null)

        asyncFunction()
            .then((response) => {
                setValue(response)
                setStatus(Status.Success)
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((error: any) => {
                setError(error)
                setStatus(Status.Error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [asyncFunction])

    useEffect(() => {
        if (immediate) execute()
    }, [execute, immediate])

    return { execute, error, status, value }
}

export { Status }
