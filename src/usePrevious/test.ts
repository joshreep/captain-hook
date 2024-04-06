import { renderHook } from '@testing-library/react'
import usePrevious from '.'

test('should return the previous value', () => {
    const { result, rerender } = renderHook((props) => usePrevious(props), { initialProps: 'a' })
    expect(result.current).toBeUndefined()

    rerender('b')
    expect(result.current).toBe('a')

    rerender('c')
    expect(result.current).toBe('b')

    rerender('d')
    expect(result.current).toBe('c')

    rerender('e')
    expect(result.current).toBe('d')

    rerender('d')
    expect(result.current).toBe('e')

    rerender('c')
    expect(result.current).toBe('d')

    rerender('b')
    expect(result.current).toBe('c')

    rerender('a')
    expect(result.current).toBe('b')
})
