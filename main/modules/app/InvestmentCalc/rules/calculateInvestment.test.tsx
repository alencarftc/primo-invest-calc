import { describe, expect, it } from '@jest/globals'
import type { InvestmentForm } from '../models/setup'
import { calculateResult } from './calculateInvestment'

describe('calculateResult', () => {
  it('should calculate the final amount correctly for a standard scenario', () => {
    // arrange
    const form: InvestmentForm = { base: 1000, recurrent: 100, periodInMonths: 12 }
    const values = { selic: 9.25, arca: 18.0 }

    const expectedSelic = 2347.92
    const expectedArca = 2486.77

    // act
    const result = calculateResult(form, values)

    // assert
    expect(result.periodInMonths).toBe(form.periodInMonths)
    expect(result.selic).toBeCloseTo(expectedSelic, 2)
    expect(result.arca).toBeCloseTo(expectedArca, 2)
  })

  it('should only calculate the base value if recurrent investment is zero', () => {
    // arrange
    const form: InvestmentForm = { base: 1000, recurrent: 0, periodInMonths: 24 }
    const values = { selic: 10, arca: 20 }

    const expectedSelic = 1218.27
    const expectedArca = 1458.88

    // act
    const result = calculateResult(form, values)

    // assert
    expect(result.selic).toBeCloseTo(expectedSelic, 2)
    expect(result.arca).toBeCloseTo(expectedArca, 2)
  })

  it('should only calculate recurrent values if base investment is zero', () => {
    // arrange
    const form: InvestmentForm = { base: 0, recurrent: 100, periodInMonths: 12 }
    const values = { selic: 9.25, arca: 18.0 }

    const expectedSelic = 1251.96
    const expectedArca = 1299.77

    // act
    const result = calculateResult(form, values)

    // assert
    expect(result.selic).toBeCloseTo(expectedSelic, 2)
    expect(result.arca).toBeCloseTo(expectedArca, 2)
  })

  it('should return only the base value if the period is zero', () => {
    // arrange
    const form: InvestmentForm = { base: 500, recurrent: 100, periodInMonths: 0 }
    const values = { selic: 9.25, arca: 18.0 }

    // act
    const result = calculateResult(form, values)

    // assert
    expect(result.selic).toBe(form.base)
    expect(result.arca).toBe(form.base)
  })

  it('should return the sum of contributions if the interest rate is zero', () => {
    // arrange
    const form: InvestmentForm = { base: 100, recurrent: 50, periodInMonths: 10 }
    const values = { selic: 0, arca: 0 }
    const totalInvested = form.base + form.recurrent * form.periodInMonths

    // act
    const result = calculateResult(form, values)

    // assert
    expect(result.selic).toBe(totalInvested)
    expect(result.arca).toBe(totalInvested)
  })
})
