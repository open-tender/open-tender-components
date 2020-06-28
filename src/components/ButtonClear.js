import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from './icons'

const ButtonClear = ({
  icon = 'XCircle',
  classes = '',
  ariaLabel,
  onClick,
  disabled,
}) => {
  return (
    <button
      type="button"
      className={`btn-clear ot-link-color ${classes}`}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {iconMap[icon]}
    </button>
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
