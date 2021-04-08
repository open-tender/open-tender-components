import { useState, useEffect, useRef } from 'react'

const useOrderFulfillmentForm = (
  orderId,
  fulfillment,
  loading,
  error,
  update,
  settings,
  showAllFields = false
) => {
  const submitRef = useRef(null)
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errors = error || {}
  const empty = Object.values(fulfillment).every((i) => !i)
  const fields =
    !empty && !showAllFields
      ? settings.fields.filter((i) => i.name.startsWith('arrival'))
      : settings.fields

  useEffect(() => {
    if (loading === 'idle') setSubmitting(false)
  }, [loading])

  useEffect(() => {
    setData(fulfillment)
  }, [fulfillment])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    update(orderId, { ...data, has_arrived: true })
    submitRef.current.blur()
  }

  return {
    submitRef,
    fields,
    data,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  }
}

export default useOrderFulfillmentForm
