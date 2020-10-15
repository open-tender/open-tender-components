import React, { useState, useEffect, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import {
  Button,
  CheckoutLineItem,
  CheckoutTip,
  Input,
  Textarea,
  Switch,
} from '.'
import {
  isEmpty,
  serviceTypeNamesMap,
  makeServiceTypeName,
  makeRequestedAtStr,
} from '@open-tender/js'
import { FormContext } from './CheckoutForm'

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
  const [showCurbside, setShowCurbside] = useState(false)
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

  const handleShowTip = (evt) => {
    evt.preventDefault()
    setShowTip(!showTip)
    evt.target.blur()
  }

  return (
    <div className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title ot-heading ot-font-size-h3">
          {config.details.title}
        </p>
        {config.details.subtitle.length > 0 && (
          <p className="form__legend__subtitle ot-line-height">
            {config.details.subtitle}
          </p>
        )}
      </div>
      <div className="form__inputs">
        <CheckoutLineItem label="Location">
          <Button
            text={revenueCenterName}
            ariaLabel={`Change location from ${revenueCenterName}`}
            icon={iconMap.revenueCenter}
            classes="ot-btn--secondary ot-btn--header"
            onClick={updateRevenueCenter}
            disabled={autoSelect}
          />
        </CheckoutLineItem>
        <CheckoutLineItem label="Service Type">
          <Button
            text={serviceTypeBtnName}
            ariaLabel={`Change service type from ${serviceTypeBtnName}`}
            icon={iconMap[serviceTypeLower]}
            classes="ot-btn--secondary ot-btn--header"
            onClick={updateServiceType}
          />
        </CheckoutLineItem>
        <CheckoutLineItem label={`${serviceTypeName} Time`}>
          <Button
            text={requestedAtText}
            ariaLabel={`Change time from ${requestedAtText}`}
            icon={iconMap.requestedAt}
            classes="ot-btn--secondary ot-btn--header"
            onClick={updateRequestedAt}
          />
        </CheckoutLineItem>
        {curbside && (
          <>
            <Switch
              label={
                <span className="">
                  {curbside.title}{' '}
                  <span
                    className="ot-color-alert"
                    style={{
                      textTransform: 'uppercase',
                      paddingLeft: '0.5rem',
                    }}
                  >
                    NEW!
                  </span>
                </span>
              }
              id="order_fulfillment"
              on={showCurbside}
              onChange={() => setShowCurbside(!showCurbside)}
              inputClasses="input--button"
            />
            {showCurbside && (
              <div>
                {curbside.fields.map((field) => {
                  return (
                    <Input
                      key={field.name}
                      label={field.label}
                      name={`details-${field.name}`}
                      type="text"
                      value={details[field.name]}
                      onChange={handleChange}
                      error={null}
                      // classes={`cards__new__${field.name}`}
                    />
                  )
                })}
              </div>
            )}
          </>
        )}
        {tipSettings.has_tip && (
          <>
            <CheckoutLineItem label="Tip">
              <Button
                text={`${check.totals.tip}`}
                ariaLabel={`Adjust tip of $${check.totals.tip}`}
                icon={iconMap.tip}
                classes="ot-btn--secondary ot-btn--header"
                onClick={handleShowTip}
              />
            </CheckoutLineItem>
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
      </div>
    </div>
  )
}

CheckoutDetails.displayName = 'CheckoutDetails'

export default CheckoutDetails
