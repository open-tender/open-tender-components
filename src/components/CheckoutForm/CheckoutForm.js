import React, {
  useRef,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import propTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import styled from '@emotion/styled'
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
  submitOrderApplePay,
  setCompletedOrder,
  resetErrors,
  setAlert,
} from '@open-tender/redux'
import { FormError, Check, Message, ButtonStyled } from '..'
import {
  CheckoutAddress,
  CheckoutCustomer,
  CheckoutDetails,
  CheckoutDiscounts,
  CheckoutGiftCards,
  CheckoutPromoCodes,
  CheckoutSurcharges,
  CheckoutTenders,
} from '.'

export const FormContext = createContext(null)

const usePrevious = (value) => {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CheckoutFormFooter = styled('div')`
  margin: 3rem 0 0;

  > div {
    margin: 0 0 3rem;
  }
`

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
  hasThanx,
  api,
}) => {
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

  const handleSignUp = () => {
    dispatch(setAlert({ type: 'signUp' }))
  }

  const handleLogin = () => {
    dispatch(setAlert({ type: 'login' }))
  }

  const handleLogout = () => {
    dispatch(logoutCustomer())
  }

  const handleAccount = () => {
    history.push(`/account`)
  }

  const handleServiceType = () => {
    if (orderType === 'CATERING') {
      history.push(`/catering`)
    } else {
      const startOver = () => history.push(`/`)
      dispatch(setAlert({ type: 'orderType', args: { startOver } }))
    }
  }

  const handleRevenueCenter = () => {
    history.push(`/locations`)
  }

  const handleRequestedAt = () => {
    dispatch(setAlert({ type: 'requestedAt' }))
  }

  const handleConnectLevelUp = () => {
    const validate = () => dispatch(validateOrder(orderValidate))
    dispatch(setAlert({ type: 'levelup', args: { validate } }))
  }

  const handleAddGiftCard = () => {
    const validate = () => dispatch(validateOrder(orderValidate))
    dispatch(setAlert({ type: 'giftCardAssign', args: { validate } }))
  }

  const handleSubmit = () => {
    dispatch(setSubmitting(true))
    dispatch(submitOrder())
  }

  return (
    <FormContext.Provider
      value={{
        iconMap,
        cardIconMap,
        config,
        autoSelect,
        hasThanx,
        order,
        tz,
        check,
        form,
        loading,
        errors,
        api,
        updateForm: dispatchUpdateForm,
        signUp: handleSignUp,
        login: handleLogin,
        logout: handleLogout,
        goToAccount: handleAccount,
        updateRequestedAt: handleRequestedAt,
        updateRevenueCenter: handleRevenueCenter,
        updateServiceType: handleServiceType,
        connectLevelUp: handleConnectLevelUp,
        addGiftCard: handleAddGiftCard,
        submitOrder: handleSubmit,
        submitOrderApplePay: () => dispatch(submitOrderApplePay()),
        setCompletedOrder: (order) => dispatch(setCompletedOrder(order)),
      }}
    >
      <form id="checkout-form" noValidate>
        <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
        <CheckoutCustomer />
        <CheckoutDetails />
        {isDelivery && <CheckoutAddress />}
        <CheckoutSurcharges />
        <CheckoutDiscounts />
        <CheckoutPromoCodes />
        {hasGiftCardTender && <CheckoutGiftCards />}
        <div style={{ margin: '0 0 4rem' }}>
          <Check
            title={config.checkTitle}
            check={check}
            tenders={tenders}
            updating={checkUpdating}
          />
        </div>
        <CheckoutTenders />
        <CheckoutFormFooter>
          <div>
            {!isPaid ? (
              <Message
                as="div"
                size="small"
                color="error"
                style={{ width: '100%', padding: '1rem 1.5rem' }}
              >
                There is a balance of ${amountRemaining.toFixed(2)} remaining on
                your order. Please add a payment above.
              </Message>
            ) : null}
          </div>
          <ButtonStyled
            type="submit"
            onClick={handleSubmit}
            disabled={submitting || !isPaid}
            size="big"
          >
            Submit Order
          </ButtonStyled>
        </CheckoutFormFooter>
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
  hasThanx: propTypes.bool,
  api: propTypes.object,
}

export default CheckoutForm
