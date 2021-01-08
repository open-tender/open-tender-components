import React, { useState } from 'react'
import propTypes from 'prop-types'
import { ButtonStyled, Input } from '../index'
import { FormError, FormInputs, FormSubmit } from '../inputs'

const LoginForm = ({ loading, error, login, callback, hasThanx }) => {
  const [data, setData] = useState({})
  const isLoading = loading === 'pending'

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = () => {
    const { email, password } = data
    login(email, password).then(() => {
      if (callback) callback()
    })
  }

  return (
    <form id="login-form" noValidate>
      <FormError errMsg={error} style={{ margin: '0 0 2rem' }} />
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
      </FormInputs>
      <FormSubmit>
        <ButtonStyled onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Submitting' : 'Submit'}
        </ButtonStyled>
      </FormSubmit>
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
