import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const CheckoutCardView = styled('div')`
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`

const CheckoutCardIcon = styled('div')`
  display: block;
  width: 6rem;
  min-width: 6rem;
  height: auto;
`

const CheckoutCardName = styled('div')`
  flex-grow: 1;
  padding: 0 2rem;
  text-align: left;
  line-height: ${(props) => props.theme.lineHeight};
`

const CheckoutCardAction = styled('div')`
  button,
  span {
    display: block;
    width: 2rem;
    height: 2rem;
  }
`

const CheckoutCard = ({ icon, name, action, disabled = false }) => {
  return (
    <CheckoutCardView disabled={disabled}>
      {icon && <CheckoutCardIcon>{icon}</CheckoutCardIcon>}
      <CheckoutCardName>{name}</CheckoutCardName>
      {action && <CheckoutCardAction>{action}</CheckoutCardAction>}
    </CheckoutCardView>
  )
}

CheckoutCard.displayName = 'CheckoutCard'
CheckoutCard.propTypes = {
  icon: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  name: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  action: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  disabled: propTypes.bool,
}

export default CheckoutCard
