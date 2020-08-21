import React, {
  useRef,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import propTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import {
  adjustTenders,
  checkAmountRemaining,
  timezoneMap,
  prepareOrder,
} from '@open-tender/js'
import {
  updateCheckoutCustomer,
  logoutCustomer,
  updateForm,
  setSubmitting,
  validateOrder,
  submitOrder,
  resetErrors,
  setAlert,
} from '@open-tender/redux'
import {
  Error,
  CheckoutAddress,
  CheckoutCustomer,
  CheckoutDetails,
  CheckoutDiscounts,
  CheckoutGiftCards,
  CheckoutPromoCodes,
  CheckoutSurcharges,
  CheckoutTenders,
} from '.'
import Check from './Check'

export const FormContext = createContext(null)

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CheckoutForm = ({
  dispatch,
  history,
  iconMap = {},
  cardIconMap = {},
  config,
  checkout,
  order,
  customer,
  autoSelect,
}) => {
  const submitButton = useRef()
  const {
    check,
    form,
    loading,
    errors = {},
    submitting,
    completedOrder,
  } = checkout
  const {
    orderId,
    orderType,
    serviceType,
    revenueCenter,
    requestedAt,
    address,
    cart,
  } = order
  const revenueCenterId = revenueCenter ? revenueCenter.revenue_center_id : null
  const tz = revenueCenter ? timezoneMap[revenueCenter.timezone] : null
  const { surcharges, discounts, promoCodes, tenders, tip } = form
  const email = form.customer && form.customer.email
  const { profile } = customer
  const total = check && check.totals ? check.totals.total : 0.0
  let amountRemaining = checkAmountRemaining(total, tenders)
  let isPaid = Math.abs(amountRemaining).toFixed(2) === '0.00'
  const isDelivery = serviceType === 'DELIVERY'
  const hasGiftCardTender = check
    ? check.config.tender_types.includes('GIFT_CARD')
    : false
  const isComplete = completedOrder ? true : false
  const pending = loading === 'pending'
  const checkUpdating = submitting ? false : pending
  const dispatchUpdateForm = useCallback((form) => dispatch(updateForm(form)), [
    dispatch,
  ])

  useEffect(() => {
    window.scroll(0, 0)
  }, [errors.form])

  useEffect(() => {
    dispatch(resetErrors())
    if (profile) dispatch(updateCheckoutCustomer(profile))
  }, [dispatch, profile])

  useEffect(() => {
    if (total > 0) {
      adjustTenders(tenders, isPaid, amountRemaining, dispatchUpdateForm)
    }
  }, [tenders, isPaid, amountRemaining, dispatchUpdateForm, total])

  const orderValidate = useMemo(() => {
    const customerValidate = profile
      ? { customer_id: profile.customer_id }
      : email
      ? { email }
      : null
    const dataValidate = {
      orderId,
      revenueCenterId,
      serviceType,
      requestedAt,
      cart,
      customer: customerValidate,
      address,
      surcharges,
      discounts,
      promoCodes,
      tip,
    }
    return prepareOrder(dataValidate)
  }, [
    orderId,
    profile,
    revenueCenterId,
    serviceType,
    requestedAt,
    cart,
    address,
    surcharges,
    discounts,
    promoCodes,
    tip,
    email,
  ])
  const prevOrderValidate = usePrevious(orderValidate)

  useEffect(() => {
    if (!isComplete && !isEqual(orderValidate, prevOrderValidate)) {
      dispatch(validateOrder(orderValidate))
    }
  }, [dispatch, orderValidate, prevOrderValidate, isComplete])

  if (!check || !check.config) return null

  const handleSignUp = (evt) => {
    evt.preventDefault()
    dispatch(setAlert({ type: 'signUp' }))
    evt.target.blur()
  }

  const handleLogin = (evt) => {
    evt.preventDefault()
    dispatch(setAlert({ type: 'login' }))
    evt.target.blur()
  }

  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logoutCustomer())
    evt.target.blur()
  }

  const handleAccount = (evt) => {
    evt.preventDefault()
    history.push(`/account`)
    evt.target.blur()
  }

  const handleServiceType = (evt) => {
    evt.preventDefault()
    if (orderType === 'CATERING') {
      history.push(`/catering`)
    } else {
      const startOver = () => history.push(`/`)
      dispatch(setAlert({ type: 'orderType', args: { startOver } }))
    }
    evt.target.blur()
  }

  const handleRevenueCenter = (evt) => {
    evt.preventDefault()
    return history.push(`/locations`)
  }

  const handleRequestedAt = (evt) => {
    evt.preventDefault()
    dispatch(setAlert({ type: 'requestedAt' }))
    evt.target.blur()
  }

  const handleConnectLevelUp = (evt) => {
    evt.preventDefault()
    const validate = () => dispatch(validateOrder(orderValidate))
    dispatch(setAlert({ type: 'levelup', args: { validate } }))
    evt.target.blur()
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    dispatch(setSubmitting(true))
    dispatch(submitOrder())
    submitButton.current.blur()
  }

  return (
    <FormContext.Provider
      value={{
        iconMap,
        cardIconMap,
        config,
        autoSelect,
        order,
        tz,
        check,
        form,
        loading,
        errors,
        updateForm: dispatchUpdateForm,
        signUp: handleSignUp,
        login: handleLogin,
        logout: handleLogout,
        goToAccount: handleAccount,
        updateRequestedAt: handleRequestedAt,
        updateRevenueCenter: handleRevenueCenter,
        updateServiceType: handleServiceType,
        connectLevelUp: handleConnectLevelUp,
      }}
    >
      <form
        id="checkout-form"
        className="form"
        onSubmit={handleSubmit}
        noValidate
      >
        {errors.form && (
          <div className="form__error--top">
            <Error error={errors.form} />
          </div>
        )}
        <CheckoutCustomer />
        <CheckoutDetails />
        {isDelivery && <CheckoutAddress />}
        <CheckoutSurcharges />
        <CheckoutDiscounts />
        <CheckoutPromoCodes />
        {hasGiftCardTender && <CheckoutGiftCards />}
        <Check
          title={config.checkTitle}
          check={check}
          tenders={tenders}
          updating={checkUpdating}
        />
        <CheckoutTenders />
        <div className="form__footer">
          <div className="form__message">
            {!isPaid ? (
              <div className="form__message__content ot-border-radius-small ot-color-error ot-bg-color-error ot-font-size-small">
                <p>
                  There is a balance of ${amountRemaining.toFixed(2)} remaining
                  on your order. Please add a payment above.
                </p>
              </div>
            ) : null}
          </div>
          <button
            className="ot-btn ot-btn--big"
            type="submit"
            disabled={submitting || !isPaid}
            ref={submitButton}
          >
            Submit Order
          </button>
        </div>
      </form>
    </FormContext.Provider>
  )
}

CheckoutForm.displayName = 'CheckoutForm'
CheckoutForm.propTypes = {
  dispatch: propTypes.func,
  history: propTypes.object,
  iconMap: propTypes.object,
  cardIconMap: propTypes.object,
  config: propTypes.object,
  checkout: propTypes.object,
  order: propTypes.object,
  customer: propTypes.object,
  autoSelect: propTypes.bool,
}

export default CheckoutForm
