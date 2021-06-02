import { renderHook } from '@testing-library/react-hooks'
import fireEvent from '@testing-library/user-event'
import useEventListener from '.'

function setup() {
    const handlerSpy = jest.fn()
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const utils = renderHook(() => useEventListener('click', handlerSpy, window))

    function cleanup() {
        addEventListenerSpy.mockRestore()
        removeEventListenerSpy.mockRestore()
        handlerSpy.mockReset()
    }

    return { ...utils, handlerSpy, addEventListenerSpy, removeEventListenerSpy, cleanup }
}

test('should add new event listener', () => {
    const { addEventListenerSpy, handlerSpy, cleanup } = setup()

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
    expect(handlerSpy).not.toHaveBeenCalled()

    fireEvent.click(document.body)
    expect(handlerSpy).toHaveBeenCalledTimes(1)

    cleanup()
})

test('should remove eventListener ', () => {
    const { removeEventListenerSpy, unmount, cleanup } = setup()

    expect(removeEventListenerSpy).not.toHaveBeenCalledWith('click', expect.any(Function))

    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))

    cleanup()
})
