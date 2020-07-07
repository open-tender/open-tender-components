import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'
import iconMap from './icons'
import CheckoutNewCardForm from './CheckoutNewCardForm'

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
  const { cardIconMap } = formContext
  const newCard = appliedCards.find((i) => i.acct)
  const newCardType = newCard ? newCard.card_type : 'OTHER'
  const isApplied = !!newCard
  const isDisabled = appliedCards.length && !isApplied
  const disabled = isDisabled ? '-disabled' : ''
  const classes = `cards__card ot-bg-color-primary ot-border-radius ${disabled}`

  const handleToggle = (evt) => {
    evt.preventDefault()
    setShowNewCard(true)
    evt.target.blur()
  }

  return !isDisabled ? (
    <li>
      {customerId && (
        <div className={classes}>
          <div className="cards__card__image">
            {cardIconMap && (
              <img src={cardIconMap[newCardType]} alt="New Credit Card" />
            )}
          </div>
          <div className="cards__card__name">
            {isApplied
              ? `New ${newCard.card_type} ending in ${newCard.last4}`
              : 'Add a new credit card'}
          </div>
          <div className="cards__card__add">
            {isApplied ? (
              <CircleLoader complete={true} />
            ) : (
              <button
                type="button"
                onClick={handleToggle}
                className="ot-btn-link"
                disabled={isApplied || isDisabled}
              >
                {iconMap['PlusCircle']}
              </button>
            )}
          </div>
        </div>
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
              error={error}
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
