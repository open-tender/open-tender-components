import propTypes from 'prop-types'
import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const BuilderIngredients = ({ ingredients, show = true }) => {
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="ingredients"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <div className="nutrition ot-bg-color-secondary">
            <div className="nutrition__list ot-bg-color-primary ot-border-radius ot-font-size-small ot-line-height">
              <p>{ingredients}</p>
            </div>
          </div>
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
