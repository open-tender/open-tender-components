import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

const FormErrorView = styled('span')`
  outline: 0;
  display: inline-block;
  width: 100%;
  padding: ${(props) =>
    props.theme.inputs.bottomBorderOnly
      ? props.theme.inputs.paddingVertical
      : props.theme.inputs.padding};
  margin: ${(props) => props.theme.inputs.paddingVertical} 0 0;
  font-family: ${(props) => props.theme.inputs.family};
  font-weight: ${(props) => props.theme.inputs.weight};
  font-size: ${(props) => props.theme.fonts.sizes.small};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  border-radius: ${(props) => props.theme.border.radiusSmall};
  color: ${(props) => props.theme.error.color};
  background-color: ${(props) => props.theme.error.bgColor};
`

const FormError = ({ errMsg, style }) => {
  return (
    <TransitionGroup component={null}>
      {errMsg ? (
        <CSSTransition
          key="form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <FormErrorView style={style}>
            <p>{errMsg}</p>
          </FormErrorView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

FormError.displayName = 'FormError'
FormError.propTypes = {
  errMsg: propTypes.string,
  style: propTypes.object,
}

export default FormError
