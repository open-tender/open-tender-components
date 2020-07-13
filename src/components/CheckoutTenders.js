import React, { useContext, useState, useEffect, createContext } from 'react'
import { FormContext } from './CheckoutForm'
import { checkAmountRemaining } from '@open-tender/js'
import { CheckoutTender } from './index'
import { isEmpty } from '@open-tender/js'

export const TendersContext = createContext(null)

const CheckoutTenders = () => {
  const [showCredit, setShowCredit] = useState(false)
  const [showHouseAccount, setShowHouseAccount] = useState(false)
  const formContext = useContext(FormContext)
  const { iconMap = {}, config, check, form, errors, updateForm } = formContext
  const tenderTypes = check.config.tender_types.filter((i) => i !== 'GIFT_CARD')
  const tenderTypesApplied = form.tenders.map((i) => i.tender_type)
  const amountRemaining = checkAmountRemaining(check.totals.total, form.tenders)
  const isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
  const tenderErrors = errors ? errors.tenders || null : null
  const tenderIndex = form.tenders.findIndex(
    (i) => i.tender_type !== 'GIFT_CARD'
  )
  const tenderError = tenderErrors ? tenderErrors[tenderIndex] : null
  const customerId =
    check.customer && !isEmpty(check.customer)
      ? check.customer.customer_id
      : null

  useEffect(() => {
    if (tenderTypesApplied.length) {
      tenderTypesApplied.includes('CREDIT')
        ? setShowCredit(true)
        : setShowCredit(false)
    }
  }, [tenderTypesApplied])

  useEffect(() => {
    if (tenderError) {
      const appliedTender = form.tenders[tenderIndex]
      const newTenders = form.tenders.filter(
        (i, index) => index !== tenderIndex
      )
      updateForm({ tenders: [...newTenders] })
      if (appliedTender.tender_type === 'CREDIT') setShowCredit(true)
    }
  }, [form.tenders, tenderError, tenderIndex, updateForm])

  const addTender = (evt, tender) => {
    evt.preventDefault()
    const newTender = { ...tender, amount: amountRemaining.toFixed(2) }
    const currentTenders = form.tenders.filter(
      (i) => i.tender_type !== newTender.tender_type
    )
    updateForm({ tenders: [...currentTenders, newTender] })
    evt.target.blur()
  }

  const removeTender = (evt, tenderType) => {
    evt.preventDefault()
    const filtered = form.tenders.filter((i) => i.tender_type !== tenderType)
    const nonGiftCard = filtered.filter((i) => i.tender_type !== 'GIFT_CARD')
    const giftCard = filtered.filter((i) => i.tender_type === 'GIFT_CARD')
    let remaining = checkAmountRemaining(check.totals.total, nonGiftCard)
    const adjusted = nonGiftCard.map((i) => {
      const newAmount = remaining
      remaining -= newAmount
      return { ...i, amount: newAmount.toFixed(2) }
    })
    const nonZero = adjusted.filter((i) => i.amount !== '0.00')
    updateForm({ tenders: [...giftCard, ...nonZero] })
    if (tenderType === 'CREDIT') setShowCredit(false)
    evt.target.blur()
  }

  return (
    <TendersContext.Provider
      value={{
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
      }}
    >
      <fieldset className="form__fieldset">
        <div className="form__legend">
          <p className="form__legend__title ot-heading ot-font-size-h3">
            {config.tenders.title}
          </p>
          <p className="form__legend__subtitle ot-line-height ot-color-secondary">
            {config.tenders.subtitle}
          </p>
        </div>
        <div className="form__inputs">
          {tenderTypes.map((tenderType) => (
            <CheckoutTender
              key={tenderType}
              tenderType={tenderType}
              // isPaid={isPaid}
              // tenderTypesApplied={tenderTypesApplied}
              // showCredit={showCredit}
              // setShowCredit={setShowCredit}
              // addTender={addTender}
              // removeTender={removeTender}
            />
          ))}
        </div>
      </fieldset>
    </TendersContext.Provider>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'

export default CheckoutTenders
