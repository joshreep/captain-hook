[![CodeQL](https://github.com/joshreep/captain-hook/actions/workflows/codeql.yml/badge.svg)](https://github.com/joshreep/captain-hook/actions/workflows/codeql.yml)

# :pirate_flag: Captain Hooks :pirate_flag:

Captain Hooks is a collection of clever react hooks to help make everyday react development a bit more delightful. These hooks are ones that I have used in my own personal projects and thought I'd make them available to anyone else interested.

## Installation

If you're using `npm`:

```bash
npm i @joshreep/captain-hooks
```

If you're using `yarn`

```bash
yarn add @joshreep/captain-hooks
```

## The hooks:

-   [`useAsync`](./src/useAsync/README.md) - A hook for rendering dynamic UIs based on the status of an async request.
-   [`useEventListener`](./src/useEventListener/README.md) - A hook for adding event listeners and automatically cleaning them up.
-   [`useHistory`](./src/useHistory/README.md) - A hook for adding undo/redo functionality.
-   [`useIdleTimer`](./src/useIdleTimer/README.md) - A hook for adding idle functionality.
-   [`useIsMounted`](./src/useIsMounted/README.md) - A hook for determining if the component is mounted or not.
-   [`useLocalStorage`](./src/useLocalStorage/README.md) - A stateful hook that persists through page refresh.
-   [`useMemoCompare`](./src/useMemoCompare/README.md) - A hook to memoize a value using a compare function.
-   [`useMountedState`](./src/useMountedState/README.md) - An alternative to [`React.useState`](https://reactjs.org/docs/hooks-state.html) that only sets state if component is mounted.
-   [`useToggle`](./src/useToggle/README.md) - A hook for toggling a boolean state
