import React, { useState, useEffect, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import {
  isEmpty,
  serviceTypeNamesMap,
  makeServiceTypeName,
  makeRequestedAtStr,
} from '@open-tender/js'
import { Input, Textarea, Switch, ButtonStyled, Preface } from '..'
import { CheckoutTip } from '.'
import { FormContext } from './CheckoutForm'
import { FormFieldset, FormInputs, FormLegend, FormRow } from '../inputs'

const CheckoutDetails = () => {
  const {
    iconMap = {},
    config,
    autoSelect,
    order,
    tz,
    check,
    form,
    errors,
    updateForm,
    updateRequestedAt,
    updateRevenueCenter,
    updateServiceType,
  } = useContext(FormContext)
  const [details, setDetails] = useState(form.details)
  const [showTip, setShowTip] = useState(false)
  const { orderType, serviceType, revenueCenter = {} } = order
  const serviceTypeName = serviceTypeNamesMap[serviceType]
  const isCatering = orderType === 'CATERING'
  const serviceTypeBtnName = makeServiceTypeName(serviceType, isCatering)
  const allowTaxExempt = check.config.allow_tax_exempt
  const displayed = check.config.displayed
    ? check.config.displayed.details || []
    : []
  const required = check.config.required.details
  const tipSettings = check.config.gratuity
  const curbside = check.config.order_fulfillment
  const showEatingUtensils =
    displayed.includes('eatingUtensils') || required.includes('eatingUtensils')
  const showServingUtensils =
    displayed.includes('servingUtensils') ||
    required.includes('servingUtensils')
  const showPersonCount =
    displayed.includes('count') || required.includes('count')
  const showNotes = displayed.includes('notes') || required.includes('notes')
  const detailsErrors = errors.details || {}
  const requestedAtText = makeRequestedAtStr(order.requestedAt, tz)
  const revenueCenterName = revenueCenter ? revenueCenter.name : 'Invalid'
  const serviceTypeLower = serviceType ? serviceType.toLowerCase() : 'pickup'

  useEffect(() => {
    if (isEmpty(form.details) && check.details) {
      setDetails(check.details)
      updateForm({ details: check.details })
    }
  }, [form.details, check.details, updateForm])

  const debouncedUpdate = useCallback(
    debounce((newDetails) => updateForm({ details: newDetails }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, type, value, checked } = evt.target
    const inputValue = type === 'checkbox' ? checked : value
    const field = id.replace('details-', '')
    const newDetails = { ...details, [field]: inputValue }
    setDetails(newDetails)
    debouncedUpdate(newDetails)
  }

  return (
    <>
      <FormFieldset>
        <FormLegend
          as="div"
          title={config.details.title}
          subtitle={config.details.subtitle}
        />
        <FormInputs>
          <FormRow
            as="div"
            label={<Preface size="xSmall">Location</Preface>}
            input={
              <ButtonStyled
                label={`Change location from ${revenueCenterName}`}
                icon={iconMap.revenueCenter}
                onClick={updateRevenueCenter}
                disabled={autoSelect}
                size="header"
                color="header"
              >
                {revenueCenterName}
              </ButtonStyled>
            }
          />
          <FormRow
            as="div"
            label={<Preface size="xSmall">Service Type</Preface>}
            input={
              <ButtonStyled
                label={`Change service type from ${serviceTypeBtnName}`}
                icon={iconMap[serviceTypeLower]}
                onClick={updateServiceType}
                size="header"
                color="header"
              >
                {serviceTypeBtnName}
              </ButtonStyled>
            }
          />
          <FormRow
            as="div"
            label={<Preface size="xSmall">{serviceTypeName} Time</Preface>}
            input={
              <ButtonStyled
                label={`Change time from ${requestedAtText}`}
                icon={iconMap.requestedAt}
                onClick={updateRequestedAt}
                size="header"
                color="header"
              >
                {requestedAtText}
              </ButtonStyled>
            }
          />
          {tipSettings.has_tip && (
            <>
              <FormRow
                as="div"
                label={<Preface size="xSmall">Tip</Preface>}
                input={
                  <ButtonStyled
                    label={`Adjust tip of $${check.totals.tip}`}
                    icon={iconMap.tip}
                    onClick={() => setShowTip(!showTip)}
                    size="header"
                    color="header"
                  >
                    {check.totals.tip}
                  </ButtonStyled>
                }
              />
              {showTip && <CheckoutTip setShowTip={setShowTip} />}
            </>
          )}
          {showEatingUtensils && (
            <Switch
              label="Eating Utensils"
              id="details-eating_utensils"
              on={details.eating_utensils}
              onChange={handleChange}
              inputClasses="input--button"
            />
          )}
          {showServingUtensils && (
            <Switch
              label="Serving Utensils"
              id="details-serving_utensils"
              on={details.serving_utensils}
              onChange={handleChange}
              inputClasses="input--button"
            />
          )}
          {allowTaxExempt && (
            <Input
              label="Tax Exempt ID"
              name="details-tax_exempt_id"
              type="text"
              value={details.tax_exempt_id}
              onChange={handleChange}
              error={detailsErrors.tax_exempt_id}
              required={false}
            />
          )}
          {showPersonCount && (
            <Input
              label="Person Count"
              name="details-person_count"
              type="number"
              value={details.person_count}
              onChange={handleChange}
              error={detailsErrors.person_count}
              required={required.includes('count')}
            />
          )}
          {showNotes && (
            <Textarea
              label="Notes"
              name="details-notes"
              value={details.notes}
              onChange={handleChange}
              error={detailsErrors.notes}
              required={required.includes('notes')}
            />
          )}
        </FormInputs>
      </FormFieldset>
      {curbside && (
        <FormFieldset>
          <FormLegend
            as="div"
            title={curbside.title}
            subtitle={curbside.description}
          />
          <FormInputs>
            <Switch
              label={`Use ${curbside.title}`}
              id="order_fulfillment"
              on={details.order_fulfillment}
              onChange={handleChange}
              inputClasses="input--button"
            />
            {details.order_fulfillment &&
              curbside.fields.map((field) => {
                return (
                  <Input
                    key={field.name}
                    label={field.label}
                    name={`details-${field.name}`}
                    type="text"
                    placeholder={field.placeholder}
                    value={details[field.name]}
                    onChange={handleChange}
                    error={null}
                  />
                )
              })}
          </FormInputs>
        </FormFieldset>
      )}
    </>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'

export default CheckoutDetails
