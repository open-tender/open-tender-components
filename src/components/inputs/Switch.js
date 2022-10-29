import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'
import styled from '@emotion/styled'

const SwitchView = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SwitchLabel = styled.div`
  padding: ${(props) => props.theme.inputs.paddingVertical} 0;
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-family: ${(props) => props.theme.inputs.family};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) => props.theme.inputs.placeholderColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.inputs.fontSizeMobile};
  }
`

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

const SwitchToggle = styled.span`
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
  background-color: ${(props) => props.theme.inputs.placeholderColor};

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

const Switch = ({ label, id, on, onChange, disabled }) => {
  return (
    <Label
      htmlFor={id}
      text={label}
      showLabel={false}
      disabled={disabled}
      style={{ cursor: 'pointer', margin: '0' }}
    >
      <SwitchView>
        <SwitchLabel>{label}</SwitchLabel>
        <div>
          <SwitchInput
            aria-label={label}
            id={id}
            type="checkbox"
            checked={on}
            disabled={disabled}
            onChange={onChange}
          />
          <SwitchToggle />
        </div>
      </SwitchView>
    </Label>
  )
}

Switch.displayName = 'Switch'
Switch.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  on: propTypes.bool,
  onChange: propTypes.func,
  disabled: propTypes.bool,
}

export default Switch
