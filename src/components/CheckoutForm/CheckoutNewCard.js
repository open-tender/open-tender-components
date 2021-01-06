import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { CircleLoader } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutNewCardForm } from '.'

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
                aria-label="Add a new card"
              >
                {iconMap.add || '+'}
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
