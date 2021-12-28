import styled from '@emotion/styled'

const Box = styled('div')`
  border-style: solid;
  border-width: ${(props) => props.theme.cards.default.borderWidth};
  border-color: ${(props) => props.theme.cards.default.borderColor};
  border-radius: ${(props) => props.theme.cards.default.borderRadius};
  background-color: ${(props) => props.theme.cards.default.bgColor};
  box-shadow: ${(props) => props.theme.cards.default.boxShadow};
`

export default Box
