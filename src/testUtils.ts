export function mockConsole(method: jest.FunctionPropertyNames<Console>) {
    const consoleMock = jest.spyOn(console, method).mockImplementation(() => void 0)

    const restoreConsole = () => consoleMock.mockRestore()

    return { consoleMock, restoreConsole }
}
