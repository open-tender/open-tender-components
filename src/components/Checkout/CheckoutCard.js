import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { FormContext } from '../Checkout/CheckoutForm'
import { FormApplied } from '../inputs'

const CheckoutCardView = styled('button')`
  z-index: 1;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-radius: ${(props) => props.theme.border.radius};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  box-shadow: none;

  &:hover:enabled,
  &:active:enabled,
  &:focus:enabled {
    // box-shadow: ${(props) => props.theme.boxShadow.inset};
    // color: ${(props) => props.theme.links.primary.color};
    background-color: ${(props) =>
      props.theme.buttons.colors.secondary.bgColor};

    // span.checkout-card-apply {
    //   transition: ${(props) => props.theme.links.transition};
    //   color: ${(props) => props.theme.links.primary.color};
    // }
  }
`

const CheckoutCardIcon = styled('span')`
  display: block;
  width: 6rem;
  min-width: 6rem;
  height: auto;
  line-height: 0;
`

const CheckoutCardName = styled('span')`
  display: block;
  flex-grow: 1;
  padding: 0 2rem;
  text-align: left;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CheckoutCardButtonView = styled('span')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const CheckoutCarButtonIcon = styled('span')`
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 0.5rem 0 0;
  line-height: 0;
`

const CheckoutCardButtonText = styled('span')`
  display: block;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CheckoutCardButton = ({ iconMap, isApplied }) => {
  const icon = isApplied ? iconMap.remove : iconMap.add
  return (
    <CheckoutCardButtonView
      className={isApplied ? null : 'checkout-card-apply'}
    >
      {isApplied ? (
        <FormApplied />
      ) : (
        <>
          <CheckoutCarButtonIcon>{icon}</CheckoutCarButtonIcon>
          <CheckoutCardButtonText>Apply</CheckoutCardButtonText>
        </>
      )}
    </CheckoutCardButtonView>
  )
}

CheckoutCardButton.displayName = 'CheckoutCardButton'
CheckoutCardButton.propTypes = {
  iconMap: propTypes.object,
  isApplied: propTypes.bool,
}

const CheckoutCard = ({ icon, name, onClick, isApplied, disabled = false }) => {
  const formContext = useContext(FormContext)
  const { iconMap = {} } = formContext

  const handleClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    evt.target.blur()
    if (!disabled) onClick()
  }

  return (
    <CheckoutCardView disabled={disabled} onClick={handleClick}>
      {icon && <CheckoutCardIcon>{icon}</CheckoutCardIcon>}
      <CheckoutCardName>{name}</CheckoutCardName>
      <CheckoutCardButton iconMap={iconMap} isApplied={isApplied} />
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
  onClick: propTypes.function,
  isApplied: propTypes.bool,
  disabled: propTypes.bool,
}

export default CheckoutCard
