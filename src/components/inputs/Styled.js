import styled from '@emotion/styled'

export const FormFieldset = styled('fieldset')`
  margin: 0 0 4rem;
`

export const FormInputs = styled('div')`
  width: 100%;

  button + button {
    margin-left: 1rem;
  }
`

export const FormSubmit = styled('div')`
  margin: 1.5rem 0 0;

  button + button {
    margin: 0 0 0 1rem;
  }
`
