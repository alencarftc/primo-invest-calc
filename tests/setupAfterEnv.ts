import '@testing-library/jest-dom'

import 'cross-fetch/polyfill'

import { toHaveNoViolations } from 'jest-axe'

import { afterAll, afterEach, beforeAll } from '@jest/globals'
import { server } from './msw/server'

expect.extend(toHaveNoViolations)

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
