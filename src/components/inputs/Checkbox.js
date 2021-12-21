import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Label } from '.'

const CheckboxInput = styled('input')`
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

const CheckboxContainer = styled('span')`
  width: 100%;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    align-items: flex-start;
  }
`

const CheckboxView = styled('span')`
  content: '';
  flex-shrink: 0;
  display: block;
  position: relative;
  width: 2.1rem;
  height: 2.1rem;
  padding: 0;
  margin: 0 1rem 0 0;
  border-radius: 0.2rem;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: ${(props) => props.theme.inputs.borderWidth} solid
    ${(props) => props.theme.inputs.borderColor};
  box-shadow: ${(props) => props.theme.inputs.boxShadow};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0.5rem 1.5rem 0 0;
  }

  input:focus + & {
    outline-color: ${(props) => props.theme.inputs.color};
    outline-style: auto;
    outline-width: 5px;
  }

  &:before {
    content: '';
    position: absolute;
    width: 1.3rem;
    height: 0.7rem;
    background: transparent;
    top: 0.4rem;
    left: 0.4rem;
    border-width: 0.2rem;
    border-style: solid;
    border-top: none;
    border-right: none;
    transform: scale(1) rotate(-45deg);
    opacity: 0;
    color: ${(props) => props.theme.inputs.color};
  }

  input:checked + &:before {
    opacity: 1;
  }

  input:disabled + & {
    opacity: 0.5;
  }

  input:disabled + &:before {
    opacity: 0.5;
  }
`

const CheckboxDescription = styled('span')`
  display: block;
  color: ${(props) => props.theme.inputs.placeholderColor};
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes[props.fontSize || 'main']};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    margin: 0.3rem 0 0;
  }
`

const Checkbox = ({
  label,
  id,
  on,
  onChange,
  disabled,
  showLabel = false,
  required = false,
  description,
}) => {
  return (
    <Label
      htmlFor={id}
      style={{ cursor: 'pointer' }}
      label={showLabel && <Label text={label} required={required} />}
    >
      <CheckboxContainer>
        <CheckboxInput
          aria-label={label}
          id={id}
          type="checkbox"
          checked={on}
          disabled={disabled}
          onChange={onChange}
        />
        <CheckboxView />
        {label && !showLabel ? (
          <CheckboxDescription>{label}</CheckboxDescription>
        ) : description ? (
          <CheckboxDescription fontSize="small">
            {description}
          </CheckboxDescription>
        ) : null}
      </CheckboxContainer>
    </Label>
  )
}

Checkbox.displayName = 'Checkbox'
Checkbox.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  on: propTypes.bool,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  classes: propTypes.string,
  showLabel: propTypes.bool,
  required: propTypes.bool,
  description: propTypes.string,
}

export default Checkbox
