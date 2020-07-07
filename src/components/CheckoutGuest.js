import React, { useState, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import { Input } from './Inputs'
import { FormContext } from './CheckoutForm'

const initialState = {
  emaiil: '',
  first_name: '',
  last_name: '',
  phone: '',
  company: '',
}

const makeContactConfig = (requiredFields) => {
  return {
    first_name: { label: 'First Name', included: true, required: true },
    last_name: { label: 'Last Name', included: true, required: true },
    email: { label: 'Email', included: true, required: true },
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

const CheckoutGuest = () => {
  const { config, check, form, errors, updateForm } = useContext(FormContext)
  const [customer, setCustomer] = useState(form.customer || initialState)
  const requiredFields = check.config.required.customer
  const contactConfig = makeContactConfig(requiredFields)
  const customerErrors = errors.customer || {}

  // useEffect(() => {
  //   setCustomer(checkoutCustomer || initialState)
  // }, [checkoutCustomer])

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
    <fieldset className="form__fieldset">
      <legend className="form__legend">
        <p className="form__legend__title ot-heading ot-font-size-h3">
          {config.guest.title}
        </p>
      </legend>
      <div className="form__inputs">
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
                error={customerErrors[field.name]}
                required={input.required}
              />
            )
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'

export default CheckoutGuest
