import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import CartSummaryItem from './CartSummaryItem'

const CartSummaryView = styled('div')``

const CartSummary = ({ cart }) => {
  return (
    <CartSummaryView>
      {cart.map((item, index) => (
        <CartSummaryItem key={`${item.id}-${index}`} item={item} />
      ))}
    </CartSummaryView>
  )
}

CartSummary.displayName = 'CartSummary'
CartSummary.propTypes = {
  cart: propTypes.array,
}

export default CartSummary
