import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const FormError = ({ errMsg }) => {
  return (
    <TransitionGroup component={null}>
      {errMsg ? (
        <CSSTransition
          key="ot-form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <span className="form__error ot-form-error">
            <p>{errMsg}</p>
          </span>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

FormError.displayName = 'FormError'
FormError.propTypes = {
  errMsg: propTypes.string,
}

export default FormError
