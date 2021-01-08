import React, { useState } from 'react'
import propTypes from 'prop-types'
import { ButtonStyled } from '..'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const SendResetForm = ({ loading, error, sendReset, callback }) => {
  const [data, setData] = useState({})
  const isLoading = loading === 'pending'
  const errMsg = error && error.email ? error.email : null

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = () => {
    const linkUrl = `${window.location.origin}/reset-password`
    sendReset(data.email, linkUrl).then(() => {
      if (callback) callback()
    })
  }

  return (
    <form id="send-reset-form" noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required={true}
          classes="form__input"
        />
      </FormInputs>
      <FormSubmit>
        <ButtonStyled onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Submitting' : 'Submit'}
        </ButtonStyled>
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
