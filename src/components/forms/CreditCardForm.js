import React, { useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import { validateCreditCard } from '@open-tender/js'
import { ButtonSubmit } from '..'
import { FormError, FormSubmit } from '../inputs'
import { CreditCardInputs } from '.'

const CreditCardForm = ({
  windowRef,
  loading,
  error,
  addCard,
  callback,
  submitText = 'Add New Card',
  submittingText = 'Authorizing Card...',
  recaptchaKey,
}) => {
  const submitRef = useRef(null)
  const formRef = useRef(null)
  const recaptchaRef = useRef(null)
  const [data, setData] = useState({})
  const [cardType, setCardType] = useState('OTHER')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      if (error) {
        if (recaptchaRef.current) recaptchaRef.current.reset()
        setErrors(error)
        const inputs = formRef.current.querySelectorAll('input, select')
        if (inputs.length) inputs[0].focus()
        if (windowRef) windowRef.current.scrollTop = 0
      }
    }
  }, [windowRef, loading, error])

  const handleSubmit = (evt) => {
    evt.preventDefault()
    setErrors({})
    const { card, errors: cardErrors } = validateCreditCard(data, cardType)
    if (cardErrors) {
      setErrors(cardErrors)
      setSubmitting(false)
      if (windowRef) windowRef.current.scrollTop = 0
    } else {
      if (recaptchaKey) {
        try {
          const token = recaptchaRef.current.getValue()
          if (!token) {
            setSubmitting(false)
            setErrors({
              form: 'Please complete the recaptcha before submitting',
            })
            if (windowRef) windowRef.current.scrollTop = 0
          } else {
            setSubmitting(true)
            addCard({ ...card, token }, callback)
          }
        } catch (err) {
          setSubmitting(false)
          setErrors({ form: 'Please complete the recaptcha before submitting' })
          if (windowRef) windowRef.current.scrollTop = 0
        }
      } else {
        setSubmitting(true)
        addCard(card, callback)
      }
    }
    submitRef.current.blur()
  }

  return (
    <form
      id="credit-card-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
    >
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <CreditCardInputs
        data={data}
        update={setData}
        setCardType={setCardType}
        errors={errors}
      />
      {recaptchaKey && <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} />}
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
  recaptchaKey: propTypes.string,
}

export default CreditCardForm
