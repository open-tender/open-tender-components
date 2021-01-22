import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

// as of 2020-07-12, this is only used in <GoogleMapsAutocomplete /> and
// and <CheckoutPromoCodes /> and not exported for use outside of this library

const ButtonClearView = styled('button')`
  position: absolute;
  top: 1.4rem;
  right: 0.9rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  border: 0.1rem solid ${(props) => props.theme.links.primary.color};
  color: ${(props) => props.theme.links.primary.color};
  opacity: 1;

  &:hover {
    opacity: 1;
  }

  &:before,
  &:after {
    position: absolute;
    top: 0.2rem;
    left: 0.6rem;
    content: ' ';
    height: 0.9rem;
    width: 0.1rem;
    background-color: ${(props) => props.theme.links.primary.color};
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`

const ButtonClear = ({ ariaLabel, onClick, disabled }) => {
  const onUp = (evt) => {
    evt.target.blur()
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <ButtonClearView
      type="button"
      aria-label={ariaLabel}
      // onPointerUp={(evt) => onUp(evt)}
      onClick={(evt) => onUp(evt)}
      disabled={disabled}
    />
  )
}

ButtonClear.displayName = 'ButtonClear'
ButtonClear.propTypes = {
  icon: propTypes.oneOfType([propTypes.string, propTypes.element]),
  ariaLabel: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
}

export default ButtonClear
