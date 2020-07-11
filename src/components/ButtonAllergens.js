import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonAllergens = ({ onClick, classes = 'ot-btn' }) => {
  return (
    <Button
      text="Allergens"
      ariaLabel="Highlight allergens on the menu"
      icon="Sliders"
      classes={classes}
      onClick={onClick}
    />
  )
}

ButtonAllergens.displayName = 'ButtonAllergens'
ButtonAllergens.propTypes = {
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonAllergens
