import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonMenu = ({ onClick, classes = 'ot-btn' }) => {
  return (
    <Button
      text="Back To Menu"
      ariaLabel="Back To Menu"
      icon="ArrowLeft"
      classes={classes}
      onClick={onClick}
    />
  )
}

ButtonMenu.displayName = 'ButtonMenu'
ButtonMenu.propTypes = {
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonMenu
