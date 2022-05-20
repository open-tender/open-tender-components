import { useRef, useState, useEffect } from 'react'
import { makePhone } from '@open-tender/js'

const useSignUpForm = (
  loading,
  error,
  signUp,
  callback,
  checkConfig = {},
  hasThanx = false
) => {
  const { displayed, required } = checkConfig || {}
  const companyDisplayed = displayed && displayed.customer.includes('company')
  const companyRequired = required && required.customer.includes('company')
  const submitRef = useRef(null)
  const formRef = useRef(null)
  const [data, setData] = useState({})
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
    const inputValue =
      type === 'checkbox' ? checked : id === 'phone' ? makePhone(value) : value
    setData({ ...data, [id]: inputValue })
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
    data,
    errors,
    submitting,
    formfields,
    errMsg,
    handleChange,
    handleSubmit,
  }
}

export default useSignUpForm
