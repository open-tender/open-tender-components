import { useState } from 'react'
import {
  isEmpty,
  dateToIso,
  isoToDate,
  makeLocalDate,
  makeWeekdaysExcluded,
  makeDatepickerArgs,
  timezoneMap,
  todayDate,
  errMessages,
} from '@open-tender/js'

const useDatePicker = (
  revenueCenter,
  serviceType,
  requestedAt,
  setRequestedAt
) => {
  const { timezone, settings, revenue_center_type } = revenueCenter || {}
  const tz = timezone ? timezoneMap[timezone] : null
  const requestedAtDate =
    !requestedAt || requestedAt === 'asap' ? null : isoToDate(requestedAt, tz)
  const [date, setDate] = useState(requestedAtDate)
  const [error, setError] = useState(null)

  if (!revenueCenter) return {}

  const selectedRequestedAt = date ? dateToIso(date, tz) : 'asap'
  const st = serviceType === 'WALKIN' ? 'PICKUP' : serviceType

  const submitDate = () => {
    setRequestedAt(selectedRequestedAt)
  }

  let args = {}
  if (isEmpty(settings.first_times)) {
    setError(errMessages.revenueCenterClosed)
  } else if (!settings.first_times[st]) {
    setError(errMessages.serviceTypeNotAvailable)
  } else {
    const validTimes = settings.valid_times[st]
    const daysAhead = settings.days_ahead[st]
    const firstTimes = settings.first_times[st]
    const interval = settings.first_times[st].interval
    const holidays = settings.holidays[st].map((i) => makeLocalDate(i))
    const weekdayTimes = makeWeekdaysExcluded(validTimes)
    const excludedTimes = settings.excluded_times
      ? settings.excluded_times[st]
      : {}
    args = makeDatepickerArgs(
      date,
      weekdayTimes,
      excludedTimes,
      firstTimes,
      interval,
      daysAhead
    )
    const first = isoToDate(firstTimes.utc, tz)
    if (args.updatedDate) {
      setDate(args.updatedDate)
    } else if (!error && (date === null || date < first)) {
      setDate(first)
    }
    args.holidays = holidays
    args.interval = interval
    args.hasAsap =
      revenue_center_type === 'OLO' && firstTimes.date === todayDate()
  }
  const {
    excludeTimes,
    isClosed,
    minDate,
    maxDate,
    holidays,
    interval,
    hasAsap,
  } = args

  return {
    tz,
    minDate,
    maxDate,
    excludeDates: holidays,
    filterDate: isClosed,
    interval,
    excludeTimes,
    hasAsap,
    date,
    setDate,
    error,
    selectedRequestedAt,
    submitDate,
  }
}

export default useDatePicker
