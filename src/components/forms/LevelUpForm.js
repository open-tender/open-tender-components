import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { FormInputs, FormSubmit, Input } from '../inputs'
import { ButtonStyled } from '..'

const LevelUpForm = ({ email, loading, error, connect, callback }) => {
  const [data, setData] = useState({ email })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = () => {
    setSubmitting(true)
    connect(data, callback)
  }

  return (
    <form id="levelup-form" noValidate>
      <FormInputs>
        <Input
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
        <ButtonStyled onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Connecting LevelUp...' : 'Connect LevelUp'}
        </ButtonStyled>
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
