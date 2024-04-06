# usePrevious

This hook takes in any value. When the value changes, it returns the previous value. This can be useful for when you need to check that a value transitions from one particular state to another.

## Usage:

```tsx
import usePrevious from '@joshreep/captain-hooks/usePrevious'

enum Status {
    Error = 'ERROR',
    Idle = 'IDLE',
    Loading = 'LOADING',
    Success = 'SUCCESS',
}

function useInitialLoading() {
    const status = useSomeAsyncProcess()
    const previousStatus = usePrevious<Status>(status)

    const isInitiallyLoading = previousStatus === undefined && status === Status.Loading
    const isReloading = previousStatus !== undefined && status === Status.Loading

    //... Do what you feel like with that information
}
```

### Signature:

```ts
export default function useIdleTimer<T>(value: T): T | undefined
```
