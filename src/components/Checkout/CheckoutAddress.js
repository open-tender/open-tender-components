import React, { useState, useEffect, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import { isEmpty, makeFullAddress } from '@open-tender/js'
import { ButtonStyled, Input, Preface } from '..'
import { FormContext } from './CheckoutForm'
import {
  FormError,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormRow,
} from '../inputs'

const initialState = {
  unit: '',
  company: '',
  contact: '',
  phone: '',
}

const makeAddressConfig = (required, displayed) => {
  return {
    unit: {
      label: 'Unit / Suite',
      included: displayed.includes('unit') || required.includes('unit'),
      required: required.includes('unit'),
    },
    company: {
      label: 'Company',
      included: displayed.includes('company') || required.includes('company'),
      required: required.includes('company'),
    },
    contact: {
      label: 'Contact Person',
      included: displayed.includes('contact') || required.includes('contact'),
      required: required.includes('contact'),
    },
    phone: {
      label: 'Contact Phone',
      included: displayed.includes('phone') || required.includes('phone'),
      required: required.includes('phone'),
    },
  }
}

const fields = [
  { name: 'unit', type: 'text' },
  { name: 'company', type: 'text' },
  { name: 'contact', type: 'text' },
  { name: 'phone', type: 'text' },
]

const CheckoutAddress = () => {
  const formContext = useContext(FormContext)
  const {
    iconMap = {},
    config,
    order,
    check,
    form,
    errors,
    updateForm,
    updateRevenueCenter,
  } = formContext
  const [address, setAddress] = useState(form.address || initialState)
  const required = check.config.required.address || []
  const displayed = check.config.displayed
    ? check.config.displayed.address || []
    : []
  const addressConfig = makeAddressConfig(required, displayed)
  const addressErrors = errors.address || {}
  const fullAddress = makeFullAddress(order.address)
  const isOutpost = order.revenueCenter ? order.revenueCenter.is_outpost : false

  useEffect(() => {
    if (isEmpty(form.address) && check.address) {
      const checkAddress = {
        unit: check.address.unit || '',
        company: check.address.company || '',
        contact: check.address.contact || '',
        phone: check.address.phone || '',
      }
      setAddress(checkAddress)
      updateForm({ address: checkAddress })
    }
  }, [form.address, check.address, updateForm])

  const debouncedUpdate = useCallback(
    debounce((newAddress) => updateForm({ address: newAddress }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('address-', '')
    const newAddress = { ...address, [field]: value }
    setAddress(newAddress)
    debouncedUpdate(newAddress)
  }

  return (
    <FormFieldset>
      <FormLegend title={config.address.title} />
      {typeof addressErrors === 'string' && (
        <FormError errMsg={addressErrors} style={{ margin: '0 0 2rem' }} />
      )}
      <FormInputs>
        <FormRow
          as="div"
          label={<Preface size="xSmall">Address</Preface>}
          input={
            <ButtonStyled
              label={`Current address: ${fullAddress}. Click to update.`}
              icon={iconMap.address}
              onClick={updateRevenueCenter}
              disabled={isOutpost}
              size="header"
              color="header"
            >
              {fullAddress}
            </ButtonStyled>
          }
        />
        {fields.map((field) => {
          const input = addressConfig[field.name]
          return (
            input &&
            input.included && (
              <Input
                key={field.name}
                label={input.label}
                name={`address-${field.name}`}
                type={field.type}
                value={address[field.name]}
                onChange={handleChange}
                error={addressErrors[field.name]}
                required={input.required}
              />
            )
          )
        })}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutAddress.displayName = 'CheckoutAddress'

export default CheckoutAddress
