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

const RequestedAtDateTimeView = styled.div`
  label: RequestedAtDateTimeSelects;
  text-align: center;
`

const RequestedAtDateTimeTitle = styled('p')`
  width: 100%;
  margin: 0 0 1rem;
  text-align: center;
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes.h3};
`

const RequestedAtDateTimeAsap = styled.div`
  label: RequestedAtDateTimeAsap;

  margin: 0 0 3rem;
  text-align: center;

  button {
    min-width: 32rem;
    max-width: 100%;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      min-width: 100%;
    }
  }
`

const RequestedAtDateTimeSelects = styled.div`
  label: RequestedAtDateTimeSelects;

  width: 100%;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const RequestedAtDateTimeSelect = styled.div`
  width: 47.5%;

  select {
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const RequestedAtDateTimeNevermind = styled.div`
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
  isReorder,
  isLanding,
}) => {
  const { name, timezone, first_times, holidays, days_ahead, valid_times } =
    revenueCenter
  const orderTypeName = orderType === 'CATERING' ? 'Catering ' : ''
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const firstTime = first_times[serviceType]
  const selected = requestedAt && requestedAt !== 'asap'
  const requested = selected ? isoToDateStrMinutes(requestedAt, timezone) : {}
  const [date, setDate] = useState(requested.date || firstTime.date)
  const [time, setTime] = useState(requested.minutes || firstTime.minutes)
  const [dateChange, setDateChange] = useState(false)
  const daysAhead = orderType === 'CATERING' ? 100 : days_ahead
  const dates = useMemo(
    () => makeDates(firstTime.date, daysAhead, 'E, MMM d'),
    [firstTime.date, daysAhead]
  )
  const dateOptions = dates.map(({ label, value }) => ({ name: label, value }))
  const timeOptions = useMemo(
    () => makeTimes(date, firstTime, valid_times, holidays, serviceType),
    [date, firstTime, valid_times, holidays, serviceType]
  )
  const firstOrderableTime = timeOptions
    ? timeOptions.find((i) => !i.disabled)
    : null
  const firstMinutes = firstOrderableTime ? firstOrderableTime.value : null
  const asapTime = firstTime
    ? makeReadableDateStrFromIso(firstTime.utc, timezone)
    : null
  const orderDate = dateOptions.find((i) => i.value === date)
  const orderTime = timeOptions
    ? timeOptions.find((i) => i.value === time) ||
      timeOptions.find((i) => i.value === firstMinutes)
    : null
  const orderMsg =
    orderDate && orderTime
      ? `Order for ${orderDate.name} @ ${orderTime.name}`
      : 'Choose Time'
  const timeVal = orderTime ? orderTime.value : time
  const requestedTime = dateStrMinutesToIso(date, timeVal, timezone)
  const closedTimeOptions = [{ name: 'Closed', value: null, disabled: false }]

  const changeDate = (evt) => {
    setDate(evt.target.value)
    setDateChange(true)
  }

  const changeTime = (evt) => {
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
          {orderTypeName}
          {serviceTypeName}
          {orderTypeName ? <br /> : null} from {name}
        </Heading>
      </RequestedAtDateTimeTitle>
      <p>Please choose a date & time below.</p>
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
            options={timeOptions || closedTimeOptions}
          />
        </RequestedAtDateTimeSelect>
      </RequestedAtDateTimeSelects>
      <RequestedAtDateTimeAsap>
        <ButtonStyled
          onClick={() => chooseTime(requestedTime)}
          color={
            firstTime.has_asap && (isReorder || isLanding)
              ? 'secondary'
              : 'primary'
          }
          disabled={!timeOptions}
        >
          {orderMsg}
        </ButtonStyled>
      </RequestedAtDateTimeAsap>
      {firstTime.has_asap ? (
        <>
          <RequestedAtDateTimeAsap>
            <ButtonStyled
              onClick={() => chooseTime('asap')}
              color={isReorder || isLanding ? 'primary' : 'secondary'}
            >
              Order ASAP
              {serviceType !== 'WALKIN' ? ` (about ${asapTime})` : null}
            </ButtonStyled>
          </RequestedAtDateTimeAsap>
        </>
      ) : null}
      <RequestedAtDateTimeNevermind>
        <ButtonLink onClick={cancel}>
          {isLocation
            ? "Nevermind, let's choose a different location"
            : isReorder
            ? "Nevermind, I don't want to order this again"
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
  isReorder: propTypes.bool,
  isLanding: propTypes.bool,
}

export default RequestedAtDateTime
