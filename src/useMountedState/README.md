# useMountedState

This hook is a drop in replacement for [`React.useState`](https://reactjs.org/docs/hooks-state.html). It composes the [`useIsMounted`](../useIsMounted/README.md) hook as well as React's [`useState`](https://reactjs.org/docs/hooks-state.html) hook to provide an familiar api for setting state without fear of getting the dreaded react error:

> Warning: Can't perform a React state update on an unmounted component.
> This is a no-op, but it indicates a memory leak in your application.
> To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount
> method.

This hook knows when the component has un-mounted and only sets state when it is still mounted.

The API for this hook is exactly the same as React's [`useState`](https://reactjs.org/docs/hooks-state.html) api. You can use this hook the exact same way you would use the normal [`useState`](https://reactjs.org/docs/hooks-state.html) hook.

## Usage

```tsx
import { useEffect } from 'react'
import useMountedState from '@joshreep/captain-hooks/useMountedState'
import someAsyncProcess from './someAsyncProcess'

function App() {
    const [state, setState] = useMountedState()

    useEffect(() => {
        async function doAsyncStuff() {
            const result = await someAsyncProcess()
            // will only call `React.setState` behind the scenes if the component is still mounted.
            setState(result)
        }
    }, [])

    return (
        <div className="container">
            <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
    )
}
```

### Signature

```ts
export default function useMountedState<T>(initialState: T): [T, React.SetStateAction<T>]
```
