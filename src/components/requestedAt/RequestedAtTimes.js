import React from 'react'
import propTypes from 'prop-types'
import {
  serviceTypeNamesMap,
  capitalize,
  makeOrderTimes,
  time24ToDateStr,
  timezoneMap,
} from '@open-tender/js'
import { Button } from '../index'

const makeOrderWindow = (orderTime) => {
  if (orderTime.start_time === orderTime.end_time) {
    return `@ ${time24ToDateStr(orderTime.start_time)}`
  } else {
    return `from ${time24ToDateStr(orderTime.start_time)} to ${time24ToDateStr(
      orderTime.end_time
    )}`
  }
}

const RequestedAtTimes = ({
  orderTimes,
  serviceType,
  revenueCenter,
  requestedAt,
  setRequestedAt,
}) => {
  const tz = timezoneMap[revenueCenter.timezone]
  const availableTimes = makeOrderTimes(orderTimes, tz)
  const serviceTypeName = serviceTypeNamesMap[serviceType].toLowerCase()

  const handleRequestedAt = (evt, requestedAt) => {
    evt.preventDefault()
    setRequestedAt(requestedAt)
    evt.target.blur()
  }

  return (
    <div className="modal__content">
      <div className="modal__header">
        <p className="modal__title ot-heading ot-font-size-h3">
          Choose an order time
        </p>
        <p className="modal__subtitle">
          Please select from the available {serviceTypeName} times below
        </p>
      </div>
      <div className="modal__body">
        <ul className="order-times">
          {availableTimes.map((i) => {
            const { weekday, time } = i.order_by
            const orderBy = `${capitalize(weekday)} at ${time24ToDateStr(time)}`
            const current = requestedAt === i.iso
            return (
              <li
                key={i.iso}
                className={`order-time ot-border-color ${
                  current ? '-current' : ''
                }`}
              >
                <div className="order-time__container">
                  <div className="order-time__time ot-font-size-small">
                    <p className={current ? 'ot-bold ot-color-headings' : ''}>
                      {capitalize(i.weekday)} {makeOrderWindow(i)}{' '}
                      {current ? '(current)' : ''}
                    </p>
                    <p className="order-time__order-by ot-font-size-x-small">
                      {' '}
                      (order by {orderBy})
                    </p>
                  </div>
                  <Button
                    text={current ? 'Keep' : 'Select'}
                    classes={current ? 'ot-btn ot-btn--highlight' : 'ot-btn'}
                    onClick={(evt) => handleRequestedAt(evt, i.iso)}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

RequestedAtTimes.displayName = 'RequestedAtTimes'
RequestedAtTimes.propTypes = {
  orderTimes: propTypes.array,
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  requestedAt: propTypes.string,
  setRequestedAt: propTypes.func,
}

export default RequestedAtTimes
