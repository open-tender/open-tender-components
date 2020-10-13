import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input, Switch, Checkbox, Select, RadioButtonGroup } from '../index'
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

// const optionsMarketing = [
//   { name: 'Yes, I want to receive periodic promotional emails', value: 1 },
//   { name: 'No, do not send me promotional emails', value: 0 },
// ]

const optionsOrderNotifications = [
  { name: 'Both Email & SMS', value: 'ALL' },
  { name: 'Email Only', value: 'EMAIL' },
  { name: 'SMS Only', value: 'SMS' },
  { name: 'Neither', value: 'NONE' },
]

const SignUpForm = ({
  loading,
  error,
  signUp,
  callback,
  initialState = {},
}) => {
  const { accepts_marketing, order_notifications } = initialState
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
        {accepts_marketing && (
          <>
            <Checkbox
              label="Sign up for promotional emails"
              id="accepts_marketing"
              on={data.accepts_marketing}
              onChange={handleChange}
            />
            {/* <Select
              label="Promotional Emails"
              name="accepts_marketing"
              value={data.accepts_marketing}
              onChange={handleChange}
              error={errors.accepts_marketing}
              required={true}
              options={optionsMarketing}
            /> */}
          </>
        )}
        {order_notifications && (
          <>
            {/* <Checkbox
            label="Sign up for order notifications"
            id="order_notifications"
            on={data.order_notifications}
            onChange={handleChange}
          /> */}
            <RadioButtonGroup
              label="Order Notifications"
              name="order_notifications"
              value={data.order_notifications}
              options={optionsOrderNotifications}
              onChange={handleRadio}
              showLabel={true}
              required={true}
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
  initialState: propTypes.object,
}

export default SignUpForm
