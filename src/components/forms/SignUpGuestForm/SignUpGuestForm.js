import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink, ButtonSubmit } from '../..'
import { FormError, FormInputs, Input } from '../../inputs'
import useSignUpGuestForm from './useSignUpGuestForm'

const SignUpGuestFormSubmit = styled('div')`
  margin: 1.5rem 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: block;
  }
`

const SignUpGuestForm = ({
  email,
  guest,
  loading,
  error,
  signUp,
  submitGuest,
  hasThanx = false,
}) => {
  const {
    submitRef,
    inputRef,
    data,
    disabled,
    guestDisabled,
    errMsg,
    errors,
    submitting,
    handleChange,
    handleSubmit,
    handleGuest,
  } = useSignUpGuestForm(email, guest, loading, error, signUp, submitGuest)

  return (
    <form id="signup-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          label="Email"
          name="email"
          type="email"
          value={email}
          required={true}
          disabled={true}
        />
        <Input
          ref={inputRef}
          label="First Name"
          name="first_name"
          type="text"
          value={data.first_name}
          error={errors?.first_name}
          required={true}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          name="last_name"
          type="text"
          value={data.last_name}
          error={errors?.last_name}
          required={true}
          onChange={handleChange}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={data.phone}
          error={errors?.phone}
          required={true}
          onChange={handleChange}
        />
        {!hasThanx && (
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={data.password}
            error={errors?.password}
            onChange={handleChange}
          />
        )}
      </FormInputs>
      <SignUpGuestFormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={disabled || submitting}>
          {submitting ? 'Submitting...' : 'Sign Up'}
        </ButtonSubmit>
        <ButtonLink
          onClick={handleGuest}
          disabled={guestDisabled || submitting}
        >
          Checkout as a guest
        </ButtonLink>
      </SignUpGuestFormSubmit>
    </form>
  )
}

SignUpGuestForm.displayName = 'SignUpGuestForm'
SignUpGuestForm.propTypes = {
  email: propTypes.string,
  guest: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  signUp: propTypes.func,
  submitGuest: propTypes.func,
  hasThanx: propTypes.bool,
}

export default SignUpGuestForm
