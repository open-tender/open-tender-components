import React from 'react'
import propTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCustomerAccount } from '../slices/customerSlice'
import Button from './Button'

const ButtonCheckoutAccount = ({ classes = 'btn' }) => {
  const customer = useSelector(selectCustomerAccount)
  const history = useHistory()

  const handleClick = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  return customer ? (
    <Button
      text={`${customer.first_name} ${customer.last_name}`}
      ariaLabel="Go to account to update name or email"
      icon="User"
      classes={classes}
      onClick={handleClick}
    />
  ) : null
}

ButtonCheckoutAccount.displayName = 'ButtonCheckoutAccount'
ButtonCheckoutAccount.propTypes = {
  classes: propTypes.string,
}

export default ButtonCheckoutAccount
