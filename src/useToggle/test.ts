import { act, renderHook } from '@testing-library/react'

import useToggle from '.'

type SetupProps = {
    initialValue?: boolean
}

function setup({ initialValue }: SetupProps = {}) {
    const utils = renderHook(() => useToggle(initialValue))

    return utils
}

test('should return a boolean value', () => {
    const { result } = setup()
    expect(typeof result.current[0]).toBe('boolean')
})

test('should return a toggle function', () => {
    const { result } = setup()
    expect(typeof result.current[1]).toBe('function')
})

test('should use default value of false', () => {
    const { result } = setup()
    expect(result.current[0]).toBe(false)
})

test('should set initial value', () => {
    const { result } = setup({ initialValue: true })
    expect(result.current[0]).toBe(true)
})

test('should toggle', () => {
    const { result } = setup()
    expect(result.current[0]).toBe(false)

    act(() => {
        result.current[1]()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
        result.current[1]()
    })
    expect(result.current[0]).toBe(false)
})
