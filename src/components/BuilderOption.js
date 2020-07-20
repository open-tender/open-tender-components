import React from 'react'
import propTypes from 'prop-types'
import CartItem from './CartItem'
import BuilderQuantity from './BuilderQuantity'

const BuilderOption = ({
  group,
  option,
  adjust,
  increment,
  decrement,
  allergens,
  iconMap,
  classes = '',
  displaySettings,
}) => {
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  // const groupAtMin = group.min !== 0 && group.quantity === group.min
  // const optionAtMin = option.min !== 0 && option.quantity === option.min
  // const decrementDisabled = groupAtMin || optionAtMin || option.quantity === 0
  const decrementDisabled = option.quantity === 0
  return (
    <li>
      <CartItem
        item={option}
        allergens={allergens}
        displaySettings={displaySettings}
      >
        <BuilderQuantity
          item={option}
          adjust={adjust}
          increment={increment}
          decrement={decrement}
          incrementDisabled={incrementDisabled}
          decrementDisabled={decrementDisabled}
          classes={classes}
          iconMap={iconMap}
        />
      </CartItem>
    </li>
  )
}

BuilderOption.displayName = 'BuilderOption'
BuilderOption.propTypes = {
  group: propTypes.object,
  option: propTypes.object,
  adjust: propTypes.func,
  increment: propTypes.func,
  decrement: propTypes.func,
  allergens: propTypes.array,
  classes: propTypes.string,
  iconMap: propTypes.object,
  displaySettings: propTypes.object,
}

export default BuilderOption
