import React from 'react'
import propTypes from 'prop-types'
import ReCAPTCHA from 'react-google-recaptcha'
import { CreditCardInputs } from '..'
import { ButtonStyled, ButtonSubmit, Input } from '../..'
import {
  FormError,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormSubmit,
  Select,
} from '../../inputs'
import { useDonationForm } from '.'

const handleAmountError = (error) => {
  if (!error) return null
  return error.includes('money') ? 'Amount must be a positive number' : error
}

const DonationForm = ({
  purchase,
  reset,
  setAlert,
  loading,
  error,
  success,
  donation,
  customer,
  creditCards = [],
  recaptchaKey = null,
}) => {
  const {
    inputRef,
    submitRef,
    recaptchaRef,
    amount,
    handleAmount,
    email,
    handleEmail,
    errors,
    errMsg,
    newCardErrors,
    submitting,
    isNewCard,
    creditCard,
    creditCardOptions,
    setCreditCard,
    setCardType,
    handleCreditCard,
    handleSubmit,
    handleReset,
  } = useDonationForm(
    purchase,
    reset,
    setAlert,
    loading,
    error,
    success,
    customer,
    creditCards,
    recaptchaKey
  )

  return success ? (
    <FormFieldset>
      <FormLegend
        as="div"
        title="Success! Please check your email for your receipt."
        subtitle={`Thanks for your contribution of $${donation.amount}. We really
            appreciate it.`}
      />
      <FormSubmit>
        <ButtonStyled onClick={handleReset}>
          Make Another Contribution
        </ButtonStyled>
      </FormSubmit>
    </FormFieldset>
  ) : (
    <>
      <form id="donation-form" onSubmit={handleSubmit} noValidate>
        <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        <FormFieldset>
          <FormLegend
            as="div"
            title="Enter an amount and an email address"
            subtitle="We'll send a receipt to the email address you enter below."
          />
          <FormInputs>
            <Input
              ref={inputRef}
              label="Contribution Amount"
              name="amount"
              type="text"
              pattern="[0-9]*"
              value={amount}
              onChange={handleAmount}
              error={handleAmountError(errors.amount)}
              required={true}
            />
            <Input
              label="Your Email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmail}
              error={errors.email}
              required={true}
              disabled={customer ? true : false}
            />
          </FormInputs>
        </FormFieldset>
        <FormFieldset>
          {!isNewCard && creditCards.length > 0 ? (
            <>
              <FormLegend
                as="div"
                title="Add your payment information"
                subtitle="Choose an existing credit card or add new one from your
                  account page."
              />
              <FormInputs>
                <Select
                  label="Choose Card"
                  name="credit_card"
                  value={creditCard.customer_card_id}
                  onChange={handleCreditCard}
                  error={errors.credit_card}
                  required={true}
                  options={creditCardOptions}
                />
              </FormInputs>
            </>
          ) : (
            <>
              <FormLegend
                as="div"
                title="Add your payment information"
                subtitle="Please enter your payment info below."
              />
              <CreditCardInputs
                data={creditCard}
                update={setCreditCard}
                setCardType={setCardType}
                errors={newCardErrors}
              />
            </>
          )}
          {recaptchaKey && (
            <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} />
          )}
          <FormSubmit style={{ margin: '3rem 0 0' }}>
            <ButtonSubmit submitRef={submitRef} submitting={submitting}>
              {submitting ? 'Submitting...' : 'Submit Contribution'}
            </ButtonSubmit>
          </FormSubmit>
        </FormFieldset>
      </form>
    </>
  )
}

DonationForm.displayName = 'DonationForm'
DonationForm.propTypes = {
  purchase: propTypes.func,
  reset: propTypes.func,
  setAlert: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  donation: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
  recaptchaKey: propTypes.string,
}

export default DonationForm
