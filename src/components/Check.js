import React from 'react'
import propTypes from 'prop-types'
import { formatDollars, checkAmountRemaining } from '@open-tender/js'
import { makeTenderName } from './CheckoutTenderTypes'

const CheckItem = ({ label, value, classes = '' }) => (
  <li className={`check__item ot-border-color ${classes}`}>
    <span>{label}</span>
    <span>{formatDollars(value)}</span>
  </li>
)

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  classes: propTypes.string,
}

const CheckUpdating = ({ loader = null }) => (
  <div className="check__disabled ot-opacity-light">
    <div className="check__disabled__working">
      {loader}
      <span className="ot-font-size-small">Updating...</span>
    </div>
  </div>
)

CheckUpdating.displayName = 'CheckUpdating'
CheckUpdating.propTypes = {
  loader: propTypes.element,
}

const Check = ({ title, check, tenders, loader, updating = false }) => {
  const {
    order_id,
    cart,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
  } = check
  const {
    subtotal,
    surcharge,
    discount,
    // tax,
    tip,
    shipping,
    total,
  } = totals

  const totalBeforeTax = [subtotal, surcharge, discount]
    .reduce((t, i) => (t += parseFloat(i)), 0.0)
    .toFixed(2)
  const amountRemaiing = checkAmountRemaining(total, tenders)

  return (
    <div className="check ot-border-radius ot-bg-color-primary ot-border-color ot-box-shadow">
      <div className="check__container">
        {updating && <CheckUpdating loader={loader} />}
        <div className="check__title ot-border-color">
          <p className="ot-heading ot-font-size-h4">{title}</p>
          {order_id && (
            <p className="ot-font-size-small">editing order {order_id}</p>
          )}
        </div>
        <ul className="check__items">
          {cart && cart.length ? (
            <ul className="check__items__section ot-font-size-small">
              {cart.map((item) => (
                <CheckItem
                  key={item.id}
                  label={`${item.name}`}
                  value={item.price_total}
                />
              ))}
            </ul>
          ) : null}
          <CheckItem label="Cart Total" value={subtotal} />
          {surcharges.length ? (
            <>
              <ul className="check__items__section ot-font-size-small">
                {surcharges.map((surcharge) => (
                  <CheckItem
                    key={surcharge.id}
                    label={`${surcharge.name}`}
                    value={surcharge.amount}
                  />
                ))}
              </ul>
              {/* <CheckItem label="Surcharge" value={surcharge} /> */}
            </>
          ) : null}
          {discounts.length ? (
            <>
              <ul className="check__items__section ot-font-size-small">
                {discounts.map((discount) => (
                  <CheckItem
                    key={discount.id}
                    label={`${discount.name}`}
                    value={discount.amount}
                  />
                ))}
              </ul>
              {/* <CheckItem label="Discount" value={discount} /> */}
            </>
          ) : null}
          {subtotal !== totalBeforeTax && (
            <CheckItem
              label="Total before Tax"
              value={totalBeforeTax}
              classes="check__item--total ot-bold"
            />
          )}
          {taxes.length ? (
            <ul className="check__items__section ot-font-size-small">
              {taxes.map((tax) => (
                <CheckItem
                  key={tax.id}
                  label={`${tax.name}`}
                  value={tax.amount}
                />
              ))}
            </ul>
          ) : details.is_tax_exempt ? (
            <CheckItem label="Tax (tax exempt)" value={'0.00'} />
          ) : null}
          {/* <CheckItem label="Tax" value={tax} /> */}
          <CheckItem label="Tip" value={tip} />
          {shipping !== '0.00' && (
            <CheckItem label="Shipping" value={shipping} />
          )}
          <CheckItem
            label="Total"
            value={total}
            classes="check__item--grand-total ot-bold"
          />
          {tenders.length ? (
            <>
              <ul className="check__items__section ot-font-size-small">
                {tenders.map((tender, index) => (
                  <CheckItem
                    key={`${tender.tender_type}-${tender.amount}-${index}`}
                    label={`${makeTenderName(tender)}`}
                    value={tender.amount}
                  />
                ))}
              </ul>
              {/* <CheckItem label="Total Tenders" value={tendersTotal} /> */}
              <CheckItem
                label="Remaining Amount Due"
                value={amountRemaiing.toFixed(2)}
                classes="check__item--amount-due ot-bold"
              />
            </>
          ) : null}
        </ul>
      </div>
    </div>
  )
}

Check.displayName = 'Check'
Check.propTypes = {
  title: propTypes.string,
  check: propTypes.object,
  tenders: propTypes.array,
  loader: propTypes.element,
  updating: propTypes.bool,
}

export default Check
