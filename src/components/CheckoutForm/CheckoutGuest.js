import React, { useState, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import { Input } from '..'
import { FormContext } from './CheckoutForm'
import { FormError, FormFieldset, FormInputs, FormLegend } from '../inputs'

const initialState = {
  emaiil: '',
  first_name: '',
  last_name: '',
  phone: '',
  company: '',
}

const makeContactConfig = (required, displayed, isCatering, hasThanx) => {
  return {
    first_name: { label: 'First Name', included: true, required: true },
    last_name: { label: 'Last Name', included: true, required: true },
    email: { label: 'Email', included: true, required: true },
    phone: { label: 'Phone', included: true, required: true },
    password: {
      label: 'Password',
      included: hasThanx ? false : true,
      required: isCatering,
    },
    company: {
      label: 'Company',
      included: displayed.includes('company') || required.includes('company'),
      required: required.includes('company'),
    },
  }
}

const fields = [
  { name: 'first_name', type: 'text' },
  { name: 'last_name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
  { name: 'password', type: 'password', autoComplete: 'new-password' },
  { name: 'company', type: 'text' },
]

const CheckoutGuest = () => {
  const {
    config,
    order,
    check,
    form,
    errors,
    updateForm,
    hasThanx,
  } = useContext(FormContext)
  const [customer, setCustomer] = useState(form.customer || initialState)
  const required = check.config.required.customer
  const displayed = check.config.displayed
    ? check.config.displayed.customer || []
    : []
  const isCatering = order.orderType === 'CATERING'
  const contactConfig = makeContactConfig(
    required,
    displayed,
    isCatering,
    hasThanx
  )
  const formErrors = errors.customer || {}

  // https://medium.com/p/5489fc3461b3/responses/show
  // https://codesandbox.io/s/functional-component-debounce-cunf7
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
    <FormFieldset>
      <FormLegend title={config.guest.title} subtitle={config.guest.subtitle} />
      <FormInputs>
        {formErrors.account ? (
          <FormError
            errMsg={formErrors.account}
            style={{ margin: '0 0 2rem' }}
          />
        ) : null}
        {fields.map((field) => {
          const input = contactConfig[field.name]
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
                autoComplete={field.autoComplete}
              />
            )
          )
        })}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'

export default CheckoutGuest
