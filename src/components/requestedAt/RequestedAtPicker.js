import React from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import styled from '@emotion/styled'

import { TimePicker } from '.'
import { Box } from '..'

const RequestedAtPickerView = styled(Box)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 38rem;
  height: 35rem;
  padding: 1rem;
  margin: 0 auto;
  overflow: hidden;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const RequestedAtPicker = ({
  date,
  setDate,
  selectTime,
  minDate,
  maxDate,
  excludeDates,
  filterDate,
  interval,
  excludeTimes,
  minTime = 0,
  maxTime = 1425,
}) => {
  return (
    <RequestedAtPickerView>
      <DatePicker
        inline
        showPopperArrow={false}
        shouldCloseOnSelect={false}
        dateFormat="yyyy-MM-dd h:mm aa"
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        filterDate={filterDate}
        selected={date}
        onChange={(date) => setDate(date)}
      />
      <TimePicker
        date={date}
        setDate={setDate}
        selectTime={selectTime}
        interval={interval}
        excludeTimes={excludeTimes}
        minTime={minTime}
        maxTime={maxTime}
      />
    </RequestedAtPickerView>
  )
}

RequestedAtPicker.displayName = 'RequestedAtPicker'
RequestedAtPicker.propTypes = {
  date: propTypes.object,
  setDate: propTypes.func,
  selectTime: propTypes.func,
  minDate: propTypes.object,
  maxDate: propTypes.object,
  excludeDates: propTypes.array,
  filterDate: propTypes.func,
  interval: propTypes.number,
  excludeTimes: propTypes.array,
  minTime: propTypes.number,
  maxTime: propTypes.number,
}

export default RequestedAtPicker
