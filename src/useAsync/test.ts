import { act, renderHook } from '@testing-library/react-hooks'
import useAsync from '.'
import { Status } from '../constants'

type SetupProps<T> = {
    asyncFunction: () => Promise<T>
    immediate?: boolean
}

type SetupSuccessProps<T> = Pick<SetupProps<T>, 'immediate'> & { timeout?: number }
type SetupFailureProps<T> = Pick<SetupProps<T>, 'immediate'> & { timeout?: number }

function setup<T>({ asyncFunction, immediate = false }: SetupProps<T>) {
    const utils = renderHook(() => useAsync(asyncFunction, immediate))

    return { ...utils }
}

function setupSuccess<T>({ immediate, timeout = 0 }: SetupSuccessProps<T> = {}) {
    const asyncFunction = jest.fn(
        () =>
            new Promise<'foo'>((resolve) => {
                setTimeout(() => {
                    resolve('foo')
                }, timeout)
            })
    )
    const utils = setup({ asyncFunction, immediate })

    return { asyncFunction, ...utils }
}

function setupFailure<T>({ immediate, timeout = 0 }: SetupFailureProps<T> = {}) {
    const asyncFunction = jest.fn(
        () =>
            new Promise((_resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('bummer...'))
                }, timeout)
            })
    )
    const utils = setup({ asyncFunction, immediate })

    return { asyncFunction, ...utils }
}

test('should call execute on mount if immediate is true', () => {
    const { asyncFunction } = setupSuccess()

    expect(asyncFunction).not.toHaveBeenCalled()
})

test('should not call execute on mount if immediate is false', async () => {
    await act(async () => {
        const { asyncFunction, waitFor } = setupSuccess({ immediate: true })

        await waitFor(() => expect(asyncFunction).toHaveBeenCalledTimes(1))
    })
})

test('should return values for Status.Idle', () => {
    const { result } = setupSuccess()

    expect(result.current.execute).toBeInstanceOf(Function)
    expect(result.current.error).toBeNull()
    expect(result.current.status).toBe(Status.Idle)
    expect(result.current.value).toBeNull()
})

test('should return values for Status.Pending', async () => {
    const { result, waitFor } = setupSuccess({ timeout: 10 })

    act(() => {
        result.current.execute()
    })
    await waitFor(() => result.current.status === Status.Pending)

    expect(result.current.status).toBe(Status.Pending)
    expect(result.current.value).toBeNull()
    expect(result.current.error).toBeNull()
})

test('should return values for Status.Success', async () => {
    const { result, waitFor } = setupSuccess({ timeout: 10 })

    act(() => {
        result.current.execute()
    })
    await waitFor(() => result.current.status === Status.Success)

    expect(result.current.status).toBe(Status.Success)
    expect(result.current.value).toBe('foo')
    expect(result.current.error).toBeNull()
})

test('should return values for Status.Error', async () => {
    const { result, waitFor } = setupFailure({ timeout: 10 })

    act(() => {
        result.current.execute()
    })
    await waitFor(() => result.current.status === Status.Error)

    expect(result.current.status).toBe(Status.Error)
    expect(result.current.value).toBeNull()
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('bummer...')
})
