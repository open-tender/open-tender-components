import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonRevenueCenter = ({
  revenueCenter,
  onClick,
  disabled,
  classes = 'btn',
}) => {
  return revenueCenter ? (
    <Button
      text={revenueCenter.name}
      ariaLabel={`Change location from ${revenueCenter.name}`}
      icon="MapPin"
      classes={classes}
      onClick={onClick}
      disabled={disabled}
    />
  ) : null
}

ButtonRevenueCenter.displayName = 'ButtonRevenueCenter'
ButtonRevenueCenter.propTypes = {
  revenueCenter: propTypes.object,
  onClick: propTypes.func,
  classes: propTypes.string,
  disabled: propTypes.bool,
}

export default ButtonRevenueCenter
