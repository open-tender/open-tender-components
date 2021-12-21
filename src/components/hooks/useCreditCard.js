import { useRef, useState } from 'react'
import {
  formatCardField,
  formatCard,
  getCardType,
  isEmpty,
  validateCreditCard,
} from '@open-tender/js'

const defaultState = {
  acct: '',
  exp: '',
  cvv: '',
  zip: '',
  is_default: false,
}

const useCreditCard = (initState, cardErrors = {}, disabled = false) => {
  const [initCard, initCardType] = formatCard(initState)
  const submitRef = useRef(null)
  const [data, setData] = useState(initCard || defaultState)
  const [cardType, setCardType] = useState(initCardType || 'OTHER')
  const [errors, setErrors] = useState(cardErrors)
  const { acct, exp, cvv, zip } = data
  const isComplete =
    acct && exp && cvv && zip && !isEmpty(errors) ? true : false

  const handleChange = (evt) => {
    let { id, checked, value } = evt.target
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
    }
    if (id === 'is_default') {
      value = checked
    } else {
      value = formatCardField(id, value)
    }
    setData({ ...data, [id]: value })
  }

  const handleBlur = (evt) => {
    let { id } = evt.target
    const { errors: validationErrors } = validateCreditCard(data, cardType)
    if (validationErrors) {
      const error = validationErrors[id]
      setErrors({ ...errors, [id]: error })
    } else {
      setErrors({ ...errors, [id]: null })
    }
  }

  return {
    submitRef,
    data,
    cardType,
    errors,
    disabled,
    setErrors,
    handleChange,
    handleBlur,
    isComplete,
  }
}

export default useCreditCard
