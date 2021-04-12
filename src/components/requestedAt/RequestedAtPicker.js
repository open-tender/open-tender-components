import React from 'react'
import propTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import styled from '@emotion/styled'

import { Box, ButtonStyled, Text } from '..'
import useDatePicker from './useDatePicker'

const DatepickerView = styled(Box)`
  margin-top: 1.5rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`

const RequestedAtPickerButtons = styled('div')`
  margin: 1.5rem 0 0;

  button + button {
    margin: 0 0 0 1rem;
  }
`

const RequestedAtPicker = ({
  revenueCenter,
  serviceType,
  requestedAt,
  setRequestedAt,
}) => {
  const {
    minDate,
    maxDate,
    excludeDates,
    filterDate,
    interval,
    excludeTimes,
    hasAsap,
    date,
    setDate,
    error,
    submitDate,
  } = useDatePicker(revenueCenter, serviceType, requestedAt, setRequestedAt)

  if (!revenueCenter) return null
  return (
    <>
      <DatepickerView>
        {error ? (
          <Text as="p" color="error">
            {error}
          </Text>
        ) : (
          <DatePicker
            showPopperArrow={false}
            showTimeSelect
            timeCaption="Time"
            timeFormat="h:mm aa"
            dateFormat="yyyy-MM-dd h:mm aa"
            minDate={minDate}
            maxDate={maxDate}
            timeIntervals={interval}
            excludeDates={excludeDates}
            excludeTimes={excludeTimes}
            filterDate={filterDate}
            selected={date}
            onChange={(date) => setDate(date)}
            inline
            shouldCloseOnSelect={false}
          />
        )}
      </DatepickerView>
      <RequestedAtPickerButtons>
        {!error && (
          <>
            {hasAsap && (
              <ButtonStyled onClick={() => setRequestedAt('asap')}>
                {requestedAt === 'asap' ? 'Keep ASAP' : 'Change to ASAP'}
              </ButtonStyled>
            )}
            <ButtonStyled onClick={submitDate}>
              {hasAsap ? 'Update Order Time' : 'Choose Order Time'}
            </ButtonStyled>
          </>
        )}
      </RequestedAtPickerButtons>
    </>
  )
}

RequestedAtPicker.displayName = 'RequestedAtPicker'
RequestedAtPicker.propTypes = {
  revenueCenter: propTypes.object,
  serviceType: propTypes.string,
  requestedAt: propTypes.string,
  setRequestedAt: propTypes.func,
}

export default RequestedAtPicker
