import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Label } from '.'

const InputView = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.inputs.padding};
  padding-top: ${(props) => props.theme.inputs.paddingTop};
  padding-bottom: ${(props) => props.theme.inputs.paddingBottom};
  border-style: ${(props) => props.theme.inputs.borderStyle};
  border-color: ${(props) => props.theme.inputs.borderColor};
  border-width: ${(props) => props.theme.inputs.borderWidth};
  border-radius: ${(props) => props.theme.inputs.radius};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-family: ${(props) => props.theme.inputs.family};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-weight: ${(props) => props.theme.inputs.weight};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) => props.theme.inputs.color};
  background-color: ${(props) => props.theme.inputs.bgColor};
  box-shadow: ${(props) => props.theme.inputs.boxShadow};
  transition: ${(props) => props.theme.links.transition};

  ${(props) =>
    props.theme.inputs.bottomBorderOnly
      ? `
    box-shadow: none;
    background-color: transparent;
    border-radius: 0;
    border-width: 0;
    border-bottom-width: ${props.theme.inputs.borderWidth};
  `
      : ''}

  ${(props) =>
    props.hasError ? `border-color: ${props.theme.colors.error};` : ''}

  ${(props) =>
    props.hasValue
      ? `padding-top: ${props.theme.inputs.paddingTopActive}; padding-bottom: ${props.theme.inputs.paddingBottomActive};`
      : ''}

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.inputs.fontSizeMobile};
  }

  &::placeholder {
    color: ${(props) => props.theme.inputs.placeholderColor};
  }

  &:active,
  &:focus {
    color: ${(props) => props.theme.inputs.colorFocus};
    background-color: ${(props) => props.theme.inputs.bgColorFocus};
    border-color: ${(props) => props.theme.inputs.borderColorFocus};
    padding-top: ${(props) => props.theme.inputs.paddingTopActive};
    padding-bottom: ${(props) => props.theme.inputs.paddingBottomActive};

    ${(props) =>
      props.hasError ? `border-color: ${props.theme.colors.error};` : ''}

    ${(props) => !props.theme.inputs.showOutline && `outline: none;`}
  }

  &::selection {
    color: ${(props) => props.theme.colors.light};
    background-color: ${(props) => props.theme.colors.dark};
  }

  &:disabled,
  &:read-only {
    cursor: default;
    opacity: 0.5;
    color: ${(props) => props.theme.inputs.color};
    background-color: ${(props) => props.theme.inputs.bgColor};
    border-color: ${(props) => props.theme.inputs.borderColor};
  }
`

const Input = React.forwardRef(
  (
    {
      icon = null,
      label,
      name,
      type,
      value,
      onChange,
      onBlur,
      error = '',
      showLabel = true,
      placeholder = '',
      disabled = false,
      readOnly = false,
      required = false,
      autoComplete,
      pattern = null,
      min = null,
      max = null,
      style = null,
      children,
    },
    ref
  ) => {
    return (
      <Label
        htmlFor={name}
        icon={icon}
        text={label}
        value={value}
        required={required}
        errMsg={error}
        showLabel={showLabel}
        disabled={disabled}
        style={style}
      >
        <InputView
          aria-label={label}
          id={name}
          name={name}
          type={type}
          pattern={pattern}
          min={min}
          max={max}
          autoComplete={autoComplete || undefined}
          value={value || ''}
          placeholder={placeholder || ''}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
          hasValue={!!value}
          hasError={!!error}
        />
        {children}
      </Label>
    )
  }
)

Input.displayName = 'Input'
Input.propTypes = {
  icon: propTypes.element,
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  onBlur: propTypes.func,
  error: propTypes.string,
  showLabel: propTypes.bool,
  placeholder: propTypes.string,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  autoComplete: propTypes.string,
  pattern: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Input
