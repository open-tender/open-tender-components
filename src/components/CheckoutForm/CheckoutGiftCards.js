import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { checkAmountRemaining } from '@open-tender/js'
import { ButtonStyled, Preface, Text } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutLabel } from '.'
import {
  FormApplied,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormRow,
} from '../inputs'

const CheckoutGiftCardLabel = ({ giftCard, amount }) => {
  return (
    <span className="form__input__discount">
      <span className="ot-font-size ot-color-headings">
        Gift Card {giftCard.card_number}
      </span>
      <span className="ot-font-size-small ot-color-success">
        Balance of ${giftCard.balance}{' '}
        {amount && `($${amount} applied to check)`}
      </span>
    </span>
  )
}

CheckoutGiftCardLabel.displayName = 'CheckoutGiftCardLabel'
CheckoutGiftCardLabel.propTypes = {
  giftCard: propTypes.object,
  amount: propTypes.string,
}

const CheckoutGiftCards = () => {
  const formContext = useContext(FormContext)
  const {
    iconMap = {},
    config,
    check,
    form,
    updateForm,
    addGiftCard,
  } = formContext
  const hasCustomer = check.customer && check.customer.customer_id
  const giftCards =
    check.customer && check.customer.gift_cards
      ? check.customer.gift_cards
      : null
  // if (!giftCards) return null
  const giftCardsApplied = form.tenders
    .filter((i) => i.tender_type === 'GIFT_CARD')
    .reduce((obj, i) => ({ ...obj, [i.card_number]: i.amount }), {})
  const amountRemaining = checkAmountRemaining(check.totals.total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'

  const applyGiftCard = (cardNumber, balance) => {
    const remaining = checkAmountRemaining(check.totals.total, form.tenders)
    const amount = Math.min(remaining, parseFloat(balance)).toFixed(2)
    const newGiftCard = {
      tender_type: 'GIFT_CARD',
      card_number: cardNumber,
      balance: balance,
      amount: amount,
    }
    updateForm({ tenders: [...form.tenders, newGiftCard] })
  }

  const removeGiftCard = (cardNumber) => {
    // const removed = form.tenders.find((i) => i.card_number === cardNumber)
    const filtered = form.tenders.filter((i) => i.card_number !== cardNumber)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    const giftCard = filtered.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = giftCard.map((i) => {
      const newAmount = Math.min(remaining, parseFloat(i.balance))
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    const adjustedOther = nonGiftCard.map((i) => {
      const newAmount = parseFloat(i.amount) + remaining
      remaining = 0.0
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZeroOther = adjustedOther.filter((i) => i.amount !== '0.00')
    updateForm({ tenders: [...nonZeroOther, ...nonZero] })
  }

  return (
    <FormFieldset>
      <FormLegend
        as="div"
        title={config.giftCards.title}
        subtitle={
          hasCustomer
            ? config.giftCards.subtitle
            : 'Have a gift card number? Please log into your account or create one via the button above in order to use the gift card here.'
        }
      />
      <FormInputs>
        {giftCards &&
          giftCards.map((i) => {
            const amount = giftCardsApplied[i.card_number]
            return (
              <FormRow
                key={i.card_number}
                type="div"
                labelWidth="auto"
                label={
                  <CheckoutLabel
                    title={`Gift Card ${i.card_number}`}
                    description={`Balance of $${i.balance}`}
                    alert={
                      amount && (
                        <Text color="success">${amount} applied to check</Text>
                      )
                    }
                  />
                }
                input={
                  <>
                    {amount ? (
                      <>
                        <FormApplied />
                        <ButtonStyled
                          label={`Remove gift card ${i.card_number} with amount of ${amount}`}
                          icon={iconMap.remove}
                          onClick={() => removeGiftCard(i.card_number)}
                          size="header"
                          color="header"
                        >
                          Remove
                        </ButtonStyled>
                      </>
                    ) : (
                      <ButtonStyled
                        label={`Apply gift card ${i.card_number} with balance of ${i.balance}`}
                        icon={iconMap.add}
                        onClick={() => applyGiftCard(i.card_number, i.balance)}
                        disable={isPaid}
                        size="header"
                        color="header"
                      >
                        Apply
                      </ButtonStyled>
                    )}
                  </>
                }
              />
            )
          })}
        <FormRow
          as="div"
          label={<Preface size="xSmall">Add New Gift Card</Preface>}
          input={
            <ButtonStyled
              icon={iconMap.add}
              onClick={addGiftCard}
              disabled={!hasCustomer}
              size="header"
              color="header"
            >
              Add Gift Card
            </ButtonStyled>
          }
        />
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutGiftCards.displayName = 'CheckoutGiftCards'

export default CheckoutGiftCards
