import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'
import { makeFullAddress } from 'open-tender-js'

const ButtonAddress = ({ address, onClick, classes = 'btn', disabled }) => {
  if (!address) return null
  const fullAddresss = makeFullAddress(address)
  return (
    <Button
      text={fullAddresss}
      ariaLabel={`Current address: ${fullAddresss}. Click to update.`}
      icon="Navigation"
      classes={classes}
      onClick={onClick}
      disabled={disabled}
    />
  )
}

ButtonAddress.displayName = 'ButtonAddress'
ButtonAddress.propTypes = {
  address: propTypes.object,
  onClick: propTypes.func,
  classes: propTypes.string,
  disabled: propTypes.bool,
}

export default ButtonAddress
