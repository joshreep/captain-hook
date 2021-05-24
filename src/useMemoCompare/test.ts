import { renderHook } from '@testing-library/react-hooks'

import useMemoCompare, { MemoCompareFunction } from '.'

type SetupProps<T> = { next: T; compare: MemoCompareFunction<T> }

function setup<T>({ next, compare }: SetupProps<T>) {
    const utils = renderHook(({ value }) => useMemoCompare(value, compare), {
        initialProps: { value: next },
    })

    return { ...utils }
}

describe('useMemoCompare', () => {
    test('should return the same value if compare function returns true', () => {
        type ValueType = { propA: string; propB: string }
        const compare = (previous: ValueType | undefined, next: ValueType) => previous?.propA === next.propA

        const firstValue = { propA: 'foo', propB: 'bar' }
        const secondValue = { propA: 'foo', propB: 'baz' }
        const { result, rerender } = setup<ValueType>({ next: firstValue, compare })

        expect(result.current).toEqual(firstValue)

        rerender({ value: secondValue })

        expect(result.current).toEqual(firstValue)
        expect(result.current).not.toEqual(secondValue)
    })

    test('should return a new value if the compare function returns false', () => {
        type ValueType = { propA: string; propB: string }
        const compare = (previous: ValueType | undefined, next: ValueType) => previous?.propA === next.propA

        const firstValue = { propA: 'foo', propB: 'bar' }
        const secondValue = { propA: 'baz', propB: 'bar' }
        const { result, rerender } = setup<ValueType>({ next: firstValue, compare })

        expect(result.current).toEqual(firstValue)

        rerender({ value: secondValue })

        expect(result.current).not.toEqual(firstValue)
        expect(result.current).toEqual(secondValue)
    })
})
