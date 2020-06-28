import React from 'react'
import propTypes from 'prop-types'

const BuilderGroupWarning = ({ quantity, min, max }) => {
  const isRadio = min === 1 && max === 1
  const belowMin = !isRadio && min !== 0 && quantity < min
  const atMax = !isRadio && max !== 0 && quantity === max
  const classes = `${belowMin ? '-min' : atMax ? '-max' : ''}`
  return (
    <div
      className={`builder__group__quantity bg-color font-size-small border-radius-small ${classes}`}
    >
      {quantity < min ? (
        <span className="builder__group__warning">
          <span>Select</span>
          <span className="builder__group__alert ot-alert">
            {min - quantity}
          </span>
        </span>
      ) : (
        <span className="builder__group__warning">
          <span>Selected</span>
          <span>
            {quantity}
            {max ? `/${max}` : ''}
          </span>
        </span>
      )}
    </div>
  )
}

BuilderGroupWarning.displayName = 'BuilderGroupWarning'
BuilderGroupWarning.propTypes = {
  group: propTypes.object,
}

export default BuilderGroupWarning
