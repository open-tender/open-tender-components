import React from 'react'
import propTypes from 'prop-types'
import iconMap from './icons'
import { makeSimpleCart } from '@open-tender/js'

const ButtonFavorite = ({
  item,
  favoriteId,
  addFavorite,
  removeFavorite,
  classes = '',
}) => {
  const handleAdd = (evt) => {
    evt.preventDefault()
    const cartItem = makeSimpleCart([item])[0]
    delete cartItem.quantity
    addFavorite(cartItem)
    evt.target.blur()
  }

  const handleRemove = (evt) => {
    evt.preventDefault()
    removeFavorite(favoriteId)
    evt.target.blur()
  }

  const favClass = favoriteId ? 'ot-btn--highlight' : ''
  const klass = `ot-btn favorite ${classes} ${favClass}`
  const handler = favoriteId ? handleRemove : handleAdd

  return (
    <button className={klass} onClick={handler}>
      <span className="favorite__icon">{iconMap['Heart']}</span>
    </button>
  )
}

ButtonFavorite.displayName = 'ButtonFavorite'
ButtonFavorite.propTypes = {
  item: propTypes.object,
  favoriteId: propTypes.number,
  addFavorite: propTypes.func,
  removeFavorite: propTypes.func,
  classes: propTypes.string,
}

export default ButtonFavorite
