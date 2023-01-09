import { renderHook } from '@testing-library/react-hooks'
import user from '@testing-library/user-event'
import useEventListener from '.'

type SetupProps = {
    condition?: boolean
}

function setup({ condition }: SetupProps = {}) {
    const handlerSpy = jest.fn()
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const utils = renderHook(() => useEventListener('click', handlerSpy, window, condition))

    function cleanup() {
        addEventListenerSpy.mockRestore()
        removeEventListenerSpy.mockRestore()
        handlerSpy.mockReset()
    }

    return { ...utils, handlerSpy, addEventListenerSpy, removeEventListenerSpy, cleanup }
}

test('should add new event listener', async () => {
    const { addEventListenerSpy, handlerSpy, cleanup } = setup()

    expect(addEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function))
    expect(handlerSpy).not.toHaveBeenCalled()

    await user.click(document.body)
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

test('should do nothing if condition is false', () => {
    const { addEventListenerSpy, removeEventListenerSpy, unmount, cleanup } = setup({ condition: false })

    expect(addEventListenerSpy).not.toHaveBeenCalledWith('click', expect.any(Function))

    unmount()
    expect(removeEventListenerSpy).not.toHaveBeenCalledWith('click', expect.any(Function))

    cleanup()
})
