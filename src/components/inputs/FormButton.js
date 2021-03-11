import React, { useContext } from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Box } from '..'
import { FormContext } from '../Checkout/CheckoutForm'
import { FormApplied } from '.'

const FormButtonContainer = styled(Box)`
  margin: 0 0 0.5rem;
  &:last-of-type {
    margin: 0;
  }
`

const FormButtonView = styled('button')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  text-align: left;
  background-color: transparent;

  &:hover,
  &:active,
  &:focus {
    // background-color: rgba(0, 0, 0, 0.05);
    background-color: ${(props) =>
      props.theme.buttons.colors.secondary.bgColor};

    span.form-button {
      color: ${(props) => props.theme.links.primary.hover};
    }

    // & > span {
    //   opacity: 0.5;
    // }
  }
`

// const FormButtonContainer = styled('div')`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem;
// `

const FormButtonLabel = styled('span')`
  display: block;
  // flex-grow: 1;
`

const FormButtonActionView = styled('span')`
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: ${(props) => props.theme.fonts.sizes.small};

  & > span {
    display: flex;
  }
`

const FormButtonActionButton = styled('span')`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

const FormButtonAction = ({ iconMap, isApplied }) => {
  const icon = isApplied ? iconMap.remove : iconMap.add
  return (
    <FormButtonActionView>
      {isApplied && <FormApplied />}
      <FormButtonActionButton className="form-button">
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
}

const FormButton = ({ label, isApplied, onClick, disabled, style }) => {
  const formContext = useContext(FormContext)
  const { iconMap = {} } = formContext

  const handleClick = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
    if (!disabled) onClick()
  }

  return (
    <FormButtonContainer>
      <FormButtonView onClick={handleClick} disabled={disabled} style={style}>
        {/* <FormButtonContainer> */}
        <FormButtonLabel>Text goes here</FormButtonLabel>
        <FormButtonAction iconMap={iconMap} isApplied={isApplied} />
        {/* </FormButtonContainer> */}
      </FormButtonView>
    </FormButtonContainer>
  )
}

FormButton.displayName = 'FormButton'
FormButton.propTypes = {
  label: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
    propTypes.string,
    propTypes.object,
  ]),
  isApplied: propTypes.bool,
  onClick: propTypes.function,
  disabled: propTypes.bool,
  style: propTypes.object,
}

export default FormButton
