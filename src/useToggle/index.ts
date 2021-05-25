import { useState, useCallback } from 'react'

export default function useToggle(initialState = false) {
    const [state, setState] = useState<boolean>(initialState)

    const toggle = useCallback(() => setState((state) => !state), [])

    return [state, toggle] as const
}
