import React from 'react'
import propTypes from 'prop-types'
import { ButtonStyled } from '..'
// import ClipLoader from 'react-spinners/ClipLoader'

const SubmitButton = ({ onClick, submitting, disabled }) => {
  return (
    <ButtonStyled onClick={onClick} disabled={disabled || submitting}>
      {submitting ? 'Submitting' : 'Submit'}
    </ButtonStyled>
  )
}

SubmitButton.displayName = 'SubmitButton'
SubmitButton.propTypes = {
  onClick: propTypes.func,
  submitting: propTypes.bool,
  disabled: propTypes.bool,
}

export default SubmitButton
