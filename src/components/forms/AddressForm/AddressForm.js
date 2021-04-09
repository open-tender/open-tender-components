import React from 'react'
import propTypes from 'prop-types'
import { Input, Textarea, Switch, ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit } from '../../inputs'
import useAddressForm from './useAddressForm'

const AddressForm = ({ address, loading, error, update, callback }) => {
  const {
    submitRef,
    inputRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useAddressForm(address, loading, error, update, callback)

  return (
    <form id="address-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {fields.map((field, index) => {
          switch (field.type) {
            case 'textarea':
              return (
                <Textarea
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={data[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              )
            case 'checkbox':
              return (
                <Switch
                  key={field.name}
                  label={field.label}
                  id={field.name}
                  on={data[field.name]}
                  onChange={handleChange}
                />
              )
            default:
              return (
                <Input
                  ref={index === 0 ? inputRef : null}
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={data[field.name]}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required={field.required}
                />
              )
          }
        })}
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Submit Updates'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

AddressForm.displayName = 'AddressForm'
AddressForm.propTypes = {
  address: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  callback: propTypes.func,
}

export default AddressForm
