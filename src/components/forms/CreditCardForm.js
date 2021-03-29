import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import {
  getCardType,
  makeAcctNumber,
  makeNumeric,
  validateCreditCard,
} from '@open-tender/js'
import { ButtonSubmit } from '..'
import { FormError, FormInputs, FormSubmit, Input } from '../inputs'

const fields = [
  {
    label: 'Card Number',
    placeholder: '#### #### #### ####',
    name: 'acct',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-number',
  },
  {
    label: 'Expiration',
    placeholder: 'MMYY',
    name: 'exp',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-exp',
  },
  {
    label: 'CVV',
    placeholder: '###',
    name: 'cvv',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-csc',
  },
  {
    label: 'Zip Code',
    placeholder: '#####',
    name: 'zip',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'postal-code',
  },
]

const CreditCardForm = ({
  windowRef,
  loading,
  error,
  addCard,
  callback,
  submitText = 'Add New Card',
  submittingText = 'Authorizing Card...',
  children,
}) => {
  const submitRef = useRef(null)
  const inputRef = useRef(null)
  const [data, setData] = useState({})
  const [cardType, setCardType] = useState('OTHER')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

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
    let { id, checked, value } = evt.target
    const cleanValue = makeNumeric(value)
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
      value = makeAcctNumber(value, currentType)
    } else if (id === 'exp') {
      value = cleanValue.slice(0, 4)
    } else if (id === 'cvv') {
      value = cleanValue.slice(0, 4)
    } else if (id === 'zip') {
      value = cleanValue.slice(0, 5)
    } else if (id === 'save') {
      value = checked
    }
    setData({ ...data, [id]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    const { card, errors } = validateCreditCard(data, cardType)
    if (errors) {
      setErrors(errors)
      setSubmitting(false)
      if (windowRef) windowRef.current.scrollTop = 0
    } else {
      setSubmitting(true)
      addCard(card, callback)
    }
    submitRef.current.blur()
  }

  return (
    <form id="credit-card-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        {fields.map((field, index) => (
          <Input
            ref={index === 0 ? inputRef : null}
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            pattern={field.pattern}
            autoComplete={field.autoComplete}
            value={data[field.name]}
            placeholder={field.placeholder}
            onChange={handleChange}
            error={errors[field.name]}
            required={field.required}
          />
        ))}
      </FormInputs>
      {children}
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? submittingText : submitText}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

CreditCardForm.displayName = 'CreditCardForm'
CreditCardForm.propTypes = {
  windowRef: propTypes.shape({ current: propTypes.any }),
  loading: propTypes.string,
  error: propTypes.object,
  addCard: propTypes.func,
  callback: propTypes.func,
  submitText: propTypes.string,
  submittingText: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CreditCardForm
