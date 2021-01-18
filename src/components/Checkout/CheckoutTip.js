import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonLink, Checkmark, Text } from '..'
import { Input } from '../inputs'
import { FormContext } from './CheckoutForm'
import { CheckoutCard, CheckoutCards } from '.'

const CheckoutTipButton = styled('button')`
  width: 100%;
  text-align: left;
  font-size: ${(props) => props.theme.fonts.sizes.main};
`

const CheckoutTipDefault = styled('span')`
  padding-left: 1rem;
  font-style: italic;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.secondary};
`

const CheckoutTip = ({ setShowTip }) => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, check, form, updateForm } = formContext
  const tipSettings = check.config.gratuity
  const tipOptions = tipSettings.options
  const initialTip =
    form.tip && !tipOptions.find((i) => i.amount === form.tip) ? form.tip : ''
  const [customTip, setCustomTip] = useState(initialTip)

  const chooseTip = (evt, amount) => {
    evt.preventDefault()
    evt.target.blur()
    updateForm({ tip: amount })
    setShowTip(false)
    setCustomTip('')
  }

  const handleCustomTip = (evt) => {
    setCustomTip(evt.target.value)
  }

  const applyCustomTip = () => {
    const formatted = parseFloat(customTip).toFixed(2)
    setCustomTip(formatted)
    updateForm({ tip: formatted })
    setShowTip(false)
  }

  const customApplied = customTip.length > 0 && check.totals.tip === customTip

  return (
    <CheckoutCards>
      {tipOptions.map((i) => {
        const isCustom = customTip.length > 0
        const isApplied = !isCustom && check.totals.tip === i.amount
        const isDefault = tipSettings.default.amount === i.amount
        return (
          <li key={i.amount}>
            <CheckoutTipButton
              type="button"
              onClick={(evt) => chooseTip(evt, i.amount)}
            >
              <CheckoutCard
                name={
                  <Text color="primary">
                    ${i.amount} ({i.percent}%)
                    {isDefault && (
                      <CheckoutTipDefault>Suggested Amount</CheckoutTipDefault>
                    )}
                  </Text>
                }
                action={
                  isApplied ? <Checkmark /> : <span>{iconMap.add || '+'}</span>
                }
              />
            </CheckoutTipButton>
          </li>
        )
      })}
      <li>
        <CheckoutCard
          name={
            <Input
              label="Add a custom tip"
              name="custom_tip"
              type="number"
              placeholder="enter custom tip"
              value={customTip}
              onChange={handleCustomTip}
              error={null}
              required={false}
              classes="form__input--small -custom-tip"
              inputClasses=""
              showLabel={false}
            />
          }
          action={
            <ButtonLink
              onClick={applyCustomTip}
              disabled={customTip.length === 0}
              label="Apply custom tip"
            >
              {customApplied ? <Checkmark /> : iconMap.add || '+'}
            </ButtonLink>
          }
        />
      </li>
    </CheckoutCards>
  )
}

CheckoutTip.displayName = 'CheckoutTip'
CheckoutTip.propTypes = {
  setShowTip: propTypes.func,
}

export default CheckoutTip
