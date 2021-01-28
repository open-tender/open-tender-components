import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import { optionsOrderNotificationsTemp } from '@open-tender/js'
import { ButtonSubmit } from '..'
import {
  Checkbox,
  FormError,
  FormInputs,
  FormSubmit,
  Input,
  RadioButtonGroup,
} from '../inputs'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  { label: 'Phone', name: 'phone', type: 'tel', required: true },
  { label: 'Company', name: 'company', type: 'text' },
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
  const submitRef = useRef(null)
  const formRef = useRef(null)
  const { accepts_marketing, order_notifications } = optIns
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = error ? 'There are one or more errors below.' : null
  const errors = error || {}

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        const inputs = formRef.current.querySelectorAll('input')
        if (inputs.length) inputs[0].focus()
      }
    }
  }, [loading, error])

  useEffect(() => {
    setData(profile)
  }, [profile])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleRadio = (evt) => {
    const { name, value } = evt.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const updatedData = fields.reduce(
      (obj, i) => ({ ...obj, [i.name]: data[i.name] }),
      {}
    )
    if (accepts_marketing) {
      updatedData.accepts_marketing = data.accepts_marketing
    }
    if (order_notifications) {
      updatedData.order_notifications = data.order_notifications
    }
    update(updatedData)
    submitRef.current.blur()
  }

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
              options={optionsOrderNotificationsTemp}
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
              showLabel={true}
              required={true}
              label={accepts_marketing.title}
              id="accepts_marketing"
              on={data.accepts_marketing}
              onChange={handleChange}
              description={accepts_marketing.description}
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
