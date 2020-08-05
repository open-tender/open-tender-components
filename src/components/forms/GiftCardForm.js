import React, { useState, useRef, useEffect } from 'react'
import propTypes from 'prop-types'
import { Input, Select } from '../index'

const GiftCardForm = ({
  giftCard,
  creditCards,
  loading,
  error,
  update,
  add,
  callback,
}) => {
  const submitButton = useRef()
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
    submitButton.current.blur()
  }

  return (
    <form id="address-form" className="form" onSubmit={handleSubmit} noValidate>
      {errors.form && (
        <div className="form__error form__error--top ot-form-error">
          {errors.form}
        </div>
      )}
      <div className="form__inputs">
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
      </div>
      <div className="form__submit">
        <button
          className="ot-btn"
          type="submit"
          disabled={submitting}
          ref={submitButton}
        >
          {submitting ? 'Submitting' : giftCard ? 'Add Value' : 'Purchase'}
        </button>
      </div>
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
