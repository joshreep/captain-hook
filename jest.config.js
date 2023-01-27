module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverage: true,
    collectCoverageFrom: ['./src/**'],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 95,
            lines: 95,
            statements: 95,
        },
    },
}
