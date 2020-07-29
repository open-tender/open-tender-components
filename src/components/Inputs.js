import React from 'react'
import propTypes from 'prop-types'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export const Label = ({ text, required }) => (
  <span className="label ot-preface ot-font-size-x-small">
    {text}
    {required ? <span className="ot-color-alert">*</span> : null}
  </span>
)

Label.displayName = 'Label'
Label.propTypes = {
  text: propTypes.string,
  required: propTypes.bool,
}

export const Error = ({ error }) => {
  return (
    <TransitionGroup component={null}>
      {error ? (
        <CSSTransition
          key="ot-form-error"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <span className="ot-form-error">
            <p>{error}</p>
          </span>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

Error.displayName = 'Error'
Error.propTypes = {
  error: propTypes.string,
}

export const Input = React.forwardRef(
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
      placeholder = '',
      classes = '',
      inputClasses = '',
      children,
    },
    ref
  ) => {
    const autoComplete = ['email', 'password'].includes(type)
      ? `current-${name}`
      : null
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
              autoComplete={autoComplete}
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
        {error ? <Error error={error} /> : null}
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
  placeholder: propTypes.string,
  classes: propTypes.string,
  inputClasses: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

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
      {error ? <Error error={error} /> : null}
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

export const Checkbox = ({
  label,
  id,
  on,
  onChange,
  disabled,
  classes = '',
  showLabel = false,
}) => {
  return (
    <label
      htmlFor={id}
      className={`form__input ot-border-color checkbox ${classes || ''}`}
    >
      <span className="form__input__wrapper ot-border-color">
        {showLabel && <Label text={label} />}
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
}
