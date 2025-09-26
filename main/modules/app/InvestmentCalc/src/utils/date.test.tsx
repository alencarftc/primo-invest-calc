import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { getBusinessDaysInMonths } from './date'

describe('getBusinessDaysInMonths', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return the correct number of business days for a 1-month period', () => {
    // arrange
    jest.setSystemTime(new Date('2025-06-02T12:00:00Z'))
    const months = 1
    const expectedBusinessDays = 23

    // act
    const result = getBusinessDaysInMonths(months)

    // assert
    expect(result).toBe(expectedBusinessDays)
  })

  it('should return the correct number of business days for a longer period (3 months)', () => {
    // arrange
    jest.setSystemTime(new Date('2025-06-02T12:00:00Z'))
    const months = 3
    const expectedBusinessDays = 67

    // act
    const result = getBusinessDaysInMonths(months)

    // assert
    expect(result).toBe(expectedBusinessDays)
  })

  it('should return 1 for a 0-month period when starting on a weekday', () => {
    // arrange
    jest.setSystemTime(new Date('2025-06-02T12:00:00Z'))
    const months = 0

    // act
    const result = getBusinessDaysInMonths(months)

    // assert
    expect(result).toBe(1)
  })

  it('should return 0 for a 0-month period when starting on a weekend', () => {
    // arrange
    jest.setSystemTime(new Date('2025-06-01T12:00:00Z'))
    const months = 0

    // act
    const result = getBusinessDaysInMonths(months)

    // assert
    expect(result).toBe(0)
  })
})
