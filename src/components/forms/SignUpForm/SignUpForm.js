import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useSignUpForm from './useSignUpForm'

const SignUpForm = ({
  loading,
  error,
  signUp,
  callback,
  checkConfig = {},
  hasThanx = false,
}) => {
  const {
    submitRef,
    formRef,
    data,
    errors,
    submitting,
    formfields,
    errMsg,
    handleChange,
    handleSubmit,
  } = useSignUpForm(loading, error, signUp, callback, checkConfig, hasThanx)

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
  checkConfig: propTypes.object,
  hasThanx: propTypes.bool,
}

export default SignUpForm
