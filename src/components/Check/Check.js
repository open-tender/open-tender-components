import React, { useEffect } from 'react'
import propTypes from 'prop-types'
import { checkAmountRemaining, makeTenderName } from '@open-tender/js'
import styled from '@emotion/styled'
import CheckUpdating from './CheckUpdating'
import CheckTitle from './CheckTitle'
import CheckItem from './CheckItem'

const CheckView = styled.div`
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

const Check = ({
  title,
  check,
  tenders,
  loader,
  form,
  updateForm,
  showPoints = false,
  pointsIcon = null,
  updating = false,
  showCart = false,
}) => {
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
  const amountRemaining = checkAmountRemaining(total, tenders)
  const { points } = check.config || {}
  const cartLength = cart ? cart.length : 0

  const updatePoints = (index, points) => {
    const other = form.points.filter((i) => i.index !== index)
    const updated = points ? [...other, { index, points }] : other
    updateForm({ points: updated })
  }

  useEffect(() => {
    if (updateForm) updateForm({ points: [] })
  }, [cartLength, updateForm])

  return (
    <CheckView>
      {updating && <CheckUpdating loader={loader} />}
      {title && (
        <CheckTitle
          title={title}
          orderId={order_id}
          points={showPoints ? points : null}
          icon={showPoints ? pointsIcon : null}
        />
      )}
      <ul>
        {showCart && cart && cart.length ? (
          <li>
            <CheckSection>
              {cart.map((item, index) =>
                showPoints ? (
                  <CheckItem
                    key={`${item.id}-${index}`}
                    label={`${item.name} x ${item.quantity}`}
                    value={item.price_total}
                    points={item.points}
                    icon={pointsIcon}
                    updatePoints={(points) => updatePoints(index, points)}
                    updating={updating}
                  />
                ) : (
                  <CheckItem
                    key={`${item.id}-${index}`}
                    label={`${item.name} x ${item.quantity}`}
                    value={item.price_total}
                  />
                )
              )}
            </CheckSection>
          </li>
        ) : null}
        <CheckItem label="Subtotal" value={subtotal} color="primary" />
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
            color="primary"
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
        <CheckItem label="Total" value={total} color="primary" isTotal={true} />
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
              value={amountRemaining.toFixed(2)}
              color="primary"
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
  form: propTypes.object,
  updateForm: propTypes.func,
  showPoints: propTypes.bool,
  pointsIcon: propTypes.element,
  updating: propTypes.bool,
  showCart: propTypes.bool,
}

export default Check
