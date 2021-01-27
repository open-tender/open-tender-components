import styled from '@emotion/styled'
import React, { useContext } from 'react'
import { ButtonLink, ButtonStyled } from '..'
import { FormFieldset, FormLegend } from '../inputs'
import { FormContext } from './CheckoutForm'

const CheckoutSignUpView = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }

  button + button {
    margin: 0 0 0 1rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 1rem 0 0 0;
    }
  }
`

const CheckoutSignUp = () => {
  const formContext = useContext(FormContext)
  const { config, login, signUp, order, iconMap = {} } = formContext
  const isCatering = order.orderType === 'CATERING'
  const title = isCatering
    ? 'Please create an account or log into an existing one'
    : config.signUp.title
  return (
    <FormFieldset>
      <FormLegend as="div" title={title} subtitle={config.signUp.subtitle} />
      <CheckoutSignUpView>
        <ButtonStyled icon={iconMap.signUp || null} onClick={signUp}>
          Create An Account
        </ButtonStyled>
        <ButtonLink onClick={login}>or log into an existing account</ButtonLink>
      </CheckoutSignUpView>
    </FormFieldset>
  )
}

CheckoutSignUp.displayName = 'CheckoutSignUp'

export default CheckoutSignUp
