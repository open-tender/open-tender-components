import React from 'react'
import propTypes from 'prop-types'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import { ButtonSubmit } from '../..'
import { useResetPasswordForm } from '.'

const ResetPasswordForm = ({
  loading,
  error,
  reset,
  resetForm,
  resetToken,
}) => {
  const {
    submitRef,
    inputRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useResetPasswordForm(loading, error, reset, resetForm, resetToken)
  const formError = error ? errors.token || errors.form || null : null

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
