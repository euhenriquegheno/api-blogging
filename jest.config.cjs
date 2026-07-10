/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/uses-cases/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      lines: 20,
      statements: 20,
      functions: 20,
      branches: 20,
    },
  },
}
