import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'
import { ButtonSubmit } from '..'

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
  const submitRef = useRef(null)
  const inputRef = useRef(null)
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
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        inputRef.current.focus()
      }
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { new_password, confirm } = data
    if (!new_password || new_password.length < 8) {
      setErrors({ new_password: 'Must be at least 8 characters' })
      inputRef.current.focus()
    } else if (new_password !== confirm) {
      setErrors({ confirm: 'Passwords do not match' })
      inputRef.current.focus()
    } else {
      setErrors({})
      setSubmitting(true)
      reset(new_password, resetToken)
    }
    submitRef.current.blur()
  }

  return (
    <form id="reset-password-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={formError} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {fields.map((field, index) => (
          <Input
            ref={index === 0 ? inputRef : null}
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
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
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
