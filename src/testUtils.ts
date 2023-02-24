type Methods = 'debug' | 'error' | 'info' | 'log' | 'warn'

export function mockConsole(method: Methods) {
    const consoleMock = jest.spyOn(console, method).mockImplementation(() => void 0)

    const restoreConsole = () => consoleMock.mockRestore()

    return { consoleMock, restoreConsole }
}
