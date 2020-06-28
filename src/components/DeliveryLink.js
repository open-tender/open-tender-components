import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from '../packages/icons'

const DeliveryLink = ({ text, trackingUrl }) => (
  <a
    href={trackingUrl}
    rel="noopener noreferrer"
    target="_blank"
    title="Check delivery status"
  >
    {text}
    <span className="link-icon">{iconMap['ExternalLink']}</span>
  </a>
)

DeliveryLink.displayName = 'DeliveryLink'
DeliveryLink.propTypes = {
  text: propTypes.string,
  trackingUrl: propTypes.string,
}

export default DeliveryLink
