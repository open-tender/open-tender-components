import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars, makeModifierNames } from '@open-tender/js'
import { BgImage, CartItemCount, Points } from '..'

const CartSummaryItemView = styled('div')`
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartSummaryItemImage = styled(BgImage)`
  position: relative;
  width: 6rem;
  min-width: 6rem;
  height: 6rem;
  margin: 0 2rem 0 0;
  background-color: ${(props) => props.theme.bgColors.secondary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const CartSummaryItemContainer = styled('div')`
  flex-grow: 1;
`

const CartSummaryItemInfo = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const CartSummaryItemContent = styled('div')`
  flex: 1 1 100%;
`

const CartSummaryItemName = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
`

const CartSummaryItemMods = styled('p')`
  margin: 0.25rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.secondary};
`

const CartSummaryItemPrice = styled('div')`
  flex: 1 0 10rem;
  text-align: right;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    font-weight: ${(props) => props.theme.boldWeight};
    color: ${(props) => props.theme.colors.primary};
  }
`

const CartSummaryItemPoints = styled('div')`
  label: CartSummaryItemPoints;

  position: relative;
  display: inline-block;
  margin: 0.5rem 0 0;
`

const CartSummaryItemPointsCount = styled('div')`
  label: CartSummaryItemPointsCount;

  position: absolute;
  top: -0.6rem;
  right: -0.9rem;
  min-width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.success};

  span {
    display: block;
    line-height: 0;
    font-family: ${(props) => props.theme.counts.alerts.family};
    font-weight: ${(props) => props.theme.counts.alerts.weight};
    -webkit-font-smoothing: ${(props) =>
      props.theme.counts.alerts.fontSmoothing};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
    color: ${(props) => props.theme.colors.light};
  }
`

const CartSummaryItemPointsApply = styled('button')`
  label: CartSummaryItemPointsApply;

  position: relative;

  &:enabled:hover > span,
  &:enabled:active > span {
    transition: ${(props) => props.theme.links.transition};
    background-color: ${(props) => props.theme.links.primary.color};
  }
`

const CartSummaryItemPointsRemove = styled('button')`
  label: CartSummaryItemPointsRemove;

  position: absolute;
  top: 100%;
  right: 0;
  margin: 0.2rem 0 0;
  height: 2rem;
  padding: 0 0.5em 0.1rem;
  border-radius: 1em;
  border: 0.1rem solid ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.error};
`

const CartSummaryItem = ({ item, pointsObj }) => {
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const price = formatDollars(item.totalPrice)
  const mods = makeModifierNames(item)
  const points = item.points
  const applied = pointsObj
    ? pointsObj.applied.find((i) => i.index === item.index) || {}
    : {}
  const quantityApplied =
    points && applied.points
      ? Math.floor(applied.points / points.per) || null
      : null

  const apply = (evt, item) => {
    evt.preventDefault()
    pointsObj.apply(item)
  }

  const remove = (evt, item) => {
    evt.preventDefault()
    pointsObj.remove(item)
  }

  return (
    <CartSummaryItemView>
      <CartSummaryItemImage style={bgStyle}>
        <CartItemCount count={item.quantity} />
      </CartSummaryItemImage>
      <CartSummaryItemContainer>
        <CartSummaryItemInfo>
          <CartSummaryItemContent>
            <CartSummaryItemName>{item.name}</CartSummaryItemName>
            {mods && <CartSummaryItemMods>{mods}</CartSummaryItemMods>}
          </CartSummaryItemContent>
          <CartSummaryItemPrice>
            <p>{price}</p>
            {points && (
              <CartSummaryItemPoints>
                <CartSummaryItemPointsApply
                  disabled={applied.points === points.total}
                  onClick={(evt) => apply(evt, item)}
                >
                  {quantityApplied && (
                    <CartSummaryItemPointsCount>
                      <span>{quantityApplied}</span>
                    </CartSummaryItemPointsCount>
                  )}
                  <Points
                    color="light"
                    bgColor="dark"
                    size="xSmall"
                    points={points.per}
                    icon={pointsObj.icon}
                  />
                </CartSummaryItemPointsApply>
                {quantityApplied && (
                  <CartSummaryItemPointsRemove
                    onClick={(evt) => remove(evt, item)}
                  >
                    remove
                  </CartSummaryItemPointsRemove>
                )}
              </CartSummaryItemPoints>
            )}
          </CartSummaryItemPrice>
        </CartSummaryItemInfo>
      </CartSummaryItemContainer>
    </CartSummaryItemView>
  )
}

CartSummaryItem.displayName = 'CartSummaryItem'
CartSummaryItem.propTypes = {
  item: propTypes.object,
  pointsObj: propTypes.object,
}

export default CartSummaryItem
