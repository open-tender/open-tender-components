import React from 'react'
import propTypes from 'prop-types'
import { FormRow, Label } from '.'

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
}) => {
  return (
    <>
      <FormRow
        htmlFor={name}
        label={showLabel && <Label text={label} required={required} />}
        input={
          <textarea
            aria-label={label}
            id={name}
            name={name}
            value={value || ''}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            onChange={onChange}
          />
        }
        errMsg={error}
        isInput={true}
      />
    </>
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
}

export default Textarea
