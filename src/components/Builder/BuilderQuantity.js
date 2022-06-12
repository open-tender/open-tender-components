import React, { useRef } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const BuilderQuantityView = styled('div')`
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

const BuilderQuantityAdd = styled('button')`
  display: block;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0.4rem;
  border-radius: 1.2rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  text-align: center;
  font-weight: bold;
  line-height: 0;
  color: ${(props) => props.theme.colors.secondary};
`

const BuilderQuantityInput = styled('input')`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  padding: 0;
  line-height: 1;
  text-align: center;
  color: ${(props) => props.theme.buttons.colors.primary.color};
  background-color: ${(props) => props.theme.buttons.colors.primary.bgColor};
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

const BuilderQuantityIncrement = styled('button')`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0.8rem;
  color: ${(props) => props.theme.colors.secondary};
`

const BuilderQuantity = ({
  item,
  adjust,
  increment,
  decrement,
  incrementDisabled,
  decrementDisabled,
  iconMap = {},
  showAdd = true,
}) => {
  const incrementRef = useRef(null)
  const decrementRef = useRef(null)

  const handleAdd = (evt) => {
    evt.preventDefault()
    increment()
    // const inc = incrementRef.current
    // const dec = decrementRef.current
    // inc && !inc.disabled ? inc.focus() : dec && dec.focus
  }

  const handleAdjust = (evt) => {
    if (item.increment > 1 || item.min > 1 || item.max || !adjust) return
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    adjust(quantity)
  }

  const handleIncrement = (evt) => {
    evt.preventDefault()
    increment()
  }

  const handleDecrement = (evt) => {
    evt.preventDefault()
    decrement()
  }

  return showAdd && item.quantity === 0 ? (
    <BuilderQuantityView>
      <BuilderQuantityAdd
        onClick={handleAdd}
        disabled={incrementDisabled || item.isSoldOut}
        aria-label="Increase quantity"
      >
        {iconMap.plus || '+'}
      </BuilderQuantityAdd>
    </BuilderQuantityView>
  ) : (
    <BuilderQuantityView bgColor="secondary">
      <BuilderQuantityIncrement
        ref={decrementRef}
        style={{ marginLeft: '0.2rem' }}
        onClick={handleDecrement}
        disabled={decrementDisabled}
        aria-label="Decrease quantity"
      >
        {iconMap.minus || '-'}
      </BuilderQuantityIncrement>
      <label htmlFor={item.id}>
        <BuilderQuantityInput
          id={item.id}
          type="number"
          value={item.quantity}
          onChange={handleAdjust}
          aria-label={item.name}
        />
      </label>
      <BuilderQuantityIncrement
        ref={incrementRef}
        style={{ marginRight: '0.2rem' }}
        onClick={handleIncrement}
        disabled={incrementDisabled}
        aria-label="Increase quantity"
      >
        {iconMap.plus || '+'}
      </BuilderQuantityIncrement>
    </BuilderQuantityView>
  )
}

BuilderQuantity.displayName = 'BuilderQuantity'
BuilderQuantity.propTypes = {
  item: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  incrementDisabled: propTypes.bool,
  decrementDisabled: propTypes.bool,
  iconMap: propTypes.object,
  showAdd: propTypes.bool,
}

export default BuilderQuantity
