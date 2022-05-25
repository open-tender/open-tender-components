import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Checkbox } from '../../inputs'
import Preface from '../../Preface'

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
  // { notification_area: 'RATING', notification_channel: 'SMS', title: 'SMS' },
  // {
  //   notification_area: 'RATING',
  //   notification_channel: 'PUSH',
  //   title: 'Push Notifications',
  // },
]

const CommunicationPreferencesView = styled.div``

const CommunicationPreferencesHeader = styled.div`
  margin: 0 0 1.5rem;
`

const CommunicationPreferencesTitle = styled(Preface)`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const CommunicationPreferencesSubtitle = styled.p`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  margin: 0.5rem 0 0;
`

const CommunicationPreferencesOptions = styled.div`
  & > label {
    margin: 1rem 0 0;
  }
`

const CommunicationPreferencesGroupView = styled.div`
  margin: 0 0 3.5rem;
`

const CommunicationPreferencesGroup = ({
  channelTypes,
  prefs,
  add,
  remove,
  fields,
  title,
  subtitle,
}) => {
  const filtered = fields.filter((i) =>
    channelTypes.includes(i.notification_channel)
  )
  return (
    <CommunicationPreferencesGroupView>
      <CommunicationPreferencesHeader>
        <CommunicationPreferencesTitle>{title}</CommunicationPreferencesTitle>
        {subtitle && (
          <CommunicationPreferencesSubtitle>
            {subtitle}
          </CommunicationPreferencesSubtitle>
        )}
      </CommunicationPreferencesHeader>
      <CommunicationPreferencesOptions>
        {filtered.map((field) => {
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
  channelTypes: propTypes.array,
  prefs: propTypes.array,
  add: propTypes.func,
  remove: propTypes.func,
  fields: propTypes.array,
  title: propTypes.string,
  subtitle: propTypes.string,
}

const CommunicationPreferences = ({
  areaTypes,
  channelTypes,
  prefs,
  add,
  remove,
  accepts_marketing = {},
  order_notifications = {},
}) => {
  return (
    <CommunicationPreferencesView>
      {areaTypes.includes('ORDER') && (
        <CommunicationPreferencesGroup
          channelTypes={channelTypes}
          prefs={prefs}
          add={add}
          remove={remove}
          fields={orderNotifications}
          title={order_notifications?.title || 'Order Notifications'}
          subtitle={order_notifications?.description || null}
        />
      )}
      {areaTypes.includes('MARKETING') && (
        <CommunicationPreferencesGroup
          channelTypes={channelTypes}
          prefs={prefs}
          add={add}
          remove={remove}
          fields={marketing}
          title={accepts_marketing?.title || 'Marketing & Promotions'}
          subtitle={accepts_marketing?.description || null}
        />
      )}
      {areaTypes.includes('RATING') && (
        <CommunicationPreferencesGroup
          channelTypes={channelTypes}
          prefs={prefs}
          add={add}
          remove={remove}
          fields={ratings}
          title="Order Ratings"
        />
      )}
    </CommunicationPreferencesView>
  )
}

CommunicationPreferences.displayName = 'CommunicationPreferences'
CommunicationPreferences.propTypes = {
  areaTypes: propTypes.array,
  channelTypes: propTypes.array,
  prefs: propTypes.array,
  add: propTypes.func,
  remove: propTypes.func,
  accepts_marketing: propTypes.object,
  order_notifications: propTypes.object,
}

export default CommunicationPreferences
