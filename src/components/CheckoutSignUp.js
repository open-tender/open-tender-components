import React, { useContext } from 'react'
import Button from './Button'
import ButtonSignUp from './ButtonSignUp'
import { FormContext } from './CheckoutForm'

const CheckoutSignUp = () => {
  const formContext = useContext(FormContext)
  const { config, login } = formContext
  return (
    <div className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h3">
          {config.sign_up.title}
        </p>
        <p className="form__legend__subtitle">{config.sign_up.subtitle}</p>
      </div>
      <div className="form__inputs">
        <div className="form__input">
          <ButtonSignUp />
          <Button
            classes="btn-link"
            text="or log into an existing account"
            onClick={login}
          />
        </div>
      </div>
    </div>
  )
}

CheckoutSignUp.displayName = 'CheckoutSignUp'

export default CheckoutSignUp
