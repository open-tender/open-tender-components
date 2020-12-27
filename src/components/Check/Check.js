import React from 'react'
import propTypes from 'prop-types'
import { formatDollars, checkAmountRemaining } from '@open-tender/js'
import { makeTenderName } from '../CheckoutTenderTypes'
import styled from '@emotion/styled'
import CheckUpdating from './CheckUpdating'
import CheckTitle from './CheckTitle'

const CheckView = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`

const CheckSection = styled('ul')`
  margin-top: 0.7rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};

  > li {
    padding: 0 0 0.8rem;
  }
`

const CheckItemView = styled('li')`
  width: 100%;
  padding: 0.8rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.fonts[props.color].color};
  ${(props) =>
    props.isBold ? `font-weight: ${props.theme.boldWeight};` : null}
  border-color: ${(props) => props.theme.border.color};
  ${(props) =>
    props.isTotal
      ? `border-top-width: 0.1rem;
  border-top-style: solid;
  border-bottom-width: 0.3rem;
  border-bottom-style: double;`
      : null}

  span {
    display: block;
  }
`

const CheckItem = ({
  label,
  value,
  color = 'body',
  isBold = false,
  isTotal = false,
}) => (
  <CheckItemView color={color} isBold={isBold} isTotal={isTotal}>
    <span>{label}</span>
    <span>{formatDollars(value)}</span>
  </CheckItemView>
)

CheckItem.displayName = 'CheckItem'
CheckItem.propTypes = {
  label: propTypes.string,
  value: propTypes.string,
  color: propTypes.string,
  isBold: propTypes.bool,
  isTotal: propTypes.isTotal,
}

const Check = ({ title, check, tenders, loader, updating = false }) => {
  const {
    order_id,
    cart,
    gift_cards,
    surcharges,
    discounts,
    taxes,
    totals,
    details,
  } = check
  const {
    subtotal,
    gift_card,
    surcharge,
    discount,
    // tax,
    tip,
    shipping,
    total,
  } = totals

  const totalBeforeTax = [subtotal, gift_card, surcharge, discount]
    .reduce((t, i) => (t += parseFloat(i)), 0.0)
    .toFixed(2)
  const amountRemaiing = checkAmountRemaining(total, tenders)

  return (
    <CheckView>
      {updating && <CheckUpdating loader={loader} />}
      {title && <CheckTitle title={title} orderId={order_id} />}
      <ul>
        {cart && cart.length ? (
          <li>
            <CheckSection>
              {cart.map((item, index) => (
                <CheckItem
                  key={`${item.id}-${index}`}
                  label={`${item.name} x ${item.quantity}`}
                  value={item.price_total}
                />
              ))}
            </CheckSection>
          </li>
        ) : null}
        <CheckItem label="Items Total" value={subtotal} color="headings" />
        {gift_cards && gift_cards.length ? (
          <li>
            <CheckSection>
              {gift_cards.map((giftCard) => (
                <CheckItem
                  key={giftCard.gift_card_id}
                  label={`Gift Card ${giftCard.card_number}`}
                  value={giftCard.amount}
                />
              ))}
            </CheckSection>
          </li>
        ) : null}
        {surcharges.length ? (
          <li>
            <CheckSection>
              {surcharges.map((surcharge) => (
                <CheckItem
                  key={surcharge.id}
                  label={`${surcharge.name}`}
                  value={surcharge.amount}
                />
              ))}
            </CheckSection>
          </li>
        ) : null}
        {discounts.length ? (
          <li>
            <CheckSection>
              {discounts.map((discount) => (
                <CheckItem
                  key={discount.id}
                  label={`${discount.name}`}
                  value={discount.amount}
                />
              ))}
            </CheckSection>
          </li>
        ) : null}
        {subtotal !== totalBeforeTax && (
          <CheckItem
            label="Total before Tax"
            value={totalBeforeTax}
            color="headings"
          />
        )}
        {taxes.length ? (
          <li>
            <CheckSection>
              {taxes.map((tax) => (
                <CheckItem
                  key={tax.id}
                  label={`${tax.name}`}
                  value={tax.amount}
                />
              ))}
            </CheckSection>
          </li>
        ) : details.is_tax_exempt ? (
          <CheckItem label="Tax (tax exempt)" value={'0.00'} />
        ) : null}
        {tip !== '0.00' && <CheckItem label="Tip" value={tip} />}
        {shipping !== '0.00' && <CheckItem label="Shipping" value={shipping} />}
        <CheckItem
          label="Total"
          value={total}
          color="headings"
          isTotal={true}
        />
        {tenders.length ? (
          <>
            <li style={{ margin: '2rem 0 0' }}>
              <CheckSection>
                {tenders.map((tender, index) => (
                  <CheckItem
                    key={`${tender.tender_type}-${tender.amount}-${index}`}
                    label={`${makeTenderName(tender)}`}
                    value={tender.amount}
                  />
                ))}
              </CheckSection>
            </li>
            <CheckItem
              label="Remaining Amount Due"
              value={amountRemaiing.toFixed(2)}
              color="headings"
              isTotal={true}
            />
          </>
        ) : null}
      </ul>
    </CheckView>
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
