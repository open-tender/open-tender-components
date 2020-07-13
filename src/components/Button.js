import React from 'react'
import propTypes from 'prop-types'

const ButtonIcon = ({ text, icon }) => (
  <span className="ot-btn__icon-wrapper">
    <span className="ot-btn__icon">{icon}</span>
    <span className="ot-btn__text">{text}</span>
  </span>
)

ButtonIcon.displayName = 'ButtonIcon'
ButtonIcon.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
  iconEnd: propTypes.bool,
}

const Button = ({
  text,
  icon,
  classes = '',
  ariaLabel,
  onClick,
  disabled,
  children,
}) => {
  const klass = `${icon ? 'ot-btn' : ''} ${classes}`
  return (
    <button
      type="button"
      className={klass}
      aria-label={ariaLabel || text}
      onClick={onClick}
      disabled={disabled}
    >
      {icon ? (
        <ButtonIcon icon={icon} text={text} />
      ) : text ? (
        <span className="ot-btn__text">{text}</span>
      ) : (
        children
      )}
    </button>
  )
}

Button.displayName = 'Button'
Button.propTypes = {
  text: propTypes.string,
  icon: propTypes.oneOfType([propTypes.string, propTypes.element]),
  classes: propTypes.string,
  ariaLabel: propTypes.string,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Button
