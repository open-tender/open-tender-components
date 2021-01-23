import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { FormRow, Label } from '.'

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
`

const CheckboxView = styled('span')`
  content: '';
  flex-shrink: 0;
  display: block;
  position: relative;
  width: 1.9rem;
  height: 1.9rem;
  padding: 0;
  margin: 0 1rem 0 0;
  border-radius: 0.2rem;
  background-color: ${(props) => props.theme.bgColors.secondary};

  input:focus + & {
    outline-color: ${(props) => props.theme.colors.primary};
    outline-style: auto;
    outline-width: 5px;
  }

  &:before {
    content: '';
    position: absolute;
    width: 1.1rem;
    height: 0.6rem;
    background: transparent;
    top: 0.5rem;
    left: 0.4rem;
    border-width: 0.2rem;
    border-style: solid;
    border-top: none;
    border-right: none;
    transform: scale(1) rotate(-45deg);
    opacity: 0;
    color: ${(props) => props.theme.fonts.headings.color};
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
  line-height: ${(props) => props.theme.lineHeight};
  font-size: ${(props) => props.theme.fonts.sizes[props.fontSize || 'main']};
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
    <FormRow
      htmlFor={id}
      style={{ cursor: 'pointer' }}
      label={showLabel && <Label text={label} required={required} />}
      input={
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
      }
    />
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
