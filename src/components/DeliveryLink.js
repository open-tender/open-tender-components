import React from 'react'
import propTypes from 'prop-types'

const DeliveryLink = ({ text, trackingUrl, newWindowIcon }) => (
  <a
    href={trackingUrl}
    rel="noopener noreferrer"
    target="_blank"
    title="Check delivery status"
  >
    {text}
    {newWindowIcon && <span className="link-icon">{newWindowIcon}</span>}
  </a>
)

DeliveryLink.displayName = 'DeliveryLink'
DeliveryLink.propTypes = {
  text: propTypes.string,
  trackingUrl: propTypes.string,
  newWindowIcon: propTypes,
}

export default DeliveryLink
