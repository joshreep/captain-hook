import { act, renderHook } from '@testing-library/react-hooks'

import useLocalStorage from '.'

function setup() {
    const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem')
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem')

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
        result.current[1]({ ying: 'yang' })
    })

    expect(setItemSpy).toHaveBeenCalledWith('someKey', JSON.stringify({ ying: 'yang' }))
    expect(result.current[0]).toMatchObject({ ying: 'yang' })
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
