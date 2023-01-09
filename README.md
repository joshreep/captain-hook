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

## Contributing:

This project uses `yarn` instead of `npm`.  It also uses typescript for static type checking. 

### Installing deps

After you clone the repo, run `yarn install` to install all dev and peer dependencies. Captain Hooks is a zero dependency module and we'd like to keep it that way! 😎

### Committing changes

When commiting any changes, please follow the conventional commit guidlines as it allows us to automate our changelog and versioning. Commitlint is also installed on this repo, so if you try to commit without adhearing to conventional commits, it will block the commit and flash a warning message. 

### Testing

Before commiting any changes, it's encouraged to lint your code and run tests. This will happen anyway in the CI workflow, but it is nicer to fail quickly and privately. Run `yarn lint` to lint, `yarn test` to run the test suites. If you are introducing any new functionality or changing any existing funtionality, please provide appropriate test coverage. 
