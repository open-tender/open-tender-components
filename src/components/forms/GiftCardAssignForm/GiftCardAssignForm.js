import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import { useGiftCardAssignForm } from '.'

const GiftCardAssignForm = ({ loading, error, assign, callback }) => {
  const {
    submitRef,
    inputRef,
    cardNumber,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useGiftCardAssignForm(loading, error, assign, callback)
  const errMsg = errors.form && !errors.card_number ? errors.form : null

  return (
    <form id="gift-card-assign-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Card Number"
          name="card_number"
          type="number"
          value={cardNumber}
          onChange={handleChange}
          error={errors.card_number}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : 'Assign Gift Card'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GiftCardAssignForm.displayName = 'GiftCardAssignForm'
GiftCardAssignForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  assign: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardAssignForm
