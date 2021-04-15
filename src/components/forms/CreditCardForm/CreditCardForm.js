import React from 'react'
import propTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'

import { ButtonSubmit } from '../..'
import { FormError, FormSubmit } from '../../inputs'
import { CreditCardInputs } from '..'
import useCreditCardForm from './useCreditCardForm'

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
  const {
    submitRef,
    formRef,
    recaptchaRef,
    data,
    errors,
    setData,
    setCardType,
    submitting,
    handleSubmit,
  } = useCreditCardForm(
    windowRef,
    loading,
    error,
    addCard,
    callback,
    recaptchaKey
  )

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
