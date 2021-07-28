# useEventListener

This hook handles adding the event listener and removal on cleanup. This can help to prevent memory leaks by removing the event listener.

## Usage

```tsx
import { useCallback, useState } from 'react'
import useListener from '@joshreep/captain-hooks/useEventListener'

function App() {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

    const handler = useCallback(
        ({ clientX, clientY }: MouseEvent) => {
            setCoordinates({ x: clientX, y: clientY })
        },
        [setCoordinates]
    )

    useEventListener('mousemove', handler)

    return (
        <h1>The mouse position is ({coordinates.x}, {coordinates.y)</h1>
    )
}
```

### Signature

```ts
export default function useEventListener<T extends Element>(
    eventName: string,
    handler: EventListener,
    element: T | (Window & typeof globalThis) = window,
    condition: boolean = true
): void
```

## Props

| Prop      | Type                 | Default Value | Required | Description                                                                     |
| --------- | -------------------- | ------------- | -------- | ------------------------------------------------------------------------------- |
| eventName | `string`             |               | `true`   | Any valid event name                                                            |
| handler   | `(e: Event) => void` |               | `true`   | Event handler                                                                   |
| element   | `Element`, `window`  | `window`      | `false`  | Element to bind the event listener on                                           |
| condition | `boolean`            | `true`        | `false`  | If condition is false, then the event listener will not be bound to the element |
