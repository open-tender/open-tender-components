import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { FormRow, Label } from '.'

const RadioGroupView = styled('span')`
  width: 100%;
  display: flex;
  flex-direction: column;

  > span {
    width: 100%;
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

const RadioButtonView = styled('span')`
  content: '';
  display: block;
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border-radius: 100%;
  border-width: 0.2rem;
  border-style: solid;
  transition: all 0.15s ease;
  background-color: ${(props) => props.theme.bgColors.primary};
  border-color: ${(props) => props.theme.border.color};

  input:focus + & {
    outline-color: ${(props) => props.theme.colors.primary};
    outline-style: auto;
    outline-width: 5px;
  }

  input:checked + & {
    border-color: ${(props) => props.theme.fonts.headings.color};
  }

  input:checked + &:before {
    content: '';
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 100%;
    background-color: ${(props) => props.theme.fonts.headings.color};
  }
`

const RadioButtonDescription = styled('span')`
  display: block;
  margin: 0 0 0 0.8rem;
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const RadioButtonComment = styled('span')`
  display: block;
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
    <FormRow
      as="div"
      style={{ cursor: 'pointer' }}
      label={showLabel && <Label text={label} required={required} />}
      input={
        <RadioGroupView>
          <span>
            {options.map((option) => (
              <RadioButton
                key={option.value}
                option={option}
                name={name}
                value={value}
                onChange={onChange}
              />
            ))}
          </span>
          {description && description.length && (
            <RadioButtonComment>{description}</RadioButtonComment>
          )}
        </RadioGroupView>
      }
    />
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
