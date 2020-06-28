import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { Label } from './Inputs'

export const Error = ({ error }) => {
  return (
    <TransitionGroup component={null}>
      {error ? (
        <CSSTransition
          key="form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <div className="form__error form-error">
            <p>{error}</p>
          </div>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

Error.displayName = 'Error'
Error.propTypes = {
  error: propTypes.string,
}

const CheckoutLineItem = ({
  label,
  required,
  error,
  classes = '',
  children,
}) => {
  return (
    <div className={`form__input border-color ${classes}`}>
      <div className="form__input__wrapper">
        {typeof label === 'string' ? (
          <Label text={label} required={required} />
        ) : (
          label
        )}
        <div className="input input--button">{children}</div>
      </div>
      <Error error={error} />
    </div>
  )
}

CheckoutLineItem.displayName = 'CheckoutLineItem'
CheckoutLineItem.propTypes = {
  label: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  classes: propTypes.string,
}

export default CheckoutLineItem
