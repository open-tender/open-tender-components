import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars, formatQuantity } from '@open-tender/js'
import { ButtonStyled, Points } from '..'
import BuilderQuantity from './BuilderQuantity'

const BuilderFooterView = styled('div')`
  width: 100%;
  padding: 0 ${(props) => props.theme.layout.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 ${(props) => props.theme.layout.paddingMobile};
  }
`

const BuilderPriceView = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 8rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  & > span {
    display: block;
  }

  & > span + span {
    margin: 0 0 0 1.5rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.5rem 0 0;
    }
  }
`

const BuilderPrice = styled('span')`
  font-size: ${(props) => props.theme.fonts.sizes.big};
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
  }
`

const BuilderCals = styled('span')`
  font-size: ${(props) => props.theme.fonts.sizes.big};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.main};
    // display: ${(props) => (props.hasPoints ? 'none' : 'block')} !important;
  }
`

const BuilderPoints = styled('span')`
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    display: ${(props) => (props.hasCals ? 'none' : 'block')} !important;
  }
`

const BuilderActions = styled('div')`
  display: flex;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-grow: 1;
  }
`

const BuilderQuantityView = styled('div')`
  display: inline-block;
`

const BuilderSubmit = styled('div')`
  display: inline-block;
  margin: 0 0 0 1rem;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex-grow: 1;
    button {
      width: 100%;
    }
  }
`

const BuilderFooter = ({
  item,
  iconMap,
  addItemToCart,
  setQuantity,
  increment,
  decrement,
  pointsIcon,
}) => {
  const { groups, totalPrice } = item
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  return (
    <BuilderFooterView>
      <BuilderPriceView>
        <BuilderPrice>{formatDollars(totalPrice)}</BuilderPrice>
        {item.totalCals ? (
          <BuilderCals>{formatQuantity(item.totalCals)} cal</BuilderCals>
        ) : null}
        {item.totalPoints && (
          <BuilderPoints hasCals={!!item.totalCals}>
            <Points points={item.totalPoints} icon={pointsIcon} />
          </BuilderPoints>
        )}
      </BuilderPriceView>
      <BuilderActions>
        <BuilderQuantityView>
          <BuilderQuantity
            item={item}
            adjust={setQuantity}
            increment={increment}
            decrement={decrement}
            iconMap={iconMap}
          />
        </BuilderQuantityView>
        <BuilderSubmit>
          <ButtonStyled
            onClick={() => addItemToCart(item)}
            disabled={isIncomplete}
            size="big"
          >
            Add To Cart
          </ButtonStyled>
        </BuilderSubmit>
      </BuilderActions>
    </BuilderFooterView>
  )
}

BuilderFooter.displayName = 'BuilderFooter'
BuilderFooter.propTypes = {
  item: propTypes.object,
  iconMap: propTypes.object,
  addItemToCart: propTypes.func,
  setQuantity: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  pointsIcon: propTypes.element,
}

export default BuilderFooter
