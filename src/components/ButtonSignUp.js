import React from 'react'
import propTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import Button from './Button'

const ButtonSignUp = ({ classes = 'btn' }) => {
  const dispatch = useDispatch()

  const handleClick = (evt) => {
    evt.preventDefault()
    dispatch(openModal({ type: 'signUp' }))
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
}

export default ButtonSignUp
