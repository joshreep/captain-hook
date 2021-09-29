import { MutableRefObject, useRef, useState } from 'react'
import useEventListener from '../useEventListener'

export default function useHover<T extends HTMLElement>(userRef?: MutableRefObject<T>) {
    const ref = useRef(userRef?.current)
    const [value, setValue] = useState(false)

    const handleMouseOver = () => setValue(true)
    const handleMouseOut = () => setValue(false)

    useEventListener('mouseover', handleMouseOver, ref.current)
    useEventListener('mouseout', handleMouseOut, ref.current)

    return [value, ref] as const
}
