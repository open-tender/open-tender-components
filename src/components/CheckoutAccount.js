import React, { useState, useCallback, useContext } from 'react'
import { Input } from './Inputs'
import CheckoutLineItem from './CheckoutLineItem'
import debounce from 'lodash/debounce'
import Button from './Button'
import { FormContext } from './CheckoutForm'

const makeAccountConfig = (requiredFields) => {
  return {
    phone: { label: 'Phone', included: true, required: true },
    company: {
      label: 'Company',
      included: requiredFields.includes('company'),
      required: requiredFields.includes('company'),
    },
  }
}

const fields = [
  { name: 'first_name', type: 'text' },
  { name: 'last_name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
  { name: 'company', type: 'text' },
]

const CheckoutAccount = () => {
  const formContext = useContext(FormContext)
  const {
    config,
    check,
    form,
    errors,
    updateForm,
    logout,
    goToAccount,
  } = formContext
  const [customer, setCustomer] = useState(form.customer)
  const requiredFields = check.config.required.customer
  const accountConfig = makeAccountConfig(requiredFields)
  const formErrors = errors.customer || {}

  const debouncedUpdate = useCallback(
    debounce((newCustomer) => updateForm({ customer: newCustomer }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('customer-', '')
    const newCustomer = { ...customer, [field]: value }
    setCustomer(newCustomer)
    debouncedUpdate(newCustomer)
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title ot-heading ot-font-size-h3">
          {config.account.title}
        </p>
        <p className="form__legend__subtitle ot-line-height ot-color-secondary">
          <Button
            text="Click here to logout"
            ariaLabel="Log out of your account"
            classes="ot-btn-link"
            onClick={logout}
          />{' '}
          if you want to switch accounts or check out as a guest.
        </p>
      </div>
      <div className="form__inputs">
        <CheckoutLineItem label="Account">
          <Button
            text={`${customer.first_name} ${customer.last_name}`}
            ariaLabel="Go to account to update name or email"
            icon="User"
            classes="ot-btn--secondary ot-btn--header"
            onClick={goToAccount}
          />
        </CheckoutLineItem>
        {fields.map((field) => {
          const input = accountConfig[field.name]
          return (
            input &&
            input.included && (
              <Input
                key={field.name}
                label={input.label}
                name={`customer-${field.name}`}
                type={field.type}
                value={customer[field.name]}
                onChange={handleChange}
                error={formErrors[field.name]}
                required={input.required}
              />
            )
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutAccount.displayName = 'CheckoutAccount'

export default CheckoutAccount
