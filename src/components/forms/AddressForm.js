import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input, Textarea, Switch } from '../index'

const fields = [
  { label: 'Company', name: 'company', type: 'text' },
  { label: 'Contact Person', name: 'contact', type: 'text' },
  { label: 'Contact Phone', name: 'phone', type: 'tel' },
  { label: 'Description', name: 'description', type: 'text' },
  { label: 'Notes', name: 'notes', type: 'textarea' },
  { label: 'Is Default', name: 'is_default', type: 'checkbox' },
]

const AddressForm = ({ address, loading, error, update, callback }) => {
  const submitButton = useRef()
  const [data, setData] = useState(address)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const updatedData = { ...data }
    delete updatedData.customer_address_id
    delete updatedData.created_at
    delete updatedData.last_used_at
    const addressId = data.customer_address_id
    update(addressId, updatedData, callback)
    submitButton.current.blur()
  }

  return (
    <form id="address-form" className="form" onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <div className="form__error form__error--top ot-form-error">
          {errors.form}
        </div>
      )}
      <div className="form__inputs">
        {fields.map((field) => {
          switch (field.type) {
            case 'textarea':
              return (
                <Textarea
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={data[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              )
            case 'checkbox':
              return (
                <Switch
                  key={field.name}
                  label={field.label}
                  id={field.name}
                  on={data[field.name]}
                  onChange={handleChange}
                />
              )

            default:
              return (
                <Input
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={data[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              )
          }
        })}
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting}
          ref={submitButton}
        >
          Submit Updates
        </button>
      </div>
    </form>
  )
}

AddressForm.displayName = 'AddressForm'
AddressForm.propTypes = {
  address: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  callback: propTypes.func,
}

export default AddressForm
