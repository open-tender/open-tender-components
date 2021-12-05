import { useState, useEffect, useRef } from 'react'

const useSignInForm = (email, loading, error, login, callback) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [hasSubmit, setHasSubmit] = useState(false)
  const [data, setData] = useState({ email })
  const submitting = loading === 'pending'

  useEffect(() => {
    if (loading === 'idle' && hasSubmit) {
      if (error) {
        setHasSubmit(false)
        inputRef.current.focus()
      } else if (callback) {
        callback()
      }
    }
  }, [loading, error, hasSubmit, callback])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setHasSubmit(true)
    const { email, password } = data
    login(email, password)
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    data,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useSignInForm
