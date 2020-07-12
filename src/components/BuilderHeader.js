import propTypes from 'prop-types'
import React, { useState } from 'react'
import { displayPrice } from '@open-tender/js'
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
          className="builder__image bg-image ot-bg-color-secondary"
          style={bgStyle}
        >
          &nbsp;
        </div>
      )}
      <div className="builder__info ot-bg-color-primary">
        <h2 className="builder__name ot-font-size-h3">{item.name}</h2>
        <div className="builder__details">
          <span className="builder__details__price ot-bold">
            {item.price === '0.00'
              ? 'Price varies'
              : `$${displayPrice(item.price)}`}
          </span>
          {item.cals && (
            <span className="builder__details__cals ot-bold ot-color-secondary">
              {item.cals} cal
            </span>
          )}
          {item.allergens.length > 0 && (
            <span className="builder__details__cals ot-color-alert ot-font-size-small">
              {item.allergens.join(', ')}
            </span>
          )}
          {item.tags.length > 0 && (
            <span className="builder__details__cals ot-color-secondary ot-font-size-small">
              {item.tags.join(', ')}
            </span>
          )}
        </div>
        {item.description && (
          <p className="builder__desc ot-color-secondary">{item.description}</p>
        )}
        {item.cals && (
          <div className="builder__nutrition">
            <button className="ot-btn-link" onClick={toggleShow}>
              <span className="ot-font-size-small">
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
