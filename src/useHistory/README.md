# useHistory

This hook makes it really easy to add undo/redo functionality to your app.

## Usage

```tsx
import { useCallback, useReducer } from 'react'
import useHistory from '@joshreep/captain-hooks/useHistory'

function App() {
    const { state, set, undo, redo, clear, canUndo, canRedo } = useHistory({})

    return (
        <div className="container">
            <div className="controls">
                <div className="title">👩‍🎨 Click squares to draw</div>
                <button onClick={undo} disabled={!canUndo}>Undo</button>
                <button onClick={redo} disabled={!canRedo}>Redo</button>
                <button onClick={clear}>Clear</button>
            </div>

            <div className="grid">
                {((blocks, i, length) => {
                    while (++i <= length>) {
                        const index = i
                        blocks.push(
                            <div
                                className={"block" + (state[index] ? ' active': '')}
                                onClick={() => set({...state, [index]: !state[index]})
                                key={i}
                            />
                        )
                    }

                    return blocks
                })([], 0, 625)}
            </div>
        </div>
    )
}
```

### Signature

```ts
export default function useHistory<T>(initialPresent: T): {
    state: T
    set: (newPresent: T) => void
    undo: () => void
    redo: () => void
    clear: () => void
    canUndo: boolean
    canRedo: boolean
}
```

## Props

| Prop           | Type  | Default Value | Required | Description                                              |
| -------------- | ----- | ------------- | -------- | -------------------------------------------------------- |
| initialPresent | `any` |               | No       | The initial state value to be used for the present state |

## Return Types

| Key     | Type                    | Comments                                                                                                 |
| ------- | ----------------------- | -------------------------------------------------------------------------------------------------------- |
| state   | `any`                   | The present state                                                                                        |
| set     | `(newState: T) => void` | A function to set the the new present state                                                              |
| undo    | `() => void`            | Moves the most recent past state to the present and the present state to the future                      |
| redo    | `() => void`            | Moves the most recent future state to the present and the present state to the past                      |
| clear   | `() => void`            | Clears the past and future states and resets the present state to the initial state passed into the hook |
| canUndo | `boolean`               | `true` when there are past states                                                                        |
| canRedo | `boolean`               | `true` when there are future states                                                                      |
