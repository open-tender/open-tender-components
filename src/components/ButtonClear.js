import React from 'react'
import propTypes from 'prop-types'

// as of 2020-07-12, this is only used in <GoogleMapsAutocomplete /> and
// and <CheckoutPromoCodes /> and not exported for use outside of this library

const ButtonClear = ({ classes = '', ariaLabel, onClick, disabled }) => {
  return (
    <button
      type="button"
      className={`clear-input ot-color-link ${classes}`}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    />
  )
}

ButtonClear.displayName = 'ButtonClear'
ButtonClear.propTypes = {
  icon: propTypes.oneOfType([propTypes.string, propTypes.element]),
  classes: propTypes.string,
  ariaLabel: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
}

export default ButtonClear
