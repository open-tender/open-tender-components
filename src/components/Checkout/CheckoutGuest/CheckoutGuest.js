import React, { useContext } from 'react'
import { FormContext } from '../CheckoutForm'
import {
  FormError,
  FormFieldset,
  FormInputs,
  FormLegend,
  Input,
} from '../../inputs'
import useCheckoutGuest from './useCheckoutGuest'

const CheckoutGuest = () => {
  const {
    config,
    // order,
    check,
    form,
    errors,
    updateForm,
    hasThanx,
  } = useContext(FormContext)
  const passwordConfig = {
    included: !hasThanx,
    // required: order.orderType === 'CATERING',
  }
  const { fields, data, formErrors, handleChange } = useCheckoutGuest(
    check,
    form,
    errors,
    passwordConfig,
    updateForm
  )
  // https://medium.com/p/5489fc3461b3/responses/show
  // https://codesandbox.io/s/functional-component-debounce-cunf7
  // const debouncedUpdate = useCallback(
  //   debounce((data) => updateForm({ customer: data }), 500),
  //   [data]
  // )

  // useEffect(() => {
  //   debounce((data) => updateForm({ customer: data }), 500)
  // }, [data, updateForm])

  return (
    <FormFieldset>
      <FormLegend title={config.guest.title} subtitle={config.guest.subtitle} />
      <FormInputs>
        {formErrors.account ? (
          <FormError
            errMsg={formErrors.account}
            style={{ margin: '0 0 2rem' }}
          />
        ) : null}
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={`customer-${field.name}`}
            type={field.type}
            value={data[field.name]}
            onChange={handleChange}
            error={formErrors[field.name]}
            required={field.required}
            autoComplete={field.autoComplete}
          />
        ))}
      </FormInputs>
    </FormFieldset>
  )
}

CheckoutGuest.displayName = 'CheckoutGuest'

export default CheckoutGuest
