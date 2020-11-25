import React, { useState, useRef } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'

const LoginForm = ({ loading, error, login, callback, hasThanx }) => {
  const [data, setData] = useState({})
  const submitButton = useRef()
  const isLoading = loading === 'pending'

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { email, password } = data
    login(email, password).then(() => {
      if (callback) callback()
    })
    submitButton.current.blur()
  }

  return (
    <form id="login-form" className="form" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="form__error form__error--top ot-form-error">
          {error}
        </div>
      )}
      <div className="form__inputs">
        <Input
          label="Email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          required={true}
          classes="form__input"
        />
        {!hasThanx && (
          <Input
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            required={true}
            classes="form__input"
          />
        )}
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={isLoading}
          ref={submitButton}
        >
          {isLoading ? 'Submitting' : 'Submit'}
        </button>
      </div>
    </form>
  )
}

LoginForm.displayName = 'LoginForm'
LoginForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.string,
  login: propTypes.func,
  callback: propTypes.func,
  hasThanx: propTypes.bool,
}

export default LoginForm
