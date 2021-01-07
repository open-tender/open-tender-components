import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { ButtonLink, Checkmark } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutCard, CheckoutNewCardForm } from '.'

const CheckoutNewCard = ({
  appliedCards,
  addTender,
  removeTender,
  showNewCard,
  setShowNewCard,
  setShowCredit,
  customerId,
  error,
}) => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, cardIconMap = {} } = formContext
  const newCard = appliedCards.find((i) => i.acct)
  const newCardType = newCard ? newCard.card_type : 'OTHER'
  const isApplied = !!newCard
  const isDisabled = appliedCards.length && !isApplied

  return !isDisabled ? (
    <li>
      {customerId && (
        <CheckoutCard
          isDisabled={isDisabled}
          icon={
            cardIconMap && (
              <img src={cardIconMap[newCardType]} alt="New Credit Card" />
            )
          }
          name={
            isApplied
              ? `New ${newCard.card_type} ending in ${newCard.last4}`
              : 'Add a new credit card'
          }
          action={
            isApplied ? (
              <Checkmark />
            ) : (
              <ButtonLink
                onClick={() => setShowNewCard(true)}
                disabled={isApplied || isDisabled}
                label="Add a new card"
              >
                {iconMap.add || '+'}
              </ButtonLink>
            )
          }
        />
      )}
      <TransitionGroup component={null}>
        {showNewCard ? (
          <CSSTransition
            key="modal"
            classNames="slide-toggle-down"
            timeout={250}
          >
            <CheckoutNewCardForm
              addTender={addTender}
              removeTender={removeTender}
              setShowNewCard={setShowNewCard}
              setShowCredit={setShowCredit}
              customerId={customerId}
              error={isApplied ? error : null}
            />
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </li>
  ) : null
}

CheckoutNewCard.displayName = 'CheckoutNewCard'
CheckoutNewCard.propTypes = {
  appliedCards: propTypes.array,
  addTender: propTypes.func,
  removeTender: propTypes.func,
  setShowCredit: propTypes.func,
  showNewCard: propTypes.bool,
  setShowNewCard: propTypes.func,
  customerId: propTypes.number,
  error: propTypes.object,
}

export default CheckoutNewCard
