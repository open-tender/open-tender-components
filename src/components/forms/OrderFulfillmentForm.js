import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input } from '../index'

const OrderFulfillmentForm = ({
  orderId,
  fulfillment,
  loading,
  error,
  update,
  settings,
}) => {
  const submitButton = useRef()
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errors = error || {}
  const empty = Object.values(fulfillment).every((i) => !i)
  const fields = !empty
    ? settings.fields.filter((i) => i.name.startsWith('arrival'))
    : settings.fields

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
  }, [loading])

  useEffect(() => {
    setData(fulfillment)
  }, [fulfillment])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    update(orderId, { ...data, has_arrived: true })
    submitButton.current.blur()
  }

  return (
    <form
      id="order-fulfillment-form"
      className="form"
      onSubmit={handleSubmit}
      noValidate
    >
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
            autoComplete={field.autoComplete}
            disabled={data.has_arrived}
          />
        ))}
      </div>
      <div className="section__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting || data.has_arrived}
          ref={submitButton}
        >
          {settings.button}
        </button>
      </div>
    </form>
  )
}

OrderFulfillmentForm.displayName = 'OrderFulfillmentForm'
OrderFulfillmentForm.propTypes = {
  orderId: propTypes.number,
  fulfillment: propTypes.object,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  settings: propTypes.object,
}

export default OrderFulfillmentForm
