import React, { useContext, useState, useEffect } from 'react'
import { displayPrice } from '@open-tender/js'
import { ButtonStyled } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutLabel } from '.'
import {
  FormApplied,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormRow,
} from '../inputs'

const CheckoutSurcharges = () => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, config, check, form, loading, updateForm } = formContext
  const [pendingSurcharge, setPendingSurcharge] = useState(null)
  const surchargeIds = form.surcharges.map((i) => i.id)

  useEffect(() => {
    if (loading !== 'pending') setPendingSurcharge(null)
  }, [loading])

  const surchargesOptional = check.config.surcharges.length
    ? check.config.surcharges
    : null
  if (!surchargesOptional) return null

  const applySurcharge = (surchargeId) => {
    setPendingSurcharge(surchargeId)
    const newSurcharge = { id: surchargeId }
    updateForm({ surcharges: [...form.surcharges, newSurcharge] })
  }

  const removeSurcharge = (surchargeId) => {
    const filtered = form.surcharges.filter((i) => i.id !== surchargeId)
    updateForm({ surcharges: filtered })
  }

  return (
    <FormFieldset>
      <FormLegend
        as="div"
        title={config.surcharges.title}
        subtitle={config.surcharges.subtitle}
      />
      <FormInputs>
        {surchargesOptional.map((i) => {
          const isApplied = surchargeIds.includes(i.id)
          const isPending = i.id === pendingSurcharge
          const cost =
            parseFloat(i.amount) > 0
              ? `$${displayPrice(i.amount)} fee`
              : 'No additional charge'
          return (
            <>
              <FormRow
                key={i.id}
                type="div"
                label={
                  <CheckoutLabel
                    title={i.label || i.name}
                    description={i.description}
                    alert={<span className="ot-color-success">{cost}</span>}
                  />
                }
                input={
                  <>
                    {isApplied && <FormApplied />}
                    {isApplied ? (
                      <ButtonStyled
                        label={`Remove ${i.name} surcharge of ${i.amount}`}
                        icon={iconMap.remove}
                        onClick={() => removeSurcharge(i.id)}
                        disabled={isPending || !i.is_optional}
                        size="header"
                        color="header"
                      >
                        Remove
                      </ButtonStyled>
                    ) : (
                      <ButtonStyled
                        label={`Apply ${i.name} surcharge of ${i.amount}`}
                        icon={iconMap.add}
                        onClick={() => applySurcharge(i.id)}
                        disabled={isPending}
                        size="header"
                        color="header"
                      >
                        Apply
                      </ButtonStyled>
                    )}
                  </>
                }
              />
            </>
          )
        })}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutSurcharges.displayName = 'CheckoutSurcharges'

export default CheckoutSurcharges
