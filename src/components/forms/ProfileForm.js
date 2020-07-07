import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'

const fields = [
  { label: 'First Name', name: 'first_name', type: 'text', required: true },
  { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  { label: 'Email', name: 'email', type: 'email', required: true },
  { label: 'Phone', name: 'phone', type: 'tel', required: true },
  { label: 'Company', name: 'company', type: 'text' },
]

const AccountProfile = ({ profile, loading, error, update }) => {
  const submitButton = useRef()
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errors = error || {}

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
  }, [loading])

  useEffect(() => {
    setData(profile)
  }, [profile])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const updatedData = fields.reduce(
      (obj, i) => ({ ...obj, [i.name]: data[i.name] }),
      {}
    )
    update(updatedData)
    submitButton.current.blur()
  }

  return (
    <form id="account-form" className="form" onSubmit={handleSubmit} noValidate>
      <div className="section__rows">
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={data[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            required={field.required}
          />
        ))}
      </div>
      <div className="section__submit">
        <input
          className="ot-btn"
          type="submit"
          value="Update Account"
          disabled={submitting}
          ref={submitButton}
        />
      </div>
    </form>
  )
}

AccountProfile.displayName = 'AccountProfile'
AccountProfile.propTypes = {
  profile: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
}

export default AccountProfile
