import React from 'react'
import propTypes from 'prop-types'
import Button from './Button'

const ButtonGroupOrder = ({ onClick, classes = 'ot-btn' }) => {
  return (
    <Button
      text="Group Order"
      ariaLabel="Start a Group Order"
      icon="Users"
      classes={classes}
      onClick={onClick}
    />
  )
}

ButtonGroupOrder.displayName = 'ButtonGroupOrder'
ButtonGroupOrder.propTypes = {
  onClick: propTypes.func,
  classes: propTypes.string,
}

export default ButtonGroupOrder
