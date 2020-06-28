import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonSignUp = ({ classes = 'btn', signUp }) => {
  const handleClick = (evt) => {
    evt.preventDefault()
    signUp()
    evt.target.blur()
  }

  return (
    <Button
      text="Create An Account"
      ariaLabel="Create An Account"
      icon="User"
      classes={classes}
      onClick={handleClick}
    />
  )
}

ButtonSignUp.displayName = 'ButtonSignUp'
ButtonSignUp.propTypes = {
  classes: propTypes.string,
  signUp: propTypes.func,
}

export default ButtonSignUp
