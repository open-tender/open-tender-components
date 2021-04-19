import React, { useState, useEffect, useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  isEmpty,
  cardNames,
  getCardType,
  formatCardField,
  validateCreditCard,
} from '@open-tender/js'
import { Box, ButtonStyled, Checkbox, Heading, Input } from '..'
import { FormError } from '../inputs'
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
    pattern: '[0-9]*',
    autoComplete: 'cc-number',
  },
  {
    label: 'Expiration',
    placeholder: 'MMYY',
    name: 'exp',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-exp',
  },
  {
    label: 'CVV',
    placeholder: '###',
    name: 'cvv',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'cc-csc',
  },
  {
    label: 'Zip Code',
    placeholder: '#####',
    name: 'zip',
    type: 'text',
    pattern: '[0-9]*',
    autoComplete: 'postal-code',
  },
]

const CheckoutNewCardFormView = styled('div')`
  // max-width: 48rem;
  // padding: 2rem 0 0;
  // margin: 0 auto;
  padding: 2rem 1.5rem;
  margin: 1rem 0 0;
  background-color: ${(props) => props.theme.bgColors.primary};
`

const CheckoutNewCardFormContainer = styled(Box)`
  max-width: 48rem;
  padding: 2rem;
  margin: 0 auto;
`

const CheckoutNewCardFormHeader = styled('div')`
  position: relative;
  padding: 0rem 0 2rem;
`

const CheckoutNewCardFormImage = styled('div')`
  position: absolute;
  top: 0;
  right: 0;
  width: 6rem;
  min-width: 6rem;
  height: auto;
`

const CheckoutNewCardFormErrors = styled('div')`
  margin: 0 0 1rem;

  & > span {
    margin-top: 0;
  }

  // p {
  //   margin: 0.5em 0;
  // }
`

const CheckoutNewCardFormFooter = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0 0;

  button {
    display: block;
    width: 47.5%;
  }
`

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
    }
    if (id === 'save') {
      value = checked
    } else {
      value = formatCardField(id, value)
    }
    setNewCard({ ...newCard, [id]: value })
  }

  const handleCancel = () => {
    setShowNewCard(false)
    setShowCredit(false)
  }

  const handleRemove = () => {
    removeTender('CREDIT')
    setNewCard(initialState)
  }

  const submitTender = () => {
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
      addTender(tender)
      setIsApplied(true)
      setErrors({})
    }
  }

  const emptyFields =
    Object.values(newCard).filter((i) => typeof i !== 'boolean' && !i.length)
      .length > 0
  const cardErrors = Object.entries(errors)

  return (
    <CheckoutNewCardFormView>
      <CheckoutNewCardFormContainer>
        <CheckoutNewCardFormHeader>
          <Heading size="big">Add a new card</Heading>
          <CheckoutNewCardFormImage>
            {cardIconMap && (
              <img src={cardIconMap[cardType]} alt={cardNames[cardType]} />
            )}
          </CheckoutNewCardFormImage>
        </CheckoutNewCardFormHeader>
        <div>
          {fields.map((field) => {
            return (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                pattern={field.pattern}
                autoComplete={field.autoComplete}
                value={newCard[field.name]}
                placeholder={field.placeholder}
                onChange={handleChange}
                error={null}
                required={true}
              />
            )
          })}
        </div>
        {customerId && (
          <div>
            <Checkbox
              label="Save card to account"
              id="save"
              on={newCard.save}
              onChange={handleChange}
            />
          </div>
        )}
        {cardErrors.length ? (
          <CheckoutNewCardFormErrors>
            {cardErrors.map(([field, msg]) => (
              <FormError key={field} errMsg={msg} />
            ))}
            {emptyFields && (
              <FormError
                errMsg="* Please note that you may need to tap in any fields that were
                automatically completed in order for their values to be
                recognized."
              />
            )}
          </CheckoutNewCardFormErrors>
        ) : null}
        <CheckoutNewCardFormFooter>
          <ButtonStyled onClick={submitTender} disabled={isApplied && !error}>
            Apply New Card
          </ButtonStyled>
          {isApplied ? (
            <ButtonStyled onClick={handleRemove}>
              Remove Applied Card
            </ButtonStyled>
          ) : (
            <ButtonStyled label="Cancel Add New Card" onClick={handleCancel}>
              Cancel
            </ButtonStyled>
          )}
        </CheckoutNewCardFormFooter>
      </CheckoutNewCardFormContainer>
    </CheckoutNewCardFormView>
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
