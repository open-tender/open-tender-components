import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useSendResetForm from './useSendResetForm'

const SendResetForm = ({ loading, error, sendReset, callback }) => {
  const {
    submitRef,
    inputRef,
    data,
    errMsg,
    handleChange,
    handleSubmit,
  } = useSendResetForm(loading, error, sendReset, callback)

  return (
    <form id="send-reset-form" onSubmit={handleSubmit} noValidate>
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
        <ButtonSubmit submitRef={submitRef} submitting={loading === 'pending'}>
          {loading === 'pending' ? 'Submitting...' : 'Submit'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

SendResetForm.displayName = 'SendResetForm'
SendResetForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  sendReset: propTypes.func,
  callback: propTypes.func,
}

export default SendResetForm
