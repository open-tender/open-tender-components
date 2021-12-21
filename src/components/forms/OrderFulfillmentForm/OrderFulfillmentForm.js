import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit, Text } from '../..'
import { FormInputs, FormSubmit, Input } from '../../inputs'
import { useOrderFulfillmentForm } from '.'

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
  const {
    submitRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useOrderFulfillmentForm(
    orderId,
    fulfillment,
    loading,
    error,
    update,
    settings
  )

  return (
    <form id="order-fulfillment-form" onSubmit={handleSubmit} noValidate>
      <FormInputs>
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            type="text"
            // placeholder={field.placeholder}
            value={data[field.name]}
            onChange={handleChange}
            error={errors[field.name]}
            disabled={data.has_arrived}
          />
        ))}
      </FormInputs>
      <FormSubmit>
        {data.has_arrived ? (
          <Text color="alert" as="p">
            {arrivedText}
          </Text>
        ) : (
          <ButtonSubmit submitRef={submitRef} submitting={submitting}>
            {submitting ? 'Submitting' : settings.button}
          </ButtonSubmit>
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
