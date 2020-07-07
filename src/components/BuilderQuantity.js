import propTypes from 'prop-types'
import React from 'react'
import { Plus, Minus } from 'react-feather'

const BuilderQuantity = ({
  item,
  adjust,
  increment,
  decrement,
  incrementDisabled,
  decrementDisabled,
  classes = '',
}) => {
  const handleAdjust = (evt) => {
    const value = parseInt(evt.target.value)
    const quantity = isNaN(value) || value < 1 ? '' : value
    adjust(quantity)
  }

  const handleIncrement = (evt) => {
    evt.preventDefault()
    increment()
    evt.target.blur()
  }

  const handleDecrement = (evt) => {
    evt.preventDefault()
    decrement()
    evt.target.blur()
  }

  return item.quantity === 0 ? (
    <div className={`quantity quantity--zero ${classes}`}>
      <button
        className="quantity__increase__zero border-radio"
        onClick={handleIncrement}
        disabled={incrementDisabled || item.isSoldOut}
      >
        <Plus size={null} />
      </button>
    </div>
  ) : (
    <div className={`quantity ot-bg-color-secondary ${classes}`}>
      <button
        className="quantity__decrease"
        onClick={handleDecrement}
        disabled={decrementDisabled}
      >
        <Minus size={null} />
      </button>
      <label htmlFor={item.id} className={`label ${classes}`}>
        <input
          id={item.id}
          type="number"
          value={item.quantity}
          onChange={handleAdjust}
          aria-label={item.name}
          className="ot-input-quantity ot-font-size-small"
        />
      </label>
      <button
        className="quantity__increase"
        onClick={handleIncrement}
        disabled={incrementDisabled}
      >
        <Plus size={null} />
      </button>
    </div>
  )
}

BuilderQuantity.displayName = 'BuilderQuantity'
BuilderQuantity.propTypes = {
  name: propTypes.string,
  id: propTypes.oneOfType([propTypes.number, propTypes.string]),
  classes: propTypes.string,
  quantity: propTypes.oneOfType([propTypes.number, propTypes.string]),
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  size: propTypes.number,
  incrementDisabled: propTypes.bool,
}

export default BuilderQuantity
