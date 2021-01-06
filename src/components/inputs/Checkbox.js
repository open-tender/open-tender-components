import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

export const Checkbox = ({
  label,
  id,
  on,
  onChange,
  disabled,
  classes = '',
  showLabel = false,
  required = false,
  description,
}) => {
  return (
    <label
      htmlFor={id}
      className={`form__input ot-border-color checkbox ${classes || ''}`}
    >
      <span className="form__input__wrapper ot-border-color">
        {showLabel && <Label text={label} required={required} />}
        <span className="input">
          <input
            aria-label={label}
            id={id}
            type="checkbox"
            className="checkbox__input"
            checked={on}
            disabled={disabled}
            onChange={onChange}
          />
          <span className="checkbox__custom" />
          {label && !showLabel ? (
            <span className="checkbox__desc">{label}</span>
          ) : description ? (
            <span className="checkbox__desc ot-font-size-small">
              {description}
            </span>
          ) : null}
        </span>
      </span>
    </label>
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
