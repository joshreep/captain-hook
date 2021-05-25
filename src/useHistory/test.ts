import { act, renderHook } from '@testing-library/react-hooks'
import useHistory from '.'

function setup() {
    const utils = renderHook(() => useHistory('item0'))

    return { ...utils }
}

function setupAndPopulatePast() {
    const utils = setup()

    act(() => {
        utils.result.current.set('item1')
        utils.result.current.set('item2')
        utils.result.current.set('item3')
    })

    return { ...utils }
}

function setupAndPopulateFuture() {
    const utils = setupAndPopulatePast()

    act(() => {
        utils.result.current.undo()
        utils.result.current.undo()
        utils.result.current.undo()
    })

    return { ...utils }
}

test('should undo if there is a past', () => {
    const { result } = setupAndPopulatePast()

    expect(result.current.canUndo).toBe(true)

    act(() => {
        result.current.undo()
    })

    expect(result.current.state).toBe('item2')
})

test('should not undo if there is not a past', () => {
    const { result } = setup()

    expect(result.current.canUndo).toBe(false)

    act(() => {
        result.current.undo()
    })

    expect(result.current.state).toBe('item0')
})

test('should redo if there is a future', () => {
    const { result } = setupAndPopulateFuture()

    expect(result.current.canRedo).toBe(true)

    act(() => {
        result.current.redo()
    })

    expect(result.current.state).toBe('item1')
})

test('should not redo if there is not a future', () => {
    const { result } = setup()

    expect(result.current.canRedo).toBe(false)

    act(() => {
        result.current.redo()
    })

    expect(result.current.state).toBe('item0')
})

test('should set the new present', () => {
    const { result } = setup()

    act(() => {
        result.current.set('item1')
    })

    expect(result.current.state).toBe('item1')
    expect(result.current.canUndo).toBe(true)
    expect(result.current.canRedo).toBe(false)
})

test('should not change state if new present is same as old', () => {
    const { result } = setup()

    act(() => {
        result.current.set('item0')
    })

    expect(result.current.state).toBe('item0')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
})

test('should clear the history', () => {
    const { result } = setupAndPopulatePast()

    act(() => {
        result.current.clear()
    })

    expect(result.current.state).toBe('item0')
    expect(result.current.canUndo).toBe(false)
    expect(result.current.canRedo).toBe(false)
})
