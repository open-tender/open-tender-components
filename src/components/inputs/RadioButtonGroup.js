import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

export const RadioButtonGroup = ({
  label,
  name,
  value,
  options,
  onChange,
  showLabel,
  required,
  classes = '',
  description,
}) => {
  return (
    <label
      className={`form__input radio-group__label -input ot-border-color ${classes}`}
    >
      <span className={`form__input__wrapper ot-border-color`}>
        {showLabel && <Label text={label} required={required} />}
        <span className="radio-group__wrapper">
          <span className="radio-group">
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={option.value}
                className={`label radio`}
              >
                <input
                  id={option.value}
                  name={name}
                  type="radio"
                  value={option.value}
                  className="radio__input"
                  checked={option.value === value}
                  onChange={onChange}
                  aria-label={option.name}
                />
                <span className="radio__custom" />
                <span className="radio__desc ot-font-size-small">
                  {option.name}
                </span>
              </label>
            ))}
          </span>
        </span>
      </span>
      {description && description.length && (
        <span className="form__input__comment ot-font-size-small">
          {description}
        </span>
      )}
    </label>
  )
}

RadioButtonGroup.displayName = 'RadioButtonGroup'
RadioButtonGroup.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  showLabel: propTypes.bool,
  required: propTypes.bool,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  classes: propTypes.string,
  options: propTypes.array,
  description: propTypes.string,
}

export default RadioButtonGroup
