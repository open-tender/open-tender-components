import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonCheckoutAccount = ({
  customer = {},
  goToAccount,
  classes = 'ot-btn',
}) => {
  return customer ? (
    <Button
      text={`${customer.first_name} ${customer.last_name}`}
      ariaLabel="Go to account to update name or email"
      icon="User"
      classes={classes}
      onClick={goToAccount}
    />
  ) : null
}

ButtonCheckoutAccount.displayName = 'ButtonCheckoutAccount'
ButtonCheckoutAccount.propTypes = {
  customer: propTypes.object,
  classes: propTypes.string,
  goToAccount: propTypes.func,
}

export default ButtonCheckoutAccount
