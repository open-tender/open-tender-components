import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import styled from '@emotion/styled'

const FormErrorView = styled('span')`
  outline: 0;
  display: inline-block;
  width: 100%;
  margin: 1rem 0 0;
  line-height: ${(props) => props.theme.inputs.lineHeight};
  padding: ${(props) => props.theme.inputs.padding};
  margin: ${(props) => props.theme.inputs.padding} 0 0;
  border-radius: ${(props) => props.theme.border.radiusSmall};
  color: ${(props) => props.theme.colors.error};
  background-color: ${(props) => props.theme.bgColors.error};
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
