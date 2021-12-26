import { useRef, useState, useEffect } from 'react'
import { makePhone } from '@open-tender/js'

const useProfileForm = (profile, loading, error, update, optIns = {}) => {
  const submitRef = useRef(null)
  const formRef = useRef(null)
  const { accepts_marketing, order_notifications } = optIns
  const [data, setData] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = error ? 'There are one or more errors below.' : null
  const errors = error || {}
  const fields = [
    { label: 'First Name', name: 'first_name', type: 'text', required: true },
    { label: 'Last Name', name: 'last_name', type: 'text', required: true },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      required: true,
      autoComplete: 'email',
    },
    { label: 'Phone', name: 'phone', type: 'tel', required: true },
    { label: 'Company', name: 'company', type: 'text' },
  ]

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        const inputs = formRef.current.querySelectorAll('input')
        if (inputs.length) inputs[0].focus()
      }
    }
  }, [loading, error])

  useEffect(() => {
    setData(profile)
  }, [profile])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue =
      type === 'checkbox' ? checked : id === 'phone' ? makePhone(value) : value
    setData({ ...data, [id]: inputValue })
  }

  const handleRadio = (evt) => {
    const { name, value } = evt.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setSubmitting(true)
    const updatedData = fields.reduce(
      (obj, i) => ({ ...obj, [i.name]: data[i.name] }),
      {}
    )
    if (accepts_marketing) {
      updatedData.accepts_marketing = data.accepts_marketing
    }
    if (order_notifications) {
      updatedData.order_notifications = data.order_notifications
    }
    update(updatedData)
    submitRef.current.blur()
  }

  return {
    submitRef,
    formRef,
    accepts_marketing,
    order_notifications,
    data,
    errors,
    submitting,
    fields,
    errMsg,
    handleChange,
    handleRadio,
    handleSubmit,
  }
}

export default useProfileForm
