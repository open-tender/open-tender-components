import React, { useContext } from 'react'
import { ButtonLink, Text } from '..'
import { CheckoutCard, CheckoutCards } from '.'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'

const CheckoutLevelUp = () => {
  const formContext = useContext(FormContext)
  const { check, form, signUp, connectLevelUp } = formContext
  const tenderContext = useContext(TendersContext)
  const { addTender } = tenderContext
  const isCustomer = check.customer.customer_id
  const levelup = check.customer.levelup || {}
  const applied =
    form.tenders.filter((i) => i.tender_type === 'LEVELUP').length > 0
  const tender = { tender_type: 'LEVELUP' }

  return (
    <CheckoutCards>
      <li>
        {levelup.connected ? (
          <CheckoutCard
            name={
              <>
                <Text as="p" color={applied ? 'success' : 'secondary'}>
                  {!applied
                    ? 'Pay with LevelUp (click the "plus" icon to apply)'
                    : 'LevelUp payment applied'}
                </Text>
                <Text as="p" size="small">
                  Your LevelUp account is currently connected via your{' '}
                  <Text color="primary" bold={true}>
                    {levelup.email}
                  </Text>{' '}
                  email address.
                  <ButtonLink
                    onClick={connectLevelUp}
                    label="Go to account page to connect LevelUp"
                  >
                    Click here if you need to change this.
                  </ButtonLink>
                </Text>
              </>
            }
            onClick={applied ? null : () => addTender(tender)}
            isApplied={applied}
            disabled={applied}
          />
        ) : isCustomer ? (
          <CheckoutCard
            name={
              <>
                <Text as="p" color="error">
                  LevelUp Not Connected
                </Text>
                <Text as="p" size="small">
                  Your LevelUp account is not currently connected so you cannot
                  use LevelUp for payment.
                  <ButtonLink
                    onClick={connectLevelUp}
                    label="Go to account page to connect LevelUp"
                  >
                    Click here to connect LevelUp
                  </ButtonLink>{' '}
                  or{' '}
                  <a
                    href="https://www.thelevelup.com/users/new"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    click here to create a LevelUp account
                  </a>{' '}
                  if you {"don't"} have one.
                </Text>
              </>
            }
          />
        ) : (
          <CheckoutCard
            name={
              <>
                <Text as="p" color="error">
                  Account Required
                </Text>
                <Text as="p" size="small">
                  In order to pay with LevelUp, you must first create an account
                  and then connect your LevelUp account to your account here.{' '}
                  <ButtonLink onClick={signUp} label="Sign up for an account">
                    Click here to sign up for an account.
                  </ButtonLink>
                </Text>
              </>
            }
          />
        )}
      </li>
    </CheckoutCards>
  )
}

CheckoutLevelUp.displayName = 'CheckoutLevelUp'

export default CheckoutLevelUp
