import React from 'react'
import propTypes from 'prop-types'
import { FormRow, Label, SelectOnly } from '.'

export const Select = ({
  label,
  name,
  value,
  onChange,
  error,
  options,
  showLabel = true,
  disabled = false,
  required = false,
}) => {
  return (
    <FormRow
      htmlFor={name}
      label={showLabel && <Label text={label} required={required} />}
      input={
        <SelectOnly
          label={label}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          options={options}
        />
      }
      errMsg={error}
      isInput={true}
    />
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
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  required: propTypes.bool,
}

export default Select
