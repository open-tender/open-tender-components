import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../../index'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import useDineInForm from './useDineInForm'

const DineInForm = ({
  initialData,
  submitGuest,
  submitText = 'Submit Name',
}) => {
  const {
    submitRef,
    inputRef,
    data,
    errMsg,
    submitting,
    handleChange,
    handleSubmit,
  } = useDineInForm(initialData, submitGuest)

  return (
    <form id="dine-in-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="First Name"
          name="first_name"
          type="text"
          value={data.first_name}
          onChange={handleChange}
          required={true}
        />
        <Input
          label="Last Name"
          name="last_name"
          type="text"
          value={data.last_name}
          onChange={handleChange}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : submitText}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

DineInForm.displayName = 'DineInForm'
DineInForm.propTypes = {
  initialData: propTypes.object,
  submitGuest: propTypes.func,
  submitText: propTypes.string,
}

export default DineInForm
