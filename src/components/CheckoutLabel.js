import React from 'react'
import propTypes from 'prop-types'

const CheckoutLabel = ({ title, description, alert = null }) => (
  <span className="form__input__discount">
    <span className="font-size ot-bold">{title}</span>
    <span className="font-size-small">{description}</span>
    {alert && <span className="font-size-small">{alert}</span>}
  </span>
)

CheckoutLabel.displayName = 'CheckoutLabel'
CheckoutLabel.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  alert: propTypes.oneOfType([propTypes.string, propTypes.object]),
}

export default CheckoutLabel
