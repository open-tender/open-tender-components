import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

export const ButtonStyledView = styled('button')`
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  text-align: center;
  margin: 0;
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};
  transition: ${(props) => props.theme.links.transition};
  font-family: ${(props) => props.theme.buttons.sizes[props.size].family};
  font-weight: ${(props) => props.theme.buttons.sizes[props.size].weight};
  -webkit-font-smoothing: ${(props) =>
    props.theme.buttons.sizes[props.size].fontSmoothing};
  letter-spacing: ${(props) =>
    props.theme.buttons.sizes[props.size].letterSpacing};
  text-transform: ${(props) =>
    props.theme.buttons.sizes[props.size].textTransform};
  font-size: ${(props) => props.theme.buttons.sizes[props.size].fontSize};
  padding: ${(props) => props.theme.buttons.sizes[props.size].padding};
  border-style: solid;
  border-width: ${(props) => props.theme.buttons.sizes[props.size].borderWidth};
  border-radius: ${(props) =>
    props.theme.buttons.sizes[props.size].borderRadius};
  color: ${(props) => props.theme.buttons.colors[props.color].color};
  background-color: ${(props) =>
    props.theme.buttons.colors[props.color].bgColor};
  border-color: ${(props) =>
    props.theme.buttons.colors[props.color].borderColor};

  &:hover {
    color: ${(props) =>
      props.theme.buttons.colors[`${props.color}Hover`].color};
    background-color: ${(props) =>
      props.theme.buttons.colors[`${props.color}Hover`].bgColor};
    border-color: ${(props) =>
      props.theme.buttons.colors[`${props.color}Hover`].borderColor};

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      color: ${(props) => props.theme.buttons.colors[props.color].color};
      background-color: ${(props) =>
        props.theme.buttons.colors[props.color].bgColor};
      border-color: ${(props) =>
        props.theme.buttons.colors[props.color].borderColor};
    }
  }

  &:disabled {
    color: ${(props) => props.theme.buttons.colors[props.color].color};
    background-color: ${(props) =>
      props.theme.buttons.colors[props.color].bgColor};
    border-color: ${(props) =>
      props.theme.buttons.colors[props.color].borderColor};
  }

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    // line-height: 1.2;
  }
`

const ButtonStyledIcon = styled.span`
  display: block;
  flex-shrink: 0;
  line-height: 0;
  width: ${(props) => (props.isSmall ? '1.2rem' : '1.4rem')};
  width: ${(props) => (props.isSmall ? '1.2rem' : '1.4rem')};
  margin-right: ${(props) => (props.isSmall ? '0.6rem' : '0.8rem')};
`

const ButtonStyled = ({
  label,
  children,
  disabled,
  onClick,
  icon,
  type = 'button',
  size = 'default',
  color = 'primary',
  style = null,
  btnRef = null,
  id = null,
}) => {
  const onUp = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <ButtonStyledView
      ref={btnRef}
      type={type}
      id={id}
      aria-label={label || null}
      // onPointerUp={(evt) => onUp(evt)}
      onClick={(evt) => (type === 'submit' ? null : onUp(evt))}
      disabled={disabled}
      size={size}
      color={color}
      style={style}
    >
      <span>
        {icon && (
          <ButtonStyledIcon isSmall={['header', 'small'].includes(size)}>
            {icon}
          </ButtonStyledIcon>
        )}
        {children}
      </span>
    </ButtonStyledView>
  )
}

ButtonStyled.displayName = 'ButtonStyled'
ButtonStyled.propTypes = {
  label: propTypes.string,
  icon: propTypes.oneOfType([propTypes.string, propTypes.element]),
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
  disabled: propTypes.bool,
  onClick: propTypes.func,
  size: propTypes.string,
  color: propTypes.string,
  type: propTypes.string,
  id: propTypes.string,
  style: propTypes.object,
  btnRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.any }),
  ]),
}

export default ButtonStyled
