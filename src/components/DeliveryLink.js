import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const DeliveryLinkIcon = styled('span')`
  display: inline-block;
  position: relative;
  top: 0.1rem;
  margin: 0 0 0 0.6rem;
  width: 1.2rem;
  height: 1.2rem;
`

const DeliveryLink = ({ text, trackingUrl, newWindowIcon }) => (
  <a
    href={trackingUrl}
    rel="noopener noreferrer"
    target="_blank"
    title="Check delivery status"
  >
    {text}
    {newWindowIcon && <DeliveryLinkIcon>{newWindowIcon}</DeliveryLinkIcon>}
  </a>
)

DeliveryLink.displayName = 'DeliveryLink'
DeliveryLink.propTypes = {
  text: propTypes.string,
  trackingUrl: propTypes.string,
  newWindowIcon: propTypes.element,
}

export default DeliveryLink
