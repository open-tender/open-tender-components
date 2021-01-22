import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const ButtonLinkView = styled('button')`
  cursor: pointer;
  appearance: none;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: inline;
  font-size: inherit;
  letter-spacing: inherit;
  text-decoration: ${(props) => props.theme.links.textDecoration};
  transition: ${(props) => props.theme.links.transition};
  color: ${(props) => props.theme.links[props.color].color};

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.theme.links[props.color].hover};
  }

  &:disabled {
    color: ${(props) => props.theme.links[props.color].color};
    opacity: 0.5;
  }
`

const ButtonLink = ({
  label,
  children,
  disabled,
  onClick,
  color = 'primary',
  style = null,
}) => {
  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <ButtonLinkView
      type="button"
      aria-label={label || null}
      // onPointerUp={(evt) => onUp(evt)}
      onClick={(evt) => onUp(evt)}
      disabled={disabled}
      color={color}
      style={style}
    >
      {children}
    </ButtonLinkView>
  )
}

ButtonLink.displayName = 'ButtonStyled'
ButtonLink.propTypes = {
  label: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  disabled: propTypes.bool,
  onClick: propTypes.func,
  color: propTypes.string,
  style: propTypes.object,
}

export default ButtonLink
