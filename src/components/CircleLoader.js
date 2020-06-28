import React from 'react'
import propTypes from 'prop-types'

const CircleLoader = ({ complete }) => {
  const classes = `circle-loader ${complete ? 'load-complete' : ''}`
  return (
    <span className={classes}>
      <span className="checkmark draw"></span>
    </span>
  )
}

CircleLoader.displayName = 'CircleLoader'
CircleLoader.propTypes = {
  complete: propTypes.bool,
}

export default CircleLoader
