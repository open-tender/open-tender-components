import React from 'react'
import propTypes from 'prop-types'
import { FormError, Label } from '..'

const CheckoutLineItem = ({
  label,
  required,
  error,
  classes = '',
  children,
}) => {
  return (
    <div className={`form__input ot-border-color ${classes}`}>
      <div className="form__input__wrapper">
        {typeof label === 'string' ? (
          <Label text={label} required={required} />
        ) : (
          label
        )}
        <div className="input input--button">{children}</div>
      </div>
      <FormError error={error} />
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
  required: propTypes.bool,
  error: propTypes.string,
  classes: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CheckoutLineItem
