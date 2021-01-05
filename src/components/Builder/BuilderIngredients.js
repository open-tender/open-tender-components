import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { BuilderNutritionView, BuilderNutritionList } from './BuilderNutrition'

const BuilderIngredients = ({ ingredients, show = true }) => {
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="ingredients"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <BuilderNutritionView>
            <BuilderNutritionList>
              <p>{ingredients}</p>
            </BuilderNutritionList>
          </BuilderNutritionView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

BuilderIngredients.displayName = 'BuilderIngredients'
BuilderIngredients.propTypes = {
  ingredients: propTypes.string,
  show: propTypes.bool,
}

export default BuilderIngredients
