import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { tenderTypeNamesMap, capitalize } from '@open-tender/js'
import { ButtonStyled } from '..'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
import { CheckoutCreditCards, CheckoutHouseAccounts, CheckoutLevelUp } from '.'
import { FormApplied, FormRow } from '../inputs'

const CheckoutTenderLabelView = styled('span')`
  display: flex !important;
  justify-content: flex-end;
  align-items: center;

  span {
    display: block;
    color: ${(props) => props.theme.colors.primary};

    &:first-of-type {
      width: 1.8rem;
      height: 1.8rem;
      margin: 0 1rem 0 0;
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
  const label = <CheckoutTenderLabel icon={icon} name={name} />
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

  return (
    <>
      <FormRow
        as="div"
        labelWidth="auto"
        label={label}
        input={
          isApplied ? (
            <>
              <FormApplied />
              <ButtonStyled
                label={`Remove ${name} Payment`}
                icon={iconMap.remove}
                onClick={() => removeTender(tenderType)}
                size="header"
                color="header"
              >
                Remove
              </ButtonStyled>
            </>
          ) : (
            <ButtonStyled
              label={`Pay with ${name}`}
              icon={iconMap.add}
              onClick={applyTender}
              disabled={isPaid || isDisabled}
              size="header"
              color="header"
            >
              Apply
            </ButtonStyled>
          )
        }
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
