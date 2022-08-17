import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink, ButtonSubmit, Text } from '../..'
import { FormError, FormInputs, Input } from '../../inputs'
import useSignUpGuestForm from './useSignUpGuestForm'

const SignUpGuestFormNote = styled('div')`
  width: 100%;
  height: 2rem;
  margin: -1rem 0 0;
  display: flex;
  align-items: center;

  & > span {
    display: block;
  }
`

const SignUpGuestFormSubmit = styled('div')`
  margin: 1.5rem 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: block;
  }

  button + button {
    margin: 0 0 0 1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const SignUpGuestForm = ({
  email,
  guest,
  loading,
  error,
  signUp,
  submitGuest,
  showGuest = true,
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
  } = useSignUpGuestForm(
    email,
    guest,
    loading,
    error,
    signUp,
    submitGuest,
    hasThanx
  )
  const passwordNeeded = !guestDisabled && !data.password && !hasThanx

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
      <SignUpGuestFormNote>
        {showGuest && passwordNeeded ? (
          <Text color="alert" size="xSmall">
            Enter a password to create an account or proceed as a guest
          </Text>
        ) : null}
      </SignUpGuestFormNote>
      <SignUpGuestFormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={disabled || submitting}>
          {submitting ? 'Submitting...' : 'Sign Up'}
        </ButtonSubmit>
        {/* <ButtonStyled
          onClick={handleGuest}
          disabled={guestDisabled || submitting}
          color="secondary"
        >
          Checkout as a guest
        </ButtonStyled> */}
        {showGuest ? (
          <ButtonLink
            onClick={handleGuest}
            disabled={guestDisabled || submitting}
          >
            Checkout as a guest
          </ButtonLink>
        ) : null}
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
  showGuest: propTypes.bool,
  hasThanx: propTypes.bool,
}

export default SignUpGuestForm
