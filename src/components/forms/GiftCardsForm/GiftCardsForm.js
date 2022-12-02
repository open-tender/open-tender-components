import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  ButtonStyled,
  ButtonSubmit,
  CreditCard,
  Input,
  useCreditCard,
} from '../..'
import {
  FormError,
  FormFieldset,
  FormLegend,
  FormInputs,
  FormRecaptcha,
  FormSubmit,
  Quantity,
  SelectOnly,
  Select,
} from '../../inputs'
import useGiftCardForm from './useGiftCardsForm'

const GiftCardsRow = styled.div`
  width: 100%;
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  label {
    margin: 0;
  }

  > span {
    &:first-of-type {
      flex: 0 0 12rem;
      margin: 0 1rem 0 0;
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        flex: 0 0 8rem;
      }
    }

    &:last-of-type {
      flex-grow: 1;
      margin: 0 0 0 1rem;

      input {
        outline: none;
      }
    }
  }
`

const GiftCardsTable = styled('table')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  margin: 0 0 3rem;
`

const GiftCardsForm = ({
  purchase,
  reset,
  loading,
  error,
  success,
  purchasedCards,
  setAlert,
  iconMap,
  customer = {},
  creditCards = [],
  recaptchaKey = null,
  cardIconMap = {},
}) => {
  const amounts = ['10.00', '25.00', '50.00', '100.00', '500.00']
  const options = amounts.map((i) => ({
    name: `$${parseFloat(i).toFixed(0)}`,
    value: i,
  }))
  const initState = { amount: '10.00', quantity: 1, email: '' }
  const {
    data: cardData,
    cardType,
    errors: cardErrors,
    disabled,
    handleChange: handleCardChange,
    handleBlur,
  } = useCreditCard(null)
  const {
    formRef,
    inputRef,
    submitRef,
    recaptchaRef,
    creditCard,
    creditCardOptions,
    handleName,
    handleEmail,
    handleChange,
    handleQuantity,
    handleAddAnother,
    handleCreditCard,
    handleSubmit,
    handleReset,
    name,
    email,
    cards,
    isNewCard,
    newCardErrors,
    errors,
    submitting,
  } = useGiftCardForm(
    purchase,
    reset,
    loading,
    error,
    success,
    setAlert,
    customer,
    creditCards,
    recaptchaKey,
    initState,
    cardData,
    cardType
  )
  const errMsg =
    errors.form && errors.form.includes('parameters')
      ? 'There are one or more errors below'
      : errors.form || null
  const allCardErrors = { ...cardErrors, ...newCardErrors }

  return success ? (
    <FormFieldset>
      <FormLegend
        as="div"
        title="Success! Please check your email for your receipt and assigned gift
          cards."
        subtitle="Below is the list of gift cards you purchased."
        style={{ textAlign: 'center' }}
      />
      {purchasedCards && (
        <GiftCardsTable>
          <thead>
            <tr>
              <th>Card Number</th>
              <th>Recipient</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {purchasedCards.map((i) => (
              <tr key={i.card_number}>
                <td>{i.card_number}</td>
                <td>{i.email || 'none'}</td>
                <td>${i.balance}</td>
              </tr>
            ))}
          </tbody>
        </GiftCardsTable>
      )}
      <FormSubmit>
        <ButtonStyled onClick={handleReset}>
          Purchase More Gift Cards
        </ButtonStyled>
      </FormSubmit>
    </FormFieldset>
  ) : (
    <>
      <form
        id="gift-cards-form"
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
      >
        <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        {!customer && (
          <FormFieldset>
            <FormLegend
              as="div"
              title="Enter your name and email address"
              subtitle="We'll send a receipt and your purchased gift card numbers to
                the email address you enter below."
            />
            <FormInputs>
              <Input
                ref={inputRef}
                label="Your Name"
                name="name"
                type="text"
                value={name}
                onChange={handleName}
                error={errors.name}
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
              />
            </FormInputs>
          </FormFieldset>
        )}
        <FormFieldset>
          <FormLegend
            as="div"
            title="Add your gift cards"
            subtitle="You can purchase one or more gift cards and optionally enter an
                email address to gift the gift card to someone else (the
                recipient will receive an email notification, and the card will
                automatically be added to their account if they have one or
                create a new one)."
          />
          <FormInputs>
            {cards.map((card, index) => (
              <>
                <GiftCardsRow key={`card-${index}`}>
                  <SelectOnly
                    label={`Gift card ${index} amount`}
                    name={`amount-${index}`}
                    value={card.amount}
                    onChange={handleChange}
                    error={errors[`amount-${index}`]}
                    required={true}
                    options={options}
                  />
                  <Quantity
                    id={`gift-card-quantity-${index}`}
                    name={`Gift card ${index}`}
                    quantity={card.quantity}
                    update={(quantity) => handleQuantity(index, quantity)}
                    iconMap={iconMap}
                  />
                  {/* <span>
                    <input
                      aria-label={`Gift card ${index} email recipient`}
                      id={`email-${index}`}
                      name={`email-${index}`}
                      type="email"
                      autoComplete={null}
                      value={card.email}
                      placeholder="enter email address (optional)"
                      disabled={submitting}
                      onChange={handleChange}
                    />
                  </span> */}
                  <Input
                    label={`Gift card ${index} email recipient`}
                    showLabel={false}
                    name={`email-${index}`}
                    type="email"
                    autoComplete={null}
                    value={card.email}
                    placeholder="enter email address (optional)"
                    disabled={submitting}
                    onChange={handleChange}
                  />
                </GiftCardsRow>
                <FormError
                  errMsg={errors[`gift_cards.${index}.email`]}
                  style={{ margin: '-1rem 0 2rem' }}
                />
              </>
            ))}
            <GiftCardsRow>
              <ButtonStyled
                onClick={handleAddAnother}
                disabled={submitting}
                color="secondary"
              >
                Add Another
              </ButtonStyled>
            </GiftCardsRow>
          </FormInputs>
        </FormFieldset>
        <FormFieldset>
          {!isNewCard && creditCards.length ? (
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
              <CreditCard
                data={cardData}
                cardType={cardType}
                errors={allCardErrors}
                handleChange={handleCardChange}
                handleBlur={handleBlur}
                disabled={disabled}
                cardIconMap={cardIconMap}
              />
            </>
          )}
          <FormRecaptcha>
            {recaptchaKey && (
              <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaKey} />
            )}
          </FormRecaptcha>
          <FormSubmit>
            <ButtonSubmit submitRef={submitRef} submitting={submitting}>
              {submitting ? 'Submitting...' : 'Purchase Gift Cards'}
            </ButtonSubmit>
          </FormSubmit>
        </FormFieldset>
      </form>
    </>
  )
}

GiftCardsForm.displayName = 'GiftCardsForm'
GiftCardsForm.propTypes = {
  purchase: propTypes.func,
  setAlert: propTypes.func,
  reset: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  purchasedCards: propTypes.array,
  iconMap: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
  recaptchaKey: propTypes.string,
  cardIconMap: propTypes.object,
}

export default GiftCardsForm
