import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonStyled } from '..'
import { FormError, FormInputs, FormSubmit, Input, Select } from '../inputs'

const GiftCardForm = ({
  giftCard,
  creditCards,
  loading,
  error,
  update,
  add,
  callback,
}) => {
  const customerCardId = creditCards[0].customer_card_id
  const [data, setData] = useState({ customer_card_id: customerCardId })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const options = creditCards.map((i) => {
    return {
      name: `${i.card_type_name} ending in ${i.last4}`,
      value: i.customer_card_id,
    }
  })

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
    if (error) setErrors(error)
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = () => {
    setSubmitting(true)
    if (!data.customer_card_id) {
      data.customer_card_id = customerCardId
    }
    data.customer_card_id = parseInt(data.customer_card_id)
    giftCard
      ? update(giftCard.gift_card_id, data, callback)
      : add(data, callback)
  }

  return (
    <form id="gift-card-form" noValidate>
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          label="Amount"
          name="amount"
          type="number"
          value={data.amount}
          onChange={handleChange}
          error={errors.amount}
          required={true}
        />
        <Select
          label="Credit Card"
          name="customer_card_id"
          value={data.customer_card_id}
          onChange={handleChange}
          error={errors.customer_card_id}
          required={true}
          options={options}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonStyled onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Submitting' : giftCard ? 'Add Value' : 'Purchase'}
        </ButtonStyled>
      </FormSubmit>
    </form>
  )
}

GiftCardForm.displayName = 'GiftCardForm'
GiftCardForm.propTypes = {
  giftCard: propTypes.object,
  creditCards: propTypes.array,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  add: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardForm
