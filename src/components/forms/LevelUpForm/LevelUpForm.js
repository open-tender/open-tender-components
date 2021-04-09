import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormInputs, FormSubmit, Input } from '../../inputs'
import { useLevelUpForm } from '.'

const LevelUpForm = ({ email, loading, error, connect, callback }) => {
  const {
    submitRef,
    inputRef,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useLevelUpForm(email, loading, error, connect, callback)

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
