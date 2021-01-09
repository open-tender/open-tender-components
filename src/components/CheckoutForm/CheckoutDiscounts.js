import React, { useContext, useState, useEffect } from 'react'
import { ButtonStyled, Text } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutLabel } from '.'
import {
  FormApplied,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormRow,
} from '../inputs'

const CheckoutDiscounts = () => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, config, check, form, loading, updateForm } = formContext
  const [pendingDiscount, setPendingDiscount] = useState(null)
  const discountIds = form.discounts.map((i) => i.id)

  useEffect(() => {
    const initialDiscounts = check.discounts
      .filter((i) => !i.is_optional)
      .filter((i) => !form.discounts.find((a) => i.id === a.id))
      .map((i) => ({ id: i.id, ext_id: i.ext_id || '' }))
    if (initialDiscounts.length) {
      updateForm({ discounts: [...form.discounts, ...initialDiscounts] })
    }
  }, [check.discounts, form.discounts, updateForm])

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
          return (
            <FormRow
              key={i.id}
              type="div"
              labelWidth="auto"
              label={
                <CheckoutLabel
                  title={i.name}
                  description={i.description}
                  alert={
                    i.is_optional ? null : (
                      <Text color="success">
                        Credit has automatically been applied to your order.
                      </Text>
                    )
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
