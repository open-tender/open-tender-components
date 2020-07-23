import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { tenderTypeNamesMap } from '@open-tender/js'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
import {
  Button,
  CircleLoader,
  CheckoutLineItem,
  CheckoutCreditCards,
  CheckoutHouseAccounts,
} from '.'

const CheckoutTenderLabel = ({ icon, name }) => (
  <span className="form__input__tender">
    <span className="form__input__icon">{icon}</span>
    <span>{name}</span>
  </span>
)

CheckoutTenderLabel.displayName = 'CheckoutTenderLabel'
CheckoutTenderLabel.propTypes = {
  icon: propTypes.element,
  name: propTypes.string,
}

const CheckoutTender = ({ tenderType }) => {
  const formContext = useContext(FormContext)
  const { check } = formContext
  const tenderContext = useContext(TendersContext)
  const {
    customerId,
    isPaid,
    tenderTypesApplied,
    showCredit,
    setShowCredit,
    showHouseAccount,
    setShowHouseAccount,
    addTender,
    removeTender,
    iconMap,
  } = tenderContext
  const name = tenderTypeNamesMap[tenderType]
  const icon = iconMap[tenderType.toLowerCase()]
  const label = <CheckoutTenderLabel icon={icon} name={name} />
  const isApplied = tenderTypesApplied.includes(tenderType)
  const houseAccounts = check.customer
    ? check.customer.house_accounts || []
    : []
  const isDisabled =
    tenderType === 'HOUSE_ACCOUNT' && (!customerId || !houseAccounts.length)

  const applyTender =
    tenderType === 'CREDIT'
      ? (evt) => {
          evt.preventDefault()
          setShowHouseAccount(false)
          setShowCredit(true)
          evt.target.blur()
        }
      : tenderType === 'HOUSE_ACCOUNT'
      ? (evt) => {
          evt.preventDefault()
          setShowCredit(false)
          setShowHouseAccount(true)
          evt.target.blur()
        }
      : (evt) => {
          addTender(evt, { tender_type: tenderType })
          setShowCredit(false)
          setShowHouseAccount(false)
        }

  return (
    <>
      <CheckoutLineItem key={tenderType} label={label}>
        <div className="input__wrapper">
          {isApplied ? (
            <>
              <span className="input__success">
                <CircleLoader complete={true} />
              </span>
              <Button
                // text={`Remove ${name} Payment`}
                text={`Remove`}
                ariaLabel={`Remove ${name} Payment`}
                icon={iconMap.remove}
                classes="ot-btn--secondary ot-btn--header"
                onClick={(evt) => removeTender(evt, tenderType)}
              />
            </>
          ) : (
            <Button
              // text={`Pay with ${name}`}
              text={`Apply`}
              ariaLabel={`Pay with ${name}`}
              icon={iconMap.add}
              classes="ot-btn--secondary ot-btn--header"
              onClick={applyTender}
              disabled={isPaid || isDisabled}
            />
          )}
        </div>
      </CheckoutLineItem>
      {tenderType === 'CREDIT' && showCredit && <CheckoutCreditCards />}
      {tenderType === 'HOUSE_ACCOUNT' &&
        showHouseAccount &&
        houseAccounts.length > 0 && <CheckoutHouseAccounts />}
    </>
  )
}

CheckoutTender.displayName = 'CheckoutTender'
CheckoutTender.propTypes = {
  tenderType: propTypes.string,
}
export default CheckoutTender
