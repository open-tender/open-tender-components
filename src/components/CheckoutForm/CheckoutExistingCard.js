import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { isEmpty } from '@open-tender/js'
import { CircleLoader, FormError } from '..'
import { FormContext } from './CheckoutForm'

const CheckoutExistingCard = ({
  card,
  appliedCards,
  existingCards,
  addTender,
  error,
}) => {
  const [errors, setErrors] = useState({})
  const formContext = useContext(FormContext)
  const { iconMap = {}, cardIconMap = {} } = formContext
  const tender = { ...card, tender_type: 'CREDIT' }
  const isApplied = existingCards.includes(card.customer_card_id)
  const isDisabled = appliedCards.length && !isApplied
  const disabled = isDisabled ? '-disabled' : ''
  const classes = `cards__card ot-bg-color-primary ot-border-radius ${disabled}`
  const cardError = !isEmpty(errors) ? Object.values(errors)[0] : null
  const cardName = `${card.card_type_name} ending in ${card.last4}`

  useEffect(() => {
    if (error && !isEmpty(error)) {
      setErrors(error)
    }
  }, [error])

  return !isDisabled ? (
    <li>
      <div className={classes}>
        <div className="cards__card__image">
          {cardIconMap && (
            <img src={cardIconMap[card.card_type]} alt={card.card_type_name} />
          )}
        </div>
        <div className="cards__card__name">
          {cardName}
          {card.is_default ? ' (default)' : ''}
        </div>
        <div className="cards__card__add">
          {isApplied ? (
            <CircleLoader complete={true} />
          ) : (
            <button
              type="button"
              onClick={(evt) => addTender(evt, tender)}
              className="ot-btn-link"
              disabled={isApplied || isDisabled}
              aria-label={`Apply ${cardName}`}
            >
              {iconMap.add || '+'}
            </button>
          )}
        </div>
      </div>
      {cardError && isApplied && <FormError error={cardError} />}
    </li>
  ) : null
}

CheckoutExistingCard.displayName = 'CheckoutExistingCard'
CheckoutExistingCard.propTypes = {
  card: propTypes.object,
  appliedCards: propTypes.array,
  existingCards: propTypes.array,
  addTender: propTypes.func,
  error: propTypes.object,
}

export default CheckoutExistingCard
