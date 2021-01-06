import React from 'react'
import propTypes from 'prop-types'
import { FormError, Label } from '.'

export const Textarea = ({
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
  classes = '',
  inputClasses = '',
}) => {
  return (
    <label
      htmlFor={name}
      className={`form__input -input ot-border-color ${classes}`}
    >
      <span className="form__input__wrapper ot-border-color">
        {showLabel && <Label text={label} required={required} />}
        <span className="input">
          <textarea
            aria-label={label}
            id={name}
            name={name}
            value={value || ''}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={inputClasses}
            onChange={onChange}
          />
        </span>
      </span>
      {error ? <FormError error={error} /> : null}
    </label>
  )
}

Textarea.displayName = 'Textarea'
Textarea.propTypes = {
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
  classes: propTypes.string,
  inputClasses: propTypes.string,
}

export default Textarea
