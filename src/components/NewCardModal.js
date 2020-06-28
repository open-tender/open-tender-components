import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from './icons'
import { cardIcons } from './utils/cards'

const NewCardModal = ({ addNewCard }) => {
  const handleAdd = (evt) => {
    evt.preventDefault()
    addNewCard()
    evt.target.blur()
  }

  return (
    <li>
      <div className="cards__card bg-color border-radius">
        <div className="cards__card__image">
          <img src={cardIcons['OTHER']} alt="New Credit Card" />
        </div>
        <div className="cards__card__name">Add a new credit card</div>
        <div className="cards__card__add">
          <button type="button" onClick={handleAdd} className="btn-link">
            {iconMap['PlusCircle']}
          </button>
        </div>
      </div>
    </li>
  )
}

NewCardModal.displayName = 'NewCardModal'
NewCardModal.propTypes = {
  addNewCard: propTypes.func,
}

export default NewCardModal
