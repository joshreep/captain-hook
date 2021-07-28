# useMemoCompare

This hook is similar to [`React.useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo), but instead of passing an array of dependencies, we pass a custom compare function that receives the previous and new value. The compare function can then compare nested properties, call object methods, or anything else to determine equality. If the compare function returns true then the hook returns the old object reference.

## Usage

```tsx
import { useEffect, useState } from 'react'
import useMemoCompare from '@joshreep/captain-hooks/useMemoCompare'

function MyComponent({ obj }) {
    const [state, setState] = useState()

    const objFinal = useMemoCompare(obj, (prev, next) => prev && prev.id === next.id)

    // Here we want to fire off an effect if `objFinal` changes.
    // if we had used `obj` directly without the above hook and `obj` was technically a
    // new object on ever render, then the effect would fire on every render.
    // Worse yet, if our effect triggered a state change, it could cause an endless loop
    // where effect runs -> state change causes re-render -> effect runs -> etc...
    useEffect(() => {
        return objFinal.someMethod().then((value) => setState(value))
    }, [objFinal])

    return <div>...</div>
}
```

### Signature

```ts
export default function useMemoCompare<T>(next: T, compare: (previousValue: T | undefined, nextValue: T) => boolean): T
```

## Props

| Prop    | Type                                                       | Default Value | Required | Comments                                                       |
| ------- | ---------------------------------------------------------- | ------------- | -------- | -------------------------------------------------------------- |
| next    | any                                                        |               | Yes      | The value that we want to memoize                              |
| compare | `(previousValue: T \| undefined, nextValue: T) => boolean` |               | Yes      | A function that takes in two values and evaluates for equality |
