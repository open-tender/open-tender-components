import { useState, useEffect, useRef } from 'react'

const useLoginForm = (email, loading, error, connect, callback) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({ email })
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
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    connect(data, callback)
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useLoginForm
