import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  timezoneMap,
  dateToIso,
  makeDatePickerDates,
  makeDatePickerTimes,
} from '@open-tender/js'

import { RequestedAtPicker } from '.'

const RequestedAtCalendarView = styled('div')`
  width: 100%;
`

const RequestedAtCalendar = ({
  serviceType,
  revenueCenter,
  setRequestedAt,
}) => {
  const [date, setDate] = useState(null)
  const { timezone } = revenueCenter || {}
  const settings = revenueCenter.settings || revenueCenter
  const tz = timezone ? timezoneMap[timezone] : null
  const dateArgs = makeDatePickerDates(settings, serviceType)
  const { minDate, maxDate, excludeDates, filterDate } = dateArgs
  const timeArgs = makeDatePickerTimes(settings, serviceType, date)
  const { interval, excludeTimes } = timeArgs

  const selectTime = (time) => {
    setDate(null)
    setTimeout(() => {
      const reqestedAtIso = time ? dateToIso(time, tz) : 'asap'
      setRequestedAt(reqestedAtIso)
    }, 300)
  }

  return tz ? (
    <RequestedAtCalendarView>
      <RequestedAtPicker
        date={date}
        setDate={(date) => setDate(date)}
        selectTime={selectTime}
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        filterDate={filterDate}
        interval={interval}
        excludeTimes={excludeTimes}
      />
    </RequestedAtCalendarView>
  ) : null
}

RequestedAtCalendar.displayName = 'RequestedAtCalendar'
RequestedAtCalendar.propTypes = {
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  setRequestedAt: propTypes.func,
}

export default RequestedAtCalendar
