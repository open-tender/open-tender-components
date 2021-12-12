import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

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
        <input
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
