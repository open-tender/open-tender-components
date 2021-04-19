import React, { useState } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  dateToIso,
  makeDatePickerDates,
  makeDatePickerTimes,
} from '@open-tender/js'

import { RequestedAtPicker } from '.'
import { ButtonStyled } from '..'

const RequestedAtCalendarView = styled('div')`
  width: 100%;
  // max-width: 36rem;
  // margin: 0 auto;

  // & > div:first-of-type {
  //   margin: 0 0 2rem;
  //   border: 0.1rem solid ${(props) => props.theme.border.color};
  // }
`

const RequestedAtPickerButtons = styled('div')`
  display: flex;
  align-items: center;
  margin: 2.5rem -0.5rem 0;

  div {
    width: 50%;
    padding: 0 0.5rem;

    button {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
    }
  }
`

const RequestedAtCalendar = ({
  requestedAt,
  serviceType,
  revenueCenter,
  setRequestedAt,
  keepCurrent,
}) => {
  const [date, setDate] = useState(null)
  const { settings, timezone: tz } = revenueCenter || {}
  const st = serviceType === 'WALKIN' ? 'PICKUP' : serviceType
  const firstTimes = settings.first_times[st]
  const hasAsap = firstTimes.has_asap
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
      <RequestedAtPickerButtons>
        <div>
          <ButtonStyled onClick={keepCurrent}>Keep Current Time</ButtonStyled>
        </div>
        {hasAsap && requestedAt !== 'asap' && (
          <div>
            <ButtonStyled
              onClick={() => setRequestedAt('asap')}
              color="secondary"
            >
              Switch to ASAP
            </ButtonStyled>
          </div>
        )}
      </RequestedAtPickerButtons>
    </RequestedAtCalendarView>
  ) : null
}

RequestedAtCalendar.displayName = 'RequestedAtCalendar'
RequestedAtCalendar.propTypes = {
  requestedAt: propTypes.string,
  serviceType: propTypes.string,
  revenueCenter: propTypes.object,
  setRequestedAt: propTypes.func,
  keepCurrent: propTypes.func,
}

export default RequestedAtCalendar
