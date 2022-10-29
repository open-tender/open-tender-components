import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const RadioButtonGroupView = styled.div`
  margin: 0 0 2rem;
`

const RadioButtonGroupLabel = styled.div`
  // padding: ${(props) => props.theme.inputs.padding};
  line-height: ${(props) => props.theme.inputs.lineHeight};
  font-size: ${(props) => props.theme.inputs.fontSize};
  font-family: ${(props) => props.theme.inputs.family};
  letter-spacing: ${(props) => props.theme.inputs.letterSpacing};
  text-transform: ${(props) => props.theme.inputs.textTransform};
  -webkit-font-smoothing: ${(props) => props.theme.inputs.fontSmoothing};
  color: ${(props) => props.theme.inputs.placeholderColor};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.inputs.fontSizeMobile};
  }

  & > span {
    color: ${(props) => props.theme.colors.error};
  }
`

const RadioButtonGroupComment = styled.span`
  display: block;
  margin: 0.5rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const RadioGroupView = styled.span`
  width: 100%;
  margin: 1.5rem 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  &:first-of-type {
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`

const RadioButtonLabel = styled('label')`
  position: relative;
  line-height: 1;
  cursor: pointer;
  width: auto;
  margin: 0 2.5rem 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const RadioButtonInput = styled('input')`
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  white-space: nowrap;
`

const RadioButtonView = styled.span`
  content: '';
  display: block;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border-radius: 100%;
  transition: all 0.15s ease;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: ${(props) => props.theme.inputs.borderWidth} solid
    ${(props) => props.theme.inputs.borderColor};
  box-shadow: ${(props) => props.theme.inputs.boxShadow};

  input:focus + & {
    outline-color: ${(props) => props.theme.inputs.color};
    outline-style: auto;
    outline-width: 5px;
  }

  input:checked + &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1.6rem;
    height: 1.6rem;
    margin: -0.8rem 0 0 -0.8rem;
    border-radius: 100%;
    background-color: ${(props) => props.theme.inputs.color};
  }
`

const RadioButtonDescription = styled.span`
  display: block;
  margin: 0 0 0 0.8rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const RadioButton = ({ option, name, value, onChange }) => {
  return (
    <RadioButtonLabel htmlFor={option.value}>
      <RadioButtonInput
        id={option.value}
        name={name}
        type="radio"
        value={option.value}
        checked={option.value === value}
        onChange={onChange}
        aria-label={option.name}
      />
      <RadioButtonView />
      <RadioButtonDescription>{option.name}</RadioButtonDescription>
    </RadioButtonLabel>
  )
}

RadioButton.displayName = 'RadioButton'
RadioButton.propTypes = {
  option: propTypes.object,
  name: propTypes.string,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
}

const RadioButtonGroup = ({
  label,
  name,
  value,
  options,
  onChange,
  showLabel,
  required,
  description,
}) => {
  return (
    <RadioButtonGroupView>
      {showLabel && (
        <>
          <RadioButtonGroupLabel>
            {label}
            {required && <span> *</span>}
          </RadioButtonGroupLabel>
          {description && description.length && (
            <RadioButtonGroupComment>{description}</RadioButtonGroupComment>
          )}
        </>
      )}
      <RadioGroupView>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            option={option}
            name={name}
            value={value}
            onChange={onChange}
          />
        ))}
      </RadioGroupView>
    </RadioButtonGroupView>
  )
}

RadioButtonGroup.displayName = 'RadioButtonGroup'
RadioButtonGroup.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  showLabel: propTypes.bool,
  required: propTypes.bool,
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  classes: propTypes.string,
  options: propTypes.array,
  description: propTypes.string,
}

export default RadioButtonGroup
