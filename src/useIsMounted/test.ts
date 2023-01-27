import { renderHook } from '@testing-library/react'
import { useIsMounted } from '../'

function setup() {
    const utils = renderHook(() => useIsMounted())

    return { ...utils }
}

test('should return  once component has mounted', () => {
    const { result } = setup()

    expect(result.current.current).toBe(true)
})

test('should return false once the component has un-mounted', () => {
    const { result, unmount } = setup()

    unmount()
    expect(result.current.current).toBe(false)
})
