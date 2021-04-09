import { useState, useEffect, useRef } from 'react'

const useGiftCardForm = (
  giftCard,
  creditCards,
  loading,
  error,
  update,
  add,
  callback
) => {
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

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        if (error.amount && error.amount.includes('money')) {
          error.amount = 'Please enter a positive dollar amount'
        }
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

  return {
    submitRef,
    inputRef,
    options,
    errors,
    data,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useGiftCardForm
