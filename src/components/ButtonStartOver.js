import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonStartOver = ({ text = 'Start Over', onClick, classes = 'btn' }) => {
  return (
    <Button text={text} icon="ArrowLeft" classes={classes} onClick={onClick} />
  )
}

ButtonStartOver.displayName = 'ButtonStartOver'
ButtonStartOver.propTypes = {
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonStartOver
