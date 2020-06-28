import propTypes from 'prop-types'
import React, { useState } from 'react'
import { displayPrice } from 'open-tender-js'
import BuilderNutrition from './BuilderNutrition'

const BuilderHeader = ({ item, showImage }) => {
  const [showInfo, setShowInfo] = useState(false)

  const toggleShow = (evt) => {
    evt.preventDefault()
    setShowInfo(!showInfo)
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
          className="builder__image bg-image bg-secondary-color"
          style={bgStyle}
        >
          &nbsp;
        </div>
      )}
      <div className="builder__info bg-color">
        <h2 className="builder__name ot-font-size-h3">{item.name}</h2>
        <div className="builder__details">
          <span className="builder__details__price ot-bold">
            {item.price === '0.00'
              ? 'Price varies'
              : `$${displayPrice(item.price)}`}
          </span>
          {item.cals && (
            <span className="builder__details__cals ot-bold secondary-color">
              {item.cals} cal
            </span>
          )}
          {item.allergens.length > 0 && (
            <span className="builder__details__cals ot-alert-color font-size-small">
              {item.allergens.join(', ')}
            </span>
          )}
          {item.tags.length > 0 && (
            <span className="builder__details__cals secondary-color font-size-small">
              {item.tags.join(', ')}
            </span>
          )}
        </div>
        {item.description && (
          <p className="builder__desc secondary-color">{item.description}</p>
        )}
        {item.cals && (
          <div className="builder__nutrition">
            <button className="btn-link" onClick={toggleShow}>
              <span className="font-size-small">
                {!showInfo ? 'Show' : 'Hide'} nutritional info
              </span>
            </button>
          </div>
        )}
      </div>
      <BuilderNutrition
        nutritionalInfo={item.nutritionalInfo}
        show={showInfo}
      />
    </div>
  )
}

BuilderHeader.displayName = 'BuilderHeader'
BuilderHeader.propTypes = {
  item: propTypes.object,
  showImage: propTypes.bool,
}

export default BuilderHeader
