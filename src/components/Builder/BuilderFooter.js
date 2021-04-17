import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { displayPrice } from '@open-tender/js'
import { ButtonStyled, Text } from '..'
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

const BuilderPrice = styled('div')`
  font-size: ${(props) => props.theme.fonts.sizes.h5};
  font-weight: ${(props) => props.theme.boldWeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    width: 8rem;
  }

  span {
    display: inline-block;
  }

  span {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      width: 100%;
      font-size: 1.6rem;
    }
  }

  span + span {
    font-weight: normal;
    margin: 0 0 0 2rem;
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      margin: 0.25rem 0 0;
      font-size: 1.4rem;
    }
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
}) => {
  const { groups, totalPrice } = item
  const groupsBelowMin = groups.filter((g) => g.quantity < g.min).length > 0
  const isIncomplete =
    totalPrice === 0 || item.quantity === '' || groupsBelowMin
  return (
    <BuilderFooterView>
      <BuilderPrice>
        <Text color="primary">${displayPrice(totalPrice)}</Text>
        {item.cals && <span>{item.cals} cal</span>}
      </BuilderPrice>
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
}

export default BuilderFooter
