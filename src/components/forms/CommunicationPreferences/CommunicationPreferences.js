import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Checkbox, Label } from '../../inputs'

// NotificationArea:
//   type: string
//   enum: ['ORDER', 'RATING', 'MARKETING']

// NotificationChannel:
//   type: string
//   enum: ['EMAIL', 'SMS', 'PUSH']

const orderNotifications = [
  { notification_area: 'ORDER', notification_channel: 'EMAIL', title: 'Email' },
  { notification_area: 'ORDER', notification_channel: 'SMS', title: 'SMS' },
  {
    notification_area: 'ORDER',
    notification_channel: 'PUSH',
    title: 'Push Notifications',
  },
]

const marketing = [
  {
    notification_area: 'MARKETING',
    notification_channel: 'EMAIL',
    title: 'Email',
  },
  { notification_area: 'MARKETING', notification_channel: 'SMS', title: 'SMS' },
  {
    notification_area: 'MARKETING',
    notification_channel: 'PUSH',
    title: 'Push Notifications',
  },
]

const CommunicationPreferencesView = styled.div``

const CommunicationPreferencesLabel = styled('div')`
  margin: 0 0 1rem;
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-family: ${(props) => props.theme.inputs.family};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) => props.theme.inputs.placeholderColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.inputs.fontSizeMobile};
  }
`

const CommunicationPreferencesGroup = styled.div`
  margin: 0 0 3rem;

  & > label {
    margin: 1rem 0 0;
  }
`

const CommunicationPreferences = ({ prefs, add, remove }) => {
  const currentPrefs = prefs.map(
    (pref) => `${pref.notification_area}_${pref.notification_channel}`
  )
  return (
    <CommunicationPreferencesView>
      <CommunicationPreferencesLabel>
        Order Notifications
      </CommunicationPreferencesLabel>
      <CommunicationPreferencesGroup>
        {orderNotifications.map((field) => {
          const id = `${field.notification_area}_${field.notification_channel}`
          return (
            <Checkbox
              key={id}
              showLabel={true}
              required={true}
              id={id}
              on={currentPrefs.includes(id)}
              // onChange={handleChange}
              description={field.title}
            />
          )
        })}
      </CommunicationPreferencesGroup>
      <CommunicationPreferencesLabel>Marketing</CommunicationPreferencesLabel>
      <CommunicationPreferencesGroup>
        {marketing.map((field) => {
          const id = `${field.notification_area}_${field.notification_channel}`
          return (
            <Checkbox
              key={id}
              showLabel={true}
              required={true}
              id={id}
              on={currentPrefs.includes(id)}
              // onChange={handleChange}
              description={field.title}
            />
          )
        })}
      </CommunicationPreferencesGroup>
    </CommunicationPreferencesView>
  )
}

CommunicationPreferences.displayName = 'CommunicationPreferences'
CommunicationPreferences.propTypes = {
  prefs: propTypes.array,
  add: propTypes.func,
  remove: propTypes.func,
}

export default CommunicationPreferences
