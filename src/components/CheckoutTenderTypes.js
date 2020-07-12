import React from 'react'
import propTypes from 'prop-types'
import iconMap from './icons'
import { tenderTypeNamesMap } from '@open-tender/js'

export const CheckoutTenderLabel = ({ icon, text }) => (
  <span className="form__input__tender">
    <span className="form__input__icon">{iconMap[icon]}</span>
    <span>{text}</span>
  </span>
)

CheckoutTenderLabel.displayName = 'CheckoutTenderLabel'
CheckoutTenderLabel.propTypes = {
  icon: propTypes.string,
  text: propTypes.string,
}

export const makeTenderTypeLabel = (tenderType) => {
  switch (tenderType) {
    case 'CASH':
      return <CheckoutTenderLabel text="Cash" icon="DollarSign" />
    case 'CREDIT':
      return <CheckoutTenderLabel text="Credit" icon="CreditCard" />
    case 'LEVELUP':
      return <CheckoutTenderLabel text="LevelUp" icon="Grid" />
    case 'HOUSE_ACCOUNT':
      return <CheckoutTenderLabel text="House Account" icon="Home" />
    default:
      return null
  }
}

export const makeCreditName = (tender) => {
  const creditCard = tender.credit_card || tender
  return `${creditCard.card_type_name} ending in ${creditCard.last4}`
}

export const makeHouseAccountName = (tender) => {
  const houseAccount = tender.house_account || tender
  return `${houseAccount.name} House Account`
}

export const makeTenderName = (tender) => {
  switch (tender.tender_type) {
    case 'CREDIT':
      return makeCreditName(tender)
    case 'GIFT_CARD':
      return `Gift Card ${tender.card_number}`
    case 'HOUSE_ACCOUNT':
      return makeHouseAccountName(tender)
    default:
      return `${tenderTypeNamesMap[tender.tender_type]}`
  }
}
