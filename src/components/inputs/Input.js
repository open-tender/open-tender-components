import React from 'react'
import propTypes from 'prop-types'
import { InputError, Label } from '.'

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
      placeholder = '',
      classes = '',
      inputClasses = '',
      children,
    },
    ref
  ) => {
    return (
      <label
        htmlFor={name}
        className={`form__input -input ot-border-color ${classes}`}
      >
        <span className="form__input__wrapper ot-border-color">
          {showLabel && <Label text={label} required={required} />}
          <span className="input">
            <input
              aria-label={label}
              id={name}
              name={name}
              type={type}
              autoComplete={autoComplete || null}
              value={value || ''}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              className={inputClasses}
              onChange={onChange}
              ref={ref}
            />
            {children}
          </span>
        </span>
        {error ? <InputError error={error} /> : null}
      </label>
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
  placeholder: propTypes.string,
  classes: propTypes.string,
  inputClasses: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Input
