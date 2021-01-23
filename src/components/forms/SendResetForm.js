import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '..'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const SendResetForm = ({ loading, error, sendReset, callback }) => {
  const submitRef = useRef()
  const inputRef = useRef()
  const [data, setData] = useState({})
  const isLoading = loading === 'pending'
  const errMsg = error && error.email ? error.email : null

  useEffect(() => {
    if (loading === 'idle' && error) {
      inputRef.current.focus()
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const linkUrl = `${window.location.origin}/reset-password`
    sendReset(data.email, linkUrl).then(() => {
      if (callback) callback()
    })
    submitRef.current.blur()
  }

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
        <ButtonSubmit submitRef={submitRef} submitting={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
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
