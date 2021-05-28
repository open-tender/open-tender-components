import React, { useContext, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box, ButtonClear, ButtonStyled, Preface, Text } from '..'
import {
  FormApplied,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormRow,
} from '../inputs'
import { FormContext } from './CheckoutForm'

const PromoCodeInputView = styled('span')`
  display: block;
  position: relative;
  flex-grow: 1;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }
`

export const PromoCodeInput = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  children,
}) => {
  return (
    <PromoCodeInputView>
      <input
        aria-label={label}
        id={name}
        name={name}
        type={type}
        autoComplete={null}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
      />
      {children}
    </PromoCodeInputView>
  )
}

PromoCodeInput.displayName = 'PromoCodeInput'
PromoCodeInput.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  disabled: propTypes.bool,
  required: propTypes.bool,
  placeholder: propTypes.string,
  onChange: propTypes.func,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

const CheckoutPromoCodesInputs = styled(Box)`
  padding: 1.25rem 1.5rem;
`

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
  const { promo_code_limit = 0 } = check.config || {}
  const { email } = form.customer || {}
  const promoCodeErrors = errors ? errors.promo_codes || null : null
  const index = checkPromoCodes ? checkPromoCodes.length : 0
  const promoCodeError = promoCodeErrors ? promoCodeErrors[index] : null
  const showNew = !promo_code_limit || checkPromoCodes.length < promo_code_limit

  useEffect(() => {
    if (loading !== 'pending') setPendingPromoCode(null)
    const promoCodesLower = checkPromoCodes.map((i) => i.trim().toLowerCase())
    if (promoCodesLower.includes(promoCode.trim().toLowerCase())) {
      setPromoCode('')
    }
  }, [loading, checkPromoCodes, promoCode])

  useEffect(() => {
    if (promoCodeError) {
      setError(promoCodeError)
      updateForm({ promoCodes: checkPromoCodes })
    }
  }, [promoCodeError, updateForm, checkPromoCodes])

  useEffect(() => {
    if (!promoCodeError && !promoCode) {
      setError('')
    }
  }, [promoCodeError, promoCode])

  const handleChange = (evt) => {
    setError('')
    setPromoCode(evt.target.value)
  }

  const applyPromoCode = () => {
    setPendingPromoCode(promoCode.trim())
    updateForm({ promoCodes: [...checkPromoCodes, promoCode.trim()] })
  }

  const removePromoCode = (promoCode) => {
    setPendingPromoCode(promoCode)
    const filtered = form.promoCodes.filter(
      (i) => i.trim().toLowerCase() !== promoCode.trim().toLowerCase()
    )
    updateForm({ promoCodes: filtered })
  }

  const removePendingPromoCode = () => {
    setPromoCode('')
    setPendingPromoCode(null)
    setError('')
    if (form.promoCodes.length > checkPromoCodes.length) {
      updateForm({ promoCodes: checkPromoCodes })
    }
  }

  return (
    <FormFieldset>
      {!email ? (
        <FormLegend
          as="div"
          title={config.promoCodes.title}
          subtitle="Please add a valid email address before adding a promo code"
        />
      ) : (
        <>
          <FormLegend
            as="div"
            title={config.promoCodes.title}
            subtitle={config.promoCodes.subtitle}
          />
          <CheckoutPromoCodesInputs>
            <FormInputs>
              {checkPromoCodes.map((checkPromoCode) => {
                return (
                  <FormRow
                    key={checkPromoCode}
                    type="div"
                    isInput={true}
                    label={<Preface size="xSmall">{checkPromoCode}</Preface>}
                    input={
                      <>
                        <PromoCodeInput
                          name={`promo_code_${checkPromoCode}`}
                          type="text"
                          value={checkPromoCode}
                          onChange={handleChange}
                          error={null}
                          required={false}
                          disabled={true}
                        />
                        <FormApplied />
                        <ButtonStyled
                          label={`Remove promo code ${checkPromoCode}`}
                          icon={iconMap.remove}
                          onClick={() => removePromoCode(checkPromoCode)}
                          size="header"
                          color="header"
                        >
                          Remove
                        </ButtonStyled>
                      </>
                    }
                  />
                )
              })}
              {showNew && (
                <FormRow
                  type="div"
                  isInput={true}
                  label={<Preface size="xSmall">New Promo Code</Preface>}
                  input={
                    <>
                      <PromoCodeInput
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
                            onClick={removePendingPromoCode}
                          />
                        ) : null}
                      </PromoCodeInput>
                      <ButtonStyled
                        label="Apply Promo Code"
                        icon={iconMap.add}
                        onClick={applyPromoCode}
                        disabled={!promoCode || pendingPromoCode === promoCode}
                        size="header"
                        color="header"
                      >
                        Apply
                      </ButtonStyled>
                    </>
                  }
                  errMsg={error}
                />
              )}
            </FormInputs>
          </CheckoutPromoCodesInputs>
        </>
      )}
    </FormFieldset>
  )
}

CheckoutPromoCodes.displayName = 'CheckoutPromoCodes'

export default CheckoutPromoCodes
