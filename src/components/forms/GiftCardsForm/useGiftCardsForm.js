import { useMemo, useRef, useState, useEffect } from 'react'
import { validateCreditCard } from '@open-tender/js'

const useGiftCardsForm = (
  purchase,
  reset,
  loading,
  error,
  success,
  setAlert,
  customer = {},
  creditCards = [],
  recaptchaKey = null,
  initState,
  cardData,
  cardType
) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [cards, setCards] = useState([initState])
  const [isNewCard, setIsNewCard] = useState(true)
  const [creditCard, setCreditCard] = useState({})
  const [creditCardOptions, setCreditCardOptions] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const url = window.location.origin
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
        const inputs = formRef.current.querySelectorAll('input, select')
        if (inputs.length) inputs[0].focus()
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
    }
  }, [creditCards])

  useEffect(() => {
    if (customer) {
      setEmail(customer.email)
      setName(`${customer.first_name} ${customer.last_name}`)
    }
  }, [customer])

  const makeGiftCards = (giftCards) => {
    return giftCards.reduce((arr, card) => {
      const { amount, quantity, email } = card
      const giftCard = !email || !email.length ? { amount, quantity } : card
      return [...arr, giftCard]
    }, [])
  }

  const handleName = (evt) => {
    setName(evt.target.value)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const [field, index] = id.split('-')
    const newCards = cards.map((card, idx) => {
      return idx === parseInt(index) ? { ...card, [field]: value } : card
    })
    setCards(newCards)
  }

  const handleQuantity = (index, quantity) => {
    const newCards =
      quantity > 0
        ? cards.map((card, idx) => {
            return idx === parseInt(index)
              ? { ...card, quantity: quantity }
              : card
          })
        : cards.filter((i, idx) => idx !== index)
    setCards(newCards)
  }

  const handleAddAnother = () => {
    setCards([...cards, initState])
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const purchaseWithCaptcha = (credit_card) => {
    const alert = {
      type: 'working',
      args: { text: 'Submitting your purchase...' },
    }
    if (recaptchaKey) {
      try {
        const token = recaptchaRef.current.getValue()
        if (!token) {
          setSubmitting(false)
          setErrors({
            form: 'Please complete the recaptcha before submitting',
          })
          window.scrollTo(0, 0)
        } else {
          setSubmitting(true)
          setAlert(alert)
          const gift_cards = makeGiftCards(cards)
          purchase({ token, credit_card, name, email, url, gift_cards })
        }
      } catch (err) {
        setSubmitting(false)
        setErrors({ form: 'Please complete the recaptcha before submitting' })
        window.scrollTo(0, 0)
      }
    } else {
      setSubmitting(true)
      setAlert(alert)
      const gift_cards = makeGiftCards(cards)
      purchase({ credit_card, name, email, url, gift_cards })
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!name || !email) {
      setErrors({ form: 'Both name and email are required' })
      if (inputRef.current) inputRef.current.focus()
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
    setCards([initState])
    setErrors({})
    reset()
  }

  return {
    formRef,
    inputRef,
    submitRef,
    recaptchaRef,
    creditCardOptions,
    handleName,
    handleEmail,
    handleChange,
    handleQuantity,
    handleAddAnother,
    handleCreditCard,
    handleSubmit,
    handleReset,
    name,
    email,
    cards,
    isNewCard,
    newCardErrors,
    creditCard,
    setCreditCard,
    errors,
    submitting,
  }
}

export default useGiftCardsForm
