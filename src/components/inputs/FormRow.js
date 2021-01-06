import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Label } from '.'

const FormRowView = styled('label')`
  display: block;
  padding: 1.25rem 0;
  border-bottom-style: solid;
  border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-color: ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 0;
  }

  &:last-child {
    border: 0;
  }
`

const FormRowContainer = styled('span')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    display: block;

    &:first-of-type {
      width: 15rem;
      flex-shrink: 0;
    }

    &:last-of-type {
      position: relative;
      flex: 1;
    }
  }
`

const FormRowLabel = styled('span')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1;

  span {
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

const FormRow = ({ label, input, type = 'label' }) => {
  return (
    <FormRowView as={type}>
      <FormRowContainer>
        <span>
          <FormRowLabel>{label}</FormRowLabel>
        </span>
        <span>
          <FormRowInput>{input}</FormRowInput>
        </span>
      </FormRowContainer>
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
  type: propTypes.string,
}

export default FormRow
