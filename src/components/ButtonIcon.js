import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ButtonIconView = styled('button')`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  text-align: center;
  width: 5rem;
  height: 5rem;
  border: 0;
  margin: 0;
  color: ${(props) =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.fonts.headings.color};
  transition: ${(props) => props.theme.links.transition};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};

  & > span {
    display: block;
    width: 2rem;
    height: 2rem;
  }
`

const ButtonIcon = ({
  label,
  onClick,
  color,
  disabled,
  children,
  style = null,
}) => {
  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <ButtonIconView
      type="button"
      aria-label={label || null}
      // onPointerUp={(evt) => onUp(evt)}
      onClick={(evt) => onUp(evt)}
      disabled={disabled}
      color={color}
      style={style}
    >
      <span>{children}</span>
    </ButtonIconView>
  )
}

ButtonIcon.displayName = 'ButtonIcon'
ButtonIcon.propTypes = {
  label: propTypes.string,
  onClick: propTypes.func,
  color: propTypes.string,
  disabled: propTypes.bool,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  style: propTypes.object,
}

export default ButtonIcon
