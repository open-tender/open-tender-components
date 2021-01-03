import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const FormRowView = styled('div')`
  display: block;
  padding: 1.25rem 0;
  border-bottom-style: solid;
  border-bottom-width: ${(props) => props.theme.border.width};
  border-bottom-color: ${(props) => props.theme.border.color};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 0.75rem 0;
  }

  &:last-of-type {
    border: 0;
  }
`

const FormRowContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:first-of-type {
    width: 15rem;
    flex-shrink: 0;
  }

  > div:last-of-type {
    position: relative;
    flex: 1;
  }
`

const FormRowLabel = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  line-height: 1;

  span {
    display: block;
  }
`

const FormRowInput = styled('div')`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    display: block;
  }
`

const FormRow = ({ label, input }) => {
  return (
    <FormRowView>
      <FormRowContainer>
        <div>
          <FormRowLabel>{label}</FormRowLabel>
        </div>
        <div>
          <FormRowInput>{input}</FormRowInput>
        </div>
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
}

export default FormRow
