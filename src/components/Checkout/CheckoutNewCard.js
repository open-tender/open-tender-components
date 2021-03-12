import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
  const { cardIconMap = {} } = formContext
  const newCard = appliedCards.find((i) => i.acct)
  const newCardType = newCard ? newCard.card_type : 'OTHER'
  const isApplied = !!newCard
  const isDisabled = appliedCards.length && !isApplied
  const icon = cardIconMap ? (
    <img src={cardIconMap[newCardType]} alt="New Credit Card" />
  ) : null
  const name = isApplied
    ? `New ${newCard.card_type} ending in ${newCard.last4}`
    : 'Add a new credit card'

  return !isDisabled ? (
    <li>
      {customerId && (
        <CheckoutCard
          icon={icon}
          name={name}
          onClick={isApplied ? null : () => setShowNewCard(true)}
          isApplied={isApplied}
          disabled={isApplied || isDisabled}
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
