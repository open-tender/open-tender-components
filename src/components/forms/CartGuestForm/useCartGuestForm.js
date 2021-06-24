import { useRef, useState, useEffect } from 'react'

const useCartGuestForm = (loading, errMsg, cartId, joinCart) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({ cart_id: cartId })
  const [submitting, setSubmitting] = useState(false)
  const fields = [
    { label: 'First Name', name: 'first_name', type: 'text', required: true },
    { label: 'Last Name', name: 'last_name', type: 'text', required: true },
  ]

  console.log(fields)

  useEffect(() => {
    return () => {
      setData({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (errMsg) {
        inputRef.current.focus()
      }
    }
  }, [loading, errMsg])

  const handleChange = (evt) => {
    const { id, value } = evt.target
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    joinCart(data)
    submitRef.current.blur()
  }

  return {
    submitRef,
    inputRef,
    fields,
    data,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useCartGuestForm
