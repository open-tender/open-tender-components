import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Checkbox } from '../../inputs'

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

const ratings = [
  {
    notification_area: 'RATING',
    notification_channel: 'EMAIL',
    title: 'Email',
  },
  { notification_area: 'RATING', notification_channel: 'SMS', title: 'SMS' },
  {
    notification_area: 'RATING',
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

const CommunicationPreferencesOptions = styled.div`
  & > label {
    margin: 1rem 0 0;
  }
`

const CommunicationPreferencesGroupView = styled.div`
  margin: 0 0 3rem;
`

const CommunicationPreferencesGroup = ({
  prefs,
  add,
  remove,
  fields,
  title,
}) => {
  return (
    <CommunicationPreferencesGroupView>
      <CommunicationPreferencesLabel>{title}</CommunicationPreferencesLabel>
      <CommunicationPreferencesOptions>
        {fields.map((field) => {
          const id = `${field.notification_area}_${field.notification_channel}`
          const pref = prefs.find(
            (i) =>
              i.notification_area === field.notification_area &&
              i.notification_channel === field.notification_channel
          )
          return (
            <Checkbox
              key={id}
              showLabel={true}
              required={true}
              id={id}
              on={pref ? true : false}
              onChange={
                pref
                  ? () => remove(pref.customer_notification_preference_id)
                  : () =>
                      add(field.notification_area, field.notification_channel)
              }
              description={field.title}
            />
          )
        })}
      </CommunicationPreferencesOptions>
    </CommunicationPreferencesGroupView>
  )
}

CommunicationPreferencesGroup.displayName = 'CommunicationPreferencesGroup'
CommunicationPreferencesGroup.propTypes = {
  prefs: propTypes.array,
  add: propTypes.func,
  remove: propTypes.func,
  fields: propTypes.array,
  title: propTypes.string,
}

const CommunicationPreferences = ({ prefs, add, remove }) => {
  return (
    <CommunicationPreferencesView>
      <CommunicationPreferencesGroup
        prefs={prefs}
        add={add}
        remove={remove}
        fields={orderNotifications}
        title="Order Notifications"
      />
      <CommunicationPreferencesGroup
        prefs={prefs}
        add={add}
        remove={remove}
        fields={ratings}
        title="Order Ratings"
      />
      <CommunicationPreferencesGroup
        prefs={prefs}
        add={add}
        remove={remove}
        fields={marketing}
        title="Marketing"
      />
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
