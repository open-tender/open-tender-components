import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { FormError } from '.'

const LabelView = styled('label')`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 2rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  input,
  textarea,
  select {
    padding-left: ${(props) =>
      props.hasIcon ? '4.8rem' : props.theme.inputs.paddingHorizontal};
    border-color: ${(props) =>
      props.hasError
        ? props.theme.colors.error
        : props.theme.inputs.borderColor};

    &:focus {
      outline: none;
      border-color: ${(props) =>
        props.hasError
          ? props.theme.colors.error
          : props.theme.inputs.borderColorFocus};
    }
  }
`

const LabelIcon = styled('span')`
  position: absolute;
  top: 0;
  // bottom: 0;
  left: 0;
  width: 4.8rem;
  height: 5.6rem;
  padding: 0 0.8rem 0 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${(props) =>
      props.hasValue && !props.disabled
        ? props.theme.inputs.color
        : props.theme.inputs.placeholderColor} !important;
  }
`

const LabelText = styled('span')`
  position: absolute;
  top: 0;
  left: ${(props) => (props.isTextarea ? '1.2rem' : '0')};
  padding: ${(props) => props.theme.inputs.padding};
  border: ${(props) => props.theme.inputs.borderWidth} solid transparent;
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-family: ${(props) => props.theme.inputs.family};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) =>
    props.hasError
      ? props.theme.colors.error
      : props.theme.inputs.placeholderColor};
  transition: all 0.1s cubic-bezier(0.17, 0.67, 0.12, 1);
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) =>
      props.hasValue
        ? props.theme.inputs.label.fontSizeMobile
        : props.theme.inputs.fontSizeMobile};
  }

  input:focus + &,
  textarea:focus + &,
  select:focus + & {
    cursor: default;
    border: 0;
    line-height: 1;
    padding: ${(props) => props.theme.inputs.label.padding};
    transform: translate(
      ${(props) => props.theme.inputs.label.left},
      ${(props) => props.theme.inputs.label.top}
    );
    background-color: ${(props) => props.theme.inputs.bgColor};
    font-size: ${(props) => props.theme.inputs.label.fontSize};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.inputs.label.fontSizeMobile};
    }
  }

  ${(props) =>
    props.hasValue
      ? `cursor: default;
    border: 0;
    line-height: 1;
    padding: ${props.theme.inputs.label.padding};
    transform: translate(
      ${props.theme.inputs.label.left},
      ${props.theme.inputs.label.top}
    );
    background-color: ${props.theme.inputs.bgColor};
    font-size: ${props.theme.inputs.label.fontSize};
    `
      : ''}
`

const LabelRequired = styled('span')`
  color: ${(props) => props.theme.colors.error};
`

const Label = ({
  htmlFor,
  icon,
  text,
  required,
  value,
  errMsg,
  showLabel = true,
  disabled = false,
  isTextarea = false,
  style = null,
  className = undefined,
  children,
}) => {
  return (
    <>
      <LabelView
        htmlFor={htmlFor}
        style={style}
        icon={icon}
        className={className}
        hidePlaceholder={!!text}
        hasError={!!errMsg}
        hasIcon={!!icon}
      >
        {icon && (
          <LabelIcon hasValue={!!value} disabled={disabled}>
            {icon}
          </LabelIcon>
        )}
        {children}
        {showLabel && (
          <LabelText
            hasValue={!!value}
            hasError={!!errMsg}
            hasIcon={!!icon}
            isTextarea={isTextarea}
          >
            {text}
            {required ? <LabelRequired>&nbsp;*</LabelRequired> : null}
          </LabelText>
        )}
        <FormError errMsg={errMsg} />
      </LabelView>
    </>
  )
}

Label.displayName = 'Label'
Label.propTypes = {
  htmlFor: propTypes.string,
  icon: propTypes.element,
  text: propTypes.oneOfType([propTypes.string, propTypes.element]),
  required: propTypes.bool,
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.bool,
  ]),
  errMsg: propTypes.string,
  showLabel: propTypes.bool,
  disabled: propTypes.bool,
  isTextarea: propTypes.bool,
  style: propTypes.object,
  className: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Label
