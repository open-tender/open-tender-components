import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import CircleLoader from './CircleLoader'
import { iconMap } from './icons'
import { cardIcons } from './utils/cards'
import CheckoutNewCardForm from './CheckoutNewCardForm'

const NewCard = ({
  appliedCards,
  addTender,
  removeTender,
  showNewCard,
  setShowNewCard,
  setShowCredit,
  customerId,
  error,
}) => {
  const newCard = appliedCards.find((i) => i.acct)
  const newCardType = newCard ? newCard.card_type : 'OTHER'
  const isApplied = !!newCard
  const isDisabled = appliedCards.length && !isApplied
  const disabled = isDisabled ? '-disabled' : ''
  const classes = `cards__card bg-color border-radius ${disabled}`

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
            <img src={cardIcons[newCardType]} alt="New Credit Card" />
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
                className="btn-link"
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

NewCard.displayName = 'NewCard'
NewCard.propTypes = {
  appliedCards: propTypes.array,
  addTender: propTypes.func,
  showNewCard: propTypes.func,
  setShowNewCard: propTypes.func,
  customerId: propTypes.number,
  error: propTypes.object,
}

export default NewCard
