import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { optionsOrderNotificationsTemp } from '@open-tender/js'
import { ButtonSubmit } from '..'
import {
  Checkbox,
  FormError,
  FormInputs,
  FormSubmit,
  Input,
  RadioButtonGroup,
} from '../inputs'

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

const SignUpForm = ({
  loading,
  error,
  signUp,
  callback,
  optIns = {},
  hasThanx = false,
}) => {
  const submitRef = useRef()
  const formRef = useRef()
  const { accepts_marketing, order_notifications } = optIns
  const initialState = {
    accepts_marketing: accepts_marketing ? accepts_marketing.default : false,
    order_notifications: order_notifications
      ? order_notifications.default
      : 'NONE',
  }
  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const formfields = hasThanx
    ? fields.filter((i) => i.name !== 'password')
    : fields
  const errMsg = error ? 'There are one or more errors below.' : null

  useEffect(() => {
    return () => {
      setData({})
      setErrors({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        const inputs = formRef.current.querySelectorAll('input')
        if (inputs.length) inputs[0].focus()
      }
    }
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
    submitRef.current.blur()
  }

  return (
    <form id="signup-form" ref={formRef} onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {formfields.map((field) => (
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
          <RadioButtonGroup
            label={order_notifications.title}
            name="order_notifications"
            value={data.order_notifications}
            options={optionsOrderNotificationsTemp}
            onChange={handleRadio}
            showLabel={true}
            required={true}
            description={order_notifications.description}
          />
        )}
        {accepts_marketing && (
          <Checkbox
            showLabel={true}
            required={true}
            label={accepts_marketing.title}
            id="accepts_marketing"
            on={data.accepts_marketing}
            onChange={handleChange}
            description={accepts_marketing.description}
          />
        )}
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
      </FormSubmit>
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
  hasThanx: propTypes.bool,
}

export default SignUpForm
