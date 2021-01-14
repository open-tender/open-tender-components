import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
} from 'react'
import { isEmpty, checkAmountRemaining } from '@open-tender/js'
import { FormFieldset, FormInputs, FormLegend } from '../inputs'
import { CheckoutTender } from '.'
import { FormContext } from './CheckoutForm'
// import CheckoutApplePay from './CheckoutApplePay'

export const TendersContext = createContext(null)

const CheckoutTenders = () => {
  const [showCredit, setShowCredit] = useState(false)
  const [showHouseAccount, setShowHouseAccount] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const formContext = useContext(FormContext)
  const { iconMap = {}, config, check, form, errors, updateForm } = formContext
  const { tender_types } = check.config
  const hasApplePay = tender_types.includes('APPLE_PAY')
  const tenderTypes = tender_types.filter(
    (i) => !['GIFT_CARD', 'APPLE_PAY'].includes(i)
  )
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
    if (tenderTypesApplied.length) {
      tenderTypesApplied.includes('CREDIT')
        ? setShowCredit(true)
        : setShowCredit(false)
    }
  }, [tenderTypesApplied])

  useEffect(() => {
    if (tenderError) {
      const appliedTender = form.tenders[tenderIndex]
      if (appliedTender.tender_type === 'CREDIT') setShowCredit(true)
    }
  }, [form.tenders, tenderError, tenderIndex, updateForm])

  const addTender = (tender) => {
    const newTender = { ...tender, amount: amountRemaining.toFixed(2) }
    const currentTenders = form.tenders.filter(
      (i) => i.tender_type !== newTender.tender_type
    )
    updateForm({ tenders: [...currentTenders, newTender] })
  }

  const removeTender = (tenderType) => {
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
      }}
    >
      <FormFieldset>
        <FormLegend
          as="div"
          title={config.tenders.title}
          subtitle={config.tenders.subtitle}
        />
        <FormInputs>
          {/* {hasApplePay && <CheckoutApplePay />} */}
          {tenderTypes.map((tenderType) => (
            <CheckoutTender key={tenderType} tenderType={tenderType} />
          ))}
        </FormInputs>
      </FormFieldset>
    </TendersContext.Provider>
  )
}

CheckoutTenders.displayName = 'CheckoutTenders'

export default CheckoutTenders
