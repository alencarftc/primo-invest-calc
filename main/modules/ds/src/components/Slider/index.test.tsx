import { describe, expect, fireEvent, it, jest, render, screen } from '@cgp-tests/utils'
import { Slider, type SliderProps } from './index'

describe('<Slider />', () => {
  it('should render correctly with initial props', () => {
    // arrange
    const props: SliderProps = {
      name: 'volume',
      label: 'Volume',
      defaultValue: 50,
      min: 0,
      max: 100,
    }
    render(<Slider {...props} />)

    // act
    const slider = screen.getByLabelText(props.label)
    const valueDisplay = screen.getByText(String(props.defaultValue))

    // assert
    expect(slider).toBeInTheDocument()
    expect(valueDisplay).toBeInTheDocument()
    expect(slider).toHaveAttribute('min', String(props.min))
    expect(slider).toHaveAttribute('max', String(props.max))
    expect(slider).toHaveValue(String(props.defaultValue))
  })

  it('should update value and call onChange when user interacts', () => {
    // arrange
    const handleChange = jest.fn()
    const props: SliderProps = {
      name: 'brightness',
      label: 'Brilho',
      min: 0,
      max: 100,
      onChange: handleChange,
    }
    render(<Slider {...props} />)
    const slider = screen.getByLabelText(props.label)

    // act
    fireEvent.change(slider, { target: { value: '75' } })

    // assert
    const valueDisplay = screen.getByText('75')
    expect(valueDisplay).toBeInTheDocument()
    expect(slider).toHaveValue('75')
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(75)
  })

  it('should format the displayed value using pipeLabelValue', () => {
    // arrange
    const props: SliderProps = {
      name: 'price',
      label: 'Preço',
      defaultValue: 1000,
      min: 0,
      max: 2000,
      pipeLabelValue: (value) => `R$ ${value.toFixed(2)}`,
    }
    render(<Slider {...props} />)
    const slider = screen.getByLabelText(props.label)

    // act
    fireEvent.change(slider, { target: { value: '1500' } })

    // assert
    const valueDisplay = screen.getByText('R$ 1500.00')
    expect(valueDisplay).toBeInTheDocument()
    expect(slider).toHaveValue('1500')
  })
})
