import { act, renderHook } from '@testing-library/react-hooks/native'
import user from '@testing-library/user-event'
import useIdleTimer, { IdleTimerState, UseIdleTimerProps } from '.'

type SetupProps = Omit<UseIdleTimerProps, 'timeout'> & { timeout?: number }

function setup(props?: SetupProps & { timeout?: number }) {
    const utils = renderHook(() => useIdleTimer({ timeout: 25, ...props }))

    return { ...utils }
}

test('should return default state on mount', () => {
    const { result: result1 } = setup({ defaultState: IdleTimerState.Idle })
    expect(result1.current).toBe(IdleTimerState.Idle)

    const { result: result2 } = setup({ defaultState: IdleTimerState.Active })
    expect(result2.current).toBe(IdleTimerState.Active)
})

test('should do Idle things after timeout', async () => {
    const onIdleSpy = jest.fn()
    const { result, waitForValueToChange } = setup({ defaultState: IdleTimerState.Active, onIdle: onIdleSpy })
    expect(result.current).toBe(IdleTimerState.Active)
    expect(onIdleSpy).not.toHaveBeenCalled()

    await waitForValueToChange(() => result.current)
    expect(result.current).toBe(IdleTimerState.Idle)
    expect(onIdleSpy).toHaveBeenCalledTimes(1)
})

test('should do Active things after keypress', async () => {
    const onActiveSpy = jest.fn()
    const { result } = setup({ defaultState: IdleTimerState.Idle, onActive: onActiveSpy })
    expect(result.current).toBe(IdleTimerState.Idle)
    expect(onActiveSpy).not.toHaveBeenCalled()

    await act(async () => {
        await user.keyboard('{up}')
    })

    expect(result.current).toBe(IdleTimerState.Active)
    expect(onActiveSpy).toHaveBeenCalledTimes(1)
})
