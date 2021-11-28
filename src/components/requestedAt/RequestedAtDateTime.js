import React, { useEffect, useMemo, useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  dateStrMinutesToIso,
  isoToDateStrMinutes,
  makeDates,
  makeTimes,
  makeReadableDateStrFromIso,
  serviceTypeNamesMap,
} from '@open-tender/js'
import { ButtonLink, ButtonStyled, Heading, SelectOnly } from '..'

const RequestedAtDateTimeView = styled('div')`
  label: RequestedAtDateTimeSelects;
  text-align: center;
`

const RequestedAtDateTimeTitle = styled('p')`
  width: 100%;
  margin: 0 0 3rem;
  line-height: 1;
  text-align: center;
  font-size: ${(props) => props.theme.fonts.sizes.h3};
`

const RequestedAtDateTimeAsap = styled('div')`
  label: RequestedAtDateTimeAsap;

  margin: 0 0 3rem;
  text-align: center;

  button {
    min-width: 32rem;
    max-width: 100%;
  }
`

const RequestedAtDateTimeSelects = styled('div')`
  label: RequestedAtDateTimeSelects;

  width: 100%;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RequestedAtDateTimeSelect = styled('div')`
  width: 47.5%;

  select {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RequestedAtDateTimeNevermind = styled('div')`
  button {
    width: 100%;
    text-align: center;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RequestedAtDateTime = ({
  revenueCenter,
  serviceType,
  orderType,
  requestedAt,
  chooseTime,
  cancel,
  isLocation,
}) => {
  const {
    name,
    timezone,
    first_times,
    holidays,
    days_ahead,
    valid_times,
    time_ranges,
  } = revenueCenter
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const firstTime = first_times[serviceType]
  const timeRange = time_ranges[serviceType]
  const selected = requestedAt && requestedAt !== 'asap'
  const requested = selected ? isoToDateStrMinutes(requestedAt, timezone) : {}
  const [date, setDate] = useState(requested.date || firstTime.date)
  const [time, setTime] = useState(requested.minutes || firstTime.minutes)
  const [updated, setUpdated] = useState(selected ? true : false)
  const [dateChange, setDateChange] = useState(false)
  const daysAhead = orderType === 'CATERING' ? 100 : days_ahead
  const dates = useMemo(
    () => makeDates(firstTime.date, daysAhead, 'E, MMM d'),
    [firstTime.date, daysAhead]
  )
  const dateOptions = dates.map(({ label, value }) => ({ name: label, value }))
  const timeOptions = useMemo(
    () =>
      makeTimes(
        date,
        firstTime,
        valid_times,
        holidays,
        serviceType,
        timezone,
        timeRange
      ),
    [date, firstTime, valid_times, holidays, serviceType, timezone, timeRange]
  )
  const firstOrderableTime = timeOptions.find((i) => !i.disabled)
  const firstMinutes = firstOrderableTime ? firstOrderableTime.value : null
  const asapTime = firstTime
    ? makeReadableDateStrFromIso(firstTime.utc, timezone)
    : null
  const orderDate = dateOptions.find((i) => i.value === date)
  const RequestedAtDateTime =
    timeOptions.find((i) => i.value === time) ||
    timeOptions.find((i) => i.value === firstMinutes)
  const orderMsg =
    orderDate && RequestedAtDateTime
      ? `Order for ${orderDate.name} @ ${RequestedAtDateTime.name}`
      : 'Choose Time'
  const timeVal = RequestedAtDateTime ? RequestedAtDateTime.value : time
  const requestedTime = dateStrMinutesToIso(date, timeVal, timezone)

  const changeDate = (evt) => {
    setUpdated(true)
    setDate(evt.target.value)
    setDateChange(true)
  }

  const changeTime = (evt) => {
    setUpdated(true)
    setTime(parseInt(evt.target.value))
  }

  useEffect(() => {
    if (dateChange) {
      if (firstMinutes) setTime(firstMinutes)
      setDateChange(false)
    }
  }, [dateChange, firstMinutes])

  return (
    <RequestedAtDateTimeView>
      <RequestedAtDateTimeTitle>
        <Heading>
          {serviceTypeName} from {name}
        </Heading>
      </RequestedAtDateTimeTitle>
      {firstTime.has_asap ? (
        <>
          <RequestedAtDateTimeAsap>
            <ButtonStyled
              onClick={() => chooseTime('asap')}
              color={selected ? 'secondary' : 'primary'}
            >
              Order ASAP (about {asapTime})
            </ButtonStyled>
          </RequestedAtDateTimeAsap>
          <p>Or choose a different date & time below.</p>
        </>
      ) : (
        <p>Please choose a date & time below.</p>
      )}
      <RequestedAtDateTimeSelects>
        <RequestedAtDateTimeSelect>
          <SelectOnly
            label="Order Date"
            name="order-date"
            value={date}
            onChange={changeDate}
            options={dateOptions}
          />
        </RequestedAtDateTimeSelect>
        <RequestedAtDateTimeSelect>
          <SelectOnly
            label="Order Time"
            name="order-time"
            value={time}
            onChange={changeTime}
            options={timeOptions}
          />
        </RequestedAtDateTimeSelect>
      </RequestedAtDateTimeSelects>
      <RequestedAtDateTimeAsap>
        <ButtonStyled
          onClick={() => chooseTime(requestedTime)}
          color={!firstTime.has_asap || updated ? 'primary' : 'secondary'}
        >
          {orderMsg}
        </ButtonStyled>
      </RequestedAtDateTimeAsap>
      <RequestedAtDateTimeNevermind>
        <ButtonLink onClick={cancel}>
          {isLocation
            ? "Nevermind, let's choose a different location"
            : 'Nevermind, keep current time'}
        </ButtonLink>
      </RequestedAtDateTimeNevermind>
    </RequestedAtDateTimeView>
  )
}

RequestedAtDateTime.displayName = 'RequestedAtDateTime'
RequestedAtDateTime.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
  orderType: propTypes.string,
  requestedAt: propTypes.string,
  chooseTime: propTypes.func,
  cancel: propTypes.func,
  isLocation: propTypes.bool,
}

export default RequestedAtDateTime
