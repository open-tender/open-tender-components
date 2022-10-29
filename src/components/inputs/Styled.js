import styled from '@emotion/styled'

export const FormFieldset = styled.fieldset`
  & + fieldset {
    margin: ${(props) => props.theme.layout.margin} 0 0;
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin: ${(props) => props.theme.layout.marginMobile} 0 0;
    }
  }
`

export const FormInputs = styled.div`
  width: 100%;

  button + button {
    margin-left: 1rem;
  }
`

export const FormSubmit = styled.div`
  margin: 3rem 0 0;
  text-align: center;

  button + button {
    margin: 0 0 0 1rem;
  }
`

export const FormWrapper = styled.div`
  max-width: ${(props) =>
    props.theme.cards.form.bgColor === 'transparent' ? '54rem' : '60rem'};
  border-style: solid;
  border-width: ${(props) => props.theme.cards.form.borderWidth};
  border-color: ${(props) => props.theme.cards.form.borderColor};
  border-radius: ${(props) => props.theme.cards.form.borderRadius};
  background-color: ${(props) => props.theme.cards.form.bgColor};
  box-shadow: ${(props) => props.theme.cards.form.boxShadow};
  padding: 4.5rem ${(props) => props.theme.layout.padding};
  padding: ${(props) =>
    props.theme.cards.form.bgColor === 'transparent'
      ? '0'
      : props.theme.layout.padding};
  margin: 0 auto ${(props) => props.theme.layout.margin};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    border: 0;
    box-shadow: none;
    padding: ${(props) =>
      props.theme.cards.form.bgColor === 'transparent'
        ? '0'
        : props.theme.layout.paddingMobile};
    margin: 0 auto ${(props) => props.theme.layout.marginMobile};
  }
`

export const FormRecaptcha = styled.div`
  display: flex;
  justify-content: center;
`
