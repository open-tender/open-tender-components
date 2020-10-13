import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input, Checkbox, RadioButtonGroup } from '../index'
import SubmitButton from './SubmitButton'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    autoComplete: 'new-password',
  },
  { label: 'Phone', name: 'phone', type: 'tel', required: true },
  // { label: 'Company', name: 'company', type: 'text' },
]

const optionsOrderNotifications = [
  { name: 'Neither', value: 'NONE' },
  { name: 'Email Only', value: 'EMAIL' },
  { name: 'SMS Only', value: 'SMS' },
  { name: 'Both Email & SMS', value: 'ALL' },
]

const SignUpForm = ({ loading, error, signUp, callback, optIns = {} }) => {
  const { accepts_marketing, order_notifications } = optIns
  const initialState = {
    accepts_marketing: accepts_marketing.default || false,
    order_notifications: order_notifications.default || 'NONE',
  }
  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const submitButton = useRef()

  useEffect(() => {
    return () => {
      setData({})
      setErrors({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleRadio = (evt) => {
    const { name, value } = evt.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    setSubmitting(true)
    signUp(data, callback)
    submitButton.current.blur()
  }

  return (
    <form id="signup-form" className="form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form__error form__error--top ot-form-error">
          There are one or more errors below.
        </div>
      )}
      <div className="form__inputs">
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={data[field.name]}
            onChange={handleChange}
            error={errors ? errors[field.name] : ''}
            required={field.required}
            autoComplete={field.autoComplete}
          />
        ))}
        {order_notifications && (
          <>
            <RadioButtonGroup
              label={order_notifications.title}
              name="order_notifications"
              value={data.order_notifications}
              options={optionsOrderNotifications}
              onChange={handleRadio}
              showLabel={true}
              required={true}
              description={order_notifications.description}
            />
          </>
        )}
        {accepts_marketing && (
          <>
            <Checkbox
              showLabel={true}
              required={true}
              label={accepts_marketing.title}
              id="accepts_marketing"
              on={data.accepts_marketing}
              onChange={handleChange}
              description={accepts_marketing.description}
              classes="-input"
            />
          </>
        )}
      </div>
      <div className="form__submit">
        <SubmitButton submitRef={submitButton} submitting={submitting} />
      </div>
    </form>
  )
}

SignUpForm.displayName = 'SignUpForm'
SignUpForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  signUp: propTypes.func,
  callback: propTypes.func,
  optIns: propTypes.object,
}

export default SignUpForm
