import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '..'
import { FormInputs, FormSubmit, Input } from '../inputs'

const LevelUpForm = ({ email, loading, error, connect, callback }) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({ email })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        inputRef.current.focus()
      }
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    connect(data, callback)
    submitRef.current.blur()
  }

  return (
    <form id="levelup-form" onSubmit={handleSubmit} noValidate>
      <FormInputs>
        <Input
          ref={inputRef}
          label="Email Address"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
          required={true}
          autoComplete="email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          required={true}
          autoComplete="off"
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Connecting LevelUp...' : 'Connect LevelUp'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

LevelUpForm.displayName = 'LevelUpForm'
LevelUpForm.propTypes = {
  email: propTypes.string,
  loading: propTypes.string,
  error: propTypes.object,
  connect: propTypes.func,
  callback: propTypes.func,
}

export default LevelUpForm
