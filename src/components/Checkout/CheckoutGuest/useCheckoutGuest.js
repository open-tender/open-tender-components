import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

const initialState = {
  emaiil: '',
  first_name: '',
  last_name: '',
  phone: '',
  company: '',
}

const makeFields = (required, displayed, passwordConfig) => {
  const fields = [
    {
      label: 'First Name',
      name: 'first_name',
      type: 'text',
      included: true,
      required: true,
    },
    {
      label: 'Last Name',
      name: 'last_name',
      type: 'text',
      included: true,
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      included: true,
      required: true,
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'tel',
      included: true,
      required: true,
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      autoComplete: 'new-password',
      included: passwordConfig ? passwordConfig.included : false,
      required: passwordConfig ? passwordConfig.required : false,
    },
    {
      label: 'Company',
      name: 'company',
      type: 'text',
      included: displayed.includes('company') || required.includes('company'),
      required: required.includes('company'),
    },
  ]
  return fields.filter((i) => i.included)
}

const useCheckoutGuest = (check, form, errors, passwordConfig, updateForm) => {
  const [data, setData] = useState(form.customer || initialState)
  const formErrors = errors.customer || {}
  const required = check.config.required.customer
  const displayed = check.config.displayed
    ? check.config.displayed.customer || []
    : []
  const fields = makeFields(required, displayed, passwordConfig)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((data) => updateForm({ customer: data }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('customer-', '')
    const newCustomer = { ...data, [field]: value }
    setData(newCustomer)
    if (updateForm) debouncedUpdate(newCustomer)
  }

  return {
    fields,
    data,
    formErrors,
    handleChange,
  }
}

export default useCheckoutGuest
