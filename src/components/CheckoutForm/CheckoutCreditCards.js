import React, { useContext, useState, useEffect } from 'react'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
import { CheckoutExistingCard, CheckoutNewCard } from '.'

const CheckoutCreditCards = () => {
  const [showNewCard, setShowNewCard] = useState(false)
  const formContext = useContext(FormContext)
  const { check, form, errors } = formContext
  const tenderContext = useContext(TendersContext)
  const { customerId, setShowCredit, addTender, removeTender } = tenderContext
  const cards = customerId ? check.customer.credit_cards || [] : []
  const appliedCards = form.tenders.filter((i) => i.tender_type === 'CREDIT')
  const existingCards = appliedCards.map((i) => i.customer_card_id)
  const tenderErrors = errors ? errors.tenders || null : null
  const index = form.tenders.map((i) => i.tender_type).indexOf('CREDIT')
  const tenderError = tenderErrors && index !== -1 ? tenderErrors[index] : null

  useEffect(() => {
    if (!customerId) setShowNewCard(true)
  }, [customerId])

  return (
    <div className="cards ot-bg-color-secondary">
      {/* <ul className={`cards__list ${showNewCard ? '-disabled' : ''}`}> */}
      <ul className="cards__list">
        {cards.map((card) => (
          <CheckoutExistingCard
            key={card.customer_card_id}
            card={card}
            appliedCards={appliedCards}
            existingCards={existingCards}
            addTender={addTender}
            error={tenderError}
          />
        ))}
        <CheckoutNewCard
          appliedCards={appliedCards}
          addTender={addTender}
          removeTender={removeTender}
          showNewCard={showNewCard}
          setShowNewCard={setShowNewCard}
          setShowCredit={setShowCredit}
          customerId={customerId}
          error={tenderError}
        />
      </ul>
    </div>
  )
}

CheckoutCreditCards.displayName = 'CheckoutCreditCards'

export default CheckoutCreditCards
