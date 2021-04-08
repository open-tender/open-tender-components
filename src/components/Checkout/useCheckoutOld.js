import { useEffect, useMemo, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import { prepareOrder } from '@open-tender/js'

const usePrevious = (value) => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const useCheckout = (
  validateOrder,
  revenueCenterId,
  serviceType,
  requestedAt,
  cart,
  customer = null,
  details = null,
  address = null,
  surcharges = null,
  discounts = null,
  promoCodes = null,
  tip = null,
  orderId = null
) => {
  const orderValidate = useMemo(() => {
    const dataValidate = {
      orderId,
      revenueCenterId,
      serviceType,
      requestedAt,
      cart,
      customer,
      details,
      address,
      surcharges,
      discounts,
      promoCodes,
      tip,
    }
    return prepareOrder(dataValidate)
  }, [
    orderId,
    revenueCenterId,
    serviceType,
    requestedAt,
    cart,
    customer,
    details,
    address,
    surcharges,
    discounts,
    promoCodes,
    tip,
  ])
  const prevOrderValidate = usePrevious(orderValidate)

  useEffect(() => {
    if (!isEqual(orderValidate, prevOrderValidate)) {
      validateOrder(orderValidate)
    }
  }, [validateOrder, orderValidate, prevOrderValidate])
}

export default useCheckout
