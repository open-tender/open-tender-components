import React, { useContext } from 'react'
import { FormContext } from './CheckoutForm'
import { TendersContext } from './CheckoutTenders'
import CircleLoader from './CircleLoader'

const CheckoutHouseAccounts = () => {
  const formContext = useContext(FormContext)
  const { iconMap = {}, check, form, goToAccount, signUp } = formContext
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
                    ? 'Click the "plus" icon to pay with LevelUp'
                    : 'LevelUp payment applied'}
                </p>
                <p className="ot-font-size-small">
                  Your LevelUp account is currently connected via your{' '}
                  <span className="ot-color-headings ot-bold">
                    {levelup.email}
                  </span>{' '}
                  email address. If you need to change this,{' '}
                  <button
                    type="button"
                    onClick={goToAccount}
                    className="ot-btn-link"
                    aria-label="Go to account page to connect LevelUp"
                  >
                    visit your account page
                  </button>{' '}
                  to disconnect this email address and connect another one.
                </p>
              </div>
              <div className="cards__card__add">
                {applied ? (
                  <CircleLoader complete={true} />
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
                  Your LevelUp account is not currently connected.{' '}
                  <button
                    type="button"
                    onClick={goToAccount}
                    className="ot-btn-link"
                    aria-label="Go to account page to connect LevelUp"
                  >
                    Please visit your account page
                  </button>{' '}
                  in order to connect your accounts and enable the LevelUp
                  payment method. Once {"that's"} done, you can use the cart
                  button in the lower right to easily get back here.
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

CheckoutHouseAccounts.displayName = 'CheckoutHouseAccounts'

export default CheckoutHouseAccounts
