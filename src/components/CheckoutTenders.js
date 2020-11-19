import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
} from 'react'
import { FormContext } from './CheckoutForm'
import { isEmpty, checkAmountRemaining } from '@open-tender/js'
import { CheckoutTender } from '.'

export const TendersContext = createContext(null)

// https://developer.apple.com/documentation/apple_pay_on_the_web/apple_pay_js_api/checking_for_apple_pay_availability
const checkApplePay = (testing = false) => {
  if (testing) return new Promise((resolve) => resolve(true))
  if (window.ApplePaySession) {
    const merchantIdentifier = 'merchant.opentender.app'
    const promise = window.ApplePaySession.canMakePaymentsWithActiveCard(
      merchantIdentifier
    )
    return promise
      .then(
        (canMakePayments) =>
          console.log('canMakePayments', canMakePayments) ||
          (canMakePayments ? true : false)
      )
      .catch((err) => console.log('catch', err) || false)
  } else {
    return new Promise((resolve) => resolve(false))
  }
}

const CheckoutTenders = () => {
  const [showCredit, setShowCredit] = useState(false)
  const [showHouseAccount, setShowHouseAccount] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showApplePay, setShowApplePay] = useState(false)
  const formContext = useContext(FormContext)
  const { iconMap = {}, config, check, form, errors, updateForm } = formContext
  const hasApplePay = check.config.tender_types.includes('APPLE_PAY')
  const tenderTypes = check.config.tender_types.filter((i) => i !== 'GIFT_CARD')
  const tenderTypesApplied = useMemo(
    () => form.tenders.map((i) => i.tender_type),
    [form.tenders]
  )
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
    if (hasApplePay) {
      checkApplePay().then(
        (show) => console.log('show', show) || setShowApplePay(show)
      )
    }
  }, [hasApplePay])

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
      // const newTenders = form.tenders.filter(
      //   (i, index) => index !== tenderIndex
      // )
      // updateForm({ tenders: [...newTenders] })
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
    if (tenderType === 'LEVELUP') setShowLevelUp(false)
    if (tenderType === 'HOUSE_ACCOUNT') setShowHouseAccount(false)
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
        showLevelUp,
        setShowLevelUp,
        addTender,
        removeTender,
        iconMap,
        showApplePay,
      }}
    >
      <fieldset className="form__fieldset">
        <div className="form__legend">
          <p className="form__legend__title ot-heading ot-font-size-h3">
            {config.tenders.title}
          </p>
          <p className="form__legend__subtitle ot-line-height">
            {config.tenders.subtitle}
          </p>
        </div>
        <div className="form__inputs">
          {tenderTypes.map((tenderType) => (
            <CheckoutTender key={tenderType} tenderType={tenderType} />
          ))}
        </div>
      </fieldset>
    </TendersContext.Provider>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'

export default CheckoutTenders
