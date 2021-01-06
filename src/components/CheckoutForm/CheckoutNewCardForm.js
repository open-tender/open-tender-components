import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import {
  isEmpty,
  cardNames,
  getCardType,
  makeAcctNumber,
  validateCreditCard,
} from '@open-tender/js'
import { Button, Checkbox, Input } from '..'
import { FormContext } from './CheckoutForm'

// https://github.com/muffinresearch/payment-icons
// https://github.com/jasminmif/react-interactive-paycard

const initialState = {
  acct: '',
  exp: '',
  cvv: '',
  zip: '',
  save: true,
}

const fields = [
  {
    label: 'Card Number',
    placeholder: '#### #### #### ####',
    name: 'acct',
    type: 'text',
    autoComplete: 'cc-number',
  },
  {
    label: 'Expiration',
    placeholder: 'MMYY',
    name: 'exp',
    type: 'text',
    autoComplete: 'cc-exp',
  },
  {
    label: 'CVV',
    placeholder: '###',
    name: 'cvv',
    type: 'text',
    autoComplete: 'cc-csc',
  },
  {
    label: 'Zip Code',
    placeholder: '#####',
    name: 'zip',
    type: 'text',
    autoComplete: 'postal-code',
  },
]

const CheckoutNewCardForm = ({
  addTender,
  removeTender,
  setShowNewCard,
  setShowCredit,
  customerId,
  error,
}) => {
  const [newCard, setNewCard] = useState(initialState)
  const [isApplied, setIsApplied] = useState(false)
  const [cardType, setCardType] = useState('OTHER')
  const [errors, setErrors] = useState({})
  const formContext = useContext(FormContext)
  const { cardIconMap } = formContext

  useEffect(() => {
    if (error && !isEmpty(error)) {
      setErrors(error)
      setIsApplied(false)
    }
  }, [error])

  const handleChange = (evt) => {
    let { id, checked, value } = evt.target
    if (id === 'acct') {
      const currentType = getCardType(value.replace(/\s/g, ''))
      setCardType(currentType)
      value = makeAcctNumber(value, currentType)
    } else if (id === 'exp') {
      value = value.slice(0, 4)
    } else if (id === 'cvv') {
      value = value.slice(0, 4)
    } else if (id === 'zip') {
      value = value.slice(0, 5)
    } else if (id === 'save') {
      value = checked
    }
    setNewCard({ ...newCard, [id]: value })
  }

  const handleCancel = (evt) => {
    evt.preventDefault()
    setShowNewCard(false)
    setShowCredit(false)
    evt.target.blur()
  }

  const handleRemove = (evt) => {
    removeTender(evt, 'CREDIT')
    setNewCard(initialState)
    // setShowNewCard(false)
    // setShowCredit(false)
  }

  const submitTender = (evt) => {
    const { card, errors } = validateCreditCard(newCard, cardType)
    if (errors) {
      setErrors(errors)
    } else {
      const tender = {
        ...card,
        tender_type: 'CREDIT',
        card_type: cardType,
        card_type_name: cardNames[cardType],
        last4: newCard.acct.slice(-4),
      }
      addTender(evt, tender)
      setIsApplied(true)
      setErrors({})
      // setShowNewCard(false)
    }
  }

  const emptyFields =
    Object.values(newCard).filter((i) => typeof i !== 'boolean' && !i.length)
      .length > 0
  const cardErrors = Object.entries(errors)

  return (
    <div className="cards__new">
      <div className="cards__new__container ot-bg-color-primary ot-border-radius">
        <div className="cards__new__header">
          <p className="cards__new__title ot-font-size-big ot-color-headings ot-bold">
            Add a new card
          </p>
          <div className="cards__new__image">
            {cardIconMap && (
              <img src={cardIconMap[cardType]} alt={cardNames[cardType]} />
            )}
          </div>
        </div>
        <div className="cards__new__content">
          {fields.map((field) => {
            return (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                value={newCard[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
                error={null}
                required={true}
                classes={`cards__new__${field.name}`}
              />
            )
          })}
        </div>
        {customerId && (
          <div className="cards__new__save">
            <Checkbox
              label="Save card to account"
              id="save"
              on={newCard.save}
              onChange={handleChange}
            />
          </div>
        )}
        {cardErrors.length ? (
          <div className="cards__new__errors">
            <span className="ot-form-error">
              {cardErrors.map(([field, msg]) => (
                <p key={field}>{msg}</p>
              ))}
            </span>
            {emptyFields && (
              <span className="ot-form-error">
                * Please note that you may need to tap in any fields that were
                automatically completed in order for their values to be
                recognized.
              </span>
            )}
          </div>
        ) : null}
        <div className="cards__new__footer">
          <Button
            text="Apply New Card"
            classes="ot-btn ot-btn--cart"
            onClick={submitTender}
            disabled={isApplied && !error}
          />
          {isApplied ? (
            <Button
              text="Remove Applied Card"
              classes="ot-btn"
              onClick={handleRemove}
            />
          ) : (
            <Button
              text="Cancel"
              ariaLabel="Cancel Add New Card"
              classes="ot-btn"
              onClick={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  )
}

CheckoutNewCardForm.displayName = 'CheckoutNewCardForm'
CheckoutNewCardForm.propTypes = {
  addTender: propTypes.func,
  setShowNewCard: propTypes.func,
  removeTender: propTypes.func,
  setShowCredit: propTypes.func,
  customerId: propTypes.number,
  error: propTypes.object,
}

export default CheckoutNewCardForm
