import React from 'react'
import propTypes from 'prop-types'
import { optionsOrderNotifications } from '@open-tender/js'
import { ButtonSubmit } from '../..'
import {
  Checkbox,
  FormError,
  FormInputs,
  FormSubmit,
  Input,
  RadioButtonGroup,
} from '../../inputs'
import useProfileForm from './useProfileForm'

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
    order_notifications,
    accepts_marketing,
    data,
    errors,
    submitting,
    fields,
    errMsg,
    handleChange,
    handleRadio,
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
        {order_notifications && (
          <>
            <RadioButtonGroup
              label={order_notifications.title}
              name="order_notifications"
              value={data.order_notifications}
              options={optionsOrderNotifications}
              onChange={handleRadio}
              showLabel={true}
              required={true}
              description={order_notifications.description}
            />
          </>
        )}
        {accepts_marketing && (
          <>
            <Checkbox
              showLabel={false}
              required={true}
              // label={accepts_marketing.description || accepts_marketing.title}
              id="accepts_marketing"
              on={data.accepts_marketing}
              onChange={handleChange}
              description={
                accepts_marketing.description || accepts_marketing.title
              }
              classes="-input"
            />
          </>
        )}
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
