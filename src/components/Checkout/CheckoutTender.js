import React, { useContext, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { tenderTypeNamesMap, capitalize } from '@open-tender/js'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
import { CheckoutCreditCards, CheckoutHouseAccounts, CheckoutLevelUp } from '.'
import { FormButton } from '../inputs'

const CheckoutTenderLabelView = styled('span')`
  display: flex !important;
  justify-content: flex-end;
  align-items: center;

  & > span {
    display: block;
    color: ${(props) => props.theme.colors.primary};

    &:first-of-type {
      width: 1.8rem;
      height: 1.8rem;
      margin: 0 1rem 0 0;
    }

    &:last-of-type {
      font-size: ${(props) => props.theme.fonts.sizes.main};
    }
  }
`

const CheckoutTenderLabel = ({ icon, name }) => (
  <CheckoutTenderLabelView>
    <span>{icon}</span>
    <span>{name}</span>
  </CheckoutTenderLabelView>
)

CheckoutTenderLabel.displayName = 'CheckoutTenderLabel'
CheckoutTenderLabel.propTypes = {
  icon: propTypes.element,
  name: propTypes.string,
}

const makeTenderName = (tenderType) => {
  return capitalize(tenderType.replace('_', ''))
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
    showLevelUp,
    setShowLevelUp,
    addTender,
    removeTender,
    iconMap,
  } = tenderContext
  const name = tenderTypeNamesMap[tenderType] || makeTenderName(tenderType)
  const icon = iconMap[tenderType.toLowerCase()] || iconMap.cash
  const title = <CheckoutTenderLabel icon={icon} name={name} />
  const isApplied = tenderTypesApplied.includes(tenderType)
  const houseAccounts = check.customer
    ? check.customer.house_accounts || []
    : []
  const isDisabled =
    tenderType === 'HOUSE_ACCOUNT' && (!customerId || !houseAccounts.length)

  const applyTender =
    tenderType === 'CREDIT'
      ? () => {
          setShowCredit(true)
          setShowLevelUp(false)
          setShowHouseAccount(false)
        }
      : tenderType === 'HOUSE_ACCOUNT'
      ? () => {
          setShowCredit(false)
          setShowLevelUp(false)
          setShowHouseAccount(true)
        }
      : tenderType === 'LEVELUP'
      ? () => {
          setShowCredit(false)
          setShowLevelUp(true)
          setShowHouseAccount(false)
        }
      : () => {
          addTender({ tender_type: tenderType })
          setShowCredit(false)
          setShowLevelUp(false)
          setShowHouseAccount(false)
        }

  const onClick = isApplied ? () => removeTender(tenderType) : applyTender
  const label = isApplied ? `Remove ${name} Payment` : `Pay with ${name}`
  const disabled = isApplied ? false : isPaid || isDisabled

  useEffect(() => {
    if (!tenderTypesApplied.length) {
      setShowCredit(false)
      setShowLevelUp(false)
      setShowHouseAccount(false)
    }
  }, [tenderTypesApplied, setShowCredit, setShowLevelUp, setShowHouseAccount])

  return (
    <>
      <FormButton
        title={title}
        isApplied={isApplied}
        onClick={onClick}
        disabled={disabled}
        label={label}
        style={{ padding: '1.5rem 1.5rem' }}
      />
      {tenderType === 'CREDIT' && showCredit && <CheckoutCreditCards />}
      {tenderType === 'LEVELUP' && showLevelUp && <CheckoutLevelUp />}
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
