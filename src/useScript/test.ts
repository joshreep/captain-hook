import { renderHook, screen, waitFor } from '@testing-library/react'
import path from 'path'
import { Status, useScript } from '../'
import { mockConsole } from '../testUtils'

const testScriptPath = `file://${path.resolve(__dirname, 'test_script.js')}`

declare global {
    // eslint-disable-next-line no-var
    var testScript: () => void
}

function setup(src = testScriptPath) {
    const testScriptSpy = jest.fn()
    window.testScript = testScriptSpy

    const utils = renderHook((props) => useScript(props), { initialProps: src })

    return { ...utils, testScriptSpy }
}

test("should insert a new script into the dom if one doesn't exist", async () => {
    expect(screen.queryByTestId(testScriptPath)).not.toBeInTheDocument()

    const { result, testScriptSpy } = setup()
    expect(result.current).toBe(Status.Pending)

    // wait for script to appear in document
    const scriptElement = await screen.findByTestId(testScriptPath)

    expect(scriptElement).toBeInstanceOf(HTMLScriptElement)
    expect(scriptElement).toBeInTheDocument()
    await waitFor(() => {
        expect(testScriptSpy).toHaveBeenCalledTimes(1)
        expect(result.current).toBe(Status.Success)
    })
})

test('should return Idle if no src is set', () => {
    const { result } = setup('')
    expect(result.current).toBe(Status.Idle)
})

test('should handle an error status', async () => {
    const { restoreConsole } = mockConsole('error')

    const { result } = setup('this should fail')
    await waitFor(() => {
        expect(result.current).toBe(Status.Error)
    })

    restoreConsole()
})
