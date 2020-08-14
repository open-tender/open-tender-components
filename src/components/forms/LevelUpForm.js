import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'

const LevelUpForm = ({ email, loading, error, connect, callback }) => {
  const submitButton = useRef()
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

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    connect(data, callback)
    submitButton.current.blur()
  }

  return (
    <form id="levelup-form" className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__inputs">
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
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting}
          ref={submitButton}
        >
          {submitting ? 'Connecting LevelUp...' : 'Connect LevelUp'}
        </button>
      </div>
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
