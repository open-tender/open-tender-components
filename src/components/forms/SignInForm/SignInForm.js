import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../../index'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useSignInForm from './useSignInForm'

const SignInForm = ({ email, loading, error, login, callback }) => {
  const { submitRef, inputRef, data, submitting, handleChange, handleSubmit } =
    useSignInForm(email, loading, error, login, callback)

  return (
    <form id="checkout-login-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={error} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Email"
          name="email"
          type="email"
          value={email}
          required={true}
          disabled={true}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Sign In'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

SignInForm.displayName = 'SignInForm'
SignInForm.propTypes = {
  email: propTypes.bool,
  loading: propTypes.string,
  error: propTypes.string,
  login: propTypes.func,
  callback: propTypes.func,
}

export default SignInForm
