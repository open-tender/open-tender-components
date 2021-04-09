import { useState, useEffect, useRef } from 'react'

const useGiftCardAssignOtherForm = (
  loading,
  error,
  giftCardId,
  assign,
  callback
) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [email, setEmail] = useState('')
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
    setEmail(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    assign(giftCardId, email, callback)
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    email,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useGiftCardAssignOtherForm
