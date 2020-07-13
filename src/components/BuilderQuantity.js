import propTypes from 'prop-types'
import React from 'react'

const BuilderQuantity = ({
  item,
  adjust,
  increment,
  decrement,
  incrementDisabled,
  decrementDisabled,
  classes = '',
  iconMap = {},
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
        className="quantity__increase__zero ot-border-color"
        onClick={handleIncrement}
        disabled={incrementDisabled || item.isSoldOut}
      >
        {iconMap.plus || '+'}
      </button>
    </div>
  ) : (
    <div className={`quantity ot-bg-color-secondary ${classes}`}>
      <button
        className="quantity__decrease"
        onClick={handleDecrement}
        disabled={decrementDisabled}
      >
        {iconMap.minus || '-'}
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
        {iconMap.plus || '+'}
      </button>
    </div>
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
  classes: propTypes.string,
  iconMap: propTypes.object,
}

export default BuilderQuantity
