import React from 'react'
import propTypes from 'prop-types'
import { FormRow, Label } from '.'

const Input = React.forwardRef(
  (
    {
      label,
      name,
      type,
      value,
      onChange,
      error,
      showLabel = true,
      disabled = false,
      readOnly = false,
      required = false,
      autoComplete = null,
      pattern = null,
      min = null,
      max = null,
      placeholder = '',
      children,
    },
    ref
  ) => {
    return (
      <FormRow
        htmlFor={name}
        label={showLabel && <Label text={label} required={required} />}
        input={
          <>
            <input
              aria-label={label}
              id={name}
              name={name}
              type={type}
              pattern={pattern}
              min={min}
              max={max}
              autoComplete={autoComplete || null}
              value={value || ''}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              onChange={onChange}
              ref={ref}
            />
            {children}
          </>
        }
        errMsg={error}
        isInput={true}
      />
    )
  }
)

Input.displayName = 'Input'
Input.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  type: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  readOnly: propTypes.bool,
  required: propTypes.bool,
  autoComplete: propTypes.string,
  pattern: propTypes.string,
  min: propTypes.number,
  max: propTypes.number,
  placeholder: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Input
