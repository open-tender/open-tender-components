import { useState, useEffect, useRef } from 'react'

const useGuestForm = (email, loading, errors, checkGuest) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({})
  const submitting = loading === 'pending'
  const errMsg = errors ? errors.email || errors.form : null

  useEffect(() => {
    if (loading === 'idle') {
      if (errMsg) inputRef.current.focus()
    }
  }, [loading, errMsg])

  useEffect(() => {
    if (email && !data.email) {
      setData({ email })
    }
  }, [email, data.email])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const { email } = data
    checkGuest(email)
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    data,
    errMsg,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useGuestForm
