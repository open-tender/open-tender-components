import React, { useState, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { ButtonStyled, Preface, Text } from '..'
import { FormApplied, FormRow } from '../inputs'
import { FormContext } from './CheckoutForm'
import { CheckoutCard, CheckoutCards } from '.'
import { PromoCodeInput } from './CheckoutPromoCodes'

const CheckoutTipDefault = styled('span')`
  padding-left: 1rem;
  font-style: italic;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  color: ${(props) => props.theme.colors.secondary};
`

const CheckoutTipView = styled('div')`
  background-color: ${(props) => props.theme.bgColors.primary};
  padding: 1.5rem 1.5rem 0.75rem;
`

const CheckoutTip = ({ setShowTip }) => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, check, form, updateForm } = formContext
  const tipSettings = check.config.gratuity
  const tipOptions = tipSettings.options
  const initialTip =
    form.tip && !tipOptions.find((i) => i.amount === form.tip) ? form.tip : ''
  const [customTip, setCustomTip] = useState(initialTip)

  const chooseTip = (amount) => {
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
    <CheckoutTipView>
      <CheckoutCards>
        {tipOptions.map((i) => {
          const isCustom = customTip.length > 0
          const isApplied = !isCustom && check.totals.tip === i.amount
          const isDefault = tipSettings.default.amount === i.amount
          return (
            <li key={i.amount}>
              <CheckoutCard
                name={
                  <Text color="primary">
                    ${i.amount} ({i.percent}%)
                    {isDefault && (
                      <CheckoutTipDefault>Suggested Amount</CheckoutTipDefault>
                    )}
                  </Text>
                }
                onClick={isApplied ? null : () => chooseTip(i.amount)}
                isApplied={isApplied}
              />
            </li>
          )
        })}
        <li>
          <FormRow
            style={{ padding: '1.25rem 1.5rem 0 0' }}
            type="div"
            isInput={true}
            label={<Preface size="xSmall">Custom Tip</Preface>}
            input={
              <>
                <PromoCodeInput
                  label="Add a custom tip"
                  name="custom_tip"
                  type="number"
                  placeholder="enter custom tip"
                  value={customTip}
                  onChange={handleCustomTip}
                  required={false}
                />
                {customApplied ? (
                  <FormApplied />
                ) : (
                  <ButtonStyled
                    label="Apply Custom Tip"
                    icon={iconMap.add}
                    onClick={applyCustomTip}
                    disabled={customTip.length === 0}
                    size="header"
                    color="header"
                  >
                    Apply
                  </ButtonStyled>
                )}
              </>
            }
          />
        </li>
      </CheckoutCards>
    </CheckoutTipView>
  )
}

CheckoutTip.displayName = 'CheckoutTip'
CheckoutTip.propTypes = {
  setShowTip: propTypes.func,
}

export default CheckoutTip
