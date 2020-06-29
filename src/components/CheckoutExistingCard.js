import React from 'react'
import propTypes from 'prop-types'
import iconMap from './icons'
import cardIconMap from './cardIcons'
import CircleLoader from './CircleLoader'

const CheckoutExistingCard = ({
  card,
  appliedCards,
  existingCards,
  addTender,
}) => {
  const tender = { ...card, tender_type: 'CREDIT' }
  const isApplied = existingCards.includes(card.customer_card_id)
  const isDisabled = appliedCards.length && !isApplied
  const disabled = isDisabled ? '-disabled' : ''
  const classes = `cards__card bg-color border-radius ${disabled}`
  return !isDisabled ? (
    <li>
      <div className={classes}>
        <div className="cards__card__image">
          <img src={cardIconMap[card.card_type]} alt={card.card_type_name} />
        </div>
        <div className="cards__card__name">
          {card.card_type_name} ending in {card.last4}
          {card.is_default ? ' (default)' : ''}
        </div>
        <div className="cards__card__add">
          {isApplied ? (
            <CircleLoader complete={true} />
          ) : (
            <button
              type="button"
              onClick={(evt) => addTender(evt, tender)}
              className="btn-link"
              disabled={isApplied || isDisabled}
            >
              {iconMap['PlusCircle']}
            </button>
          )}
        </div>
      </div>
    </li>
  ) : null
}

CheckoutExistingCard.displayName = 'CheckoutExistingCard'
CheckoutExistingCard.propTypes = {
  card: propTypes.object,
  appliedCards: propTypes.array,
  existingCards: propTypes.array,
  addTender: propTypes.func,
}

export default CheckoutExistingCard
