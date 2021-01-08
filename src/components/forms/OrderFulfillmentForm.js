import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonStyled, Input } from '../index'
import { FormInputs, FormSubmit } from '../inputs'

const arrivedText =
  "Thanks for letting us know you've arrived! We'll be out with your order shortly."

const OrderFulfillmentForm = ({
  orderId,
  fulfillment,
  loading,
  error,
  update,
  settings,
}) => {
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

  const handleSubmit = () => {
    setSubmitting(true)
    update(orderId, { ...data, has_arrived: true })
  }

  return (
    <form id="order-fulfillment-form" noValidate>
      <FormInputs>
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            value={data[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            disabled={data.has_arrived}
          />
        ))}
      </FormInputs>
      <FormSubmit>
        {data.has_arrived ? (
          <p>{arrivedText}</p>
        ) : (
          <ButtonStyled
            onClick={handleSubmit}
            disabled={submitting || data.has_arrived}
          >
            {submitting ? 'Submitting' : settings.button}
          </ButtonStyled>
        )}
      </FormSubmit>
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
