import { act, renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/dom'

import useKeyPress from '.'

function setup<T extends HTMLElement>(element?: T) {
    const utils = renderHook(() => useKeyPress('a', element))

    const addEventListenerSpy = spyOn(window, 'addEventListener').and.callThrough()
    const removeEventListenerSpy = spyOn(window, 'removeEventListener').and.callThrough()

    return { ...utils, addEventListenerSpy, removeEventListenerSpy }
}

function setupWithElement() {
    const input = document.createElement('input')
    document.body.appendChild(input)

    const addEventListenerSpy = spyOn(input, 'addEventListener').and.callThrough()
    const removeEventListenerSpy = spyOn(input, 'removeEventListener').and.callThrough()

    const utils = setup(input)

    function cleanUp() {
        document.body.removeChild(input)
    }

    return { ...utils, cleanUp, input, addEventListenerSpy, removeEventListenerSpy }
}

afterEach(() => {
    jest.restoreAllMocks()
})

test('should add event listeners to the passed in element', () => {
    const { cleanUp, addEventListenerSpy } = setupWithElement()
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function))

    cleanUp()
})

test('should remove event listeners from the passed in element', () => {
    const { cleanUp, unmount, removeEventListenerSpy } = setupWithElement()

    expect(removeEventListenerSpy).not.toHaveBeenCalled()

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function))

    cleanUp()
})

test('should add event listeners to the window if no passed in element', () => {
    const { addEventListenerSpy } = setup()

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function))
})

test.todo('should remove event listeners from the window if no passed in element')

test('should return true when the key is pressed', () => {
    const { result } = setup()

    expect(result.current).toBe(false)

    act(() => {
        fireEvent.keyDown(window, { key: 'a' })
    })

    expect(result.current).toBe(true)
})

test('should return false when the key is no longer pressed', () => {
    const { result } = setup()
    expect(result.current).toBe(false)

    act(() => {
        fireEvent.keyDown(window, { key: 'a' })
    })
    expect(result.current).toBe(true)

    act(() => {
        fireEvent.keyUp(window, { key: 'a' })
    })
    expect(result.current).toBe(false)
})

test('should return false when other key is pressed', () => {
    const { result } = setup()
    expect(result.current).toBe(false)

    act(() => {
        fireEvent.keyDown(window, { key: 'b' })
    })
    expect(result.current).toBe(false)

    act(() => {
        fireEvent.keyUp(window, { key: 'b' })
    })
    expect(result.current).toBe(false)
})
