import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../../index'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useGuestForm from './useGuestForm'

const GuestForm = ({
  email,
  loading,
  errors,
  checkGuest,
  submitText = 'Submit Email',
}) => {
  const {
    submitRef,
    inputRef,
    data,
    errMsg,
    submitting,
    handleChange,
    handleSubmit,
  } = useGuestForm(email, loading, errors, checkGuest)

  return (
    <form id="login-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : submitText}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GuestForm.displayName = 'GuestForm'
GuestForm.propTypes = {
  email: propTypes.string,
  loading: propTypes.string,
  errors: propTypes.object,
  checkGuest: propTypes.func,
  submitText: propTypes.string,
}

export default GuestForm
