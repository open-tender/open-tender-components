import React, { useContext, useState, useEffect, useRef, useMemo } from 'react'
import isEqual from 'lodash/isEqual'
import { ButtonLink, ButtonStyled, Text } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutLabel } from '.'
import {
  FormApplied,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormRow,
} from '../inputs'

const usePrevious = (value) => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CheckoutDiscounts = () => {
  const formContext = useContext(FormContext)
  const {
    iconMap = {},
    config,
    check,
    form,
    loading,
    updateForm,
    signUp,
    verifyAccount,
  } = formContext
  const { customer_id, is_verified } = check.customer || {}
  const [pendingDiscount, setPendingDiscount] = useState(null)
  const discountIds = form.discounts.map((i) => i.id)
  const prevCheckDiscounts = usePrevious(check.discounts)

  // add initial auto applied discounts
  useEffect(() => {
    const initialDiscounts = check.discounts
      .filter((i) => !i.is_optional)
      .filter((i) => !form.discounts.find((a) => i.id === a.id))
      .map((i) => ({ id: i.id, ext_id: i.ext_id || '' }))
    if (initialDiscounts.length) {
      updateForm({ discounts: [...form.discounts, ...initialDiscounts] })
    }
  }, [check.discounts, form.discounts, updateForm])

  // if the check.discounts array changes, remove any discounts that
  //  have disappeared from the form.discounts array
  useEffect(() => {
    if (!isEqual(check.discounts, prevCheckDiscounts)) {
      const checkDiscountIds = check.discounts.map((i) => i.id)
      const formDiscounts = form.discounts.filter((i) =>
        checkDiscountIds.includes(i.id)
      )
      updateForm({ discounts: [...formDiscounts] })
    }
  }, [form.discounts, prevCheckDiscounts, check.discounts, updateForm])

  useEffect(() => {
    if (loading !== 'pending') setPendingDiscount(null)
  }, [loading])

  const discountsOptional = check.config.discounts.length
    ? check.config.discounts
    : null
  if (!discountsOptional) return null

  const applyDiscount = (discountId, extId) => {
    setPendingDiscount(discountId)
    const newDiscount = { id: discountId, ext_id: extId || '' }
    updateForm({ discounts: [...form.discounts, newDiscount] })
  }

  const removeDiscount = (discountId) => {
    const filtered = form.discounts.filter((i) => i.id !== discountId)
    updateForm({ discounts: filtered })
  }

  return (
    <FormFieldset>
      <FormLegend
        as="div"
        title={config.discounts.title}
        subtitle={config.discounts.subtitle}
      />
      <FormInputs>
        {discountsOptional.map((i) => {
          const isApplied = discountIds.includes(i.id)
          const isPending = i.id === pendingDiscount
          const missingAccount =
            ['ACCOUNT', 'VERIFIED'].includes(i.auth_type) && !customer_id
          const missingVerified = i.auth_type === 'VERIFIED' && !is_verified
          return (
            <FormRow
              key={i.id}
              type="div"
              labelWidth="auto"
              label={
                <CheckoutLabel
                  title={i.title || i.name}
                  description={i.description}
                  alert={
                    <>
                      {!i.is_optional ? (
                        <Text color="success">
                          Credit has automatically been applied to your order.
                        </Text>
                      ) : missingAccount ? (
                        <Text color="alert">
                          Requires an account.{' '}
                          <ButtonLink onClick={signUp}>
                            Click here to sign up.
                          </ButtonLink>
                        </Text>
                      ) : missingVerified ? (
                        <Text color="alert">
                          Requires a verified account.{' '}
                          <ButtonLink onClick={verifyAccount}>
                            Click here to send a verification email
                          </ButtonLink>{' '}
                          and then refresh this page after {"you've"} verified
                          your account.
                        </Text>
                      ) : i.per_order === 1 ? (
                        <Text color="alert">
                          Cannot be used with any other discounts
                        </Text>
                      ) : null}
                    </>
                  }
                />
              }
              input={
                <>
                  {isApplied ? (
                    <>
                      <FormApplied />
                      <ButtonStyled
                        label={`Remove ${i.name} discount of ${i.amount}`}
                        icon={iconMap.remove}
                        onClick={() => removeDiscount(i.id)}
                        disabled={isPending || !i.is_optional}
                        size="header"
                        color="header"
                      >
                        Remove
                      </ButtonStyled>
                    </>
                  ) : (
                    <ButtonStyled
                      label={`Apply ${i.name} discount of ${i.amount}`}
                      icon={iconMap.add}
                      onClick={() => applyDiscount(i.id, i.ext_id)}
                      size="header"
                      color="header"
                      disabled={missingAccount || missingVerified}
                    >
                      Apply
                    </ButtonStyled>
                  )}
                </>
              }
            />
          )
        })}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutDiscounts.displayName = 'CheckoutDiscounts'

export default CheckoutDiscounts
