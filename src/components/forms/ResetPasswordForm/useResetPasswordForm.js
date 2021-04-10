import { useState, useEffect, useRef } from 'react'

const useResetPasswordForm = (loading, error, reset, resetForm, resetToken) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const fields = [
    { label: 'New Password', name: 'new_password', type: 'password' },
    { label: 'Confirm Password', name: 'confirm', type: 'password' },
  ]

  useEffect(() => {
    setData({})
    setErrors({})
    resetForm()
    return () => {
      setData({})
      setErrors({})
      resetForm()
    }
  }, [resetForm])

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
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { new_password, confirm } = data
    if (!new_password || new_password.length < 8) {
      setErrors({ new_password: 'Must be at least 8 characters' })
      inputRef.current.focus()
    } else if (new_password !== confirm) {
      setErrors({ confirm: 'Passwords do not match' })
      inputRef.current.focus()
    } else {
      setErrors({})
      setSubmitting(true)
      reset(new_password, resetToken)
    }
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useResetPasswordForm
