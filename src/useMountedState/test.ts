import { act, renderHook } from '@testing-library/react'
import useMountedState from '.'

function setup<T>(initialState: T) {
    const utils = renderHook(() => useMountedState<T>(initialState))

    return { ...utils }
}

test('should set initialState', () => {
    const { result } = setup('foo')
    expect(result.current[0]).toBe('foo')
})

test('should setState if component is mounted', () => {
    const { result } = setup('foo')

    act(() => {
        result.current[1]('bar')
    })

    expect(result.current[0]).toBe('bar')
})

test('should not setState if component is not mounted', () => {
    const { result, unmount } = setup('foo')

    unmount()
    act(() => {
        result.current[1]('bar')
    })

    expect(result.current[0]).toBe('foo')
})

test('should be able to pass in a dispatch function', () => {
    const { result } = setup('foo')

    act(() => {
        result.current[1]((previous) => previous + 'bar')
    })

    expect(result.current[0]).toBe('foobar')
})
