import React, { useContext } from 'react'
import propTypes from 'prop-types'
import { tenderTypeNamesMap } from 'open-tender-js'
import { TendersContext } from './CheckoutTenders'
import { makeTenderTypeLabel } from './CheckoutTenderTypes'
import {
  Button,
  CircleLoader,
  CheckoutLineItem,
  CheckoutCreditCards,
  CheckoutHouseAccounts,
} from '.'

const CheckoutTender = ({ tenderType }) => {
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
  } = tenderContext
  const label = makeTenderTypeLabel(tenderType)
  const name = tenderTypeNamesMap[tenderType]
  const isApplied = tenderTypesApplied.includes(tenderType)
  const isDisabled = tenderType === 'HOUSE_ACCOUNT' && !customerId

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
                text={`Remove ${name} Payment`}
                ariaLabel={`Remove ${name} Payment`}
                icon="XCircle"
                classes="ot-btn--secondary ot-btn--header"
                onClick={(evt) => removeTender(evt, tenderType)}
              />
            </>
          ) : (
            <Button
              text={`Pay with ${name}`}
              ariaLabel={`Pay with ${name}`}
              icon="PlusCircle"
              classes="ot-btn--secondary ot-btn--header"
              onClick={applyTender}
              disabled={isPaid || isDisabled}
            />
          )}
        </div>
      </CheckoutLineItem>
      {tenderType === 'CREDIT' && showCredit && <CheckoutCreditCards />}
      {tenderType === 'HOUSE_ACCOUNT' && showHouseAccount && (
        <CheckoutHouseAccounts />
      )}
    </>
  )
}

CheckoutTender.displayName = 'CheckoutTender'
CheckoutTender.propTypes = {
  tenderType: propTypes.string,
}
export default CheckoutTender
