# useScript

This hook makes it easy to dynamically load an external script and know when its loaded. This is particularly useful when you need to interact with 3rd party libraries like Google Analytics, and you'd prefer to load the script when needed rather than include it in the document head for every page request.

## Usage

```tsx
import useScript, { Status } from '@joshreep/captain-hooks/useScript'
function App() {
    const status = useScript('https://cdn.third-parties-r-us.com/analytics.js')
    return (
        <>
            <p>Script Status: <strong>{status}</strong><p>
            {status === Status.Success && (
                <p>Script function call response: <strong>{THIRD_PARTY_ANALYTICS.start()}</strong></p>
            )}
        </>
    )
}
```

### Signature

```ts
export default function useScript(src: string): Status
```

## Return Type

`useScript` returns an enum `Status`. For convenience, we export the Status enum for comparison.

```ts
enum Status {
    Idle = 'IDLE',
    Pending = 'PENDING',
    Success = 'SUCCESS',
    Error = 'ERROR',
}
```
