import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { FormError } from '.'

const LabelView = styled.label`
  position: relative;
  display: block;
  width: 100%;
  margin: 0 0 3rem;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: ${(props) => props.theme.inputs.color};

  input {
    ${(props) =>
      props.hasIcon ? `padding-left: ${props.theme.inputs.iconPadding};` : ''}
`

const LabelIconView = styled.span`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  top: ${(props) => props.theme.inputs.paddingTop};
  left: ${(props) => props.theme.inputs.iconLeft};
  width: 1.8rem;
  height: ${(props) => props.theme.inputs.selectSize};
  color: ${(props) =>
    props.hasValue
      ? props.theme.inputs.color
      : props.theme.inputs.placeholderColor};
`

const LabelIcon = styled.span`
  display: block;
  width: 1.8rem;
  height: 1.8rem;
`

const LabelText = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  transition: all 0.2s cubic-bezier(0.17, 0.67, 0.12, 1);
  padding: ${(props) => props.theme.inputs.padding};
  padding-top: ${(props) => props.theme.inputs.paddingTop};
  padding-bottom: ${(props) => props.theme.inputs.paddingBottom};
  padding-left: ${(props) =>
    props.hasIcon
      ? props.theme.inputs.iconPadding
      : props.theme.inputs.paddingHorizontal};
  border-style: solid;
  border-color: transparent;
  border-width: ${(props) => props.theme.inputs.borderWidth};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-family: ${(props) => props.theme.inputs.family};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) =>
    props.hasError
      ? props.theme.colors.error
      : props.theme.inputs.placeholderColor};

  ${(props) =>
    props.theme.inputs.bottomBorderOnly
      ? `border-width: 0; border-bottom-width: ${props.theme.inputs.borderWidth};`
      : ''}

  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.inputs.fontSizeMobile};

    ${(props) =>
      props.hasValue
        ? `font-size: ${props.theme.inputs.label.fontSizeMobile};`
        : ''}
  }

  input:focus + &,
  textarea:focus + &,
  select:focus + & {
    cursor: default;

    ${(props) =>
      props.theme.inputs.showLabel &&
      `transform: translate(0, ${props.theme.inputs.label.offset});
    font-size: ${props.theme.inputs.label.fontSize};`}

    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      ${(props) =>
        props.theme.inputs.showLabel &&
        `font-size: ${props.theme.inputs.label.fontSizeMobile};`}
    }
  }

  ${(props) =>
    props.hasValue
      ? `cursor: default;
    transform: translate(0, ${props.theme.inputs.label.offset});
    font-size: ${props.theme.inputs.label.fontSize};
    `
      : ''}

  ${(props) =>
    props.hasValue && !props.theme.inputs.showLabel ? `display: none;` : ''}
`

const LabelRequired = styled.span`
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
        hasValue={!!value}
      >
        {icon && (
          <LabelIconView hasValue={!!value} disabled={disabled}>
            <LabelIcon>{icon}</LabelIcon>
          </LabelIconView>
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
