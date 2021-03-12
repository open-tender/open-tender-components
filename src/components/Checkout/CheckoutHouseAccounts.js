import React, { useContext } from 'react'
import { Preface, Text } from '..'
import { CheckoutCard, CheckoutCards } from '.'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'

const CheckoutHouseAccounts = () => {
  const formContext = useContext(FormContext)
  const { check, form } = formContext
  const tenderContext = useContext(TendersContext)
  const { addTender } = tenderContext
  const houseAccounts = check.customer.house_accounts || []
  const applied = form.tenders
    .filter((i) => i.tender_type === 'HOUSE_ACCOUNT')
    .map((i) => i.house_account_id)

  return (
    <CheckoutCards>
      {houseAccounts.map((houseAccount) => {
        const {
          house_account_id,
          name,
          pin,
          service_type,
          order_type,
          revenue_centers,
        } = houseAccount
        const tender = { ...houseAccount, tender_type: 'HOUSE_ACCOUNT' }
        const isOrderType = order_type ? order_type === check.order_type : true
        const isServiceType = order_type
          ? service_type === check.service_type
          : true
        const revenueCenterId = check.revenue_center.revenue_center_id
        const revenueCenterIds = revenue_centers.map((i) => i.revenue_center_id)
        const isRevenueCenter = revenueCenterIds.length
          ? revenueCenterIds.includes(revenueCenterId)
          : true
        const isApplied = applied.includes(house_account_id)
        const isDisabled =
          !isOrderType ||
          !isServiceType ||
          !isRevenueCenter ||
          (applied.length && !isApplied)
        return (
          <li key={house_account_id}>
            <CheckoutCard
              icon={<Preface size="xSmall">{pin}</Preface>}
              name={
                <>
                  <Text as="p" color="primary">
                    {name}
                  </Text>
                  {!isRevenueCenter ? (
                    <Text as="p" size="xSmall">
                      Cannot be used with this location
                    </Text>
                  ) : !isOrderType ? (
                    <Text as="p" size="xSmall">
                      Cannot be used with this order type
                    </Text>
                  ) : !isServiceType ? (
                    <Text as="p" size="xSmall">
                      Cannot be used with this service type
                    </Text>
                  ) : null}
                </>
              }
              onClick={isApplied ? null : () => addTender(tender)}
              isApplied={isApplied}
              disabled={isApplied || isDisabled ? true : false}
            />
          </li>
        )
      })}
    </CheckoutCards>
  )
}

CheckoutHouseAccounts.displayName = 'CheckoutHouseAccounts'

export default CheckoutHouseAccounts
