import { useRef, useState, useEffect } from 'react'

const useSignUpForm = (
  loading,
  error,
  signUp,
  callback,
  optIns = {},
  checkConfig = {},
  hasThanx = false
) => {
  const { displayed, required } = checkConfig || {}
  const companyDisplayed = displayed && displayed.customer.includes('company')
  const companyRequired = required && required.customer.includes('company')
  const submitRef = useRef(null)
  const formRef = useRef(null)
  const { accepts_marketing, order_notifications } = optIns
  const initialState = {
    accepts_marketing: accepts_marketing ? accepts_marketing.default : false,
    order_notifications: order_notifications
      ? order_notifications.default
      : 'NONE',
  }
  const [data, setData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const errMsg = error ? 'There are one or more errors below.' : null
  let fields = [
    {
      label: 'First Name',
      name: 'first_name',
      type: 'text',
      required: true,
    },
    {
      label: 'Last Name',
      name: 'last_name',
      type: 'text',
      required: true,
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
      required: true,
      autoComplete: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      required: true,
      autoComplete: 'new-password',
    },
    { label: 'Phone', name: 'phone', type: 'tel', required: true },
  ]
  if (companyDisplayed || companyRequired) {
    const company = {
      label: 'Company',
      name: 'company',
      type: 'text',
      required: companyRequired,
    }
    fields = [...fields, company]
  }
  const formfields = hasThanx
    ? fields.filter((i) => i.name !== 'password')
    : fields

  useEffect(() => {
    return () => {
      setData({})
      setErrors({})
    }
  }, [])

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        setErrors(error)
        const inputs = formRef.current.querySelectorAll('input')
        if (inputs.length) inputs[0].focus()
      }
    }
  }, [loading, error])

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    setData({ ...data, [id]: inputValue })
  }

  const handleRadio = (evt) => {
    const { name, value } = evt.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    setSubmitting(true)
    signUp(data, callback)
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
    formfields,
    errMsg,
    handleChange,
    handleRadio,
    handleSubmit,
  }
}

export default useSignUpForm
