import React, { useContext, useState, useEffect } from 'react'
import CheckoutLineItem from './CheckoutLineItem'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import { CheckoutLabel } from './index'
import CircleLoader from './CircleLoader'
import { displayPrice } from 'open-tender-js'

const CheckoutSurcharges = () => {
  const formContext = useContext(FormContext)
  const { config, check, form, loading, updateForm } = formContext
  const [pendingSurcharge, setPendingSurcharge] = useState(null)
  const surchargeIds = form.surcharges.map((i) => i.id)

  useEffect(() => {
    if (loading !== 'pending') setPendingSurcharge(null)
  }, [loading])

  const surchargesOptional = check.config.surcharges.length
    ? check.config.surcharges
    : null
  if (!surchargesOptional) return null

  const applySurcharge = (evt, surchargeId) => {
    evt.preventDefault()
    setPendingSurcharge(surchargeId)
    const newSurcharge = { id: surchargeId }
    updateForm({ surcharges: [...form.surcharges, newSurcharge] })
    evt.target.blur()
  }

  const removeSurcharge = (evt, surchargeId) => {
    evt.preventDefault()
    const filtered = form.surcharges.filter((i) => i.id !== surchargeId)
    updateForm({ surcharges: filtered })
    evt.target.blur()
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title heading ot-font-size-h3">
          {config.surcharges.title}
        </p>
        <p className="form__legend__subtitle">{config.surcharges.subtitle}</p>
      </div>
      <div className="form__inputs">
        {surchargesOptional.map((i) => {
          const isApplied = surchargeIds.includes(i.id)
          const isPending = i.id === pendingSurcharge
          const cost =
            parseFloat(i.amount) > 0
              ? `$${displayPrice(i.amount)} fee`
              : 'No additional charge'
          return (
            <CheckoutLineItem
              key={i.id}
              label={
                <CheckoutLabel
                  title={i.label || i.name}
                  description={i.description}
                  alert={<span className="ot-color-success">{cost}</span>}
                />
              }
            >
              <div className="input__wrapper">
                {isApplied && (
                  <span className="input__success">
                    <CircleLoader complete={!isPending} />
                  </span>
                )}
                {isApplied ? (
                  <Button
                    text="Remove Surcharge"
                    ariaLabel={`Remove ${i.name} surcharge of ${i.amount}`}
                    icon="XCircle"
                    classes="btn--header"
                    disabled={isPending || !i.is_optional}
                    onClick={(evt) => removeSurcharge(evt, i.id)}
                  />
                ) : (
                  <Button
                    text="Apply Surcharge"
                    ariaLabel={`Apply ${i.name} surcharge of ${i.amount}`}
                    icon="PlusCircle"
                    classes="btn--header"
                    onClick={(evt) => applySurcharge(evt, i.id)}
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

CheckoutSurcharges.displayName = 'CheckoutSurcharges'

export default CheckoutSurcharges
