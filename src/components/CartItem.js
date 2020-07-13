import React from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeModifierNames } from '@open-tender/js'

const SoldOutOverlay = () => (
  <div className="builder__option__overlay ot-opacity-dark ot-border-radius-small">
    <div className="builder__option__overlay__container">
      <p className="builder__option__overlay__message ot-color-light ot-font-size">
        Sold Out
      </p>
    </div>
  </div>
)

const AllergenOverlay = () => (
  <div className="builder__option__overlay ot-opacity-alert ot-border-radius-small">
    <div className="builder__option__overlay__container">
      <div className="builder__option__alert ot-color-light">
        <span>!</span>
      </div>
    </div>
  </div>
)

const CartItem = ({
  item,
  allergens = [],
  showModifiers,
  editItem,
  removeItem,
  children,
}) => {
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const desc = showModifiers ? makeModifierNames(item) : item.description
  const price = editItem || showModifiers ? item.totalPrice : item.price
  const soldOutClass = item.isSoldOut ? '-sold-out' : ''
  const classes = `builder__option ot-border-color ${soldOutClass}`
  const itemAllergens = item.allergens.length
    ? item.allergens.filter((allergen) => allergens.includes(allergen))
    : []
  const allergenAlert = itemAllergens.length > 0

  return (
    <span className={classes}>
      <span
        className="builder__option__image bg-image ot-bg-color-secondary ot-border-radius-small"
        style={bgStyle}
      >
        {item.isSoldOut ? (
          <SoldOutOverlay />
        ) : allergenAlert ? (
          <AllergenOverlay />
        ) : null}
      </span>
      <span className="builder__option__info">
        <span className="builder__option__name ot-font-size-small ot-bold">
          {item.name}
        </span>
        {desc && (
          <span className="builder__option__desc ot-font-size-x-small ot-color-secondary">
            {desc}
          </span>
        )}
        <span className="builder__option__details ot-font-size-small">
          <span className="builder__option__details__container">
            <span className="builder__option__details__price ot-bold">
              ${displayPrice(price)}
            </span>
            {editItem ? (
              <>
                <span className="builder__option__details__edit">
                  <button className="ot-btn-link" onClick={editItem}>
                    edit
                  </button>
                </span>
                <span className="builder__option__details__remove">
                  <button
                    className="ot-btn-link ot-color-error"
                    onClick={removeItem}
                  >
                    remove
                  </button>
                </span>
              </>
            ) : (
              <>
                {item.cals && (
                  <span className="builder__option__details__cals ot-color-secondary">
                    {item.cals} cal
                  </span>
                )}
                {item.allergens.length > 0 && (
                  <span className="builder__option__details__allergens ot-color-alert ot-font-size-x-small">
                    {item.allergens.join(', ')}
                  </span>
                )}
                {item.tags.length > 0 && (
                  <span className="builder__option__details__tags ot-color-secondary ot-font-size-x-small">
                    {item.tags.join(', ')}
                  </span>
                )}
              </>
            )}
          </span>
        </span>
      </span>
      <span className="builder__option__quantity">{children}</span>
    </span>
  )
}

CartItem.displayName = 'CartItem'
CartItem.propTypes = {
  item: propTypes.object,
  allergens: propTypes.array,
  showModifiers: propTypes.bool,
  editItem: propTypes.func,
  removeItem: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CartItem
