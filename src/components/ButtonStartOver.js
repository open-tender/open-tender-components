import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonStartOver = ({
  text = 'Start Over',
  onClick,
  classes = 'ot-btn',
}) => {
  return (
    <Button text={text} icon="ArrowLeft" classes={classes} onClick={onClick} />
  )
}

ButtonStartOver.displayName = 'ButtonStartOver'
ButtonStartOver.propTypes = {
  text: propTypes.string,
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonStartOver
