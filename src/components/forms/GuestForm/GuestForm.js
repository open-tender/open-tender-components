import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../../index'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useGuestForm from './useGuestForm'

const GuestForm = ({ loading, error, checkGuest, callback }) => {
  const { submitRef, inputRef, data, submitting, handleChange, handleSubmit } =
    useGuestForm(loading, error, checkGuest, callback)

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
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GuestForm.displayName = 'GuestForm'
GuestForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.string,
  checkGuest: propTypes.func,
  callback: propTypes.func,
}

export default GuestForm
