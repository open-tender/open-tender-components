import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const TransitionWrapper = ({
  on,
  transitionKey,
  effect = 'reveal',
  timeout = 250,
  children,
}) => (
  <TransitionGroup component={null}>
    {on ? (
      <CSSTransition key={transitionKey} classNames={effect} timeout={timeout}>
        {children}
      </CSSTransition>
    ) : null}
  </TransitionGroup>
)

TransitionWrapper.displayName = 'TransitionWrapper'
TransitionWrapper.propTypes = {
  on: propTypes.bool,
  key: propTypes.string,
  effect: propTypes.string,
  timeout: propTypes.number,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default TransitionWrapper
