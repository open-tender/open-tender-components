import { useState, useEffect, useRef } from 'react'

const useSendResetForm = (loading, error, sendReset, callback) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({})
  const errMsg = error && error.email ? error.email : null

  useEffect(() => {
    if (loading === 'idle' && error) {
      inputRef.current.focus()
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const linkUrl = `${window.location.origin}/reset-password`
    sendReset(data.email, linkUrl).then(() => {
      if (callback) callback()
    })
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    data,
    errMsg,
    handleChange,
    handleSubmit,
  }
}

export default useSendResetForm
