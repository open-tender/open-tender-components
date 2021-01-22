import React from 'react'
import propTypes from 'prop-types'
import { ButtonStyledView } from './ButtonStyled'

const ButtonSubmit = ({
  submitRef,
  disabled,
  submitting,
  children,
  size = 'default',
  color = 'primary',
  style = null,
  // submittingText = 'Submitting...',
  // submitText = 'Submit',
}) => {
  return (
    <ButtonStyledView
      ref={submitRef}
      type="submit"
      disabled={disabled || submitting}
      size={size}
      color={color}
      style={style}
    >
      {/* {submitting ? submittingText : submitText} */}
      {children}
    </ButtonStyledView>
  )
}

ButtonSubmit.displayName = 'ButtonSubmit'
ButtonSubmit.propTypes = {
  submitRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.any }),
  ]),
  disabled: propTypes.bool,
  submitting: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  size: propTypes.string,
  color: propTypes.string,
  style: propTypes.object,
  // submittingText: propTypes.string,
  // submitText: propTypes.string,
}

export default ButtonSubmit
