import React from 'react'
import propTypes from 'prop-types'
import { RequestedAtPicker } from '.'

const RequestedAtCalendar = ({
  requestedAt,
  serviceType,
  revenueCenter,
  setRequestedAt,
}) => {
  return revenueCenter ? (
    <RequestedAtPicker
      requestedAt={requestedAt}
      serviceType={serviceType}
      revenueCenter={revenueCenter}
      setRequestedAt={setRequestedAt}
    />
  ) : null
}

RequestedAtCalendar.displayName = 'RequestedAtCalendar'
RequestedAtCalendar.propTypes = {
  forcedUpdate: propTypes.bool,
  requestedAt: propTypes.string,
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  handleClose: propTypes.func,
  setRequestedAt: propTypes.func,
}

export default RequestedAtCalendar
