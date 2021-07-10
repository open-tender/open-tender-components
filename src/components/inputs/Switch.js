import React from 'react'
import propTypes from 'prop-types'
import { FormRow, Label } from '.'
import styled from '@emotion/styled'

const SwitchInput = styled('input')`
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
`

const SwitchToggle = styled('span')`
  display: inline-block;
  cursor: pointer;
  user-select: none;
  box-sizing: initial;
  position: relative;
  display: inline-block;
  outline: 0;
  width: 4rem;
  height: 2rem;
  border-radius: 2rem;
  padding: 0.2rem;
  transition: all 0.15s ease;
  background-color: ${(props) => props.theme.bgColors.tertiary};

  &:before {
    left: 0;
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
    border-radius: 2rem;
    transition: all 0.15s ease;
    background-color: ${(props) => props.theme.bgColors.primary};
  }

  input:checked + & {
    background-color: ${(props) => props.theme.links.primary.color};
  }

  input:checked + &:before {
    left: 50%;
  }

  input:focus + & {
    // outline-offset: -2px;
    outline-color: ${(props) => props.theme.colors.primary};
    outline-style: auto;
    outline-width: 5px;
  }
`

const Switch = ({ label, id, on, onChange, disabled, showLabel = true }) => {
  return (
    <FormRow
      htmlFor={id}
      style={{ cursor: 'pointer' }}
      label={showLabel && <Label text={label} />}
      labelWidth="100%"
      input={
        <>
          <SwitchInput
            aria-label={label}
            id={id}
            type="checkbox"
            checked={on}
            disabled={disabled}
            onChange={onChange}
          />
          <SwitchToggle />
        </>
      }
    />
  )
}

Switch.displayName = 'Switch'
Switch.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  on: propTypes.bool,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  showLabel: propTypes.bool,
}

export default Switch
