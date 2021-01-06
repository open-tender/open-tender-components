import React from 'react'
import propTypes from 'prop-types'
import { InvalidView, InvalidItemsView } from './CartErrors'

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
    <InvalidView>
      <InvalidItemsView>
        <p>
          The quantities of the items below need to be adjusted before you can
          submit your order.
        </p>
        <ul>
          {withErrors.map((item, index) => (
            <li key={`${item.id}-${index}`}>
              <span>{item.name}</span>
              <span>{item.error}</span>
            </li>
          ))}
        </ul>
      </InvalidItemsView>
    </InvalidView>
  )
}

CartCounts.displayName = 'CartCounts'
CartCounts.propTypes = {
  cart: propTypes.array,
  errors: propTypes.object,
}

export default CartCounts
