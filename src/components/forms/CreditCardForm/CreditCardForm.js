import React from 'react'
import propTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'

import { ButtonSubmit, CreditCard, useCreditCard } from '../..'
import { Checkbox, FormError, FormRecaptcha, FormSubmit } from '../../inputs'
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
  cardIconMap = {},
  revenue_center_id = null,
}) => {
  const {
    data,
    cardType,
    errors,
    setErrors,
    disabled,
    handleChange,
    handleBlur,
  } = useCreditCard(null)
  const { submitRef, formRef, recaptchaRef, submitting, handleSubmit } =
    useCreditCardForm(
      windowRef,
      loading,
      error,
      data,
      cardType,
      setErrors,
      addCard,
      callback,
      recaptchaKey,
      revenue_center_id
    )

  return (
    <form
      id="credit-card-form"
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
    >
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <CreditCard
        data={data}
        cardType={cardType}
        errors={errors}
        handleChange={handleChange}
        handleBlur={handleBlur}
        disabled={disabled}
        cardIconMap={cardIconMap}
      />
      <Checkbox
        label="Set as Default Card"
        id="is_default"
        on={data.is_default}
        onChange={handleChange}
        disabled={disabled}
      />
      {recaptchaKey && (
        <FormRecaptcha>
          <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} />
        </FormRecaptcha>
      )}
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
  cardIconMap: propTypes.object,
  revenue_center_id: propTypes.number,
}

export default CreditCardForm
