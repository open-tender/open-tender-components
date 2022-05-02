import React from 'react'
import propTypes from 'prop-types'
import { Label, SelectOnly } from '.'

const Select = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  disabled = false,
  required = false,
  showLabel = false,
}) => {
  return (
    <Label
      htmlFor={name}
      text={label}
      showLabel={showLabel}
      value={true}
      required={required}
      errMsg={error}
    >
      <SelectOnly
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        options={options}
      />
    </Label>
  )
}

Select.displayName = 'Select'
Select.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  error: propTypes.string,
  options: propTypes.array,
  disabled: propTypes.bool,
  required: propTypes.bool,
  showLabel: propTypes.bool,
}

export default Select
