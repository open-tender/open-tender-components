import React, { useRef, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '..'
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
  const submitRef = useRef(null)
  const inputRef = useRef(null)
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
  const amountError =
    errors.amount && errors.amount.includes('money')
      ? 'Please enter a positive dollar amount'
      : errors.amount || null

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        inputRef.current.focus()
      }
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    if (!data.customer_card_id) {
      data.customer_card_id = customerCardId
    }
    data.customer_card_id = parseInt(data.customer_card_id)
    giftCard
      ? update(giftCard.gift_card_id, data, callback)
      : add(data, callback)
    submitRef.current.blur()
  }

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Amount"
          name="amount"
          type="number"
          value={data.amount}
          onChange={handleChange}
          error={amountError}
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
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : giftCard ? 'Add Value' : 'Purchase'}
        </ButtonSubmit>
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
