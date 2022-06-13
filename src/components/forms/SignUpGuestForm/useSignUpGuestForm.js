import { useRef, useState, useEffect } from 'react'
import { checkEmpty, checkGuestData, makePhone } from '@open-tender/js'

const initialData = {
  first_name: '',
  last_name: '',
  phone: '',
  password: '',
}

const useSignUpGuestForm = (
  email,
  guest,
  loading,
  error,
  signUp,
  submitGuest,
  hasThanx
) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const initData = { ...initialData, ...guest }
  const [data, setData] = useState(initData)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const { guestData, guestIncomplete } = checkGuestData(data, email)
  const isIncomplete = hasThanx ? guestIncomplete : checkEmpty(data)
  const isLoading = loading === 'pending'
  const disabled = isIncomplete || isLoading
  const guestDisabled = guestIncomplete || isLoading
  const errMsg = error?.form ? 'There are one or more errors below' : null

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const val = id === 'phone' ? makePhone(value) : value
    setData({ ...data, [id]: val })
  }

  useEffect(() => {
    return () => {
      setData({})
      setErrors({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        inputRef.current.focus()
      }
    }
  }, [loading, error])

  const handleSubmit = (evt) => {
    if (!disabled) {
      evt.preventDefault()
      setErrors({})
      setSubmitting(true)
      signUp({ ...data, email })
      submitRef.current.blur()
    }
  }

  const handleGuest = () => {
    if (!guestDisabled) {
      setErrors({})
      setSubmitting(true)
      submitGuest({ ...guestData, email })
    }
  }

  return {
    submitRef,
    inputRef,
    data,
    disabled,
    guestDisabled,
    errors,
    errMsg,
    submitting,
    handleChange,
    handleSubmit,
    handleGuest,
  }
}

export default useSignUpGuestForm
