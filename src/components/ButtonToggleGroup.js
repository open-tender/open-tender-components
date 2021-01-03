import styled from '@emotion/styled'

const ButtonToggleGroup = styled('div')`
  button {
    &:first-of-type {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-of-type {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      margin-left: 0.1rem;
    }

    &:not(:first-of-type):not(:last-of-type) {
      border-radius: 0;
      margin-left: 0.1rem;
    }
  }
`
ButtonToggleGroup.displayName = 'ButtonToggleGroup'
export default ButtonToggleGroup
