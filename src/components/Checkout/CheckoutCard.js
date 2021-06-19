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
    background-color: ${(props) => props.theme.bgColors.tertiary};
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

  &:first-of-type {
    padding-left: 0;
  }
`

const CheckoutCardButtonView = styled('span')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const CheckoutCarButtonIcon = styled('span')`
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0 0.5rem 0 0;
  line-height: 0;
`

const CheckoutCardButtonText = styled('span')`
  display: block;
  line-height: 1;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

export const CheckoutCardButton = ({ iconMap, isApplied }) => {
  return (
    <CheckoutCardButtonView
      className={isApplied ? null : 'checkout-card-apply'}
    >
      {isApplied ? (
        <FormApplied />
      ) : (
        <>
          <CheckoutCarButtonIcon>{iconMap.add}</CheckoutCarButtonIcon>
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

const CheckoutCard = ({
  icon,
  name,
  onClick,
  isApplied = false,
  disabled = false,
}) => {
  const formContext = useContext(FormContext)
  const { iconMap = {} } = formContext

  const handleClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    evt.target.blur()
    if (onClick && !disabled) onClick()
  }

  return (
    <CheckoutCardView
      disabled={disabled}
      onClick={onClick ? handleClick : null}
      as={onClick ? 'button' : 'span'}
    >
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
