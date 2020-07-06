import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonSignUp = ({
  text = 'Create An Account',
  signUp,
  classes = 'btn',
}) => {
  return <Button text={text} icon="User" classes={classes} onClick={signUp} />
}

ButtonSignUp.displayName = 'ButtonSignUp'
ButtonSignUp.propTypes = {
  text: propTypes.string,
  classes: propTypes.string,
  signUp: propTypes.func,
}

export default ButtonSignUp
