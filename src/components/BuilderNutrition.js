import propTypes from 'prop-types'
import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const LineItem = ({ name, value, unit = '' }) => (
  <li className="nutrition__item ot-border-color">
    <span>{name}</span>
    <span>
      {value}
      {unit}
    </span>
  </li>
)

LineItem.displayName = 'LineItem'
LineItem.propTypes = {
  name: propTypes.string,
  value: propTypes.string,
  unit: propTypes.string,
}

const BuilderNutrition = ({ nutritionalInfo = {}, show = true }) => {
  const {
    calories,
    cholesterol,
    dietary_fiber,
    protein,
    saturated_fat,
    serving_size,
    sodium,
    sugars,
    total_carbs,
    total_fat,
    trans_fat,
  } = nutritionalInfo
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="nutritionalInfo"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <div className="nutrition ot-bg-color-secondary">
            <ul className="nutrition__list ot-bg-color-primary ot-border-radius ot-font-size-small">
              <LineItem name="Serving Size" value={serving_size} unit="oz" />
              <LineItem name="Calories" value={calories} />
              <LineItem name="Total Fat" value={total_fat} unit="g" />
              <LineItem name="Saturated Fat" value={saturated_fat} unit="g" />
              <LineItem name="Trans Fat" value={trans_fat} unit="g" />
              <LineItem name="Cholesterol" value={cholesterol} unit="mg" />
              <LineItem name="Sodium" value={sodium} unit="mg" />
              <LineItem name="Total Carbs" value={total_carbs} unit="g" />
              <LineItem name="Dietary Fiber" value={dietary_fiber} unit="g" />
              <LineItem name="Sugars" value={sugars} unit="g" />
              <LineItem name="Protein" value={protein} unit="g" />
            </ul>
          </div>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

BuilderNutrition.displayName = 'BuilderNutrition'
BuilderNutrition.propTypes = {
  nutritionalInfo: propTypes.object,
  show: propTypes.bool,
}

export default BuilderNutrition
