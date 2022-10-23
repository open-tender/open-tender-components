import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SelectOnlyView = styled.span`
  position: relative;
  display: block;
  flex-grow: 1;
`

const SelectView = styled.select`
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  width: 100%;
  padding: ${(props) => props.theme.inputs.padding};
  border-style: ${(props) => props.theme.inputs.borderStyle};
  border-color: ${(props) => props.theme.inputs.borderColor};
  border-width: ${(props) => props.theme.inputs.borderWidth};
  border-radius: ${(props) => props.theme.inputs.radius};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-family: ${(props) => props.theme.inputs.family};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-weight: ${(props) => props.theme.inputs.weight};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) => props.theme.inputs.color};
  background-color: ${(props) => props.theme.inputs.bgColor};
  box-shadow: ${(props) => props.theme.inputs.boxShadow};
  transition: ${(props) => props.theme.links.transition};

  ${(props) =>
    props.theme.inputs.bottomBorderOnly
      ? `
    box-shadow: none;
    background-color: transparent;
    border-radius: 0;
    border-width: 0;
    border-bottom-width: ${props.theme.inputs.borderWidth};
    padding-top: ${props.theme.inputs.paddingTop};
    padding-bottom: ${props.theme.inputs.paddingBottom};
  `
      : ''}

  ${(props) =>
    props.hasError ? `border-color: ${props.theme.colors.error};` : ''}

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    font-size: ${(props) => props.theme.inputs.fontSizeMobile};
  }

  &::selection {
    color: ${(props) => props.theme.inputs.bgColor};
    background-color: ${(props) => props.theme.inputs.color};
  }

  &:active,
  &:focus {
    color: ${(props) => props.theme.inputs.colorFocus};
    background-color: ${(props) => props.theme.inputs.bgColorFocus};
    border-color: ${(props) => props.theme.inputs.borderColorFocus};

    ${(props) =>
      props.hasError ? `border-color: ${props.theme.colors.error};` : ''}

    ${(props) => !props.theme.inputs.showOutline && `outline: none;`}
  }

  &:disabled,
  &:read-only {
    cursor: default;
    opacity: 1;
    color: ${(props) => props.theme.inputs.color};
    background-color: ${(props) => props.theme.inputs.bgColor};
    border-color: ${(props) => props.theme.inputs.borderColor};
  }
`

const SelectArrowView = styled.span`
  display: block;
  position: absolute;
  z-index: 2;
  bottom: ${(props) => props.theme.inputs.selectPaddingBottom};
  right: ${(props) => props.theme.inputs.paddingHorizontal};
  padding: 0 0.2rem;
  height: ${(props) => props.theme.inputs.selectSize};
  background-color: ${(props) => props.theme.inputs.bgColor};

  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    height: ${(props) => props.theme.inputs.selectSizeMobile};
  }
`

const SelectArrowContainer = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SelectArrow = styled.span`
  display: block;
  content: ' ';
  border-bottom-width: 0.2rem;
  border-bottom-style: solid;
  border-right-width: 0.2rem;
  border-right-style: solid;
  transform: scale(1) rotate(45deg);
  border-color: ${(props) => props.theme.inputs.color};
  width: 1.2rem;
  height: 1.2rem;
  margin-top: -0.6rem;
`

const SelectOnly = ({ label, name, value, onChange, disabled, options }) => {
  return (
    <SelectOnlyView>
      <SelectView
        aria-label={label}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options ? (
          options.map((option, index) => (
            <option
              key={`${option.value}-${index}`}
              value={option.value}
              disabled={option.disabled || false}
            >
              {option.name}
            </option>
          ))
        ) : (
          <option>loading...</option>
        )}
      </SelectView>
      <SelectArrowView>
        <SelectArrowContainer>
          <SelectArrow />
        </SelectArrowContainer>
      </SelectArrowView>
    </SelectOnlyView>
  )
}

SelectOnly.displayName = 'SelectOnly'
SelectOnly.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  disabled: propTypes.bool,
  options: propTypes.array,
}

export default SelectOnly
