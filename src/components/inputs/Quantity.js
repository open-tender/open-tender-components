import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const QuantityView = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 9.2rem;
  min-height: 4rem;
  border-radius: 2rem;
  text-align: center;
  ${(props) =>
    props.bgColor
      ? `background-color: ${props.theme.bgColors[props.bgColor]};`
      : null}

  label {
    display: block;
  }

  button {
    transition: none;
    &:disabled {
      opacity: 0.25;
    }
  }
`

const QuantityInput = styled('input')`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  padding: 0;
  line-height: 1;
  text-align: center;
  color: ${(props) => props.theme.buttons.colors.primary.color};
  background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
  border-width: 0;
  border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};
  padding-top: ${(props) => props.theme.counts.quantity.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.quantity.paddingBottom};
  font-family: ${(props) => props.theme.counts.quantity.family};
  font-weight: ${(props) => props.theme.counts.quantity.weight};
  font-size: ${(props) => props.theme.counts.quantity.fontSize};
  -webkit-font-smoothing: ${(props) =>
    props.theme.counts.quantity.fontSmoothing};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.counts.quantity.fontSizeMobile};
  }

  &:active,
  &:focus,
  &:disabled,
  &:read-only {
    color: ${(props) => props.theme.buttons.colors.primary.color};
    background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
    border-color: ${(props) => props.theme.buttons.colors.primary.borderColor};
  }
`

const QuantityIncrement = styled('button')`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.8rem;
  color: ${(props) => props.theme.colors.secondary};
`

const Quantity = ({ id, name, quantity, update, iconMap = {} }) => {
  const adjust = (evt) => {
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    update(quantity)
  }

  const increment = (evt) => {
    evt.preventDefault()
    update(quantity + 1)
  }

  const decrement = (evt) => {
    evt.preventDefault()
    if (quantity > 0) update(quantity - 1)
  }

  return (
    <QuantityView bgColor="secondary">
      <QuantityIncrement
        type="button"
        style={{ marginLeft: '0.2rem' }}
        onClick={decrement}
        disabled={quantity === 0}
        aria-label={`Decrease ${name} quantity`}
      >
        {iconMap.minus || '-'}
      </QuantityIncrement>
      <label htmlFor={id}>
        <QuantityInput
          id={id}
          type="number"
          value={quantity}
          onChange={adjust}
          aria-label={`${name} quantity`}
        />
      </label>
      <QuantityIncrement
        type="button"
        style={{ marginRight: '0.2rem' }}
        onClick={increment}
        aria-label={`Increase ${name} quantity`}
      >
        {iconMap.plus || '+'}
      </QuantityIncrement>
    </QuantityView>
  )
}

Quantity.displayName = 'Quantity'
Quantity.propTypes = {
  id: propTypes.oneOfType([propTypes.string, propTypes.number]),
  name: propTypes.string,
  quantity: propTypes.number,
  update: propTypes.func,
  iconMap: propTypes.object,
}

export default Quantity
