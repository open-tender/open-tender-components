import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Points } from '..'

const CartSummaryItemPointsView = styled('div')`
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

const CartSummaryItemPoints = ({ item, pointsObj }) => {
  const points = item.points
  const icon = pointsObj ? pointsObj.icon : null
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
    <CartSummaryItemPointsView>
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
          icon={icon}
        />
      </CartSummaryItemPointsApply>
      {quantityApplied && (
        <CartSummaryItemPointsRemove onClick={(evt) => remove(evt, item)}>
          remove
        </CartSummaryItemPointsRemove>
      )}
    </CartSummaryItemPointsView>
  )
}

CartSummaryItemPoints.displayName = 'CartSummaryItemPoints'
CartSummaryItemPoints.propTypes = {
  item: propTypes.object,
  pointsObj: propTypes.object,
}

export default CartSummaryItemPoints
