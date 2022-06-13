import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Input } from './inputs'

const CreditCardView = styled('div')`
  label: CreditCardView;
  position: relative;
`

const CreditCardType = styled('div')`
  position: absolute;
  z-index: 2;
  top: 50%;
  right: 0;
  height: 2.4rem;
  margin-top: -1.2rem;

  img {
    height: 100%;
    width: auto;
  }
`

const CreditCardExpCvv = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  label {
    width: 48%;
  }
`

const CreditCard = ({
  data = {},
  cardType = 'OTHER',
  errors = {},
  handleChange,
  handleBlur,
  disabled = false,
  cardIconMap,
}) => {
  const cardImg = cardIconMap[cardType]
  return (
    <CreditCardView>
      <Input
        label="Card Number"
        name="acct"
        type="text"
        pattern="[0-9]*"
        autoComplete="cc-number"
        value={data.acct}
        placeholder=""
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.acct}
        disabled={disabled}
      >
        {!errors.acct && cardImg && (
          <CreditCardType>
            <img src={cardImg} alt={cardType} />
          </CreditCardType>
        )}
      </Input>
      <CreditCardExpCvv>
        <Input
          label="Expiration (MM/YY)"
          name="exp"
          type="text"
          pattern="[0-9]*"
          autoComplete="cc-exp"
          value={data.exp}
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.exp}
          disabled={disabled}
        />
        <Input
          label="Security Code"
          name="cvv"
          type="text"
          pattern="[0-9]*"
          autoComplete="cc-csc"
          value={data.cvv}
          placeholder=""
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.cvv}
          disabled={disabled}
        />
      </CreditCardExpCvv>
      <Input
        label="Zip Code"
        name="zip"
        type="text"
        pattern="[0-9]*"
        autoComplete="postal-code"
        value={data.zip}
        placeholder=""
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.zip}
        disabled={disabled}
      />
    </CreditCardView>
  )
}

CreditCard.displayName = 'CreditCard'
CreditCard.propTypes = {
  data: propTypes.object,
  cardType: propTypes.string,
  errors: propTypes.object,
  handleChange: propTypes.func,
  handleBlur: propTypes.func,
  disabled: propTypes.bool,
  cardIconMap: propTypes.object,
}

export default CreditCard
