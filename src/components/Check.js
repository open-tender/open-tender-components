import React from 'react'
import propTypes from 'prop-types'
import { formatDollars, checkAmountRemaining } from './utils/cart'
import { makeTenderName } from './TenderTypes'
import BarLoader from 'react-spinners/BarLoader'

const CheckItem = ({ label, value, classes = '' }) => (
  <li className={`check__item border-color ${classes}`}>
    <span>{label}</span>
    <span>{formatDollars(value)}</span>
  </li>
)

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  unit: propTypes.string,
}

const CheckUpdating = () => (
  <div className="check__disabled overlay">
    <div className="check__disabled__working">
      <BarLoader />
      <span className="font-size-small">Updating...</span>
    </div>
  </div>
)

const Check = ({ title, check, tenders, updating = false }) => {
  const { order_id, surcharges, discounts, taxes, totals, details } = check
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
    <div className="check">
      <div className="check__container">
        {updating && <CheckUpdating />}
        <div className="check__title font-size-big ot-bold border-bottom">
          <p>{title}</p>
          {order_id && (
            <p className="font-size-small ot-normal">
              editing order {order_id}
            </p>
          )}
        </div>
        <ul className="check__items">
          <CheckItem label="Cart Total" value={subtotal} />
          {surcharges.length ? (
            <>
              <ul className="check__items__section font-size-small">
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
              <ul className="check__items__section font-size-small">
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
            <ul className="check__items__section font-size-small">
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
              <ul className="check__items__section font-size-small">
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
  updating: propTypes.bool,
}

export default Check
