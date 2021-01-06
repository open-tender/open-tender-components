import React, { useContext } from 'react'
import { Checkmark } from '..'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'

const CheckoutLevelUp = () => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, check, form, signUp, connectLevelUp } = formContext
  const tenderContext = useContext(TendersContext)
  const { addTender } = tenderContext
  const isCustomer = check.customer.customer_id
  const levelup = check.customer.levelup || {}
  const applied =
    form.tenders.filter((i) => i.tender_type === 'LEVELUP').length > 0
  const tender = { tender_type: 'LEVELUP' }

  return (
    <div className="cards ot-bg-color-secondary">
      <ul className="cards__list">
        <li>
          {levelup.connected ? (
            <div className="cards__card ot-bg-color-primary ot-border-radius">
              <div className="cards__card__name ot-line-height">
                <p className="ot-color-success">
                  {!applied
                    ? 'Pay with LevelUp (click the "plus" icon to apply)'
                    : 'LevelUp payment applied'}
                </p>
                <p className="ot-font-size-small">
                  Your LevelUp account is currently connected via your{' '}
                  <span className="ot-color-headings ot-bold">
                    {levelup.email}
                  </span>{' '}
                  email address.
                  <button
                    type="button"
                    onClick={connectLevelUp}
                    className="ot-btn-link"
                    aria-label="Go to account page to connect LevelUp"
                  >
                    Click here if you need to change this.
                  </button>
                </p>
              </div>
              <div className="cards__card__add">
                {applied ? (
                  <Checkmark />
                ) : (
                  <button
                    type="button"
                    onClick={(evt) => addTender(evt, tender)}
                    className="ot-btn-link"
                    disabled={applied}
                    aria-label={`Apply house account ${name}`}
                  >
                    {iconMap.add || '+'}
                  </button>
                )}
              </div>
            </div>
          ) : isCustomer ? (
            <div className="cards__card ot-bg-color-primary ot-border-radius">
              <div className="cards__card__name ot-line-height">
                <p className="ot-color-error">LevelUp Not Connected</p>
                <p className="ot-font-size-small">
                  Your LevelUp account is not currently connected so you cannot
                  use LevelUp for payment.
                  <button
                    type="button"
                    onClick={connectLevelUp}
                    className="ot-btn-link"
                    aria-label="Go to account page to connect LevelUp"
                  >
                    Click here to connect LevelUp
                  </button>{' '}
                  or{' '}
                  <a
                    className="no-link"
                    href="https://www.thelevelup.com/users/new"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    click here to create a LevelUp account
                  </a>{' '}
                  if you {"don't"} have one.
                </p>
              </div>
            </div>
          ) : (
            <div className="cards__card ot-bg-color-primary ot-border-radius">
              <div className="cards__card__name ot-line-height">
                <p className="ot-color-error">Account Required</p>
                <p className="ot-font-size-small">
                  In order to pay with LevelUp, you must first create an account
                  and then connect your LevelUp account to your account here.{' '}
                  <button
                    type="button"
                    onClick={signUp}
                    className="ot-btn-link"
                    aria-label="Sign up for an account"
                  >
                    Click here to sign up for an account.
                  </button>
                </p>
              </div>
            </div>
          )}
        </li>
      </ul>
    </div>
  )
}

CheckoutLevelUp.displayName = 'CheckoutLevelUp'

export default CheckoutLevelUp
