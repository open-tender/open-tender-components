import React, { useContext, useState, useEffect } from 'react'
import Button from './Button'
import { FormContext } from './CheckoutForm'
import CircleLoader from './CircleLoader'
import { Input } from './Inputs'
import ButtonClear from './ButtonClear'

const CheckoutPromoCodes = () => {
  const [promoCode, setPromoCode] = useState('')
  const [error, setError] = useState('')
  const [pendingPromoCode, setPendingPromoCode] = useState(null)
  const formContext = useContext(FormContext)
  const {
    iconMap = {},
    config,
    check,
    form,
    loading,
    errors,
    updateForm,
  } = formContext
  const checkPromoCodes = check.discounts
    .filter((i) => i.is_promo_code)
    .map((i) => i.name)
  const { email } = form.customer || {}
  const promoCodeErrors = errors ? errors.promo_codes || null : null
  const index = checkPromoCodes ? checkPromoCodes.length : 0
  const promoCodeError = promoCodeErrors ? promoCodeErrors[index] : null

  useEffect(() => {
    if (loading !== 'pending') setPendingPromoCode(null)
    if (checkPromoCodes.includes(promoCode)) setPromoCode('')
  }, [loading, checkPromoCodes, promoCode])

  useEffect(() => {
    if (promoCodeError) {
      setError(promoCodeError)
      updateForm({ promoCodes: checkPromoCodes })
    }
  }, [promoCodeError, updateForm, checkPromoCodes])

  const handleChange = (evt) => {
    setError('')
    setPromoCode(evt.target.value)
  }

  const applyPromoCode = (evt) => {
    evt.preventDefault()
    setPendingPromoCode(promoCode)
    updateForm({ promoCodes: [...checkPromoCodes, promoCode] })
    evt.target.blur()
  }

  const removePromoCode = (evt, promoCode) => {
    evt.preventDefault()
    setPendingPromoCode(promoCode)
    const filtered = form.promoCodes.filter((i) => i !== promoCode)
    updateForm({ promoCodes: filtered })
    evt.target.blur()
  }

  const removePendingPromoCode = (evt) => {
    evt.preventDefault()
    setPromoCode('')
    setPendingPromoCode(null)
    if (form.promoCodes.length > checkPromoCodes.length) {
      updateForm({ promoCodes: checkPromoCodes })
    }
    evt.target.blur()
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title ot-heading ot-font-size-h3">
          {config.promoCodes.title}
        </p>
        {!email ? (
          <p className="form__legend__subtitle ot-line-height ot-color-secondary">
            Please add a valid email address before adding a promo code
          </p>
        ) : (
          config.promoCodes.subtitle && (
            <p className="form__legend__subtitle ot-line-height ot-color-secondary">
              {config.promoCodes.subtitle}
            </p>
          )
        )}
      </div>
      <div className="form__inputs">
        {checkPromoCodes.map((checkPromoCode) => {
          return (
            <div
              key={checkPromoCode}
              className="form__input-with-button ot-border-color"
            >
              <Input
                key={checkPromoCode}
                label={checkPromoCode}
                name={`promo_code_${checkPromoCode}`}
                type="text"
                placeholder="enter a promo code"
                value={checkPromoCode}
                onChange={handleChange}
                error={null}
                required={false}
                disabled={true}
              />
              <span className="input__success">
                <CircleLoader complete={true} />
              </span>
              <Button
                text="Remove"
                ariaLabel={`Remove promo code ${checkPromoCode}`}
                icon={iconMap.remove}
                classes="ot-btn--secondary ot-btn--header"
                onClick={(evt) => removePromoCode(evt, checkPromoCode)}
              />
            </div>
          )
        })}
        {email && (
          <div className="form__input-with-button ot-border-color">
            <Input
              label="New Promo Code"
              name="promo_code"
              type="text"
              placeholder="enter a promo code"
              value={promoCode}
              onChange={handleChange}
              error={error}
              required={false}
            >
              {promoCode.length ? (
                <ButtonClear
                  ariaLabel={`Remove promo code ${promoCode}`}
                  onClick={(evt) => removePendingPromoCode(evt)}
                />
              ) : null}
            </Input>
            <Button
              text="Apply"
              ariaLabel="Apply Promo Code"
              icon={iconMap.add}
              classes="ot-btn--secondary ot-btn--header"
              onClick={applyPromoCode}
              disabled={!promoCode || pendingPromoCode === promoCode}
            />
          </div>
        )}
      </div>
    </fieldset>
  )
}

CheckoutPromoCodes.displayName = 'CheckoutPromoCodes'

export default CheckoutPromoCodes
