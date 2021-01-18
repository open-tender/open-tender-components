import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import { isEmpty } from '@open-tender/js'
import { ButtonLink, Checkmark } from '..'
import { FormError } from '../inputs'
import { FormContext } from './CheckoutForm'
import { CheckoutCard } from '.'

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
  const cardError = !isEmpty(errors) ? Object.values(errors)[0] : null
  const cardName = `${card.card_type_name} ending in ${card.last4}`

  useEffect(() => {
    if (error && !isEmpty(error)) {
      setErrors(error)
    }
  }, [error])

  return !isDisabled ? (
    <li>
      <CheckoutCard
        isDisabled={isDisabled}
        icon={
          cardIconMap && (
            <img src={cardIconMap[card.card_type]} alt={card.card_type_name} />
          )
        }
        name={`${cardName}${card.is_default ? ' (default)' : ''}`}
        action={
          isApplied ? (
            <Checkmark />
          ) : (
            <ButtonLink
              onClick={() => addTender(tender)}
              disabled={isApplied || isDisabled ? true : false}
              label={`Apply ${cardName}`}
            >
              {iconMap.add || '+'}
            </ButtonLink>
          )
        }
      />
      {cardError && isApplied && <FormError errMsg={cardError} />}
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
