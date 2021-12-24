import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import CartSummaryItem from './CartSummaryItem'

const CartSummaryView = styled('div')`
  position: relative;
  z-index: 2;
`

const CartSummary = ({ cart, pointsObj }) => {
  return (
    <CartSummaryView>
      {cart.map((item, index) => (
        <CartSummaryItem
          key={`${item.id}-${index}`}
          item={item}
          pointsObj={pointsObj}
        />
      ))}
    </CartSummaryView>
  )
}

CartSummary.displayName = 'CartSummary'
CartSummary.propTypes = {
  cart: propTypes.array,
  pointsObj: propTypes.object,
}

export default CartSummary
