# useToggle

This hook makes it easy to dynamically load an external script and know when its loaded. This is particularly useful when you need to interact with 3rd party libraries like Google Analytics, and you'd prefer to load the script when needed rather than include it in the document head for every page request.

## Usage

```tsx
import useToggle from '@joshreep/captain-hooks/useToggle'

function App() {
    const [isTextChanged, toggleIsTextChanged] = useToggle()

    return <button onClick={toggleIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
}
```

### Signature

```ts
export default function useToggle(initialState: boolean): [boolean, () => void]
```

## Props

| Prop         | Type      | Default Value | Required | Description                                                    |
| ------------ | --------- | ------------- | -------- | -------------------------------------------------------------- |
| initialState | `boolean` | `false`       | No       | This will be the initial state value when the hook is rendered |
