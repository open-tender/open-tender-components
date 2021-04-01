import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../../index'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useLoginForm from './useLoginForm'

const LoginForm = ({ loading, error, login, callback, hasThanx }) => {
  const {
    submitRef,
    inputRef,
    data,
    submitting,
    handleChange,
    handleSubmit,
  } = useLoginForm(loading, error, login, callback)

  return (
    <form id="login-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={error} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required={true}
          classes="form__input"
        />
        {!hasThanx && (
          <Input
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required={true}
            classes="form__input"
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

LoginForm.displayName = 'LoginForm'
LoginForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.string,
  login: propTypes.func,
  callback: propTypes.func,
  hasThanx: propTypes.bool,
}

export default LoginForm
