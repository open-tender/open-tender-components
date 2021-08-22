import React, { useContext, useState, useEffect } from 'react'
import { displayPrice } from '@open-tender/js'
import { Text } from '..'
import { FormContext } from './CheckoutForm'
import { FormButton, FormFieldset, FormInputs, FormLegend } from '../inputs'

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
          const label = isApplied
            ? `Remove ${i.name} surcharge of ${i.amount}`
            : `Apply ${i.name} surcharge of ${i.amount}`
          const onClick = isApplied
            ? () => removeSurcharge(i.id)
            : () => applySurcharge(i.id)
          const cost =
            parseFloat(i.amount) > 0
              ? `$${displayPrice(i.amount)} fee`
              : 'No additional charge'
          return (
            <FormButton
              key={i.id}
              title={i.label || i.name}
              description={i.description}
              finePrint={<Text color="success">{cost}</Text>}
              isApplied={isApplied}
              onClick={onClick}
              disabled={isPending || !i.is_optional}
              label={label}
            />
          )
        })}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutSurcharges.displayName = 'CheckoutSurcharges'

export default CheckoutSurcharges
