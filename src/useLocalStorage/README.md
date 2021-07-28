# useLocalStorage

This hook syncs state to local storage so that it persists through a page refresh. The API is similar to [`React.useState`](https://reactjs.org/docs/hooks-state.html) except we pass in a local storage key so that we can default to that value on page reload instead of the specified initial value

## Usage:

```tsx
import useLocalStorage from '@joshreep/captain-hooks/useLocalStorage'

function App() {
    const [name, setName] = useLocalStorage('name', 'bill')

    return (
        <div>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
        </div>
    )
}
```

### Signature:

```ts
export default function useLocalStorage<T>(key: string, initialValue: T): [T, React.SetStateAction<T>]
```

## Props

| Prop         | Type     | Default Value | Required | Comments                                                                    |
| ------------ | -------- | ------------- | -------- | --------------------------------------------------------------------------- |
| key          | `string` |               | Yes      | Name of key to use for localStorage                                         |
| initialValue | `any`    | `undefined`   | No       | Value to use if no value is returned from `localStorage` or an error occurs |
