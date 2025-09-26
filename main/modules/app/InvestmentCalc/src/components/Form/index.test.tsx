import { describe, expect, it, jest } from '@cgp-tests/utils'
import { fireEvent, render, screen } from '@testing-library/react'
import { Form, type FormProps } from '.'

describe('Form component', () => {
  const BASE_SLIDER_LABEL = /Quanto gostaria de investir/i
  const RECURRENT_SLIDER_LABEL = /Por mês, quanto investiria/i
  const PERIOD_SLIDER_LABEL = /Quanto tempo deixaria seu dinheiro investido/i

  it('should render', () => {
    // arrange
    const props: FormProps = {
      initialValues: { base: 100, recurrent: 100, period: 12 },
      onChange: jest.fn(),
    }

    // act
    render(<Form {...props} />)

    // assert
    expect(screen.getByRole('slider', { name: BASE_SLIDER_LABEL })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: RECURRENT_SLIDER_LABEL })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: PERIOD_SLIDER_LABEL })).toBeInTheDocument()
  })

  it('should submit successfully', async () => {
    // arrange
    const onChangeMock = jest.fn()
    const props: FormProps = {
      initialValues: { base: 100, recurrent: 100, period: 1 },
      onChange: onChangeMock,
    }
    render(<Form {...props} />)

    // act
    fireEvent.change(screen.getByRole('slider', { name: BASE_SLIDER_LABEL }), {
      target: { value: '200' },
    })
    fireEvent.change(screen.getByRole('slider', { name: RECURRENT_SLIDER_LABEL }), {
      target: { value: '200' },
    })
    fireEvent.change(screen.getByRole('slider', { name: PERIOD_SLIDER_LABEL }), {
      target: { value: '2' },
    })

    // assert
    expect(onChangeMock).toHaveBeenCalledTimes(3)
    expect(onChangeMock).toHaveBeenCalledWith({
      base: 200,
      recurrent: 200,
      period: 2,
    })
  })
})
