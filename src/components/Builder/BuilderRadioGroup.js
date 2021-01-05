import propTypes from 'prop-types'
import React from 'react'
import { CartItem } from '..'
import BuilderRadio from './BuilderRadio'

const BuilderRadioGroup = ({ group, handler, displaySettings }) => {
  const hidePrice = group.included !== 0 && group.included === group.max
  return (
    <fieldset>
      {group.options.map((option) => (
        <CartItem
          key={`${group.id}-${option.id}`}
          item={option}
          displaySettings={displaySettings}
          hidePrice={hidePrice}
        >
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
  group: propTypes.object,
  handler: propTypes.func,
  displaySettings: propTypes.object,
}

export default BuilderRadioGroup
