import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

export const Switch = ({
  label,
  id,
  on,
  onChange,
  disabled,
  classes = '',
  showLabel = true,
  inputClasses = '',
}) => {
  return (
    <label
      htmlFor={id}
      className={`form__input ot-border-color switch ${classes}`}
    >
      <span className="form__input__wrapper ot-border-color">
        {showLabel && <Label text={label} />}
        <span className={`input ${inputClasses}`}>
          <input
            aria-label={label}
            id={id}
            type="checkbox"
            className="switch__input"
            checked={on}
            disabled={disabled}
            onChange={onChange}
          />
          <span className="switch__toggle" />
        </span>
      </span>
    </label>
  )
}

Switch.displayName = 'Switch'
Switch.propTypes = {
  label: propTypes.string,
  id: propTypes.string,
  on: propTypes.bool,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  classes: propTypes.string,
  showLabel: propTypes.bool,
  inputClasses: propTypes.string,
}

export default Switch
