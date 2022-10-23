import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Label } from '.'
import { useTheme } from '@emotion/react'

const TextareaView = styled.textarea`
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

  &::selection {
    color: ${(props) => props.theme.inputs.bgColor};
    background-color: ${(props) => props.theme.inputs.color};
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

  &:disabled,
  &:read-only {
    cursor: default;
    opacity: 0.5;
    color: ${(props) => props.theme.inputs.color};
    background-color: ${(props) => props.theme.inputs.bgColor};
    border-color: ${(props) => props.theme.inputs.borderColor};
  }
`

const Textarea = ({
  icon = null,
  label,
  name,
  value,
  onChange,
  error,
  showLabel = true,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder = '',
  style = null,
}) => {
  const { inputs } = useTheme()
  const rows = inputs.bottomBorderOnly ? '1' : '2'
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
      isTextarea={true}
    >
      <TextareaView
        rows={rows}
        aria-label={label}
        id={name}
        name={name}
        value={value || ''}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        onChange={onChange}
        hasValue={!!value}
        hasError={!!error}
      />
    </Label>
  )
}

Textarea.displayName = 'Textarea'
Textarea.propTypes = {
  icon: propTypes.element,
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  placeholder: propTypes.string,
  style: propTypes.object,
}

export default Textarea
