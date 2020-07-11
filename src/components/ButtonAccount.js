import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonAccount = ({
  account,
  isAccount,
  login,
  logout,
  goToAccount,
  classes = 'ot-btn',
}) => {
  return account ? (
    isAccount ? (
      <Button
        text="Logout"
        ariaLabel="Log out of your account"
        icon="User"
        classes={classes}
        onClick={logout}
      />
    ) : (
      <Button
        text="Account"
        ariaLabel="View your account"
        icon="User"
        classes={classes}
        onClick={goToAccount}
      />
    )
  ) : (
    <Button
      text="Login"
      ariaLabel="Log into your account"
      icon="User"
      classes={classes}
      onClick={login}
    />
  )
}

ButtonAccount.displayName = 'ButtonAccount'
ButtonAccount.propTypes = {
  account: propTypes.object,
  isAccount: propTypes.bool,
  login: propTypes.func,
  logout: propTypes.func,
  goToAccount: propTypes.func,
  classes: propTypes.string,
}

export default ButtonAccount
