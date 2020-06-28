import propTypes from 'prop-types'
import React from 'react'

const BuilderRadio = ({ option, handler, classes = '' }) => {
  return (
    <label
      htmlFor={option.id}
      className={`label radio builder__radio ${classes}`}
    >
      <input
        id={option.id}
        type="radio"
        className="radio__input"
        checked={option.quantity >= 1}
        onChange={handler}
      />
      <span className="radio__custom" />
    </label>
  )
}

BuilderRadio.displayName = 'BuilderRadio'
BuilderRadio.propTypes = {
  groupId: propTypes.number,
  option: propTypes.object,
  handler: propTypes.func,
  classes: propTypes.string,
}

export default BuilderRadio
