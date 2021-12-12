import styled from '@emotion/styled'
import { Box } from '..'

export const FormFieldset = styled('fieldset')`
  & + fieldset {
    margin: ${(props) => props.theme.layout.margin} 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: ${(props) => props.theme.layout.marginMobile} 0 0;
    }
  }
`

export const FormInputs = styled('div')`
  width: 100%;

  button + button {
    margin-left: 1rem;
  }
`

export const FormSubmit = styled('div')`
  margin: 1.5rem 0 0;
  text-align: center;

  button + button {
    margin: 0 0 0 1rem;
  }
`

export const FormWrapper = styled('div')`
  max-width: 54rem;
  margin: 0 auto;
`

// export const FormWrapper = styled(Box)`
//   text-align: left;
//   padding: ${(props) => props.theme.layout.padding};
//   margin: 0 0 ${(props) => props.theme.layout.padding};
//   @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
//     padding: ${(props) => props.theme.layout.paddingMobile};
//     margin: 0 0 ${(props) => props.theme.layout.padding};
//   }
// `

export const FormHeader = styled('div')`
  text-align: left;
  margin: 0 0 2rem;

  p {
    margin: 1rem 0 0;
    line-height: ${(props) => props.theme.lineHeight};
    font-size: ${(props) => props.theme.fonts.sizes.main};

    &:first-of-type {
      margin: 0 0 0 -0.1rem;
      line-height: 1;
      font-size: ${(props) => props.theme.fonts.sizes.h3};
    }
  }
`
