import { useState, useEffect, useRef } from 'react'

const useLoginForm = (loading, error, login, callback) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({})
  const submitting = loading === 'pending'

  useEffect(() => {
    if (loading === 'idle') {
      if (error) inputRef.current.focus()
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { email, password } = data
    login(email, password).then(() => {
      if (callback) callback()
    })
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

export default useLoginForm
