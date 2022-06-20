import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box } from '..'

const CheckoutCardsView = styled(Box)`
  width: 100%;
  padding: 2rem 2rem;
  margin: 0 0 0.75rem;

  ul {
    display: block;
    margin: 0 auto;

    li {
      position: relative;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`

const CheckoutCards = ({ children }) => {
  return (
    <CheckoutCardsView>
      <ul>{children}</ul>
    </CheckoutCardsView>
  )
}

CheckoutCards.displayName = 'CheckoutCards'
CheckoutCards.propTypes = {
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CheckoutCards
