import { useRef, useState, useEffect } from 'react'

const useAddressForm = (address, loading, error, update, callback) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState(address)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const fields = [
    { label: 'Company', name: 'company', type: 'text' },
    { label: 'Contact Person', name: 'contact', type: 'text' },
    { label: 'Contact Phone', name: 'phone', type: 'tel' },
    { label: 'Description', name: 'description', type: 'text' },
    { label: 'Notes', name: 'notes', type: 'textarea' },
    { label: 'Is Default', name: 'is_default', type: 'checkbox' },
  ]

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
    const updatedData = { ...data }
    delete updatedData.customer_address_id
    delete updatedData.created_at
    delete updatedData.last_used_at
    const addressId = data.customer_address_id
    update(addressId, updatedData, callback)
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

export default useAddressForm
