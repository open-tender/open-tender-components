import React from 'react'
import propTypes from 'prop-types'
import { FormError, Label } from '.'

export const Select = ({
  label,
  name,
  value,
  onChange,
  error,
  showLabel = true,
  disabled = false,
  required = false,
  classes = '',
  inputClasses = '',
  options,
}) => {
  return (
    <label
      htmlFor={name}
      className={`form__input -input ot-border-color ${classes}`}
    >
      <span className="form__input__wrapper ot-border-color">
        {showLabel && <Label text={label} required={required} />}
        <span className="input">
          <select
            id={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={inputClasses}
          >
            {options ? (
              options.map((option, index) => (
                <option key={`${option.value}-${index}`} value={option.value}>
                  {option.name}
                </option>
              ))
            ) : (
              <option>loading...</option>
            )}
          </select>
          {disabled ? null : (
            <span className="select__arrow ot-color-headings" />
          )}
        </span>
      </span>
      {error ? <FormError error={error} /> : null}
    </label>
  )
}

Select.displayName = 'Select'
Select.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  required: propTypes.bool,
  placeholder: propTypes.string,
  classes: propTypes.string,
  inputClasses: propTypes.string,
  options: propTypes.array,
}

export default Select
