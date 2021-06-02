import { useCallback, useReducer } from 'react'

enum ActionType {
    Undo,
    Redo,
    Set,
    Clear,
}

type UndoAction = { type: ActionType.Undo }
type RedoAction = { type: ActionType.Redo }
type SetAction<T> = { type: ActionType.Set; newPresent: T }
type ClearAction<T> = { type: ActionType.Clear; initialPresent: T }
type Action<T> = UndoAction | RedoAction | SetAction<T> | ClearAction<T>

type State<T> = {
    past: T[]
    present: T
    future: T[]
}

const initialState = {
    past: [],
    present: null,
    future: [],
}

function reducer<T>(state: State<T>, action: Action<T>) {
    const { past, present, future } = state

    switch (action.type) {
        case ActionType.Undo: {
            return {
                past: past.slice(0, past.length - 1),
                present: past[past.length - 1],
                future: [present, ...future],
            }
        }

        case ActionType.Redo: {
            return {
                past: [...past, present],
                present: future[0],
                future: future.slice(1),
            }
        }

        case ActionType.Set: {
            const { newPresent } = action
            if (newPresent === present) return state

            return {
                past: [...past, present],
                present: newPresent,
                future: [],
            }
        }

        case ActionType.Clear: {
            const { initialPresent } = action

            return {
                ...initialState,
                present: initialPresent,
            }
        }
    }
}

export default function useHistory<T>(initialPresent: T) {
    const [state, dispatch] = useReducer(reducer, { ...initialState, present: initialPresent })

    const canUndo = state.past.length !== 0
    const canRedo = state.future.length !== 0

    const undo = useCallback(() => {
        if (canUndo) dispatch({ type: ActionType.Undo })
    }, [canUndo, dispatch])

    const redo = useCallback(() => {
        if (canRedo) dispatch({ type: ActionType.Redo })
    }, [canRedo, dispatch])

    const set = useCallback((newPresent: T) => dispatch({ type: ActionType.Set, newPresent }), [dispatch])

    const clear = useCallback(() => dispatch({ type: ActionType.Clear, initialPresent }), [dispatch, initialPresent])

    return { state: state.present, set, undo, redo, clear, canUndo, canRedo }
}
