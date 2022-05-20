import { useMemo, useRef, useState, useEffect } from 'react'
import { makeNumeric, validateCreditCard } from '@open-tender/js'

const useDonationsForm = (
  purchase,
  reset,
  setAlert,
  loading,
  error,
  success,
  customer,
  creditCards,
  recaptchaKey,
  cardData,
  cardType
) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState('')
  const [isNewCard, setIsNewCard] = useState(true)
  const [creditCard, setCreditCard] = useState({})
  const [creditCardOptions, setCreditCardOptions] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg =
    errors.form && errors.form.includes('parameters')
      ? 'There are one or more errors below'
      : errors.form || null
  const newCardErrors = useMemo(
    () =>
      errors
        ? Object.entries(errors)
            .filter(([key]) => key !== 'form')
            .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
        : {},
    [errors]
  )

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      setAlert({ type: 'close' })
      if (error) {
        if (recaptchaRef.current) recaptchaRef.current.reset()
        setErrors(error)
        inputRef.current.focus()
        window.scrollTo(0, 0)
      } else if (success) {
        window.scrollTo(0, 0)
      }
    }
  }, [loading, error, setAlert, success])

  useEffect(() => {
    if (creditCards.length) {
      const options = creditCards.map((i) => ({
        name: `${i.card_type_name} ending in ${i.last4}`,
        value: i.customer_card_id,
      }))
      setCreditCardOptions(options)
      const defaultCard = creditCards.length
        ? { customer_card_id: creditCards[0].customer_card_id }
        : {}
      setCreditCard(defaultCard)
      setIsNewCard(false)
    } else {
      setCreditCardOptions([])
      setCreditCard({})
      setIsNewCard(true)
    }
  }, [creditCards])

  useEffect(() => {
    if (customer) {
      setEmail(customer.email)
    } else {
      setEmail('')
    }
  }, [customer])

  const handleAmount = (evt) => {
    const cleanValue = makeNumeric(evt.target.value)
    setAmount(cleanValue)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const purchaseWithCaptcha = (credit_card) => {
    const alert = {
      type: 'working',
      args: { text: 'Submitting your contribution...' },
    }
    if (recaptchaKey) {
      try {
        const token = recaptchaRef.current.getValue()
        if (!token) {
          setSubmitting(false)
          setErrors({ form: 'Please complete the recaptcha before submitting' })
          window.scrollTo(0, 0)
        } else {
          setSubmitting(true)
          setAlert(alert)
          purchase({ token, amount, email, credit_card })
        }
      } catch (err) {
        setSubmitting(false)
        setErrors({ form: 'Please complete the recaptcha before submitting' })
        window.scrollTo(0, 0)
      }
    } else {
      setSubmitting(true)
      setAlert(alert)
      purchase({ amount, email, credit_card })
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!amount || !email) {
      setErrors({ form: 'Both amount and email are required' })
      inputRef.current.focus()
      window.scrollTo(0, 0)
    } else {
      if (isNewCard) {
        const { card, errors } = validateCreditCard(cardData, cardType)
        if (errors) {
          setErrors({
            ...errors,
            form: 'There are one or more credit card errors below',
          })
          setSubmitting(false)
          window.scrollTo(0, 0)
        } else {
          purchaseWithCaptcha(card)
        }
      } else {
        purchaseWithCaptcha(creditCard)
      }
      submitRef.current.blur()
    }
  }

  const handleReset = () => {
    setErrors({})
    reset()
  }

  return {
    inputRef,
    submitRef,
    recaptchaRef,
    amount,
    handleAmount,
    email,
    handleEmail,
    errors,
    errMsg,
    newCardErrors,
    submitting,
    isNewCard,
    creditCard,
    creditCardOptions,
    handleCreditCard,
    handleSubmit,
    handleReset,
  }
}

export default useDonationsForm
