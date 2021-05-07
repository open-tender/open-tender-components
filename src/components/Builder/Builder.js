import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import useBuilder from './useBuilder'
import BuilderBody from './BuilderBody'
import BuilderFooter from './BuilderFooter'

const footerHeight = '8rem'
const footerHeightMobile = '7rem'

const BuilderView = styled('form')`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 0 ${footerHeight};
  margin: 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0 0 ${footerHeightMobile};
  }
`

const BuilderContent = styled('div')`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`

const BuilderFooterContainer = styled('div')`
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.bgColors.primary};
  height: ${footerHeight};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    height: ${footerHeightMobile};
  }

  & > div {
    height: 100%;
  }
`

const Builder = ({
  menuItem,
  soldOut,
  allergens,
  addItemToCart,
  renderHeader,
  renderOption,
  iconMap,
  displaySettings,
  cartId,
  spinner,
  pointsIcon,
}) => {
  const hasPoints = !!pointsIcon
  const {
    item,
    increment,
    decrement,
    setQuantity,
    setMadeFor,
    setNotes,
    toggleOption,
    incrementOption,
    decrementOption,
    setOptionQuantity,
  } = useBuilder(menuItem, soldOut, hasPoints)
  return (
    <BuilderView>
      <BuilderContent>
        {renderHeader({ item, displaySettings, spinner, pointsIcon })}
        <BuilderBody
          allergens={allergens}
          renderOption={renderOption}
          iconMap={iconMap}
          displaySettings={displaySettings}
          cartId={cartId}
          item={item}
          setMadeFor={setMadeFor}
          setNotes={setNotes}
          toggleOption={toggleOption}
          incrementOption={incrementOption}
          decrementOption={decrementOption}
          setOptionQuantity={setOptionQuantity}
        />
      </BuilderContent>
      <BuilderFooterContainer>
        <BuilderFooter
          item={item}
          iconMap={iconMap}
          addItemToCart={addItemToCart}
          setQuantity={setQuantity}
          increment={increment}
          decrement={decrement}
          pointsIcon={pointsIcon}
        />
      </BuilderFooterContainer>
    </BuilderView>
  )
}

Builder.displayName = 'Builder'
Builder.propTypes = {
  menuItem: propTypes.object,
  soldOut: propTypes.array,
  allergens: propTypes.array,
  addItemToCart: propTypes.func,
  renderHeader: propTypes.func,
  renderOption: propTypes.func,
  iconMap: propTypes.object,
  closeModal: propTypes.func,
  displaySettings: propTypes.object,
  cartId: propTypes.number,
  spinner: propTypes.oneOfType([propTypes.node, propTypes.element]),
  pointsIcon: propTypes.element,
}

export default Builder
