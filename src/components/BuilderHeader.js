import propTypes from 'prop-types'
import React, { useState } from 'react'
import { displayPrice } from '@open-tender/js'
import BuilderNutrition from './BuilderNutrition'
import BuilderIngredients from './BuilderIngredients'

const BuilderHeader = ({ item, displaySettings }) => {
  const [showInfo, setShowInfo] = useState(false)
  const [showIngredients, setShowIngredients] = useState(false)
  const {
    builderImages: showImage,
    calories: showCals,
    tags: showTags,
    allergens: showAllergens,
  } = displaySettings
  const hasCals = showCals && item.cals
  const hasIngredients = item.ingredients && item.ingredients.length > 0

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

  const bgStyle =
    showImage && item.imageUrl
      ? { backgroundImage: `url(${item.imageUrl}` }
      : null
  return (
    <div className="builder__header">
      {bgStyle && (
        <div
          className="builder__image bg-image ot-bg-color-secondary"
          style={bgStyle}
        >
          &nbsp;
        </div>
      )}
      <div className="builder__info ot-bg-color-primary">
        <h2 className="builder__name ot-font-size-h3">{item.name}</h2>
        <div className="builder__details">
          <span className="builder__details__price ot-bold ot-color-headings">
            {item.price === '0.00'
              ? 'Price varies'
              : `$${displayPrice(item.price)}`}
          </span>
          {showCals && item.cals && (
            <span className="builder__details__cals ot-bold">
              {item.cals} cal
            </span>
          )}
          {showAllergens && item.allergens.length > 0 && (
            <span className="builder__details__cals ot-color-alert ot-font-size-small">
              {item.allergens.join(', ')}
            </span>
          )}
          {showTags && item.tags.length > 0 && (
            <span className="builder__details__cals ot-font-size-small">
              {item.tags.join(', ')}
            </span>
          )}
        </div>
        {item.description && (
          <p className="builder__desc">{item.description}</p>
        )}
        {(hasCals || hasIngredients) && (
          <div className="builder__nutrition">
            {hasCals && (
              <button className="ot-btn-link" onClick={toggleShowInfo}>
                <span className="ot-font-size-small">
                  {!showInfo ? 'show' : 'hide'} nutritional info
                </span>
              </button>
            )}
            {hasCals && hasIngredients ? (
              <span className="ot-font-size-small">{' | '}</span>
            ) : null}
            {hasIngredients && (
              <button className="ot-btn-link" onClick={toggleShowIngredients}>
                <span className="ot-font-size-small">
                  {!showIngredients ? 'show' : 'hide'} ingredients
                </span>
              </button>
            )}
          </div>
        )}
      </div>
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
    </div>
  )
}

BuilderHeader.displayName = 'BuilderHeader'
BuilderHeader.propTypes = {
  item: propTypes.object,
  displaySettings: propTypes.object,
}

export default BuilderHeader
