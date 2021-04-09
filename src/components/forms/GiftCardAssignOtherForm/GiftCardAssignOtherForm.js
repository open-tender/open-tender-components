import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input } from '../../inputs'
import { useGiftCardAssignOtherForm } from '.'

const GiftCardAssignOtherForm = ({
  loading,
  error,
  giftCardId,
  assign,
  callback,
}) => {
  const {
    submitRef,
    inputRef,
    email,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  } = useGiftCardAssignOtherForm(loading, error, giftCardId, assign, callback)
  const errMsg = errors.form && !errors.email ? errors.form : null

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          error={errors.email}
          required={true}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting || !email}>
          {submitting ? 'Submitting...' : 'Assign Gift Card'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GiftCardAssignOtherForm.displayName = 'GiftCardAssignOtherForm'
GiftCardAssignOtherForm.propTypes = {
  loading: propTypes.string,
  error: propTypes.object,
  giftCardId: propTypes.number,
  assign: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardAssignOtherForm
