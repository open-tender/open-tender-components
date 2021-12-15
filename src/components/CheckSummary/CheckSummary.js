import React from 'react'
import propTypes from 'prop-types'
import { checkAmountRemaining, makeTenderName } from '@open-tender/js'
import styled from '@emotion/styled'
import CheckSummaryUpdating from './CheckSummaryUpdating'
import CheckSummaryItem from './CheckSummaryItem'
import CheckSummaryTotal from './CheckSummaryTotal'

const CheckSummaryView = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem 0 0;
  border-width: 0;
  border-style: solid;
  border-color: ${(props) => props.theme.border.color};
  border-top-width: ${(props) => props.theme.border.width};
  margin: 2.5rem 0 0;

  & > li {
    opacity: ${(props) => (props.updating ? '0.5' : '1')};
  }
`

const CheckSummary = ({ check, tenders, loader, updating = false }) => {
  const {
    gift_cards = [],
    surcharges = [],
    discounts = [],
    taxes = [],
    totals,
    details,
  } = check
  const { subtotal, gift_card, surcharge, discount, tip, shipping, total } =
    totals
  const totalBeforeTax = [subtotal, gift_card, surcharge, discount]
    .reduce((t, i) => (t += parseFloat(i)), 0.0)
    .toFixed(2)
  const amountRemaining = checkAmountRemaining(total, tenders)

  return (
    <CheckSummaryView updating={updating}>
      {updating && <CheckSummaryUpdating loader={loader} />}
      <CheckSummaryItem label="Subtotal" value={subtotal} isBold={true} />
      {gift_cards.map((giftCard) => (
        <CheckSummaryItem
          key={giftCard.gift_card_id}
          label={`Gift Card ${giftCard.card_number}`}
          value={giftCard.amount}
        />
      ))}
      {surcharges.map((surcharge) => (
        <CheckSummaryItem
          key={surcharge.id}
          label={`${surcharge.name}`}
          value={surcharge.amount}
        />
      ))}
      {discounts.map((discount) => (
        <CheckSummaryItem
          key={discount.id}
          label={`${discount.name}`}
          value={discount.amount}
        />
      ))}
      {subtotal !== totalBeforeTax && (
        <CheckSummaryItem
          label="Total before Tax"
          value={totalBeforeTax}
          isBold={true}
        />
      )}
      {taxes.length ? (
        taxes.map((tax) => (
          <CheckSummaryItem
            key={tax.id}
            label={`${tax.name}`}
            value={tax.amount}
          />
        ))
      ) : details.is_tax_exempt ? (
        <CheckSummaryItem label="Tax (tax exempt)" value={'0.00'} />
      ) : null}
      {tip !== '0.00' && <CheckSummaryItem label="Tip" value={tip} />}
      {shipping !== '0.00' && (
        <CheckSummaryItem label="Shipping" value={shipping} />
      )}
      <CheckSummaryTotal label="Total" value={total} />
      {tenders.length ? (
        <>
          {tenders.map((tender, index) => (
            <CheckSummaryItem
              key={`${tender.tender_type}-${tender.amount}-${index}`}
              label={`${makeTenderName(tender)}`}
              value={tender.amount}
            />
          ))}
          <CheckSummaryItem
            label="Remaining Amount Due"
            value={amountRemaining.toFixed(2)}
            isBold={true}
          />
        </>
      ) : null}
    </CheckSummaryView>
  )
}

CheckSummary.displayName = 'CheckSummary'
CheckSummary.propTypes = {
  title: propTypes.string,
  check: propTypes.object,
  tenders: propTypes.array,
  loader: propTypes.element,
  form: propTypes.object,
  updateForm: propTypes.func,
  showPoints: propTypes.bool,
  pointsIcon: propTypes.element,
  updating: propTypes.bool,
  showCart: propTypes.bool,
}

export default CheckSummary
