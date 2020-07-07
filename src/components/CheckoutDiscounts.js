import React, { useContext, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'

const CheckoutDiscountLabel = ({ discount }) => (
  <span className="form__input__discount">
    <span className="ot-font-size ot-bold">{discount.name}</span>
    <span className="ot-font-size-small ot-color-success">
      {discount.description}
    </span>
    {discount.is_auto && (
      <span className="ot-font-size-small ot-color-alert">
        Credit has automatically been applied to your order.
      </span>
    )}
  </span>
)

CheckoutDiscountLabel.displayName = 'CheckoutDiscountLabel'
CheckoutDiscountLabel.propTypes = {
  discount: propTypes.object,
}

const CheckoutDiscounts = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, loading, updateForm } = formContext
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

  const applyDiscount = (evt, discountId, extId) => {
    evt.preventDefault()
    setPendingDiscount(discountId)
    const newDiscount = { id: discountId, ext_id: extId || '' }
    updateForm({ discounts: [...form.discounts, newDiscount] })
    evt.target.blur()
  }

  const removeDiscount = (evt, discountId) => {
    evt.preventDefault()
    const filtered = form.discounts.filter((i) => i.id !== discountId)
    updateForm({ discounts: filtered })
    evt.target.blur()
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h3">
          {config.discounts.title}
        </p>
        <p className="form__legend__subtitle">{config.discounts.subtitle}</p>
      </div>
      <div className="form__inputs">
        {discountsOptional.map((i) => {
          const isApplied = discountIds.includes(i.id)
          const isPending = i.id === pendingDiscount
          return (
            <CheckoutLineItem
              key={i.id}
              label={<CheckoutDiscountLabel discount={i} />}
            >
              <div className="input__wrapper">
                {isApplied && (
                  <span className="input__success">
                    <CircleLoader complete={!isPending} />
                  </span>
                )}
                {isApplied ? (
                  <Button
                    text="Remove Discount"
                    ariaLabel={`Remove ${i.name} discount of ${i.amount}`}
                    icon="XCircle"
                    classes="btn--header"
                    disabled={isPending || !i.is_optional}
                    onClick={(evt) => removeDiscount(evt, i.id)}
                  />
                ) : (
                  <Button
                    text="Apply Discount"
                    ariaLabel={`Apply ${i.name} discount of ${i.amount}`}
                    icon="PlusCircle"
                    classes="btn--header"
                    onClick={(evt) => applyDiscount(evt, i.id, i.ext_id)}
                  />
                )}
              </div>
            </CheckoutLineItem>
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutDiscounts.displayName = 'CheckoutDiscounts'

export default CheckoutDiscounts
