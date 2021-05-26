import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box } from '..'
import { FormContext } from '../Checkout/CheckoutForm'
import { FormApplied } from '.'

const FormButtonContainer = styled(Box)`
  margin: 0 0 0.75rem;
  &:last-of-type {
    margin: 0;
  }
`

const FormButtonView = styled('button')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  text-align: left;
  background-color: transparent;

  &:hover:enabled,
  &:active:enabled,
  &:focus:enabled {
    background-color: ${(props) => props.theme.bgColors.tertiary};

    // span.form-button-apply {
    //   transition: ${(props) => props.theme.links.transition};
    //   color: ${(props) => props.theme.colors.success};
    // }

    // span.form-button-remove {
    //   transition: ${(props) => props.theme.links.transition};
    //   color: ${(props) => props.theme.colors.error};
    // }
  }
`

const FormButtonLabel = styled('span')`
  display: block;
  padding-right: ${(props) => props.theme.layout.padding};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding-right: ${(props) => props.theme.layout.paddingMobile};
  }

  & > span {
    display: block;
    margin: 0.2rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};

    &:first-of-type {
      margin: 0;
      // font-weight: ${(props) => props.theme.boldWeight};
      color: ${(props) => props.theme.colors.primary};
      font-size: ${(props) => props.theme.fonts.sizes.small};
    }
  }
`

const FormButtonActionView = styled('span')`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  opacity: ${(props) => (props.disabled ? '0.5' : '1.0')};

  & > span {
    display: flex;
  }
`

const FormButtonActionButton = styled('span')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
`

const FormButtonActionIcon = styled('span')`
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 0.5rem 0 0;
  line-height: 0;
`

const FormButtonActionText = styled('span')`
  display: block;
  line-height: 1;
`

const FormButtonAction = ({ iconMap, isApplied, disabled }) => {
  const icon = isApplied ? iconMap.remove : iconMap.add
  return (
    <FormButtonActionView disabled={disabled}>
      {isApplied && <FormApplied />}
      <FormButtonActionButton
        className={isApplied ? 'form-button-remove' : 'form-button-apply'}
      >
        {icon && <FormButtonActionIcon>{icon}</FormButtonActionIcon>}
        <FormButtonActionText>
          {isApplied ? 'Remove' : 'Apply'}
        </FormButtonActionText>
      </FormButtonActionButton>
    </FormButtonActionView>
  )
}

FormButtonAction.displayName = 'FormButtonAction'
FormButtonAction.propTypes = {
  iconMap: propTypes.object,
  isApplied: propTypes.bool,
  disabled: propTypes.bool,
}

const FormButton = ({
  title,
  description,
  finePrint,
  isApplied,
  onClick,
  disabled,
  label,
  style,
}) => {
  const formContext = useContext(FormContext)
  const { iconMap = {} } = formContext

  const handleClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    evt.target.blur()
    if (!disabled) onClick()
  }

  return (
    <FormButtonContainer>
      <FormButtonView
        onClick={handleClick}
        style={style}
        aria-label={label}
        as={disabled ? 'span' : 'button'}
      >
        <FormButtonLabel disabled={disabled}>
          <span>{title}</span>
          {description && <span>{description}</span>}
          {finePrint && <span>{finePrint}</span>}
        </FormButtonLabel>
        <FormButtonAction
          iconMap={iconMap}
          isApplied={isApplied}
          disabled={disabled}
        />
      </FormButtonView>
    </FormButtonContainer>
  )
}

FormButton.displayName = 'FormButton'
FormButton.propTypes = {
  title: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  description: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  finePrint: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  label: propTypes.string,
  isApplied: propTypes.bool,
  onClick: propTypes.func,
  disabled: propTypes.bool,
  style: propTypes.object,
}

export default FormButton
