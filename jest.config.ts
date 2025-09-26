/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  automock: false,
  clearMocks: true,
  restoreMocks: true,
  testTimeout: 5000,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: [
    'main/**/*.{js,jsx,ts,tsx}',
    '!main/**/types/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/out/**',
    '!<rootDir>/.next/**',
    '!<rootDir>/coverage/**',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  injectGlobals: true,
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/tests/mocks/styleMock.mjs',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/tests/mocks/fileMock.mjs`,

    '^@cgp-tests(.*)$': ['<rootDir>/tests/$1'],
    '^@cgp-assets(.*)$': ['<rootDir>/main/assets/*'],
    '^@cgp-ds(.*)$': ['<rootDir>/main/modules/ds/*'],
    '^@cgp-core(.*)$': ['<rootDir>/main/modules/core/*'],
    '^@cgp(.*)$': ['<rootDir>/main/modules/app/*'],
  },
}

export default createJestConfig(config)
