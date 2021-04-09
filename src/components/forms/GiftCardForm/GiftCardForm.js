import React from 'react'
import propTypes from 'prop-types'
import { ButtonSubmit } from '../..'
import { FormError, FormInputs, FormSubmit, Input, Select } from '../../inputs'
import useGiftCardForm from './useGiftCardForm'

const GiftCardForm = ({
  giftCard,
  creditCards,
  loading,
  error,
  update,
  add,
  callback,
}) => {
  const {
    submitRef,
    inputRef,
    options,
    errors,
    data,
    submitting,
    handleChange,
    handleSubmit,
  } = useGiftCardForm(
    giftCard,
    creditCards,
    loading,
    error,
    update,
    add,
    callback
  )

  return (
    <form id="gift-card-form" onSubmit={handleSubmit} noValidate>
      <FormError errMsg={errors.form} style={{ margin: '0 0 2rem' }} />
      <FormInputs>
        <Input
          ref={inputRef}
          label="Amount"
          name="amount"
          type="number"
          value={data.amount}
          onChange={handleChange}
          error={errors.amount}
          required={true}
        />
        <Select
          label="Credit Card"
          name="customer_card_id"
          value={data.customer_card_id}
          onChange={handleChange}
          error={errors.customer_card_id}
          required={true}
          options={options}
        />
      </FormInputs>
      <FormSubmit>
        <ButtonSubmit submitRef={submitRef} submitting={submitting}>
          {submitting ? 'Submitting...' : giftCard ? 'Add Value' : 'Purchase'}
        </ButtonSubmit>
      </FormSubmit>
    </form>
  )
}

GiftCardForm.displayName = 'GiftCardForm'
GiftCardForm.propTypes = {
  giftCard: propTypes.object,
  creditCards: propTypes.array,
  loading: propTypes.string,
  error: propTypes.object,
  update: propTypes.func,
  add: propTypes.func,
  callback: propTypes.func,
}

export default GiftCardForm
