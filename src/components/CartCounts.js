import React from 'react'
import propTypes from 'prop-types'

const CartCounts = ({ cart, errors }) => {
  const errorIndices = Object.keys(errors).map((i) => parseInt(i))
  const withErrors = cart
    .map((i, index) => {
      return errorIndices.includes(index)
        ? { ...i, error: errors[index.toString()] }
        : i
    })
    .filter((i) => i.error)

  return (
    <div className="validate">
      <div className="validate__invalid">
        <p className="ot-font-size-small">
          The quantities of the items below need to be adjusted before you can
          submit your order.
        </p>
        <ul>
          {withErrors.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <span className="validate__invalid__item ot-bold">
                {item.name}
              </span>
              <span className="ot-font-size-small">{item.error}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

CartCounts.displayName = 'CartCounts'
CartCounts.propTypes = {
  cart: propTypes.array,
  errors: propTypes.object,
}

export default CartCounts
