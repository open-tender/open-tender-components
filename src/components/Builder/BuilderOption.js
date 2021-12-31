import React from 'react'
import propTypes from 'prop-types'
import { CartItem } from '..'
import { BuilderCheckbox, BuilderQuantity } from '.'

const BuilderOption = ({
  group,
  option,
  adjust,
  increment,
  decrement,
  allergens,
  iconMap,
  displaySettings,
}) => {
  const isCheckbox = group.options.filter((i) => i.max !== 1).length === 0
  const groupAtMax = group.max !== 0 && group.quantity === group.max
  const optionAtMax = option.max !== 0 && option.quantity === option.max
  const incrementDisabled = groupAtMax || optionAtMax
  // const groupAtMin = group.min !== 0 && group.quantity === group.min
  // const optionAtMin = option.min !== 0 && option.quantity === option.min
  // const decrementDisabled = groupAtMin || optionAtMin || option.quantity === 0
  const decrementDisabled = option.quantity === 0
  const hidePrice =
    group.included !== 0 &&
    (group.included === group.max || group.quantity < group.included)
  return (
    <CartItem
      item={option}
      allergens={allergens}
      displaySettings={displaySettings}
      hidePrice={hidePrice}
    >
      {isCheckbox ? (
        <BuilderCheckbox
          option={option}
          increment={increment}
          decrement={decrement}
          incrementDisabled={incrementDisabled}
        />
      ) : (
        <BuilderQuantity
          item={option}
          adjust={adjust}
          increment={increment}
          decrement={decrement}
          incrementDisabled={incrementDisabled}
          decrementDisabled={decrementDisabled}
          iconMap={iconMap}
        />
      )}
    </CartItem>
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
  iconMap: propTypes.object,
  displaySettings: propTypes.object,
}

export default BuilderOption
