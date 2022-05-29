import React, { useContext, useState, useEffect, useRef } from 'react'
import propTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import { ButtonLink, Text } from '..'
import Preface from '../Preface'
import { FormContext } from './CheckoutForm'
import { FormButton, FormFieldset, FormInputs, FormLegend } from '../inputs'
import styled from '@emotion/styled'

const usePrevious = (value) => {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const CheckoutDiscountsSectionView = styled('div')`
  margin: 0 0 2rem;

  &:last-of-type {
    margin: 0;
  }
`

const CheckoutDiscountsSectionHeader = styled(Preface)`
  display: flex;
  align-items: center;
  margin: 0 0 1rem;

  & > span {
    display: block;
  }

  & > span:first-of-type {
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 0.6rem 0 0;
  }
`

const CheckoutDiscountsSection = ({ icon, text, children }) => {
  if (!children) return null
  return (
    <CheckoutDiscountsSectionView>
      {text && (
        <CheckoutDiscountsSectionHeader>
          <span>{icon}</span>
          {text}
        </CheckoutDiscountsSectionHeader>
      )}
      {children}
    </CheckoutDiscountsSectionView>
  )
}

CheckoutDiscountsSection.displayName = 'CheckoutDiscountsSection'
CheckoutDiscountsSection.propTypes = {
  icon: propTypes.string,
  text: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

const calcTotal = (totals) => {
  if (!totals) return 0.0
  const { subtotal, surcharge, discount } = totals
  if (!subtotal) return 0.0
  return parseFloat(subtotal) + parseFloat(surcharge) + parseFloat(discount)
}

const CheckoutDiscounts = () => {
  const formContext = useContext(FormContext)
  const {
    config,
    check,
    form,
    loading,
    updateForm,
    signUp,
    verifyAccount,
    iconMap,
  } = formContext
  const { customer_id, is_verified } = check.customer || {}
  const total = calcTotal(check.totals)
  const [pendingDiscount, setPendingDiscount] = useState(null)
  const discountIds = form.discounts.map((i) => i.id)
  // const checkDiscountIds = check.discounts.map((i) => i.id)
  // const missingIds = discountIds.filter((i) => !checkDiscountIds.includes(i))
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

  const makeDiscountButton = (i, index) => {
    const isApplied = discountIds.includes(i.id)
    const isPending = i.id === pendingDiscount
    const missingAccount =
      ['ACCOUNT', 'VERIFIED'].includes(i.auth_type) && !customer_id
    const missingVerified = i.auth_type === 'VERIFIED' && !is_verified
    const onClick = isApplied
      ? () => removeDiscount(i.id)
      : () => applyDiscount(i.id, i.ext_id)
    const disabled = isApplied
      ? isPending || !i.is_optional
      : missingAccount || missingVerified || total <= 0.0 || i.id === 0

    return (
      <FormButton
        key={`${i.id}-${index}`}
        title={i.title || i.name}
        description={i.description}
        finePrint={
          <>
            {!i.is_optional ? (
              <Text color="success">
                Credit has automatically been applied to your order.
              </Text>
            ) : missingAccount ? (
              <Text color="alert">
                Requires an account.{' '}
                <ButtonLink onClick={signUp}>Click here to sign up.</ButtonLink>
              </Text>
            ) : missingVerified ? (
              <Text color="alert">
                Requires a verified account.{' '}
                <ButtonLink onClick={verifyAccount}>
                  Click here to send a verification email
                </ButtonLink>{' '}
                and then refresh this page after {"you've"} verified your
                account.
              </Text>
            ) : i.per_order === 1 ? (
              <Text color="alert">Cannot be used with any other discounts</Text>
            ) : null}
          </>
        }
        isApplied={isApplied}
        onClick={onClick}
        disabled={disabled}
      />
    )
  }

  const loyalty = discountsOptional.filter((i) => i.discount_type === 'LOYALTY')
  const rewards = discountsOptional.filter((i) => i.discount_type === 'REWARD')
  const deals = discountsOptional.filter((i) => i.discount_type === 'DEAL')
  const other = discountsOptional.filter((i) => i.discount_type === 'DISCOUNT')
  const otherActive = other.filter((i) => i.id !== 0)
  const otherInactive = other.filter((i) => i.id === 0)
  const allOther = [...otherActive, ...otherInactive]

  return (
    <FormFieldset>
      <FormLegend
        as="div"
        title={config.discounts.title}
        subtitle={config.discounts.subtitle}
      />
      <FormInputs>
        {loyalty.length > 0 && (
          <CheckoutDiscountsSection
            icon={iconMap.loyalty}
            text="Loyalty Credit"
          >
            {loyalty.map((i, idx) => makeDiscountButton(i, idx))}
          </CheckoutDiscountsSection>
        )}
        {rewards.length > 0 && (
          <CheckoutDiscountsSection icon={iconMap.reward} text="Rewards">
            {rewards.map((i, idx) => makeDiscountButton(i, idx))}
          </CheckoutDiscountsSection>
        )}
        {deals.length > 0 && (
          <CheckoutDiscountsSection icon={iconMap.deal} text="Deals">
            {deals.map((i, idx) => makeDiscountButton(i, idx))}
          </CheckoutDiscountsSection>
        )}
        {allOther.length > 0 && (
          <CheckoutDiscountsSection>
            {allOther.map((i, idx) => makeDiscountButton(i, idx))}
          </CheckoutDiscountsSection>
        )}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutDiscounts.displayName = 'CheckoutDiscounts'

export default CheckoutDiscounts
