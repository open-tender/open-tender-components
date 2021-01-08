import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import {
  FormError,
  FormInputs,
  FormSubmit,
  Input,
  SubmitButton,
} from '../inputs'

const fields = [
  { label: 'New Password', name: 'new_password', type: 'password' },
  { label: 'Confirm Password', name: 'confirm', type: 'password' },
]

const ResetPasswordForm = ({
  loading,
  error,
  reset,
  resetForm,
  resetToken,
}) => {
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const formError = error ? errors.token || errors.form || null : null

  useEffect(() => {
    setData({})
    setErrors({})
    resetForm()
    return () => {
      setData({})
      setErrors({})
      resetForm()
    }
  }, [resetForm])

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = () => {
    const { new_password, confirm } = data
    if (!new_password || new_password.length < 8) {
      setErrors({ new_password: 'Must be at least 8 characters' })
    } else if (new_password !== confirm) {
      setErrors({ confirm: 'Passwords do not match' })
    } else {
      setErrors({})
      setSubmitting(true)
      reset(new_password, resetToken)
    }
  }

  return (
    <form id="reset-password-form" noValidate>
      <FormError errMsg={formError} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
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
          />
        ))}
      </FormInputs>
      <FormSubmit>
        <SubmitButton onClick={handleSubmit} submitting={submitting} />
      </FormSubmit>
    </form>
  )
}

ResetPasswordForm.displayName = 'ResetPasswordForm'
ResetPasswordForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  reset: propTypes.func,
  resetForm: propTypes.func,
  resetToken: propTypes.string,
}

export default ResetPasswordForm
