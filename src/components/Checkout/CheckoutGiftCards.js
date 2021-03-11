import React, { useContext } from 'react'
import { checkAmountRemaining } from '@open-tender/js'
import { Preface, Text } from '..'
import { FormContext } from './CheckoutForm'
import { FormButton, FormFieldset, FormInputs, FormLegend } from '../inputs'

const CheckoutGiftCards = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, updateForm, addGiftCard } = formContext
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
            const isApplied = !!amount
            const onClick = isApplied
              ? () => removeGiftCard(i.card_number)
              : () => applyGiftCard(i.card_number, i.balance)
            const disabled = !isApplied && isPaid
            const label = isApplied
              ? `Remove gift card ${i.card_number} with amount of ${amount}`
              : `Apply gift card ${i.card_number} with balance of ${i.balance}`
            return (
              <FormButton
                key={i.card_number}
                title={`Gift Card ${i.card_number}`}
                description={`Balance of $${i.balance}`}
                alert={
                  isApplied && (
                    <Text color="success">${amount} applied to check</Text>
                  )
                }
                isApplied={isApplied}
                onClick={onClick}
                disabled={disabled}
                label={label}
              />
            )
          })}
        <FormButton
          as="div"
          title={<Preface size="xSmall">Add New Gift Card</Preface>}
          // title="Add a new gift card"
          description="Enter a gift card number directly if you have one"
          onClick={addGiftCard}
          disabled={!hasCustomer}
        />
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutGiftCards.displayName = 'CheckoutGiftCards'

export default CheckoutGiftCards
