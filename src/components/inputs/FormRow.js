import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { FormError } from '.'

const FormRowView = styled('label')`
  display: block;
  padding: 1.25rem 0;
  // border-top-style: solid;
  // border-top-width: ${(props) => props.theme.border.width};
  // border-top-color: ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 0;
    ${(props) => (props.isInput ? `border: 0;` : null)}
  }

  & + * {
    border-top-style: solid;
    border-top-width: ${(props) => props.theme.border.width};
    border-top-color: ${(props) => props.theme.border.color};
  }

  // &:first-child {
  //   border: 0;
  // }
`

const FormRowContainer = styled('span')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    ${(props) =>
      props.isInput ? `flex-direction: column; align-items: flex-start;` : null}
  }

  > span {
    display: block;

    &:first-of-type {
      width: ${(props) => props.labelWidth || '15rem'};
      flex-shrink: ${(props) => (props.labelWidth ? '1' : '0')};
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        ${(props) =>
          props.isInput ? `width: 100%; margin: 0 0 0.75rem;` : null}
      }
    }

    &:last-of-type {
      position: relative;
      flex: 1;
      flex-shrink: ${(props) => (props.labelWidth ? '0' : '1')};
      @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        ${(props) => (props.isInput ? `width: 100%;` : null)}
      }
    }
  }
`

const FormRowLabel = styled('span')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1;

  > span {
    display: block;
  }
`

const FormRowInput = styled('span')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    display: block;
  }

  input,
  select,
  textarea {
    line-height: ${(props) => props.theme.lineHeight};
  }
`

const FormRow = ({
  label,
  input,
  errMsg,
  as = 'label',
  isInput = false,
  labelWidth,
  style,
}) => {
  return (
    <FormRowView as={as} isInput={isInput} style={style}>
      <FormRowContainer isInput={isInput} labelWidth={labelWidth}>
        {label && (
          <span>
            <FormRowLabel>{label}</FormRowLabel>
          </span>
        )}
        <span>
          <FormRowInput>{input}</FormRowInput>
        </span>
      </FormRowContainer>
      <FormError errMsg={errMsg} />
    </FormRowView>
  )
}

FormRow.displayName = 'FormRow'
FormRow.propTypes = {
  label: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  input: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  errMsg: propTypes.string,
  as: propTypes.string,
  isInput: propTypes.bool,
  labelWidth: propTypes.string,
  style: propTypes.object,
}

export default FormRow
