import { act, renderHook } from '@testing-library/react'

import { useLocalStorage } from '../'

const jsonParseError = new Error('The value could not be parsed.')
const jsonStringifyError = new Error('The value could not be stringified')

function setup({ shouldGetItemThrow = false, shouldSetItemThrow = false } = {}) {
    const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')

    if (shouldGetItemThrow) {
        jest.spyOn(JSON, 'parse').mockImplementationOnce(() => {
            throw jsonParseError
        })
    }
    if (shouldSetItemThrow) {
        jest.spyOn(JSON, 'stringify').mockImplementationOnce(() => {
            throw jsonStringifyError
        })
    }

    const utils = renderHook(() => useLocalStorage<{ [key: string]: string }>('someKey', { bar: 'baz' }))

    return { getItemSpy, setItemSpy, ...utils }
}

afterEach(() => {
    localStorage.clear()
})

test('should get value from localStorage if it exists', () => {
    localStorage.setItem('someKey', JSON.stringify({ foo: 'bar' }))
    const { result, getItemSpy } = setup()

    expect(getItemSpy).toHaveBeenCalledWith('someKey')
    expect(result.current[0]).toMatchObject({ foo: 'bar' })
})

test("should return initialValue if value doesn't exist in localStorage", () => {
    const { result } = setup()

    expect(result.current[0]).toMatchObject({ bar: 'baz' })
})

test('should set value to localStorage', () => {
    const { result, setItemSpy } = setup()

    act(() => {
        result.current[1]({ yin: 'yang' })
    })

    expect(setItemSpy).toHaveBeenCalledWith('someKey', JSON.stringify({ yin: 'yang' }))
    expect(result.current[0]).toMatchObject({ yin: 'yang' })
})

test('should handle setState function', () => {
    localStorage.setItem('someKey', JSON.stringify({ foo: 'bar' }))
    const { result, setItemSpy } = setup()

    act(() => {
        result.current[1]((prev) => ({ ...prev, size: Object.keys(prev).length.toString() }))
    })

    expect(setItemSpy).toHaveBeenCalledWith('someKey', JSON.stringify({ foo: 'bar', size: '1' }))
    expect(result.current[0]).toMatchObject({ foo: 'bar', size: '1' })
})

test('should handle error in getItem', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0)
    localStorage.setItem('someKey', JSON.stringify({ bar: 'baz' }))
    setup({ shouldGetItemThrow: true })

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith(jsonParseError)

    consoleErrorSpy.mockRestore()
})

test('should handle error in setItem', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => void 0)
    const { result } = setup({ shouldSetItemThrow: true })

    act(() => {
        result.current[1]({ baz: 'foo' })
    })

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith(jsonStringifyError)

    consoleErrorSpy.mockRestore()
})
