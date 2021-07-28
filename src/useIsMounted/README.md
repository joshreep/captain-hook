# useIsMounted

This hook comes in handy when you are trying to do some async stuff that saves state. If your component un-mounts before the async stuff completes, you will get the dreaded react error.

> Warning: Can't perform a React state update on an unmounted component.
> This is a no-op, but it indicates a memory leak in your application.
> To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount
> method.

This hook allows us to know when the component has un-mounted and only set state when it is still mounted.

## Usage

```tsx
import { useEffect, useState } from 'react'
import useIsMounted from '@joshreep/captain-hooks/useIsMounted'
import someAsyncProcess from './someAsyncProcess'

function App() {
    const [state, setState] = useState()
    const isMounted = useIsMounted()

    useEffect(() => {
        async function doAsyncStuff() {
            const result = await someAsyncProcess()
            // check that component is still mounted before setting state.
            if (isMounted.current) setState(result)
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
export default function useIsMounted(): React.MutableRefObject<boolean>
```
