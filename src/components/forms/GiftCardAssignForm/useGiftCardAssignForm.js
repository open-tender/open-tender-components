import { useState, useEffect, useRef } from 'react'

const useGiftCardAssignForm = (loading, error, assign, callback) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [cardNumber, setCardNumber] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

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
    setCardNumber(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const card_number = parseInt(cardNumber)
    if (isNaN(card_number)) {
      setErrors({ card_number: 'Card numbers must be all digits' })
      inputRef.current.focus()
    } else {
      assign(card_number, callback)
      submitRef.current.blur()
    }
  }

  return {
    submitRef,
    inputRef,
    cardNumber,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useGiftCardAssignForm
