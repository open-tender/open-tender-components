import React from 'react'
import propTypes from 'prop-types'
import { Label } from '.'

const Textarea = ({
  icon = null,
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
  style = null,
}) => {
  return (
    <Label
      htmlFor={name}
      icon={icon}
      text={label}
      value={value}
      required={required}
      errMsg={error}
      showLabel={showLabel}
      disabled={disabled}
      style={style}
      isTextarea={true}
    >
      <textarea
        rows="0"
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
    </Label>
  )
}

Textarea.displayName = 'Textarea'
Textarea.propTypes = {
  icon: propTypes.element,
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
  style: propTypes.object,
}

export default Textarea
