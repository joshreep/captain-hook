import { renderHook } from '@testing-library/react-hooks'
import { screen } from '@testing-library/dom'

import useScript from '.'

function setup() {
    const utils = renderHook(() => useScript('https://cdn.my-analytics.com/index.js'))

    return { ...utils }
}

test("should insert a new script into the dom if one doesn't exist", () => {
    expect(getScript()).toBeNull()

    setup()

    const script = getScript()
    expect(script).toBeInstanceOf(HTMLScriptElement)
    expect(script?.getAttribute('src')).toBe('https://cdn.my-analytics.com/index.js')
})

test('should add success status', () => {
    setup()

    screen.debug(getScript() ?? undefined)
})

function getScript() {
    return screen.queryByTestId('useScript-scriptElement')
}
