import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonSignUp = ({ classes = 'btn', signUp }) => {
  return (
    <Button
      text="Create An Account"
      ariaLabel="Create An Account"
      icon="User"
      classes={classes}
      onClick={signUp}
    />
  )
}

ButtonSignUp.displayName = 'ButtonSignUp'
ButtonSignUp.propTypes = {
  classes: propTypes.string,
  signUp: propTypes.func,
}

export default ButtonSignUp
