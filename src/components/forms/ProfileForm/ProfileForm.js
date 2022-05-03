import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input, Select } from '../../inputs'
import useProfileForm from './useProfileForm'

const options = [
  { name: 'Male', value: 'MALE' },
  { name: 'Female', value: 'FEMALE' },
  { name: 'Declined', value: 'DECLINED' },
]

const ProfileForm = ({
  profile,
  loading,
  error,
  update,
  optIns = {},
  showFields = true,
  id = 'account-form',
  buttonText = 'Update Account',
}) => {
  const {
    submitRef,
    formRef,
    data,
    errors,
    submitting,
    fields,
    errMsg,
    handleChange,
    handleSubmit,
  } = useProfileForm(profile, loading, error, update, optIns)

  return (
    <form id={id} ref={formRef} onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {showFields &&
          fields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              value={data[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              required={field.required}
              autoComplete={field.autoComplete}
            />
          ))}
        <Input
          label="Birth Date (mm/dd/yyyy)"
          name="birth_date"
          type="tel"
          value={data.birth_date}
          onChange={handleChange}
          error={
            errors.birth_date
              ? 'Invalid date. Please enter in mm/dd/yyyy format.'
              : null
          }
        />
        <Select
          label="Gender"
          showLabel={true}
          name="gender"
          value={data.gender}
          onChange={handleChange}
          error={errors.gender}
          options={options}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : buttonText}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

ProfileForm.displayName = 'ProfileForm'
ProfileForm.propTypes = {
  profile: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  optIns: propTypes.object,
  showFields: propTypes.bool,
  id: propTypes.string,
  buttonText: propTypes.string,
}

export default ProfileForm
