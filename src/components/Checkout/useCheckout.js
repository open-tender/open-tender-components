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

const useCheckout = (validateOrder, order) => {
  const orderValidate = prepareOrder(order)
  const prevOrderValidate = usePrevious(orderValidate)

  useEffect(() => {
    if (!isEqual(orderValidate, prevOrderValidate)) {
      validateOrder(orderValidate)
    }
  }, [validateOrder, orderValidate, prevOrderValidate])
}

export default useCheckout
