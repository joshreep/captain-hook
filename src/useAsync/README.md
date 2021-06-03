# useAsync

It's generally a good practice to indicate to users the status of any async request. An example would be fetching data from an API and displaying a loading indicator before rendering the results. Another example would be a form where you want to disable the submit button when the submission is pending and then display either a success or error message when it completes.

Rather than litter your components with a bunch of `useState` calls to keep track of the state of an async function, you can use this custom hook which takes an async function as an input and returns the `value`, `error`, and `status` values we need to properly update our UI. This hook allows for both immediate execution upon component mount, as well as delayed execution using the returned `execute` function.

## Usage:

```tsx
import useAsync, { Status } from '@joshreep/captain-hooks/useAsync'
import { getImportantThingFromAPI } from '../api'

function App() {
    const { error, execute, status, value } = useAsync<ReturnType, ErrorType>(getImportantThingFromAPI, false)

    return (
        <div>
            {status === Status.Idle && <div>Start your journey by clicking a button</div>}
            {status === Status.Success && <div>{value}</div>}
            {status === Status.Error && <div>{error}</div>}
            <button onClick={execute} disabled={status === Status.Pending}>
                {status !== Status.Pending ? 'Click me' : 'Loading...'}
            </button>
        </div>
    )
}
```

### Signature:

```ts
export default function useAsync<T, E extends Error>(
    asyncFunction: () => Promise<T>,
    immediate = true
): { execute: () => void; error: E; status: Status; value: T }
```

## Props

| Prop          | Type            | Default Value | Required | Comments                                                                     |
| ------------- | --------------- | ------------- | -------- | ---------------------------------------------------------------------------- |
| asyncFunction | `() => Promise` |               | Yes      |                                                                              |
| immediate     | `boolean`       | `true`        | No       | If `true`, it will call the execute function as soon as the component mounts |

## Return Types

| Key     | Type                                                              | Comments                                                                                           |
| ------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| execute | `() => void`                                                      | a function to execute the the `asyncFunction` and set the appropriate statuses, values, and errors |
| error   | `Error`                                                           | The error that was thrown in the `asyncFunction`                                                   |
| status  | `Status.Success`, `Status.Error`, `Status.Pending`, `Status.Idle` | The status of the async                                                                            |
| value   | `T`                                                               | The Value returned by the `asyncFunction`                                                          |
