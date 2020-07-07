import React from 'react'
import propTypes from 'prop-types'
import ButtonFavorite from './ButtonFavorite'

const OrderQuantity = ({
  item,
  show,
  favoriteId,
  addFavorite,
  removeFavorite,
}) => {
  return (
    <div className="order__quantity">
      <div className="order__quantity__count ot-input-quantity ot-bold ot-font-size-small">
        {item.quantity}
      </div>
      {show && (
        <ButtonFavorite
          item={item}
          favoriteId={favoriteId}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
        />
      )}
    </div>
  )
}

OrderQuantity.displayName = 'Order'
OrderQuantity.propTypes = {
  item: propTypes.object,
  show: propTypes.bool,
  favoriteId: propTypes.number,
  addFavorite: propTypes.func,
  removeFavorite: propTypes.func,
}
export default OrderQuantity
