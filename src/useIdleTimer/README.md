# useIdleTimer

This hook makes it easy to add idle functionality to your components

## Usage

```tsx
import { useState } from 'react'
import useIdleTimer from '@joshreep/captain-hooks/useIdleTimer'

function App() {
    const [isOpen, setIsOpen] = useState(false)

    useIdleTimer({
        timeout: 2000, // in ms
        onIdle: () => setIsOpen(false),
        onActive: () => setIsOpen(true),
        events: ['keydown', 'keyup'],
        activeOnMount: true,
    })

    return (
        <div className="container">
            <div className="text">press any key to open the modal</div>
            <Modal isOpen={isOpen} text="Hello World" />
        </div>
    )
}
```

### Signature

```ts
export enum IdleTimerState {
    Idle = 'IDLE',
    Active = 'ACTIVE',
}

export type UseIdleTimerProps = {
    defaultState?: IdleTimerState
    element?: Element | Window
    events?: (keyof WindowEventMap | keyof ElementEventMap)[]
    onActive?: () => void
    onIdle?: () => void
    timeout: number
}

export default function useIdleTimer(props: UseIdleTimerProps): IdleTimerState
```
