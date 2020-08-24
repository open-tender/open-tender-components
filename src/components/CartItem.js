import React, { useState } from 'react'
import propTypes from 'prop-types'
import { displayPrice, makeModifierNames } from '@open-tender/js'
import BuilderNutrition from './BuilderNutrition'
import BuilderIngredients from './BuilderIngredients'

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
  displaySettings,
  children,
}) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const {
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const hasCals = showCals && item.cals
  const hasIngredients = item.ingredients && item.ingredients.length > 0
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const desc = showModifiers ? makeModifierNames(item) : item.description
  const price = editItem || showModifiers ? item.totalPrice : item.price
  const madeFor = editItem || showModifiers ? item.madeFor : null
  const soldOutClass = item.isSoldOut ? '-sold-out' : ''
  const classes = `builder__option ot-border-color ${soldOutClass}`
  const itemAllergens = item.allergens.length
    ? item.allergens.filter((allergen) => allergens.includes(allergen))
    : []
  const allergenAlert = itemAllergens.length > 0

  const toggleShowInfo = (evt) => {
    evt.preventDefault()
    if (showIngredients) setShowIngredients(false)
    setShowInfo(!showInfo)
    evt.target.blur()
  }

  const toggleShowIngredients = (evt) => {
    evt.preventDefault()
    if (showInfo) setShowInfo(false)
    setShowIngredients(!showIngredients)
    evt.target.blur()
  }

  return (
    <>
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
          <span className="builder__option__name ot-font-size-small ot-color-headings ot-bold">
            {item.name} {madeFor && `(${madeFor})`}
          </span>
          {desc && (
            <span className="builder__option__desc ot-font-size-x-small">
              {desc}
            </span>
          )}
          {/* {madeFor && (
            <span className="builder__option__made-for ot-color-headings ot-font-size-x-small">
              For <span className="">{madeFor}</span>
            </span>
          )} */}
          <span className="builder__option__details ot-font-size-small">
            <span className="builder__option__details__container">
              <span className="builder__option__details__price ot-color-headings ot-bold">
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
                  {showCals && item.cals && (
                    <span className="builder__option__details__cals">
                      {item.cals} cal
                    </span>
                  )}
                  {showAllergens && item.allergens.length > 0 && (
                    <span className="builder__option__details__allergens ot-color-alert ot-font-size-x-small">
                      {item.allergens.join(', ')}
                    </span>
                  )}
                  {showTags && item.tags.length > 0 && (
                    <span className="builder__option__details__tags ot-font-size-x-small">
                      {item.tags.join(', ')}
                    </span>
                  )}
                </>
              )}
            </span>
          </span>
          {!editItem && (hasCals || hasIngredients) && (
            <div className="builder__option__nutrition">
              {hasCals && (
                <button className="ot-btn-link" onClick={toggleShowInfo}>
                  <span className="ot-font-size-x-small">
                    {!showInfo ? 'show' : 'hide'} nutritional info
                  </span>
                </button>
              )}
              {hasCals && hasIngredients ? (
                <span className="ot-font-size-x-small">{' | '}</span>
              ) : null}
              {hasIngredients && (
                <button className="ot-btn-link" onClick={toggleShowIngredients}>
                  <span className="ot-font-size-x-small">
                    {!showIngredients ? 'show' : 'hide'} ingredients
                  </span>
                </button>
              )}
            </div>
          )}
        </span>
        <span className="builder__option__quantity">{children}</span>
      </span>
      {showCals && (
        <BuilderNutrition
          nutritionalInfo={item.nutritionalInfo}
          show={showInfo}
        />
      )}
      {hasIngredients && (
        <BuilderIngredients
          ingredients={item.ingredients}
          show={showIngredients}
        />
      )}
    </>
  )
}

CartItem.displayName = 'CartItem'
CartItem.propTypes = {
  item: propTypes.object,
  allergens: propTypes.array,
  showModifiers: propTypes.bool,
  editItem: propTypes.func,
  removeItem: propTypes.func,
  displaySettings: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default CartItem
