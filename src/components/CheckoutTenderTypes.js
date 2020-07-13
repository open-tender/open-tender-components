import { tenderTypeNamesMap } from '@open-tender/js'

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
