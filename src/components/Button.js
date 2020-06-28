import React from 'react'
import propTypes from 'prop-types'
import { iconMap } from './icons'

const ButtonIcon = ({ icon, text, iconEnd }) => (
  <span className="btn-icon-wrapper">
    {!iconEnd && <span className="btn-icon">{icon}</span>}
    <span>{text}</span>
    {iconEnd && <span className="btn-icon btn-icon--end">{icon}</span>}
  </span>
)

ButtonIcon.displayName = 'ButtonIcon'
ButtonIcon.propTypes = {
  text: propTypes.string,
  icon: propTypes.element,
}

const Button = ({
  text,
  icon,
  classes = '',
  ariaLabel,
  onClick,
  disabled,
  iconEnd = false,
  children,
}) => {
  const btnIcon = typeof icon === 'string' ? iconMap[icon] : icon
  const klass = `${btnIcon ? 'btn btn--icon' : ''} ${classes} ${
    iconEnd ? '-icon-end' : ''
  }`
  return (
    <button
      type="button"
      className={klass}
      aria-label={ariaLabel || text}
      onClick={onClick}
      disabled={disabled}
    >
      {btnIcon ? (
        <ButtonIcon icon={btnIcon} text={text} iconEnd={iconEnd} />
      ) : text ? (
        text
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
