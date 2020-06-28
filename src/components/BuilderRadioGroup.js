import propTypes from 'prop-types'
import React from 'react'
import CartItem from './CartItem'
import BuilderRadio from './BuilderRadio'

const BuilderRadioGroup = ({ group, handler }) => {
  return (
    <fieldset>
      {group.options.map((option) => (
        <CartItem key={`${group.id}-${option.id}`} item={option}>
          <BuilderRadio
            key={option.id}
            option={option}
            handler={() => handler(group.id, option.id)}
          />
        </CartItem>
      ))}
    </fieldset>
  )
}

BuilderRadioGroup.displayName = 'BuilderRadioGroup'
BuilderRadioGroup.propTypes = {
  id: propTypes.number,
  options: propTypes.array,
  handler: propTypes.func,
}

export default BuilderRadioGroup
