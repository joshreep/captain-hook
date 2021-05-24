import { useEffect, useRef } from 'react'

export type MemoCompareFunction<T> = (previousValue: T | undefined, nextValue: T) => boolean

export default function useMemoCompare<T>(next: T, compare: MemoCompareFunction<T>) {
    const previousRef = useRef<T>()

    const isEqual = compare(previousRef.current, next)

    useEffect(() => {
        if (!isEqual) {
            previousRef.current = next
        }
    })

    return isEqual ? previousRef.current : next
}
