import { useState, useEffect, useRef } from 'react'
import { validateCreditCard } from '@open-tender/js'

const useCreditCardForm = (
  windowRef,
  loading,
  error,
  data,
  cardType,
  setErrors,
  addCard,
  callback,
  recaptchaKey,
  revenue_center_id
) => {
  const submitRef = useRef(null)
  const formRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        if (recaptchaRef.current) recaptchaRef.current.reset()
        setErrors(error)
        const inputs = formRef.current.querySelectorAll('input, select')
        if (inputs.length) inputs[0].focus()
        if (windowRef) windowRef.current.scrollTop = 0
      }
    }
  }, [windowRef, loading, error, setErrors])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    const { card, errors: cardErrors } = validateCreditCard(data, cardType)
    if (cardErrors) {
      setErrors(cardErrors)
      setSubmitting(false)
      if (windowRef) windowRef.current.scrollTop = 0
    } else {
      const cardRc = revenue_center_id ? { ...card, revenue_center_id } : card
      if (recaptchaKey) {
        try {
          const token = recaptchaRef.current.getValue()
          if (!token) {
            setSubmitting(false)
            setErrors({
              form: 'Please complete the recaptcha before submitting',
            })
            if (windowRef) windowRef.current.scrollTop = 0
          } else {
            setSubmitting(true)
            addCard({ ...cardRc, token }, callback)
          }
        } catch (err) {
          setSubmitting(false)
          setErrors({
            form: 'Please complete the recaptcha before submitting',
          })
          if (windowRef) windowRef.current.scrollTop = 0
        }
      } else {
        setSubmitting(true)
        addCard(cardRc, callback)
      }
    }
    submitRef.current.blur()
  }

  return {
    submitRef,
    formRef,
    recaptchaRef,
    data,
    submitting,
    handleSubmit,
  }
}

export default useCreditCardForm
