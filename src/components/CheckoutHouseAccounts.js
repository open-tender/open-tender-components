import React, { useContext } from 'react'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
import CircleLoader from './CircleLoader'
import iconMap from './icons'

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
    <div className="cards bg-secondary-color">
      <ul className="cards__list">
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
          const isOrderType = order_type
            ? order_type === check.order_type
            : true
          const isServiceType = order_type
            ? service_type === check.service_type
            : true
          const revenueCenterId = check.revenue_center.revenue_center_id
          const revenueCenterIds = revenue_centers.map(
            (i) => i.revenue_center_id
          )
          const isRevenueCenter = revenueCenterIds.length
            ? revenueCenterIds.includes(revenueCenterId)
            : true
          const isApplied = applied.includes(house_account_id)
          const isDisabled =
            !isOrderType ||
            !isServiceType ||
            !isRevenueCenter ||
            (applied.length && !isApplied)
          const disabled = isDisabled ? '-disabled' : ''
          const classes = `cards__card bg-color border-radius ${disabled}`
          return (
            <li key={house_account_id}>
              <div className={classes}>
                <div className="cards__card__image">{pin}</div>
                <div className="cards__card__name">
                  <p>{name}</p>
                  {!isRevenueCenter ? (
                    <p className="font-size-x-small">
                      Cannot be used with this location
                    </p>
                  ) : !isOrderType ? (
                    <p className="font-size-x-small">
                      Cannot be used with this order type
                    </p>
                  ) : !isServiceType ? (
                    <p className="font-size-x-small">
                      Cannot be used with this service type
                    </p>
                  ) : null}
                </div>
                <div className="cards__card__add">
                  {isApplied ? (
                    <CircleLoader complete={true} />
                  ) : (
                    <button
                      type="button"
                      onClick={(evt) => addTender(evt, tender)}
                      className="btn-link"
                      disabled={isApplied || isDisabled}
                    >
                      {iconMap['PlusCircle']}
                    </button>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

CheckoutHouseAccounts.displayName = 'CheckoutHouseAccounts'

export default CheckoutHouseAccounts
