import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CartItemCountView = styled.div`
  position: absolute;
  z-index: 3;
  top: -1rem;
  right: -0.9rem;
  min-width: 2.2rem;
  height: 2.2rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-width: ${(props) => props.theme.counts.alerts.borderWidth};
  padding-top: ${(props) => props.theme.counts.alerts.paddingTop};
  padding-bottom: ${(props) => props.theme.counts.alerts.paddingBottom};
  color: ${(props) => props.theme.counts.alerts.color};
  background-color: ${(props) => props.theme.counts.alerts.bgColor};
  border-color: ${(props) => props.theme.counts.alerts.borderColor};

  span {
    display: block;
    line-height: 0;
    font-family: ${(props) => props.theme.counts.alerts.family};
    font-weight: ${(props) => props.theme.counts.alerts.weight};
    font-size: ${(props) => props.theme.counts.alerts.fontSizeMobile};
    -webkit-font-smoothing: ${(props) =>
      props.theme.counts.alerts.fontSmoothing};
  }
`

const CartItemCount = ({ count }) => {
  if (!count) return null
  return (
    <CartItemCountView>
      <span>{count}</span>
    </CartItemCountView>
  )
}

CartItemCount.displayName = 'CartItemCount'
CartItemCount.propTypes = {
  count: propTypes.number,
}

export default CartItemCount
