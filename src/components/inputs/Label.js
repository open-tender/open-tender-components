import React from 'react'
import propTypes from 'prop-types'

const Label = ({ text, required }) => (
  <span className="label ot-preface ot-font-size-x-small">
    {text}
    {required ? <span className="ot-color-alert"> *</span> : null}
  </span>
)

Label.displayName = 'Label'
Label.propTypes = {
  text: propTypes.string,
  required: propTypes.bool,
}

export default Label
